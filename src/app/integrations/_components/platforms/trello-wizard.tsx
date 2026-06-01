"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Info, ArrowLeft, Loader2, Copy, Check } from "lucide-react";
import WizardProgress from "../wizard-progress";
import { useAuthContext } from "@/contexts/auth-context";
import { INTEGRATION_ROUTES, API_BASE_URL } from "@/lib/config";

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

const stepVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

function CopyableField({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
        <code className="text-sm text-gray-700 flex-1 truncate">{value}</code>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          title="Copiar"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
}

export default function TrelloWizard({ onComplete, onBack }: Props) {
  const [step, setStep] = useState(0);
  const [trelloToken, setTrelloToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();

  const jwt = typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : "";
  const teamId = user?.team_id?.toString() ?? "(não disponível)";

  const handleSaveToken = async () => {
    if (!trelloToken.trim()) {
      setError("Cole o token do Trello antes de continuar.");
      return;
    }
    if (!user?.team_id) {
      setError("Não foi possível identificar seu time.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const response = await fetch(INTEGRATION_ROUTES.trelloConnect(user.team_id), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ trello_token: trelloToken.trim() }),
      });

      if (!response.ok) {
        throw new Error("Não foi possível salvar o token do Trello. Verifique se ele é válido.");
      }

      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro ao salvar o token.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    // Step 0: Install Power-Up + generate token
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
          Instale o Power-Up no seu board
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-gray-600 text-center">
          O Power-Up AgileMood já foi criado pelo time de desenvolvimento. Você só precisa instalá-lo no seu board e gerar um token pessoal.
        </p>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-gray-700">Instalar o Power-Up:</p>
          {[
            <>Abra o seu board no Trello → clique em <strong>Power-Ups</strong> na barra superior.</>,
            <>Pesquise <strong>"AgileMood"</strong> ou use o link fornecido pelo time de desenvolvimento.</>,
            <>Clique em <strong>Adicionar</strong>.</>,
          ].map((instruction, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-600 leading-relaxed">{instruction}</p>
            </div>
          ))}
        </div>

        <hr className="border-gray-100" />

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-gray-700">Gerar seu token pessoal do Trello:</p>
          <p className="text-sm text-gray-600">
            O token autoriza o AgileMood a agir em seu nome no Trello. Acesse o link abaixo (substitua <code className="bg-gray-100 px-1 rounded">SUA_API_KEY</code> pela chave fornecida pelo time de dev):
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 font-mono text-xs text-gray-600 break-all">
            {"https://trello.com/1/authorize?expiration=never&name=AgileMood&scope=read,write&response_type=token&key=SUA_API_KEY"}
          </div>
          <p className="text-sm text-gray-600">
            Clique em <strong>Permitir</strong> e copie o token gerado (string longa). Guarde-o com segurança.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Cole seu token Trello aqui</label>
          <Input
            placeholder="Token gerado na autorização..."
            value={trelloToken}
            onChange={(e) => { setTrelloToken(e.target.value); setError(null); }}
            className="font-mono"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="flex justify-between mt-2">
          <Button variant="outline" onClick={onBack} className="gap-1">
            <ArrowLeft size={16} />
            Trocar plataforma
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setStep(1)}
            disabled={!trelloToken.trim()}
          >
            Próximo
          </Button>
        </div>
      </CardContent>
    </motion.div>,

    // Step 1: Configure Power-Up + save token
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
          Configure o Power-Up no board
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-gray-600 text-center">
          Agora vamos configurar o Power-Up no Trello com as informações do AgileMood e salvar sua conexão.
        </p>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-gray-700">No Trello, acesse:</p>
          <p className="text-sm text-gray-600">
            Board → <strong>Power-Ups</strong> → selecione <strong>AgileMood</strong> → clique em <strong>Configurações</strong>. Preencha os campos abaixo:
          </p>
        </div>

        <div className="flex flex-col gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <CopyableField label="URL da API AgileMood" value={API_BASE_URL} />
          <CopyableField label="ID da Equipe" value={teamId} />
          <CopyableField label="Token JWT" value={jwt || "Faça login para ver o token"} />
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <Info className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-amber-700">
            O token JWT expira após 4 horas. Se aparecer erro de "Configuração inválida" no Power-Up, faça login no AgileMood novamente e atualize o token nas Configurações do Power-Up.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="flex justify-between mt-2">
          <Button variant="outline" onClick={() => setStep(0)}>
            Voltar
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSaveToken}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar e continuar"
            )}
          </Button>
        </div>
      </CardContent>
    </motion.div>,

    // Step 2: Sprint-end sentinel (optional)
    <motion.div
      key="step-2"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.25 }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          Ative os lembretes de fim de sprint
        </CardTitle>
        <p className="text-center text-sm text-gray-400 mt-1">Opcional</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-gray-600 text-center">
          Para que o AgileMood envie lembretes de check-in automaticamente ao final de cada sprint, crie um <strong>card sentinela</strong> no seu board.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
          <p className="text-sm font-semibold text-gray-700">Como funciona:</p>
          <p className="text-sm text-gray-600">
            Crie um card com um nome que contenha a palavra <strong>"sprint"</strong> e uma das palavras de encerramento. Ao mover esse card para qualquer coluna, o AgileMood detecta o nome e envia lembretes via Slack para todos os membros.
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {["Sprint 3 - Fim", "Sprint 10 - Encerrado", "Sprint 1 - End", "Sprint 2 terminou"].map((example) => (
              <span key={example} className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                {example}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <Info className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-blue-700">
            Tarefas normais nunca disparam o lembrete. Apenas cards com "sprint" + "fim/end/terminou/encerrado" no nome. A integração com Slack precisa estar configurada para que os lembretes sejam enviados.
          </p>
        </div>

        <div className="flex justify-between mt-2">
          <Button variant="outline" onClick={() => setStep(1)}>
            Voltar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={onComplete}>
            Concluir
          </Button>
        </div>
      </CardContent>
    </motion.div>,
  ];

  return (
    <Card className="shadow-lg">
      <WizardProgress currentStep={step} totalSteps={3} />
      <AnimatePresence mode="wait">
        {steps[step]}
      </AnimatePresence>
    </Card>
  );
}
