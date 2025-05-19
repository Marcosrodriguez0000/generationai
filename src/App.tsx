
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./lib/auth";
import LandingPage from "./pages/Landing";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Creaciones from "./pages/Creaciones";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import TextGeneratorPage from "./pages/TextGeneratorPage";

const queryClient = new QueryClient();

const App = () => {
  const [generatedImages, setGeneratedImages] = useState([]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home generatedImages={generatedImages} setGeneratedImages={setGeneratedImages} />} />
              <Route path="/creaciones" element={<Creaciones images={generatedImages} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/texto" element={<TextGeneratorPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
