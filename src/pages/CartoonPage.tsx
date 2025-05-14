
import React from 'react';
import Header from "@/components/Header";
import CosmosBackground from "@/components/CosmosBackground";
import CartoonTransformer from "@/components/CartoonTransformer";
import Footer from '@/components/Footer';

const CartoonPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#050510]">
      <CosmosBackground />
      <Header />
      
      <main className="flex-1 container mx-auto px-5 py-10">
        <CartoonTransformer />
      </main>
      
      <Footer />
    </div>
  );
};

export default CartoonPage;
