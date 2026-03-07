# 📄 ChatWithPDF - AI Document Assistant

A high-performance **RAG (Retrieval-Augmented Generation)** backend built with **FastAPI** and **LangChain**. This tool allows users to upload PDF documents and have real-time conversations with their data using **Google Gemini 2.0 Flash** via **OpenRouter**.

## 🔗 Live Demo
🚀 **Check it out here:** [https://chat-with-pdfs-agmx.vercel.app/](https://chat-with-pdfs-agmx.vercel.app/)


## 🚀 Key Features
- **Instant PDF Indexing:** Extracts and chunks text from PDFs for semantic search.
- **Always Free LLM:** Uses **Gemini 2.0 Flash** (Free Tier) via OpenRouter.
- **Privacy First:** Temporary PDFs are automatically deleted after processing.
- **FastAPI Backend:** Fully asynchronous and deployment-ready.

## 🛠️ Tech Stack
- **Framework:** FastAPI
- **AI Tool:** LangChain
- **LLM Provider:** OpenRouter (Google Gemini)
- **Database:** ChromaDB (Vector Store)

## ⚙️ Setup & Installation

1. **Clone the Repo:**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   cd your-repo-name

Install Dependencies:
pip install -r requirements.txt

Environment Variables:
Run Server:

Bash
uvicorn main:app --reload

🔌 API Endpoints
POST /upload: Uploads and indexes a PDF.

POST /chat: Takes a query and returns an answer based on PDF context.

👨‍💻 Author
Hassan - Software Engineering Student @ Superior University

Built with ❤️ for the AI Community.
---
