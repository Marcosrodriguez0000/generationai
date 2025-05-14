
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Responsive image sizing based on screen size
export function getResponsiveImageSize(isMobile: boolean) {
  return {
    width: isMobile ? 300 : 512,
    height: isMobile ? 300 : 512
  }
}

// Handle text truncation for small screens
export function truncateText(text: string, maxLength: number) {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}
