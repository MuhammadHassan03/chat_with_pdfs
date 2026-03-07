import os
from pinecone import Pinecone

# 1. Initialize Pinecone Client
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# 2. Connect to your Index (Jo aapne 768 dimensions wala banaya hai)
index_name = os.getenv("PINECONE_INDEX_NAME", "chat-pdf")
index = pc.Index(index_name)

def store_embeddings(embeddings: list[list[float]], texts: list[str], metadatas: list[dict], ids: list[str]):
    """
    Pinecone mein embeddings aur text metadata ke saath save karne ke liye.
    """
    vectors_to_upsert = []
    for i in range(len(ids)):
        # Pinecone mein text ko metadata mein 'text' key ke sath rakhte hain
        metadata = metadatas[i] if i < len(metadatas) else {}
        metadata["text"] = texts[i] 
        
        vectors_to_upsert.append({
            "id": ids[i],
            "values": embeddings[i],
            "metadata": metadata
        })
    
    # Batch upload (upsert)
    index.upsert(vectors=vectors_to_upsert)

def search_embeddings(query_embedding: list[float], n_results: int = 5):
    """
    Pinecone se similarity search karne ke liye.
    """
    results = index.query(
        vector=query_embedding,
        top_k=n_results,
        include_metadata=True  # Taake humein text wapas mil sakay
    )
    return results

def get_similar_chunks(query_embedding: list[float], n_results: int = 5):
    """
    Results se sirf text chunks (documents) nikalne ke liye.
    """
    results = search_embeddings(query_embedding, n_results)
    print('DEBUG: Pinecone results ', results)
    
    # Pinecone metadata se text extract karna
    documents = [match["metadata"]["text"] for match in results["matches"] if "text" in match["metadata"]]
    
    return [documents] # ChromaDB list of list return karta tha, isliye hum ne bhi list mein wrap kiya