
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import CosmosBackground from "@/components/CosmosBackground";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Sparkles, LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast("Error", { 
        description: "Por favor completa todos los campos."
      });
      return;
    }

    try {
      await signIn(email, password);
      
      if (!error) {
        toast("¡Bienvenido de vuelta!", { 
          description: "Has iniciado sesión correctamente."
        });
        navigate("/");
      }
    } catch (err) {
      console.error("Error during sign in:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <CosmosBackground />
      
      <main className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-gold-200/20 bg-black/50 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Sparkles className="h-8 w-8 text-gold-400" />
            </div>
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-brown-600">
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-gold-100/80">
              Ingresa tus datos para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gold-300">
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="tu@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/40 border-gold-500/30 text-gold-100 placeholder:text-gold-500/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gold-300">
                  Contraseña
                </label>
                <Input
                  id="password"
                  placeholder="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/40 border-gold-500/30 text-gold-100 placeholder:text-gold-500/50"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-gold-400 to-brown-600 text-white hover:opacity-90"
                disabled={loading}
              >
                {loading ? (
                  "Iniciando sesión..."
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Iniciar Sesión
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gold-300">
              ¿No tienes una cuenta?{" "}
              <Link to="/registro" className="text-gold-400 hover:underline">
                Regístrate
              </Link>
            </div>
            <div className="text-center">
              <Link to="/" className="text-sm text-gold-400 hover:underline">
                Volver al inicio
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Login;
