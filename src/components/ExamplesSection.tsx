
import React from 'react';
import ImageGallery from './ImageGallery';
import { ImageItem } from '@/types/image';

interface ExamplesSectionProps {
  exampleImages: ImageItem[];
}

const ExamplesSection = ({ exampleImages }: ExamplesSectionProps) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-center text-gold-300 mb-4">
        El Poder de la IA en Tus Manos
      </h2>
      <p className="text-gold-100/80 mb-8 max-w-3xl mx-auto text-center">
        Nuestra tecnología de inteligencia artificial puede generar imágenes impresionantes a partir de tus descripciones. Inspírate con estos ejemplos creados por nuestra IA.
      </p>
      
      <ImageGallery images={exampleImages} columns={4} />
    </div>
  );
};

export default ExamplesSection;
