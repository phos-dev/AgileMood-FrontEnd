"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";

function ResetPasswordForm() {
  const { resetPassword, loading, error } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setValidationError("As senhas não coincidem.");
      return;
    }
    setValidationError(null);
    await resetPassword(token, newPassword);
  };

  if (!token) {
    return (
      <p className="text-red-500 text-sm">
        Link inválido.{" "}
        <button onClick={() => router.push("/forgot-password")} className="underline">
          Solicitar novo link
        </button>
      </p>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        type="password"
        placeholder="Nova senha"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md"
        required
      />
      <Input
        type="password"
        placeholder="Confirmar nova senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md"
        required
      />

      {(validationError || error) && (
        <div className="space-y-1">
          {validationError && <p className="text-red-500 text-sm">{validationError}</p>}
          {error && (
            <p className="text-red-500 text-sm">
              {error}{" "}
              <button
                type="button"
                onClick={() => router.push("/forgot-password")}
                className="underline"
              >
                Solicitar novo link
              </button>
            </p>
          )}
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800"
      >
        {loading ? "Salvando..." : "Redefinir senha"}
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nova senha</h1>
          <p className="text-sm text-gray-500 mt-1">Escolha uma nova senha para sua conta.</p>
        </div>

        <Suspense fallback={<p className="text-sm text-gray-400">Carregando...</p>}>
          <ResetPasswordForm />
        </Suspense>

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
