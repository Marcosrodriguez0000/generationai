
import React from 'react';

const CosmosBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-zinc-900 dark:to-black"></div>
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-cosmos-purple/10 to-transparent dark:from-cosmos-purple/5"></div>
      <div className="absolute bottom-0 w-full h-[500px] bg-gradient-to-t from-cosmos-pink/10 to-transparent dark:from-cosmos-pink/5"></div>
      <div className="absolute top-10 left-1/4 w-32 h-32 rounded-full bg-cosmos-purple/10 blur-3xl"></div>
      <div className="absolute bottom-10 right-1/4 w-40 h-40 rounded-full bg-cosmos-pink/10 blur-3xl"></div>
    </div>
  );
};

export default CosmosBackground;
