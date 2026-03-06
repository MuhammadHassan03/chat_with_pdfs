from app.services.embeddings import generate_embedding
from app.db.vector_store import get_similar_chunks
from app.services.llm import ask_gemini

def rag_pipeline(question: str):
    embedding = generate_embedding(question)
    print(f"DEBUG: Embedding of question: {embedding[:5]}...")

    results = get_similar_chunks(embedding)
    print(f"DEBUG: Results: {results}")

    chunks = results[0]

    context = "\n\n".join([c for c in chunks if c])

    prompt = f"""
    Answer the question using the provided context.

    Context:
    {context}

    Question:
    {question}
    """

    answer = ask_gemini(prompt)

    return answer





