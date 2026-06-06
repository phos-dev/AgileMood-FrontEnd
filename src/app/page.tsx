"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Clock,
  ClipboardList,
  ClipboardCheck,
  BarChart2,
  TrendingUp,
  Shield,
  Smile,
  MessageSquare,
  Github,
  ExternalLink,
  ChevronRight,
  Users,
  Star,
} from "lucide-react";
import nameLogo from "../public/nameLogo.png";

// ─── Reusable helpers ────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up" as "up" | "left" | "right",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) {
  const initial =
    direction === "left"
      ? { opacity: 0, x: -24 }
      : direction === "right"
      ? { opacity: 0, x: 24 }
      : { opacity: 0, y: 24 };

  const animate =
    direction === "left" || direction === "right"
      ? { opacity: 1, x: 0 }
      : { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Integration SVG icons (verbatim from platform-selection.tsx) ─────────────

function TeamsIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="32" height="32" rx="6" fill="#5B5EA6" />
      <path d="M20 10h-8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1z" fill="white" opacity="0.9" />
      <path d="M14 14h4M16 14v6" stroke="#5B5EA6" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="23" cy="11" r="3" fill="#7B83EB" />
    </svg>
  );
}

function SlackIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="32" height="32" rx="6" fill="#1D1C1D" />
      <path d="M12 8a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2v-2a2 2 0 0 0-2-2z" fill="#E01E5A" />
      <path d="M12 14H8a2 2 0 0 0-2 2 2 2 0 0 0 2 2h4v-4z" fill="#E01E5A" />
      <path d="M20 8a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2v-2a2 2 0 0 1 2-2z" fill="#36C5F0" />
      <path d="M20 14h4a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-4v-4z" fill="#36C5F0" />
      <path d="M24 20a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h2a2 2 0 0 1 2 2z" fill="#2EB67D" />
      <path d="M18 20v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-4h4z" fill="#2EB67D" />
      <path d="M8 20a2 2 0 0 0 2 2 2 2 0 0 0 2-2v-2h-2a2 2 0 0 0-2 2z" fill="#ECB22E" />
      <path d="M14 20v4a2 2 0 0 0 2 2 2 2 0 0 0 2-2v-4h-4z" fill="#ECB22E" />
    </svg>
  );
}

function TrelloIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="32" height="32" rx="6" fill="#0052CC" />
      <rect x="8" y="8" width="6" height="14" rx="1.5" fill="white" />
      <rect x="18" y="8" width="6" height="9" rx="1.5" fill="white" />
    </svg>
  );
}

function PlannerIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="32" height="32" rx="6" fill="#0078D4" />
      <rect x="7" y="10" width="18" height="13" rx="1.5" fill="white" opacity="0.15" />
      <rect x="7" y="10" width="18" height="3" rx="1" fill="white" opacity="0.9" />
      <path d="M11 17l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 21l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

function JiraIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="32" height="32" rx="6" fill="#0052CC" />
      <path d="M16 7L8 16l8 9 8-9-8-9z" fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 11l-4 5 4 4 4-4-4-5z" fill="white" opacity="0.9" />
    </svg>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Image src={nameLogo} alt="AgileMood" height={36} className="w-auto" />
        <Button asChild className="bg-[#1e3a5f] hover:bg-[#0f2240] text-white text-sm px-5">
          <Link href="/login">Acessar Plataforma</Link>
        </Button>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f2240 0%, #1e3a5f 50%, #1a4480 100%)" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 75% 75%, #818cf8 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24">
        {/* Academic badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-blue-200 text-sm mb-8"
        >
          <GraduationCap size={14} />
          <span>SBQS 2025 &nbsp;·&nbsp; Universidade Federal Rural de Pernambuco</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Segurança Psicológica,{" "}
          <span className="text-blue-300">Medida Continuamente</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Ferramenta de código aberto para medir e melhorar a segurança psicológica e a consciência
          emocional em equipes ágeis de desenvolvimento de software.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
        >
          <Button
            asChild
            className="bg-white text-[#1e3a5f] hover:bg-blue-50 font-semibold px-8 py-3 text-base shadow-lg"
          >
            <Link href="/login">
              Acessar Plataforma <ChevronRight size={16} className="ml-1" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/40 text-white hover:bg-white/10 px-8 py-3 text-base"
          >
            <a
              href="https://github.com/Arth19/AgileMood-FrontEnd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} className="mr-2" /> Ver no GitHub
            </a>
          </Button>
        </motion.div>

        {/* Stats pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {[
            { label: "SUS Score", value: "82.1" },
            { label: "Participantes", value: "41" },
            { label: "Equipes", value: "7" },
            { label: "Licença", value: "MIT" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.07 }}
              className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white text-sm"
            >
              <span className="font-bold text-blue-200">{stat.value}</span>
              <span className="ml-2 text-blue-100/80">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const memberSteps = [
    { n: 1, text: "Abra qualquer issue no Jira" },
    { n: 2, text: 'Clique em "Registrar Sentimento" na barra lateral direita' },
    { n: 3, text: "Selecione a emoção, a intensidade (1–5) e notas opcionais — 100% anônimo" },
  ];

  const managerSteps = [
    { n: 1, text: 'Instale o app AgileMood no Jira via Configurações → Apps → "Explorar mais apps"' },
    { n: 2, text: "Configure credenciais: board → AgileMood no cabeçalho → Configurações → e-mail + senha" },
    {
      n: 3,
      text: 'Acesse "Dashboard AgileMood" no cabeçalho do board para visualizar distribuição de emoções, intensidade média e nível de alerta',
    },
  ];

  return (
    <section className="bg-slate-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Como Funciona
          </p>
          <h2
            className="text-4xl font-extrabold text-[#1e3a5f]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Dois fluxos de uso, um objetivo
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Membros do time e gestores têm perspectivas diferentes — o AgileMood atende a ambos.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Membro */}
          <FadeIn delay={0.1} direction="left">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Smile className="text-blue-600" size={20} />
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Membro do Time
                </h3>
              </div>
              <div className="space-y-5">
                {memberSteps.map((s) => (
                  <div key={s.n} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {s.n}
                    </div>
                    <p className="text-slate-600 leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Gerente */}
          <FadeIn delay={0.2} direction="right">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Users className="text-indigo-600" size={20} />
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Gerente / Scrum Master
                </h3>
              </div>
              <div className="space-y-5">
                {managerSteps.map((s) => (
                  <div key={s.n} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#1e3a5f] text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {s.n}
                    </div>
                    <p className="text-slate-600 leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function WhenToUseSection() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Quando Usar Cada Recurso
          </p>
          <h2
            className="text-4xl font-extrabold text-[#1e3a5f]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Dois momentos, dois propósitos
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            O AgileMood combina coleta contínua de emoções com avaliação periódica de segurança psicológica.
          </p>
        </FadeIn>

        {/* Sprint timeline bar */}
        <FadeIn delay={0.05} className="mb-12">
          <div className="relative flex items-center justify-between px-8 py-5 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="absolute inset-0 flex items-center px-8">
              <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 via-blue-300 to-[#1e3a5f]" />
            </div>
            <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-100" />
              <span className="text-xs font-semibold text-blue-700 mt-1">Sprint começa</span>
            </div>
            <div className="relative z-10 text-center">
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                RF06 ativo durante toda a sprint
              </span>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-[#1e3a5f] ring-4 ring-indigo-100" />
              <span className="text-xs font-semibold text-[#1e3a5f] mt-1">Sprint encerra → RF01</span>
            </div>
          </div>
        </FadeIn>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* RF06 */}
          <FadeIn delay={0.15} direction="left">
            <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/40 p-8 h-full hover:border-blue-400 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                  A qualquer momento da sprint
                </span>
              </div>
              <div className="flex items-center gap-3 mb-5 mt-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Clock className="text-white" size={22} />
                </div>
                <h3
                  className="text-2xl font-bold text-[#1e3a5f]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Registro de Sentimentos
                </h3>
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Durante qualquer issue do sprint, registre como você está se sentindo. Completamente
                anônimo, com escala de intensidade de 1 a 5 e notas opcionais.
              </p>
              <ul className="space-y-2">
                {[
                  "100% anônimo por padrão",
                  "Escala de intensidade 1–5",
                  "Notas opcionais",
                  "Disponível via Jira (qualquer issue)",
                  "Membro pode enviar mensagem anônima ou identificada ao gerente",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* RF01 */}
          <FadeIn delay={0.25} direction="right">
            <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/40 p-8 h-full hover:border-indigo-400 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block bg-[#1e3a5f] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Ao encerrar a sprint
                </span>
                <span className="inline-block bg-amber-100 text-amber-700 text-xs font-medium px-2 py-1 rounded-full">
                  Em desenvolvimento
                </span>
              </div>
              <div className="flex items-center gap-3 mb-5 mt-4">
                <div className="w-12 h-12 rounded-xl bg-[#1e3a5f] flex items-center justify-center">
                  <ClipboardList className="text-white" size={22} />
                </div>
                <h3
                  className="text-2xl font-bold text-[#1e3a5f]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Questionário de Segurança Psicológica
                </h3>
              </div>
              <p className="text-slate-600 mb-4 leading-relaxed">
                7 perguntas baseadas na escala validada de Edmondson (1999), respondidas com escala
                Likert de 1 a 5. Leva cerca de 2 minutos.
              </p>
              {/* Example question */}
              <blockquote className="border-l-4 border-[#1e3a5f] pl-4 mb-6 italic text-slate-500 text-sm">
                "No meu time, posso admitir erros sem sentir que serei julgado"
                <span className="block text-xs mt-1 not-italic text-slate-400">
                  Exemplo de item da escala · Likert 1 (Discordo totalmente) → 5 (Concordo totalmente)
                </span>
              </blockquote>
              <ul className="space-y-2">
                {[
                  "7 itens validados (Edmondson, 1999)",
                  "Escala Likert 1–5",
                  "~2 minutos de preenchimento",
                  "Disparado ao fechar sprint no Jira",
                  "Lembrete enviado via Slack para o time",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      rf: "RF01",
      icon: <ClipboardCheck size={22} className="text-blue-600" />,
      title: "Questionário Periódico",
      desc: "Questionário anônimo baseado em Edmondson (1999), com frequência configurável: por sprint, semanal ou mensal.",
    },
    {
      rf: "RF02",
      icon: <BarChart2 size={22} className="text-blue-600" />,
      title: "Cálculo de Métricas",
      desc: "Média e desvio-padrão automáticos das respostas do time, incluindo indicadores de dispersão interna.",
    },
    {
      rf: "RF03",
      icon: <TrendingUp size={22} className="text-blue-600" />,
      title: "Dashboard de Evolução",
      desc: "Histórico visual do clima do time ao longo das sprints, com gráficos de score médio e variação.",
    },
    {
      rf: "RF05",
      icon: <Shield size={22} className="text-blue-600" />,
      title: "Controle de Acesso",
      desc: "Apenas o gerente visualiza métricas detalhadas. Todas as respostas individuais são mantidas anônimas.",
    },
    {
      rf: "RF06",
      icon: <Smile size={22} className="text-blue-600" />,
      title: "Registro Contínuo",
      desc: "Membros registram emoções em qualquer issue do Jira a qualquer momento da sprint.",
    },
    {
      rf: "RF07–08",
      icon: <MessageSquare size={22} className="text-blue-600" />,
      title: "Mensagens Anônimas",
      desc: "Membros enviam mensagens anônimas ou identificadas ao gerente. O gerente responde sem revelar a identidade do remetente.",
    },
  ];

  return (
    <section className="bg-slate-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Funcionalidades
          </p>
          <h2
            className="text-4xl font-extrabold text-[#1e3a5f]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Tudo que você precisa para gerenciar o clima do time
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeIn key={f.rf} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    {f.icon}
                  </div>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-50 px-2 py-0.5 rounded-full">
                    {f.rf}
                  </span>
                </div>
                <h3 className="font-bold text-[#1e3a5f] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {f.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntegrationsSection() {
  const platforms = [
    {
      name: "Microsoft Teams",
      icon: <TeamsIcon />,
      desc: "Receba relatórios semanais de humor toda segunda-feira e lembretes de check-in toda sexta, direto no Teams.",
    },
    {
      name: "Slack",
      icon: <SlackIcon />,
      desc: "Receba relatórios e lembretes de check-in via mensagens diretas no Slack. Configure em minutos com um token do bot.",
    },
    {
      name: "Trello",
      icon: <TrelloIcon />,
      desc: "Permita que membros registrem sentimentos diretamente nos cards do Trello e visualize o dashboard sem sair do board.",
    },
    {
      name: "Microsoft Planner",
      icon: <PlannerIcon />,
      desc: "Adicione uma aba AgileMood ao canal Teams com Planner e dispare lembretes automáticos ao concluir cada sprint.",
    },
    {
      name: "Jira",
      icon: <JiraIcon />,
      desc: "Monitore o humor do time nos issues do Jira e receba lembretes automáticos a cada sprint encerrada, sem configuração extra.",
    },
  ];

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Integrações
          </p>
          <h2
            className="text-4xl font-extrabold text-[#1e3a5f]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Funciona com as ferramentas que você já usa
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Conecte o AgileMood com as plataformas da sua equipe em poucos minutos.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {platforms.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.02, y: -3 }}
                className="flex flex-col gap-3 p-6 rounded-2xl border-2 border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-md transition-all cursor-default"
              >
                <div className="flex items-center gap-3">
                  {p.icon}
                  <span className="font-semibold text-slate-800">{p.name}</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function AcademicSection() {
  const stats = [
    { value: "82.1", label: "SUS Score", sub: 'Usabilidade "Muito Boa"' },
    { value: "41", label: "Participantes", sub: "Estudantes de Computação" },
    { value: "7", label: "Equipes", sub: "5–8 membros cada" },
    { value: "2", label: "Sprints", sub: "Avaliação em uso real" },
  ];

  const tam = [
    { label: "Facilidade de Uso (PEOU)", value: 4.29 },
    { label: "Utilidade Percebida (PU)", value: 3.79 },
    { label: "Atitude em relação ao uso (ATU)", value: 3.98 },
    { label: "Intenção de uso futuro (BI)", value: 3.73 },
  ];

  return (
    <section className="bg-blue-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Pesquisa Acadêmica
          </p>
          <h2
            className="text-4xl font-extrabold text-[#1e3a5f]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Validado em estudo com equipes ágeis reais
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Avaliado com questionários SUS e TAM após uso em condições naturais de desenvolvimento.
          </p>
        </FadeIn>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <div className="bg-white rounded-2xl border border-blue-100 p-6 text-center shadow-sm">
                <p
                  className="text-4xl font-extrabold text-[#1e3a5f] mb-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {s.value}
                </p>
                <p className="font-semibold text-slate-700 text-sm mb-0.5">{s.label}</p>
                <p className="text-xs text-slate-400">{s.sub}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* TAM metrics */}
        <FadeIn delay={0.15}>
          <div className="bg-white rounded-2xl border border-blue-100 p-8 shadow-sm mb-10">
            <div className="flex items-center gap-2 mb-6">
              <Star size={16} className="text-blue-500" />
              <h3 className="font-bold text-[#1e3a5f]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Technology Acceptance Model (TAM) — Escala 1–5
              </h3>
            </div>
            <div className="space-y-4">
              {tam.map((t) => (
                <div key={t.label} className="flex items-center gap-4">
                  <span className="text-sm text-slate-600 w-64 shrink-0">{t.label}</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(t.value / 5) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-[#1e3a5f] rounded-full"
                    />
                  </div>
                  <span className="text-sm font-bold text-[#1e3a5f] w-10 text-right">
                    {t.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Citation card */}
        <FadeIn delay={0.2}>
          <div className="bg-[#1e3a5f] text-white rounded-2xl p-8 shadow-lg">
            <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-4">
              Referência
            </p>
            <p
              className="text-xl font-bold mb-3 leading-snug"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              "AgileMood: A Tool for Ongoing Measurement of Psychological Safety in Agile Teams"
            </p>
            <p className="text-blue-200 text-sm mb-4">
              Arthur M. B. Melo, Marcelo Marinho, Suzana Sampaio
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/10 border border-white/20 rounded-full px-4 py-1 text-sm text-blue-100">
                SBQS 2025 — 4–7 nov., São José dos Campos, SP
              </span>
              <span className="bg-white/10 border border-white/20 rounded-full px-4 py-1 text-sm text-blue-100">
                UFRPE — Recife, Pernambuco
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0f2240] text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Left */}
          <div>
            <Image src={nameLogo} alt="AgileMood" height={32} className="w-auto mb-4 brightness-0 invert" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Ferramenta de código aberto para medir e melhorar a segurança psicológica em equipes ágeis.
            </p>
          </div>

          {/* Center */}
          <div>
            <p className="font-semibold text-blue-300 mb-4 text-sm uppercase tracking-widest">Links</p>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href="https://github.com/Arth19/AgileMood-FrontEnd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-2 transition-colors"
                >
                  <Github size={14} /> GitHub — Frontend
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Arth19/AgileMood-Backend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-2 transition-colors"
                >
                  <Github size={14} /> GitHub — Backend
                </a>
              </li>
              <li>
                <Link href="/login" className="hover:text-white flex items-center gap-2 transition-colors">
                  <ExternalLink size={14} /> Acessar Plataforma
                </Link>
              </li>
            </ul>
          </div>

          {/* Right */}
          <div>
            <p className="font-semibold text-blue-300 mb-4 text-sm uppercase tracking-widest">Sobre</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Licença MIT — código aberto</li>
              <li>Publicado no SBQS 2025</li>
              <li>Universidade Federal Rural de Pernambuco</li>
            </ul>
          </div>
        </div>

        {/* Logo row — placeholders for UFRPE and SBC logos */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <p className="text-xs text-slate-500 text-center mb-6 uppercase tracking-widest">
            Desenvolvido em parceria com
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {/* UFRPE logo placeholder */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-16 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center bg-white/5">
                <span className="text-xs text-slate-500 text-center leading-tight px-2">Logo UFRPE</span>
              </div>
              <span className="text-xs text-slate-500">UFRPE</span>
            </div>
            {/* SBC logo placeholder */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-16 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center bg-white/5">
                <span className="text-xs text-slate-500 text-center leading-tight px-2">Logo SBC</span>
              </div>
              <span className="text-xs text-slate-500">SBC / SBQS</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="text-center text-xs text-slate-600">
          © 2025 AgileMood. Licença MIT. Desenvolvido na UFRPE — Recife, Pernambuco, Brasil.
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        html { scroll-behavior: smooth; }
      `}</style>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <WhenToUseSection />
        <FeaturesSection />
        <IntegrationsSection />
        <AcademicSection />
      </main>
      <Footer />
    </>
  );
}
