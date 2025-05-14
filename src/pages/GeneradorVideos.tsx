
import React, { useState } from 'react';
import { toast } from "sonner";
import Header from "@/components/Header";
import CosmosBackground from "@/components/CosmosBackground";
import { useAuth } from '@/lib/auth';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabGeneradorImagenes from '@/components/tabs/TabGeneradorImagenes';

const GeneradorVideos = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-[#050510]">
      <CosmosBackground />
      <Header />
      
      <main className="flex-1 container mx-auto px-5 py-10">
        <div className="max-w-4xl mx-auto mb-12 mt-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-blue mb-6">
              Generation.AI Studio
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Crea contenido con inteligencia artificial - ¡Sin API key!
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl backdrop-blur-lg bg-black/20 border border-white/5">
            <Tabs defaultValue="imagenes" className="w-full">
              <TabsList className="w-full flex justify-center mb-6 bg-black/40">
                <TabsTrigger value="imagenes" className="flex-1 data-[state=active]:bg-gradient-to-r from-neon-pink/20 to-neon-blue/20">
                  Imágenes
                </TabsTrigger>
                <TabsTrigger value="pixelart" className="flex-1">
                  Pixel Art
                </TabsTrigger>
                <TabsTrigger value="avatares" className="flex-1">
                  Avatares
                </TabsTrigger>
                <TabsTrigger value="logos" className="flex-1">
                  Logos
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="imagenes" className="mt-0">
                <TabGeneradorImagenes />
              </TabsContent>
              
              <TabsContent value="pixelart" className="mt-0">
                <div className="py-12 text-center">
                  <h3 className="text-xl text-white mb-4">Generador de Pixel Art</h3>
                  <p className="text-gray-300">
                    Esta funcionalidad estará disponible próximamente.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="avatares" className="mt-0">
                <div className="py-12 text-center">
                  <h3 className="text-xl text-white mb-4">Generador de Avatares</h3>
                  <p className="text-gray-300">
                    Esta funcionalidad estará disponible próximamente.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="logos" className="mt-0">
                <div className="py-12 text-center">
                  <h3 className="text-xl text-white mb-4">Generador de Logos</h3>
                  <p className="text-gray-300">
                    Esta funcionalidad estará disponible próximamente.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GeneradorVideos;
