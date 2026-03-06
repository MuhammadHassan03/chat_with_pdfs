export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface UploadResponse {
  filename: string;
  status: string;
}

export interface ChatResponse {
  answer: string;
}