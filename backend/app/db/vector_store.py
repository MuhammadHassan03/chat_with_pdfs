import chromadb
import os

client = chromadb.CloudClient(
  api_key=os.getenv("CHROMA_DB_API_KEY"),
  tenant=os.getenv("CHROMA_TENENT"),
  database=os.getenv("CHROMA_DATABASE")
)

collection = client.get_or_create_collection("pdf_embeddings")

def store_embeddings(embeddings: list[list[float]], texts: list[str], metadatas: list[dict], ids: list[str]):
    collection.add(
        embeddings=embeddings,
        metadatas=metadatas,
        ids=ids,
        documents=texts
    )

def search_embeddings(query_embedding: list[float], n_results: int = 5):
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results
    )
    return results    

def get_similar_chunks(query_embedding: list[float], n_results: int = 5):
    results = search_embeddings(query_embedding, n_results)
    print('DEBUG: results ', results)
    return results["documents"]