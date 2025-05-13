
import React from 'react';

const CosmosBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 radial-gradient-bg"></div>
      <div className="absolute top-10 left-1/4 w-32 h-32 rounded-full bg-cosmos-purple/20 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-1/4 w-40 h-40 rounded-full bg-cosmos-pink/20 blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-cosmos-blue/20 blur-3xl animate-pulse-slow"></div>
    </div>
  );
};

export default CosmosBackground;
