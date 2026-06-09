"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RegisterForm({ switchToLogin }: { switchToLogin: () => void }) {
  const { register, loading, error } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Colaborador" | "Gerente">("Colaborador");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [lastSubmittedEmail, setLastSubmittedEmail] = useState<string | null>(null);

  const isFormValid =
    name.trim().length >= 2 &&
    isValidEmail(email) &&
    password.length >= 6;

  const emailBackendError =
    error === "Email already exists" && email === lastSubmittedEmail
      ? "Este e-mail já está cadastrado."
      : null;

  const generalError =
    error && error !== "Email already exists" ? error : null;

  const validate = (fields = { name, email, password }): FieldErrors => {
    const errors: FieldErrors = {};
    if (!fields.name.trim() || fields.name.trim().length < 2)
      errors.name = "Nome deve ter pelo menos 2 caracteres.";
    if (!fields.email.trim() || !isValidEmail(fields.email))
      errors.email = "Insira um e-mail válido.";
    if (!fields.password || fields.password.length < 6)
      errors.password = "Senha deve ter pelo menos 6 caracteres.";
    return errors;
  };

  const handleBlur = (field: keyof FieldErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errors = validate();
    setFieldErrors(errors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, password: true };
    setTouched(allTouched);
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setLastSubmittedEmail(email);
    await register(name, email, password, role);
  };

  const inputClass = (field: keyof FieldErrors) =>
    `w-full border p-2 rounded-md ${
      touched[field] && fieldErrors[field]
        ? "border-red-400 focus-visible:ring-red-400"
        : "border-gray-300"
    }`;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Nome */}
      <div className="space-y-1">
        <Input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (touched.name) setFieldErrors((p) => ({ ...p, name: undefined }));
          }}
          onBlur={() => handleBlur("name")}
          className={inputClass("name")}
        />
        {touched.name && fieldErrors.name && (
          <p className="text-red-500 text-xs pl-1">{fieldErrors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (touched.email) setFieldErrors((p) => ({ ...p, email: undefined }));
          }}
          onBlur={() => handleBlur("email")}
          className={`w-full border p-2 rounded-md ${
            (touched.email && fieldErrors.email) || emailBackendError
              ? "border-red-400 focus-visible:ring-red-400"
              : "border-gray-300"
          }`}
        />
        {touched.email && fieldErrors.email && (
          <p className="text-red-500 text-xs pl-1">{fieldErrors.email}</p>
        )}
        {!fieldErrors.email && emailBackendError && (
          <p className="text-red-500 text-xs pl-1">{emailBackendError}</p>
        )}
      </div>

      {/* Senha */}
      <div className="space-y-1">
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (touched.password) setFieldErrors((p) => ({ ...p, password: undefined }));
          }}
          onBlur={() => handleBlur("password")}
          className={inputClass("password")}
        />
        {touched.password && fieldErrors.password && (
          <p className="text-red-500 text-xs pl-1">{fieldErrors.password}</p>
        )}
      </div>

      {/* Cargo - segmented control */}
      <div className="flex rounded-lg border border-gray-300 overflow-hidden">
        <button
          type="button"
          onClick={() => setRole("Colaborador")}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            role === "Colaborador"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Colaborador
        </button>
        <button
          type="button"
          onClick={() => setRole("Gerente")}
          className={`flex-1 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
            role === "Gerente"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Gerente
        </button>
      </div>

      {generalError && (
        <p className="text-red-500 text-sm">{generalError}</p>
      )}

      <Button
        type="submit"
        disabled={loading || !isFormValid}
        className="w-full bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800"
      >
        {loading ? "Registrando..." : "Concluir Cadastro"}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full border border-blue-700 text-blue-700 hover:bg-blue-100"
        onClick={switchToLogin}
      >
        Voltar para Login
      </Button>
    </form>
  );
}
