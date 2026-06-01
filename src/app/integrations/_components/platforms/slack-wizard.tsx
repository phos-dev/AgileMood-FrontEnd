"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Info, ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import WizardProgress from "../wizard-progress";
import { useAuthContext } from "@/contexts/auth-context";
import { INTEGRATION_ROUTES } from "@/lib/config";

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

const stepVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export default function SlackWizard({ onComplete, onBack }: Props) {
  const [step, setStep] = useState(0);
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();

  const handleSaveToken = async () => {
    if (!token.trim()) {
      setError("Cole o Bot User OAuth Token antes de continuar.");
      return;
    }
    if (!token.startsWith("xoxb-")) {
      setError("O token deve começar com xoxb-. Verifique se copiou o Bot User OAuth Token corretamente.");
      return;
    }
    if (!user?.team_id) {
      setError("Não foi possível identificar seu time. Tente recarregar a página.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const jwt = localStorage.getItem("token");
      const response = await fetch(INTEGRATION_ROUTES.slackToken(user.team_id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ slack_bot_token: token.trim() }),
      });

      if (!response.ok) {
        throw new Error("Não foi possível salvar o token. Verifique se ele é válido e tente novamente.");
      }

      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro ao salvar o token.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    // Step 0: Create Slack app
    <motion.div
      key="step-0"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.25 }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          Crie seu bot no Slack
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-gray-600 text-center">
          Vamos criar um bot no Slack para enviar mensagens ao seu time. O processo leva menos de 5 minutos.
        </p>

        <div className="flex flex-col gap-3">
          {[
            <>Acesse <a href="https://api.slack.com/apps" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1">api.slack.com/apps <ExternalLink size={12} /></a> → clique em <strong>Create New App</strong> → <strong>From an app manifest</strong></>,
            <>Cole o conteúdo do arquivo <code className="bg-gray-100 px-1 rounded text-sm">slack-app-manifest.yml</code> fornecido pelo time de desenvolvimento. Isso configura as permissões automaticamente.</>,
            <>Selecione seu workspace → clique em <strong>Create</strong>.</>,
            <>No menu lateral, clique em <strong>Install App</strong> → <strong>Install to Workspace</strong> → <strong>Allow</strong>.</>,
            <>Copie o <strong>Bot User OAuth Token</strong>, que começa com <code className="bg-gray-100 px-1 rounded text-sm">xoxb-</code>.</>,
          ].map((instruction, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-100 text-pink-700 text-sm font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-600 leading-relaxed">{instruction}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <Info className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-blue-700">
            Sem o arquivo de manifest? Crie o app manualmente: em <strong>OAuth & Permissions → Scopes</strong>, adicione <code className="bg-blue-100 px-1 rounded">chat:write</code> e <code className="bg-blue-100 px-1 rounded">users:read.email</code>.
          </p>
        </div>

        <div className="flex justify-between mt-2">
          <Button variant="outline" onClick={onBack} className="gap-1">
            <ArrowLeft size={16} />
            Trocar plataforma
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setStep(1)}>
            Já tenho o token, próximo
          </Button>
        </div>
      </CardContent>
    </motion.div>,

    // Step 1: Paste token
    <motion.div
      key="step-1"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.25 }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          Cole o token do bot aqui
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-gray-600 text-center">
          Agora vamos registrar o token no AgileMood para que as mensagens possam ser enviadas ao seu time.
        </p>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Bot User OAuth Token
          </label>
          <div className="relative">
            <Input
              type={showToken ? "text" : "password"}
              placeholder="xoxb-..."
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
                setError(null);
              }}
              className="pr-10 font-mono"
            />
            <button
              type="button"
              onClick={() => setShowToken((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showToken ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-xs text-gray-400">O token deve começar com xoxb-</p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex gap-3">
          <Info className="text-gray-400 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-gray-500">
            Este token é armazenado com segurança e usado apenas para enviar DMs ao seu time. Cada time tem seu próprio token, com suporte a workspaces diferentes.
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-3"
          >
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        <div className="flex justify-between mt-2">
          <Button variant="outline" onClick={() => setStep(0)}>
            Voltar
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSaveToken}
            disabled={isSubmitting || !token.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar e concluir"
            )}
          </Button>
        </div>
      </CardContent>
    </motion.div>,
  ];

  return (
    <Card className="shadow-lg">
      <WizardProgress currentStep={step} totalSteps={2} />
      <AnimatePresence mode="wait">
        {steps[step]}
      </AnimatePresence>
    </Card>
  );
}
