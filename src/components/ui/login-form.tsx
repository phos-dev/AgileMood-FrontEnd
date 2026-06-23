"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";

const ERROR_TRANSLATIONS: Record<string, string> = {
  "Incorrect username or password": "Email ou senha incorretos. Tente novamente.",
  "Could not validate credentials": "Sessão inválida. Faça login novamente.",
};

export default function LoginForm({ switchToRegister }: { switchToRegister: () => void }) {
  const { login, loading, error } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const displayError = error
    ? (ERROR_TRANSLATIONS[error] ?? error)
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md"
        required
      />

      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md"
        required
      />

      <div className="text-right">
        <button
          type="button"
          onClick={() => router.push("/forgot-password")}
          className="text-sm text-blue-700 hover:underline"
        >
          Esqueceu a senha?
        </button>
      </div>

      {displayError && (
        <p className="text-red-500 text-sm">{displayError}</p>
      )}

      <Button type="submit" disabled={loading} className="w-full bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800">
        {loading ? "Entrando..." : "Entrar"}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full border border-blue-700 text-blue-700 hover:bg-blue-100"
        onClick={switchToRegister}
      >
        Inscrever-se
      </Button>
    </form>
  );
}
