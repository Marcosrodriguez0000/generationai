
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import CosmosBackground from "@/components/CosmosBackground";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast("Error", { 
        description: "Por favor completa todos los campos."
      });
      return;
    }

    if (password !== confirmPassword) {
      toast("Error", { 
        description: "Las contraseñas no coinciden."
      });
      return;
    }

    if (password.length < 6) {
      toast("Error", { 
        description: "La contraseña debe tener al menos 6 caracteres."
      });
      return;
    }

    try {
      await signUp(email, password);
      
      if (!error) {
        toast("¡Registro exitoso!", { 
          description: "Te hemos enviado un correo de confirmación. Por favor verifica tu bandeja de entrada."
        });
        navigate("/login");
      }
    } catch (err) {
      console.error("Error during sign up:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050510]">
      <CosmosBackground />
      
      <main className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-white/10 bg-black/50 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-white">
              Crear Cuenta
            </CardTitle>
            <CardDescription className="text-white">
              Regístrate para guardar tus creaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white">
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="tu@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-white">
                  Contraseña
                </label>
                <Input
                  id="password"
                  placeholder="Al menos 6 caracteres"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium text-white">
                  Confirmar Contraseña
                </label>
                <Input
                  id="confirm-password"
                  placeholder="Confirma tu contraseña"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-black/40 border-white/20 text-white placeholder:text-white/40"
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
                className="w-full bg-[#9333EA] hover:bg-[#7E22CE] text-white"
                disabled={loading}
              >
                {loading ? (
                  "Creando cuenta..."
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Crear Cuenta
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-white">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-white hover:underline">
                Iniciar sesión
              </Link>
            </div>
            <div className="text-center">
              <Link to="/" className="text-sm text-white hover:underline">
                Volver al inicio
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Registro;
