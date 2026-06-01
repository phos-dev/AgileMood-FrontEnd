"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Info, ArrowLeft } from "lucide-react";
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

export default function TeamsWizard({ onComplete, onBack }: Props) {
  const [step, setStep] = useState(0);
  const { user } = useAuthContext();

  const teamsConnectUrl = user?.team_id
    ? INTEGRATION_ROUTES.teamsConnect(user.team_id)
    : "#";

  const handleConnect = () => {
    if (teamsConnectUrl !== "#") {
      window.open(teamsConnectUrl, "_blank");
    }
  };

  const steps = [
    // Step 0: OAuth consent
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
          Conecte sua organização Microsoft
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-gray-600 text-center">
          Para enviar mensagens no Teams, o AgileMood precisa da autorização da sua organização no Azure.
          Esse processo é feito apenas uma vez e todos os times da empresa ficam cobertos.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <Info className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-blue-700">
            Você será redirecionado para a página de consentimento da Microsoft. Um administrador do Azure Active Directory da sua organização precisará aprovar as permissões solicitadas.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 py-2">
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 gap-2"
            onClick={handleConnect}
            disabled={!user?.team_id}
          >
            <ExternalLink size={16} />
            Conectar com Microsoft
          </Button>
          <p className="text-sm text-gray-500">
            Após autorizar na Microsoft, volte aqui e clique em <strong>Já autorizei</strong>.
          </p>
        </div>

        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onBack} className="gap-1">
            <ArrowLeft size={16} />
            Trocar plataforma
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setStep(1)}>
            Já autorizei, continuar
          </Button>
        </div>
      </CardContent>
    </motion.div>,

    // Step 1: Confirmation
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
          Tudo pronto! Veja o que acontece agora
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-gray-600 text-center">
          O AgileMood já está pronto para enviar mensagens no Teams. O bot identifica os membros pelo e-mail cadastrado e se instala automaticamente na primeira execução.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <Calendar className="text-indigo-500 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-medium text-gray-700">Relatório semanal de humor</p>
              <p className="text-sm text-gray-500">Toda segunda-feira às 09:00 UTC. DM privada ao gestor com resumo do time.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="text-indigo-500 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-medium text-gray-700">Lembrete de check-in</p>
              <p className="text-sm text-gray-500">Toda sexta-feira às 16:00 UTC. DM a cada membro solicitando o registro de humor.</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <Info className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-amber-700">
            Se algum membro não for encontrado automaticamente (e-mail diferente no Azure AD), você receberá uma DM listando quem precisa de configuração manual.
          </p>
        </div>

        <div className="flex justify-between mt-2">
          <Button variant="outline" onClick={() => setStep(0)}>
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
      <WizardProgress currentStep={step} totalSteps={2} />
      <AnimatePresence mode="wait">
        {steps[step]}
      </AnimatePresence>
    </Card>
  );
}
