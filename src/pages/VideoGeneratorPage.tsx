
import React from 'react';
import Header from "@/components/Header";
import CosmosBackground from "@/components/CosmosBackground";
import VideoGenerator from "@/components/VideoGenerator";
import Footer from '@/components/Footer';

const VideoGeneratorPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#050510]">
      <CosmosBackground />
      <Header />
      
      <main className="flex-1 container mx-auto px-5 py-10">
        <VideoGenerator />
      </main>
      
      <Footer />
    </div>
  );
};

export default VideoGeneratorPage;
