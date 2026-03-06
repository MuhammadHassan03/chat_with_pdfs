import os
import logging
from functools import lru_cache

from langchain_google_genai import GoogleGenerativeAIEmbeddings

logger = logging.getLogger(__name__)

@lru_cache()
def get_embeddings_model():
    """
    Returns a configured instance of the Google embeddings model.
    Uses lru_cache to ensure we only instantiate the model once and share it.
    
    Ensure GOOGLE_API_KEY is available in your environment variables.
    """
    print(f"DEBUG: API Key Loaded: {os.getenv('GOOGLE_API_KEY')[:5]}***")
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        logger.warning(
            "GOOGLE_API_KEY environment variable is not set. "
            "Embedding generation will fail unless set."
        )

    # Use "gemini-embedding-001" (cost effective modern model)
    # Configure chunk sizes or others as needed via keyword arguments.
    return GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        api_key=os.getenv("GOOGLE_API_KEY")
    )

def generate_embedding(text: str) -> list[float]:
    """
    Generate an embedding vector for a single piece of text.
    
    Args:
        text (str): The text string to embed.
        
    Returns:
        list[float]: The generated embedding vector.
    """
    model = get_embeddings_model()
    return model.embed_query(text)

def generate_embeddings_for_documents(texts: list[str]) -> list[list[float]]:
    """
    Generate embedding vectors for a list of text strings.
    
    Args:
        texts (list[str]): The list of text strings to embed.
        
    Returns:
        list[list[float]]: A list where each item is an embedding vector.
    """
    model = get_embeddings_model()
    return model.embed_documents(texts)
