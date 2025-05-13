
import React from 'react';

const CosmosBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-900"></div>
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-gold-400/10 to-transparent dark:from-gold-400/5"></div>
      <div className="absolute bottom-0 w-full h-[500px] bg-gradient-to-t from-brown-600/10 to-transparent dark:from-brown-600/5"></div>
      <div className="absolute top-10 left-1/4 w-32 h-32 rounded-full bg-gold-400/10 blur-3xl"></div>
      <div className="absolute bottom-10 right-1/4 w-40 h-40 rounded-full bg-brown-600/10 blur-3xl"></div>
    </div>
  );
};

export default CosmosBackground;
