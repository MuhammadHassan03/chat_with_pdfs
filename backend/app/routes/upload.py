from fastapi import APIRouter, UploadFile, File
from app.services.pdf_parser import parse_pdf
from app.services.embeddings import generate_embeddings_for_documents
import os
from app.db.vector_store import store_embeddings

router = APIRouter()

@router.post("/")
async def upload_pdf(file: UploadFile = File(...)):
    # save file in tmp/
    # call PDF parser & embeddings
    
    # Create tmp directory if it doesn't exist
    os.makedirs("tmp", exist_ok=True)

    # Save the uploaded file
    file_path = f"tmp/{file.filename}"
    with open(file_path, "wb") as f:
        f.write(await file.read())
    
    documents = parse_pdf(file_path)

    texts = [doc.page_content for doc in documents]

    print(f'texts of doc', texts)
    embeddings = generate_embeddings_for_documents([doc.page_content for doc in documents])
    
    metadatas = [doc.metadata for doc in documents]

    ids = [f'{file.filename}_{i}' for i in range(len(documents))]

    store_embeddings(embeddings=embeddings, texts=texts, metadatas=metadatas, ids=ids)

    if os.path.exists(file_path):
            os.remove(file_path)
            print(f"✅ Deleted: {file_path}")

    return {"filename": file.filename, "status": "processed"}