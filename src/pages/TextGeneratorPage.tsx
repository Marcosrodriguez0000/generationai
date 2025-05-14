
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CosmosBackground from "@/components/CosmosBackground";
import TextGenerator from '@/components/TextGenerator';

const TextGeneratorPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#050510]">
      <CosmosBackground />
      <Header />
      
      <main className="flex-1 container mx-auto px-5 py-10">
        <TextGenerator />
      </main>

      <Footer />
    </div>
  );
};

export default TextGeneratorPage;
