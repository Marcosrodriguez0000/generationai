
export interface ImageItem {
  id: string;
  url: string;
  prompt: string;
  badge?: string; // Para mostrar etiquetas como "NEW" o "UPDATE"
}

export interface VideoItem {
  id: string;
  url: string;
  prompt: string;
  badge?: string; // Para mostrar etiquetas como "NEW" o "UPDATE"
  thumbnail?: string; // URL de la miniatura del video
}
