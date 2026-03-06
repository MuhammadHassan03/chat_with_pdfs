import os
import logging
import PyPDF2

try:
    from langchain_core.documents import Document
except ImportError:
    from langchain.docstore.document import Document

logger = logging.getLogger(__name__)

def parse_pdf(file_path: str) -> list[Document]:
    """
    Parses a PDF file from the given file path and extracts its text content page by page.
    Returns a list of LangChain Document objects, one for each page.
    
    Args:
        file_path (str): The absolute or relative path to the PDF file.
        
    Returns:
        list[Document]: A list of LangChain Document objects containing the extracted text and metadata.
    """
    if not os.path.exists(file_path):
        logger.error(f"File not found: {file_path}")
        raise FileNotFoundError(f"File not found: {file_path}")

    documents = []
    
    try:
        with open(file_path, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            
            for page_num in range(len(reader.pages)):
                page = reader.pages[page_num]
                text = page.extract_text()
                
                # Some PDFs might have pages from which text cannot be extracted
                if text:
                    # Clean up the text slightly
                    text = text.strip()
                    
                    # Create a LangChain Document with metadata
                    doc = Document(
                        page_content=text,
                        metadata={
                            "source": os.path.basename(file_path),
                            "page": page_num + 1
                        }
                    )
                    documents.append(doc)
                else:
                    logger.warning(f"Could not extract text from page {page_num + 1} of {file_path}")
                    
    except Exception as e:
        logger.error(f"Error parsing PDF file {file_path}: {e}", exc_info=True)
        raise
        
    logger.info(f"Successfully parsed {len(documents)} pages from {file_path}")
    return documents
