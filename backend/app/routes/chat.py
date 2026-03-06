from fastapi import APIRouter, Body
from app.services.rag_pipeline import rag_pipeline
router = APIRouter()
from pydantic import BaseModel

class ask_question(BaseModel):
    question: str

@router.post("/")
async def ask_question(question: str = Body(..., embed=True)):
    # convert question → embedding
    # search vector DB → top chunks
    # call LLM → answer
    answer = rag_pipeline(question)
    return {"answer": answer}