"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
  const { forgotPassword, loading, error, successMessage } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Redefinir senha</h1>
          <p className="text-sm text-gray-500 mt-1">
            Informe seu email e enviaremos um link para redefinir sua senha.
          </p>
        </div>

        {successMessage ? (
          <p className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-md p-3">
            {successMessage}
          </p>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800"
            >
              {loading ? "Enviando..." : "Enviar link"}
            </Button>
          </form>
        )}

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="text-sm text-blue-700 hover:underline w-full text-center block"
        >
          Voltar ao login
        </button>
      </div>
    </div>
  );
}
