
import React from 'react';

const CosmosBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-black to-zinc-900"></div>
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-gold-400/10 to-transparent"></div>
      <div className="absolute bottom-0 w-full h-[500px] bg-gradient-to-t from-brown-600/10 to-transparent"></div>
      <div className="absolute top-10 left-1/4 w-32 h-32 rounded-full bg-gold-400/10 blur-3xl"></div>
      <div className="absolute bottom-10 right-1/4 w-40 h-40 rounded-full bg-brown-600/10 blur-3xl"></div>
      
      {/* Stars */}
      <div className="stars-small"></div>
      <div className="stars-medium"></div>
      <div className="stars-large"></div>
      
      {/* Animated glowing lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="glow-line glow-line-1"></div>
        <div className="glow-line glow-line-2"></div>
        <div className="glow-line glow-line-3"></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Q0YTY1NyIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
    </div>
  );
};

export default CosmosBackground;
