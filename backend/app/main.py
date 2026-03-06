import logging
import time
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

load_dotenv()

from app.routes import upload, chat

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    """
    # Startup actions: e.g., connect to database, load ML models
    logger.info("Application startup: Initializing resources...")
    yield
    # Shutdown actions: e.g., close database connections
    logger.info("Application shutdown: Cleaning up resources...")

# Initialize FastAPI application
app = FastAPI(
    title="Chat with PDFs API",
    description="A production-ready API for uploading and chatting with PDF documents.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# Configure CORS (Cross-Origin Resource Sharing)
# In production, restrict `allow_origins` to your specific frontend domains.
CORS_ORIGINS = [
    "http://localhost:3000",   # Next.js frontend default port
    "http://localhost:5173",   # Vite frontend default port
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Middleware for adding custom headers and timing
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = f"{process_time:.4f}"
    # Log requests
    logger.info(f"{request.method} {request.url.path} - {response.status_code} - {process_time:.4f}s")
    return response

# Global exception handler to prevent app crashes and return clean JSON error responses
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception at {request.url.path}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected server error occurred. Please try again later."},
    )

# Root Health Check Endpoint
@app.get("/health", tags=["System"])
async def health_check():
    """Health check endpoint to verify API is running."""
    return {"status": "healthy", "service": "Chat with PDFs API"}

# Include application routers
app.include_router(upload.router, prefix="/upload", tags=["Upload"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])
