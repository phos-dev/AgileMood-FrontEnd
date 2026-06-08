"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, ArrowLeft, Zap } from "lucide-react";
import WizardProgress from "../wizard-progress";

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

const stepVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export default function JiraWizard({ onComplete, onBack }: Props) {
  const [step, setStep] = useState(0);

  const steps = [
    // Step 0: Install app
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
          Instale o app no Jira
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-gray-600 text-center">
          O app AgileMood para Jira já foi criado pelo time de desenvolvimento. Você só precisa instalá-lo no seu site Jira.
        </p>

        <div className="flex flex-col gap-3">
          {[
            <>Acesse as <strong>Configurações do Jira</strong> (ícone de engrenagem no topo direito).</>,
            <>Clique em <strong>Apps</strong> → <strong>Explorar mais apps</strong>.</>,
            <>Pesquise <strong>"AgileMood"</strong> ou use o link de instalação fornecido pelo time de desenvolvimento.</>,
            <>Clique em <strong>Instalar</strong> e confirme.</>,
          ].map((instruction, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-600 leading-relaxed">{instruction}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <Info className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-blue-700">
            Você precisa ter acesso de administrador ao site Jira para instalar novos apps.
          </p>
        </div>

        <div className="flex justify-between mt-2">
          <Button variant="outline" onClick={onBack} className="gap-1">
            <ArrowLeft size={16} />
            Trocar plataforma
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setStep(1)}>
            App instalado, próximo
          </Button>
        </div>
      </CardContent>
    </motion.div>,

    // Step 1: Login + configure
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
          Faça login e configure
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-gray-600 text-center">
          Com o app instalado, faça login com suas credenciais do AgileMood para associar sua equipe.
        </p>

        <div className="flex flex-col gap-3">
          {[
            <>No Jira, abra o board do seu projeto.</>,
            <>No cabeçalho → clique em <strong>AgileMood</strong> → aba <strong>Configurações</strong>.</>,
            <>Insira seu <strong>e-mail</strong> e <strong>senha</strong> do AgileMood.</>,
            <>Clique em <strong>Entrar</strong>. O app associa automaticamente sua equipe ao board — sem tokens ou IDs manuais. Um indicador verde confirma a conexão.</>,
          ].map((instruction, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-600 leading-relaxed">{instruction}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <Info className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-amber-700">
            A sessão expira após 4 horas. Se aparecer erro de "Sessão expirada", acesse as Configurações do app no Jira, clique em <strong>Desconectar</strong> e faça login novamente.
          </p>
        </div>

        <div className="flex justify-between mt-2">
          <Button variant="outline" onClick={() => setStep(0)}>
            Voltar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setStep(2)}>
            Feito, próximo
          </Button>
        </div>
      </CardContent>
    </motion.div>,

    // Step 2: Panels + sprint-end flow
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
          Painéis disponíveis no Jira
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-gray-600 text-center">
          Com a integração ativa, os seguintes painéis ficam disponíveis diretamente no Jira.
        </p>

        <div className="flex flex-col gap-3">
          {[
            {
              label: "Registrar Sentimento",
              desc: <>Abra qualquer issue → barra lateral direita → <strong>Registrar Sentimento</strong>. Selecione a emoção, ajuste a intensidade (1–5) e adicione notas opcionais. Enviado de forma 100% anônima.</>,
            },
            {
              label: "Mensagens Recebidas",
              desc: <>Abra qualquer issue → <strong>Mensagens Recebidas</strong>. Lista somente leitura dos feedbacks recebidos pela equipe.</>,
            },
            {
              label: "Dashboard de Humor",
              desc: <>No board → clique em <strong>Dashboard AgileMood</strong> no cabeçalho. Selecione o período e visualize distribuição de emoções, intensidade média e nível de alerta.</>,
            },
            {
              label: "Segurança Psicológica",
              desc: <>Dashboard → aba <strong>Segurança Psicológica</strong>. Membros respondem um questionário de 7 itens disponível por 48h após o encerramento de cada sprint. Gestor vê o relatório histórico por sprint.</>,
            },
          ].map(({ label, desc }, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-700">{label}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
          <Zap className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-sm font-semibold text-green-700 mb-1">Fluxo automático de fim de sprint</p>
            <p className="text-sm text-green-700">
              Ao clicar em <strong>"Concluir sprint"</strong> no Jira, o AgileMood detecta o evento automaticamente, gera um link de questionário válido por 48h e envia uma mensagem direta via <strong>Slack</strong> e <strong>Microsoft Teams</strong> para cada membro. O formulário também fica acessível direto no painel Segurança Psicológica durante esse período.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <Info className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-blue-700">
            Os lembretes via Slack e Teams só são enviados se essas integrações já estiverem configuradas na sua equipe. O questionário continua acessível pelo painel Segurança Psicológica no Jira independentemente.
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
