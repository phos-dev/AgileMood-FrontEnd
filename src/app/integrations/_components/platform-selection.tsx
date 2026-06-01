import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Platform } from "./integrations-wizard";

interface PlatformInfo {
  id: Platform;
  name: string;
  description: string;
  icon: React.ReactNode;
  borderColor: string;
  bgColor: string;
}

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
      <path
        d="M16 7L8 16l8 9 8-9-8-9z"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 11l-4 5 4 4 4-4-4-5z"
        fill="white"
        opacity="0.9"
      />
    </svg>
  );
}

const PLATFORMS: PlatformInfo[] = [
  {
    id: "teams",
    name: "Microsoft Teams",
    description: "Receba relatórios semanais de humor toda segunda-feira e lembretes de check-in toda sexta, direto no Teams.",
    icon: <TeamsIcon />,
    borderColor: "border-blue-400",
    bgColor: "bg-blue-50",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Receba relatórios e lembretes de check-in via mensagens diretas no Slack. Configure em minutos com um token do bot.",
    icon: <SlackIcon />,
    borderColor: "border-blue-400",
    bgColor: "bg-blue-50",
  },
  {
    id: "trello",
    name: "Trello",
    description: "Permita que membros registrem sentimentos diretamente nos cards do Trello e visualize o dashboard sem sair do board.",
    icon: <TrelloIcon />,
    borderColor: "border-blue-400",
    bgColor: "bg-blue-50",
  },
  {
    id: "planner",
    name: "Microsoft Planner",
    description: "Adicione uma aba AgileMood ao canal Teams com Planner e dispare lembretes automáticos ao concluir cada sprint.",
    icon: <PlannerIcon />,
    borderColor: "border-blue-400",
    bgColor: "bg-blue-50",
  },
  {
    id: "jira",
    name: "Jira",
    description: "Monitore o humor do time nos issues do Jira e receba lembretes automáticos a cada sprint encerrada, sem configuração extra.",
    icon: <JiraIcon />,
    borderColor: "border-blue-400",
    bgColor: "bg-blue-50",
  },
];

interface PlatformSelectionProps {
  selected: Platform | null;
  onSelect: (p: Platform) => void;
  onNext: () => void;
}

export default function PlatformSelection({ selected, onSelect, onNext }: PlatformSelectionProps) {
  return (
    <div className="w-full max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Qual plataforma quer integrar?</h1>
        <p className="text-gray-500 mt-2">Escolha uma das plataformas abaixo para começar a configuração.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLATFORMS.map((platform) => {
          const isSelected = selected === platform.id;
          return (
            <motion.button
              key={platform.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(platform.id)}
              className={`flex flex-col items-start gap-3 p-5 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? `${platform.borderColor} ${platform.bgColor} shadow-md`
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3">
                {platform.icon}
                <span className="font-semibold text-gray-800">{platform.name}</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{platform.description}</p>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-end mt-8">
        <Button
          disabled={!selected}
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 px-8"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
