
import React from 'react';
import Header from "@/components/Header";
import CosmosBackground from "@/components/CosmosBackground";
import PixarTransformer from "@/components/PixarTransformer";
import Footer from '@/components/Footer';

const PixarPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#050510]">
      <CosmosBackground />
      <Header />
      
      <main className="flex-1 container mx-auto px-5 py-10">
        <PixarTransformer />
      </main>
      
      <Footer />
    </div>
  );
};

export default PixarPage;
