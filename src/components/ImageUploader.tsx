
import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Upload, Image } from 'lucide-react';
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageSelected: (imageUrl: string) => void;
  className?: string;
}

const ImageUploader = ({ onImageSelected, className = "" }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast.error("Error", { description: "Por favor selecciona un archivo de imagen válido." });
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        onImageSelected(e.target.result);
      }
    };
    
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={`${className} w-full max-w-md mx-auto`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging 
            ? 'border-neon-blue bg-neon-blue/5' 
            : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        <Image className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
        
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Arrastra y suelta una imagen
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          o haz clic para seleccionar un archivo
        </p>
        
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept="image/*"
        />
        
        <Button 
          onClick={handleButtonClick}
          className="bg-gradient-to-r from-neon-pink to-neon-blue text-white hover:opacity-90"
        >
          <Upload className="mr-2 h-4 w-4" />
          Seleccionar imagen
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
