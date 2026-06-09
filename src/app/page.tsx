"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
  BookOpen,
  Brain,
  AlertTriangle,
  Code2,
  Zap,
  Activity,
} from "lucide-react";
import nameLogo from "../public/nameLogo.png";
import ufrpeLogo from "../public/ufrpe.png";
import dcLogo from "../public/dc.jpeg";
import sbcLogo from "../public/logossbc.jpg";

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
    <header className="sticky top-0 z-50 bg-blue-700 border-b border-white/10 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Image src={nameLogo} alt="AgileMood" height={36} className="w-auto" />
        <Button asChild className="bg-white text-[#1e3a5f] hover:bg-blue-50 text-sm px-5">
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
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(15,34,64,0.88) 0%, rgba(30,58,95,0.82) 50%, rgba(26,68,128,0.88) 100%), url('https://img.magnific.com/fotos-gratis/um-grupo-de-pessoas-multinacionais-ocupadas-trabalhando-no-escritorio_146671-15665.jpg?semt=ais_hybrid&w=740&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 75% 75%, #818cf8 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24 select-none">
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
            className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white px-8 py-3 text-base"
          >
            <a
              href="https://github.com/phos-dev/AgileMood-FrontEnd"
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
          className="flex flex-wrap justify-center gap-3 select-none"
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
    { n: 1, text: "Faça login e acesse o dashboard do seu time" },
    { n: 2, text: "Registre sua emoção: escolha, defina a intensidade (1–5) e adicione notas opcionais" },
    { n: 3, text: "Envie — anônimo por padrão. Disponível também via Jira, Trello e Planner" },
  ];

  const managerSteps = [
    { n: 1, text: "Crie o time, defina as emoções do grupo e adicione os membros por e-mail" },
    { n: 2, text: "Configure as integrações desejadas: Slack, Teams, Jira, Trello ou Planner" },
    { n: 3, text: "Acompanhe o dashboard e receba relatórios automáticos semanais com alertas de clima" },
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
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 h-full select-none">
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
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 h-full select-none">
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

function EmotionsSection() {
  const impacts = [
    {
      icon: <Code2 size={20} className="text-white" />,
      colorBg: "bg-rose-500",
      cardBg: "bg-rose-50",
      cardBorder: "border-rose-100",
      title: "Qualidade do código",
      desc: "Emoções negativas levam a código desorganizado, propenso a erros e até à exclusão intencional de partes do projeto — gerando dívida técnica invisível.",
      source: "Graziotin et al., 2018 · Salido et al., 2023",
    },
    {
      icon: <Zap size={20} className="text-white" />,
      colorBg: "bg-amber-500",
      cardBg: "bg-amber-50",
      cardBorder: "border-amber-100",
      title: "Velocidade de resolução",
      desc: "Desenvolvedores felizes corrigem bugs mais rápido e mantêm desempenho cognitivo superior. A infelicidade aumenta o tempo de resolução de problemas.",
      source: "Graziotin et al., 2014",
    },
    {
      icon: <Users size={20} className="text-white" />,
      colorBg: "bg-emerald-600",
      cardBg: "bg-emerald-50",
      cardBorder: "border-emerald-100",
      title: "Colaboração e coesão",
      desc: "Consciência emocional permite que membros se aproximem dos colegas, ofereçam suporte e construam confiança — bases do trabalho ágil eficaz.",
      source: "Luong et al., 2021",
    },
  ];

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            O papel das emoções
          </p>
          <h2
            className="text-4xl font-extrabold text-[#1e3a5f]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Humor afeta diretamente a qualidade do software
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            A relação entre estados emocionais e qualidade do produto é bidirecional e amplamente documentada na literatura de engenharia de software.
          </p>
        </FadeIn>

        {/* Impact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {impacts.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
              <div className={`rounded-2xl border ${item.cardBorder} ${item.cardBg} p-6 h-full select-none`}>
                <div className={`w-10 h-10 rounded-xl ${item.colorBg} flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#1e3a5f] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.desc}</p>
                <p className="text-xs text-slate-400 italic">{item.source}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Why any moment */}
        <FadeIn delay={0.15}>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 mb-8 select-none">
            <div className="flex flex-col md:flex-row items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                <Clock className="text-white" size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Por que registrar <span className="italic">a qualquer momento</span>?
                </h3>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Emoções surgem de <strong>eventos situacionais concretos</strong> — a issue que não compila há horas, o code review que veio duro, a reunião que saiu do controle. Esses gatilhos acontecem <em>durante</em> a sprint, não no final dela.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Dado capturado no momento = sinal real. Dado coletado dias depois em retrospectiva = memória distorcida pela dinâmica do grupo. O registro contínuo garante que sentimentos que poderiam ficar ocultos cheguem ao gestor em tempo de agir.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Bidirectional connection: vicious vs virtuous cycle */}
        <FadeIn delay={0.2}>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 select-none">
            <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
              A conexão bidirecional: emoções ↔ segurança psicológica
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vicious cycle */}
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
                <p className="text-sm font-bold text-rose-700 mb-3">
                  ↓ Ciclo vicioso
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-0.5 shrink-0">•</span>
                    Excesso de controle e supervisão gera estresse e desrespeito
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-0.5 shrink-0">•</span>
                    Baixa segurança psicológica → membros reprimem emoções negativas
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-0.5 shrink-0">•</span>
                    Emoções reprimidas → menos colaboração, mais erros, pior qualidade
                  </li>
                </ul>
              </div>
              {/* Virtuous cycle */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <p className="text-sm font-bold text-emerald-700 mb-3">
                  ↑ Ciclo virtuoso
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5 shrink-0">•</span>
                    Alta segurança psicológica evoca conforto, alegria e motivação
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5 shrink-0">•</span>
                    Emoções positivas → mais colaboração, melhor código, menos bugs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5 shrink-0">•</span>
                    Bom clima emocional → reforça ainda mais a segurança do time
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-center text-xs text-slate-400 mt-6">
              Fonte: Weibel et al., 2016 · Lee, 2021 · Melo, Marinho &amp; Sampaio, SBQS 2025
            </p>
          </div>
        </FadeIn>
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
          <div className="bg-slate-50 rounded-2xl border border-slate-200 px-8 pt-6 pb-5 select-none">
            {/* Dot row with animated line */}
            <div className="relative flex items-center justify-between mb-3">
              {/* Animated line behind dots */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-5 overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  style={{ originX: 0 }}
                  className="h-0.5 w-full bg-gradient-to-r from-blue-400 via-blue-300 to-[#1e3a5f]"
                />
              </div>
              {/* Left dot */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="relative z-10 w-5 h-5 rounded-full bg-blue-500 ring-4 ring-blue-100 shrink-0"
              />
              {/* Center badge */}
              <span className="relative z-10 inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mx-4 whitespace-nowrap">
                Registro contínuo durante toda a sprint
              </span>
              {/* Right dot */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1.25 }}
                className="relative z-10 w-5 h-5 rounded-full bg-[#1e3a5f] ring-4 ring-indigo-100 shrink-0"
              />
            </div>
            {/* Label row */}
            <div className="flex justify-between">
              <span className="text-xs font-semibold text-blue-700">Sprint começa</span>
              <span className="text-xs font-semibold text-[#1e3a5f]">Sprint encerra → Questionário</span>
            </div>
          </div>
        </FadeIn>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* RF06 */}
          <FadeIn delay={0.15} direction="left">
            <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/40 p-8 h-full hover:border-blue-400 hover:shadow-md transition-all select-none">
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
            <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/40 p-8 h-full hover:border-indigo-400 hover:shadow-md transition-all select-none">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block bg-[#1e3a5f] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Ao encerrar a sprint
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
                &ldquo;No meu time, posso admitir erros sem sentir que serei julgado&rdquo;
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

function EdmondsonSection() {
  const questions = [
    { n: 1, text: "Se você comete um erro neste time, muitas vezes ele é usado contra você.", reverse: true },
    { n: 2, text: "Os membros deste time são capazes de levantar problemas e questões difíceis.", reverse: false },
    { n: 3, text: "As pessoas neste time às vezes rejeitam outras por serem diferentes.", reverse: true },
    { n: 4, text: "É seguro arriscar neste time.", reverse: false },
    { n: 5, text: "É difícil pedir ajuda a outros membros deste time.", reverse: true },
    { n: 6, text: "Nenhum membro deste time agiria de forma a prejudicar deliberadamente os esforços dos outros.", reverse: false },
    { n: 7, text: "Minhas habilidades únicas e talentos são valorizados e utilizados neste time.", reverse: false },
  ];

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Fundamentação Científica
          </p>
          <h2
            className="text-4xl font-extrabold text-[#1e3a5f]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            A Escala de Edmondson
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            Desenvolvida por Amy Edmondson (Harvard Business School) em 1999, é o instrumento mais
            amplamente citado para medir segurança psicológica em times.
          </p>
        </FadeIn>

        {/* Why it matters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <FadeIn delay={0.05} direction="left">
            <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6 h-full select-none">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center mb-4">
                <Brain size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-[#1e3a5f] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                O que é?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Crença compartilhada de que o time é um ambiente seguro para riscos interpessoais — admitir erros, pedir ajuda e propor ideias sem medo de julgamento ou retaliação.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-6 h-full select-none">
              <div className="w-10 h-10 rounded-xl bg-[#1e3a5f] flex items-center justify-center mb-4">
                <Users size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-[#1e3a5f] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Por que importa?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                O Project Aristotle do Google (2016) identificou segurança psicológica como o fator número 1 de times de alto desempenho — acima de estrutura, metas e recursos individuais.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15} direction="right">
            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-6 h-full select-none">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center mb-4">
                <AlertTriangle size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-[#1e3a5f] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Quando está baixa?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Times silenciam problemas, evitam inovar e acumulam dívida técnica invisível. Falhas se repetem porque ninguém se sente seguro para apontá-las com antecedência.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Quote */}
        <FadeIn delay={0.2}>
          <blockquote className="border-l-4 border-blue-500 pl-6 py-2 mb-12 max-w-3xl mx-auto">
            <p className="text-lg italic text-slate-600 leading-relaxed">
              &ldquo;Psychological safety is not about being nice. It&apos;s about giving candid feedback, openly admitting mistakes, and learning from each other.&rdquo;
            </p>
            <footer className="mt-3 text-sm text-slate-400 not-italic">
              — Amy Edmondson, <span className="italic">The Fearless Organization</span> (2018)
            </footer>
          </blockquote>
        </FadeIn>

        {/* 7 questions */}
        <FadeIn delay={0.25}>
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 select-none">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                <BookOpen size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#1e3a5f]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Os 7 itens da escala
                </h3>
                <p className="text-xs text-slate-400">Likert 1 (Discordo totalmente) → 5 (Concordo totalmente)</p>
              </div>
            </div>
            <div className="space-y-3">
              {questions.map((q) => (
                <div key={q.n} className="flex items-start gap-4 bg-white rounded-xl border border-slate-100 px-5 py-4">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {q.n}
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">{q.text}</p>
                  {q.reverse && (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full shrink-0 mt-0.5">
                      reverso
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-4">
              * Itens reversos (1, 3, 5) são recodificados antes do cálculo do score médio para corrigir viés de aquiescência.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ManagerDualSection() {
  const rows = [
    {
      label: "Sinal",
      emotion: "Tempo real, durante a sprint",
      edmondson: "Periódico, ao encerrar a sprint",
    },
    {
      label: "O que mede",
      emotion: "Pulso emocional individual",
      edmondson: "Clima estrutural de segurança do time",
    },
    {
      label: "Ação típica",
      emotion: "Responder mensagem anônima, 1:1 imediato",
      edmondson: "Abrir retrospectiva com dados, definir melhorias",
    },
  ];

  return (
    <section className="bg-[#0f2240] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Visão do gestor
          </p>
          <h2
            className="text-4xl font-extrabold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Como o gestor usa os dois instrumentos
          </h2>
          <p className="text-blue-200 mt-4 max-w-2xl mx-auto">
            Registro de emoções e questionário de Edmondson se complementam. Usados juntos, formam um ciclo de gestão proativa baseada em dados.
          </p>
        </FadeIn>

        {/* Two instrument cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Emotion pulse */}
          <FadeIn delay={0.1} direction="left">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 h-full select-none">
              <span className="inline-block bg-blue-500/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-full mb-5">
                A qualquer momento da sprint
              </span>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
                  <Activity className="text-white" size={22} />
                </div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Pulso emocional
                </h3>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Dashboard em tempo real mostrando quais emoções estão sendo registradas — distribuição, intensidade média e tendência. Alertas imediatos quando sentimentos negativos aumentam.
              </p>
              <div className="space-y-3">
                {rows.map((r) => (
                  <div key={r.label} className="flex gap-3">
                    <span className="text-blue-400 text-xs font-bold w-24 shrink-0 pt-0.5 uppercase tracking-wide">
                      {r.label}
                    </span>
                    <span className="text-blue-100 text-sm">{r.emotion}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Edmondson diagnosis */}
          <FadeIn delay={0.2} direction="right">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 h-full select-none">
              <span className="inline-block bg-indigo-500/30 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full mb-5">
                Ao encerrar a sprint
              </span>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center shrink-0">
                  <ClipboardList className="text-white" size={22} />
                </div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Diagnóstico estrutural
                </h3>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Score médio de segurança psicológica calculado a cada sprint. Evolução histórica comparando o clima do time ao longo das sprints.
              </p>
              <div className="space-y-3">
                {rows.map((r) => (
                  <div key={r.label} className="flex gap-3">
                    <span className="text-blue-400 text-xs font-bold w-24 shrink-0 pt-0.5 uppercase tracking-wide">
                      {r.label}
                    </span>
                    <span className="text-blue-100 text-sm">{r.edmondson}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Key insight banner */}
        <FadeIn delay={0.3}>
          <div className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-center select-none">
            <p className="text-white text-lg font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Emoções revelam <span className="text-blue-300">quando</span> algo está errado.{" "}
              Segurança psicológica revela <span className="text-indigo-300">por que</span> o clima está como está.
            </p>
            <p className="text-blue-300 text-sm">
              Juntos, os dois instrumentos formam um ciclo contínuo:{" "}
              <strong className="text-white">Sinal → Diagnóstico → Ação → Melhoria</strong>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <ClipboardCheck size={22} className="text-blue-600" />,
      title: "Questionário Periódico",
      desc: "Questionário anônimo baseado em Edmondson (1999), com frequência configurável: por sprint, semanal ou mensal.",
    },
    {
      icon: <BarChart2 size={22} className="text-blue-600" />,
      title: "Cálculo de Métricas",
      desc: "Score médio automático dos 7 itens da escala de Edmondson, com recodificação dos itens reversos e histórico por sprint.",
    },
    {
      icon: <TrendingUp size={22} className="text-blue-600" />,
      title: "Dashboard de Evolução",
      desc: "Histórico visual do clima do time ao longo das sprints, com gráficos de score médio e variação.",
    },
    {
      icon: <Shield size={22} className="text-blue-600" />,
      title: "Controle de Acesso",
      desc: "Apenas o gerente visualiza métricas detalhadas. Todas as respostas individuais são mantidas anônimas.",
    },
    {
      icon: <Smile size={22} className="text-blue-600" />,
      title: "Registro Contínuo",
      desc: "Membros registram emoções em qualquer issue do Jira a qualquer momento da sprint.",
    },
    {
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
            <FadeIn key={f.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow h-full select-none"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    {f.icon}
                  </div>
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

  const total = platforms.length;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 2500);
    return () => clearInterval(id);
  }, [total]);

  // Normalize offset to -2..+2 for 5 items
  const getOffset = (i: number) => {
    let off = i - activeIndex;
    if (off > Math.floor(total / 2)) off -= total;
    if (off < -Math.floor(total / 2)) off += total;
    return off;
  };

  const cardStyle = (off: number) => {
    const absOff = Math.abs(off);
    const x = off * 145;
    const y = absOff * 28;
    const rotate = off * 11;
    const scale = 1 - absOff * 0.13;
    const opacity = 1 - absOff * 0.22;
    const zIndex = 10 - absOff;
    return { x, y, rotate, scale, opacity, zIndex };
  };

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

        {/* Arc carousel */}
        <FadeIn>
          <div className="flex flex-col items-center select-none">
            {/* Cards container */}
            <div
              className="relative flex items-center justify-center"
              style={{ height: 160, width: "100%", maxWidth: 680 }}
            >
              {platforms.map((p, i) => {
                const off = getOffset(i);
                const s = cardStyle(off);
                const isActive = off === 0;
                return (
                  <motion.button
                    key={p.name}
                    onClick={() => setActiveIndex(i)}
                    animate={{
                      x: s.x,
                      y: s.y,
                      rotate: s.rotate,
                      scale: s.scale,
                      opacity: s.opacity,
                      zIndex: s.zIndex,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`absolute flex items-center justify-center rounded-2xl cursor-pointer ${
                      isActive
                        ? "bg-white shadow-xl border border-slate-200"
                        : "bg-slate-100 border border-slate-200"
                    }`}
                    style={{ width: 96, height: 96 }}
                    aria-label={p.name}
                  >
                    {p.icon}
                  </motion.button>
                );
              })}
            </div>

            {/* Active platform info */}
            <div className="mt-8 text-center min-h-[72px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <p
                    className="text-lg font-bold text-[#1e3a5f] mb-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {platforms[activeIndex].name}
                  </p>
                  <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                    {platforms[activeIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation dots */}
            <div className="flex items-center gap-2 mt-6">
              {platforms.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-full transition-all ${
                    i === activeIndex
                      ? "w-5 h-2 bg-[#1e3a5f]"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Ir para ${platforms[i].name}`}
                />
              ))}
            </div>
          </div>
        </FadeIn>
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
            Validado em estudo acadêmico com equipes ágeis
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Avaliado com questionários SUS e TAM após uso em condições naturais de desenvolvimento.
          </p>
        </FadeIn>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <div className="bg-white rounded-2xl border border-blue-100 p-6 text-center shadow-sm select-none">
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
          <div className="bg-white rounded-2xl border border-blue-100 p-8 shadow-sm mb-10 select-none">
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
            <a
              href="https://sol.sbc.org.br/index.php/sbqs/article/view/39011/38783"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold mb-3 leading-snug hover:underline block"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              &ldquo;AgileMood: A Tool for Ongoing Measurement of Psychological Safety in Agile Teams&rdquo;
            </a>
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
                  href="https://github.com/phos-dev/AgileMood-FrontEnd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-2 transition-colors"
                >
                  <Github size={14} /> GitHub — Frontend
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/phos-dev/AgileMood-Backend"
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

        {/* Institution logos */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white rounded-xl px-4 py-2 flex items-center justify-center h-16">
                <Image src={ufrpeLogo} alt="UFRPE" height={48} className="w-auto max-w-[100px] object-contain" />
              </div>
              <span className="text-xs text-slate-500">UFRPE</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white rounded-xl px-4 py-2 flex items-center justify-center h-16">
                <Image src={dcLogo} alt="Departamento de Computação" height={48} className="w-auto max-w-[100px] object-contain" />
              </div>
              <span className="text-xs text-slate-500">DC / UFRPE</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white rounded-xl px-4 py-2 flex items-center justify-center h-16">
                <Image src={sbcLogo} alt="SBC / SBQS" height={48} className="w-auto max-w-[100px] object-contain" />
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
        <EmotionsSection />
        <WhenToUseSection />
        <EdmondsonSection />
        <ManagerDualSection />
        <FeaturesSection />
        <IntegrationsSection />
        <AcademicSection />
      </main>
      <Footer />
    </>
  );
}
