from fastapi import APIRouter, UploadFile, File
from app.services.pdf_parser import parse_pdf
from app.services.embeddings import generate_embeddings_for_documents
import os
import shutil
from app.db.vector_store import store_embeddings

router = APIRouter()

@router.post("/")
async def upload_pdf(file: UploadFile = File(...)):
    # 1. SHURU MEIN SLASH (/) LAZMI HAI - Yehi fix hai
    UPLOAD_DIR = "/tmp" 
    
    # Create /tmp directory if it doesn't exist (Vercel par ye hamesha hota hai)
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    # 2. Path system ke root /tmp mein hona chahiye
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    
    # Save the uploaded file efficiently
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        # 3. Processing logic
        documents = parse_pdf(file_path)
        texts = [doc.page_content for doc in documents]

        print(f'Processing: {file.filename}')
        
        embeddings = generate_embeddings_for_documents(texts)
        metadatas = [doc.metadata for doc in documents]
        ids = [f'{file.filename}_{i}' for i in range(len(documents))]

        # Store in Vector DB (Pinecone/Chroma)
        store_embeddings(embeddings=embeddings, texts=texts, metadatas=metadatas, ids=ids)

        return {"filename": file.filename, "status": "processed"}

    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return {"error": str(e), "status": "failed"}

    finally:
        # 4. Cleanup: File delete karna mat bhoolna taake memory full na ho
        if os.path.exists(file_path):
            os.remove(file_path)
            print(f"✅ Deleted temp file: {file_path}")