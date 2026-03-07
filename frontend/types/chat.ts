export interface Source {
  page: number;
  content?: string;
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: Source[];
}

export interface UploadResponse {
  filename: string;
  status: string;
}

export interface ChatResponse {
  answer: string;
}