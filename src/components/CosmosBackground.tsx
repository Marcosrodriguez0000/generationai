
import React from 'react';

const CosmosBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Fondo principal con degradado oscuro */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050510] via-[#0f0f19] to-[#1a1a2e]"></div>
      
      {/* Efecto de degradado de color superior */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-neon-purple/30 to-transparent"></div>
      
      {/* Efecto de degradado de color lateral */}
      <div className="absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l from-neon-pink/10 to-transparent"></div>
      
      {/* Destellos y estrellas */}
      <div className="stars-small" style={{['--x' as any]: '0.3', ['--y' as any]: '0.7'}}></div>
      <div className="stars-medium" style={{['--x' as any]: '0.5', ['--y' as any]: '0.3'}}></div>
      <div className="stars-large" style={{['--x' as any]: '0.8', ['--y' as any]: '0.9'}}></div>
      
      {/* Brillo tenue en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-neon-blue/5 to-transparent"></div>
      
      {/* Línea horizontal sutil */}
      <div className="absolute top-[70px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Cuadrícula sutil */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwLjMiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
    </div>
  );
};

export default CosmosBackground;
