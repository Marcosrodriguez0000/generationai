
// Expanded types for both image and text generation
export interface ImageItem {
  id: string;
  url: string;
  prompt: string;
  badge?: string;
  createdAt?: Date;
  userId?: string;
}

export interface VideoItem {
  id: string;
  url: string;
  prompt: string;
  badge?: string;
  createdAt?: Date;
  userId?: string;
}

export interface TextItem {
  id: string;
  text: string;
  prompt: string;
  badge?: string;
  createdAt?: Date;
  userId?: string;
  format?: string;
}
