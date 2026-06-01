"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, ArrowLeft, Loader2, AlertTriangle } from "lucide-react";
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

export default function PlannerWizard({ onComplete, onBack }: Props) {
  const [step, setStep] = useState(0);
  const [planId, setPlanId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();

  const handleSubscribe = async () => {
    if (!planId.trim()) {
      setError("Cole a URL ou o ID do plano antes de continuar.");
      return;
    }
    if (!user?.team_id) {
      setError("Não foi possível identificar seu time.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const jwt = localStorage.getItem("token");
      const response = await fetch(INTEGRATION_ROUTES.plannerSubscribe(user.team_id), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ plan_id: planId.trim() }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        if (response.status === 400) {
          throw new Error("A integração com Microsoft Teams não está configurada para este time. Configure o Teams primeiro.");
        }
        throw new Error(data?.detail || "Não foi possível registrar a assinatura. Verifique o ID do plano e tente novamente.");
      }

      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro ao registrar a assinatura.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    // Step 0: Prerequisites + install tab
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
          Instale a aba AgileMood no canal
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-sm font-semibold text-amber-700 mb-1">Pré-requisito: Microsoft Teams</p>
            <p className="text-sm text-amber-700">
              A integração com Microsoft Teams precisa estar ativa antes de configurar o Planner. Se ainda não configurou, volte e configure o Teams primeiro.
            </p>
          </div>
        </div>

        <p className="text-gray-600 text-center">
          Adicione a aba AgileMood ao canal do Teams onde o seu Planner está em uso.
        </p>

        <div className="flex flex-col gap-3">
          {[
            <>No canal do Teams onde o Planner está em uso, clique no <strong>+</strong> na barra de abas no topo.</>,
            <>Pesquise <strong>"AgileMood"</strong> na lista de aplicativos.</>,
            <>Na tela de configuração, insira o <strong>ID do time AgileMood</strong>: <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">{user?.team_id ?? "..."}</code></>,
            <>Clique em <strong>Salvar</strong>.</>,
          ].map((instruction, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-100 text-sky-700 text-sm font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-600 leading-relaxed">{instruction}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <Info className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-blue-700">
            A aba aparecerá com as opções <strong>Registrar</strong>, <strong>Mensagens</strong> e (para o gestor) <strong>Dashboard</strong>. Todos os registros feitos pela aba são anônimos.
          </p>
        </div>

        <div className="flex justify-between mt-2">
          <Button variant="outline" onClick={onBack} className="gap-1">
            <ArrowLeft size={16} />
            Trocar plataforma
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setStep(1)}>
            Aba instalada, próximo
          </Button>
        </div>
      </CardContent>
    </motion.div>,

    // Step 1: Connect Planner plan
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
          Conecte seu plano do Planner
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-gray-600 text-center">
          Para ativar os lembretes automáticos de fim de sprint, precisamos conectar o seu plano do Microsoft Planner.
        </p>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-gray-700">Como obter a URL do plano:</p>
          {[
            <>Abra o <strong>Planner</strong> no Teams.</>,
            <>Selecione o plano que seu time usa para gerenciar as sprints.</>,
            <>Copie a URL completa da barra de endereços do navegador. Ela será parecida com: <code className="bg-gray-100 px-1 rounded text-xs break-all">{"https://tasks.office.com/...?planId=aBcDeFgH1234"}</code></>,
          ].map((instruction, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-100 text-sky-700 text-sm font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-600 leading-relaxed">{instruction}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            URL ou ID do plano
          </label>
          <Input
            placeholder="https://tasks.office.com/... ou apenas o planId"
            value={planId}
            onChange={(e) => { setPlanId(e.target.value); setError(null); }}
          />
          <p className="text-xs text-gray-400">Você pode colar a URL completa ou apenas o ID do plano (ex: aBcDeFgH1234).</p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex gap-3">
          <Info className="text-gray-400 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-gray-500">
            A assinatura é renovada automaticamente pelo AgileMood a cada 48 horas. Você não precisa se preocupar com expiração.
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
            onClick={handleSubscribe}
            disabled={isSubmitting || !planId.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registrando...
              </>
            ) : (
              "Registrar assinatura"
            )}
          </Button>
        </div>
      </CardContent>
    </motion.div>,

    // Step 2: Sentinel task
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
          Configure os lembretes de sprint
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-gray-600 text-center">
          Para que o AgileMood envie lembretes ao final de cada sprint, crie uma <strong>tarefa sentinela</strong> no Planner.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
          <p className="text-sm font-semibold text-gray-700">Como funciona:</p>
          <p className="text-sm text-gray-600">
            Crie uma tarefa no plano inscrito com um nome que contenha a palavra <strong>"sprint"</strong> e uma das palavras de encerramento. Quando essa tarefa for marcada como <strong>100% concluída</strong>, o AgileMood envia automaticamente um lembrete de check-in via DM para todos os membros do time.
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {["Sprint 3 - Fim", "Sprint 10 - Encerrado", "Sprint 1 - End", "Sprint 2 terminou"].map((example) => (
              <span key={example} className="bg-sky-100 text-sky-700 text-xs font-medium px-2.5 py-1 rounded-full">
                {example}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <Info className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-blue-700">
            Tarefas regulares não disparam o lembrete. Apenas tarefas com "sprint" + "fim/end/terminou/encerrado" no nome ativam o envio. Crie uma nova tarefa sentinela no início de cada sprint.
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
