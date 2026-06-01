import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Platform, PLATFORM_LABELS } from "./integrations-wizard";

interface SuccessScreenProps {
  platform: Platform;
  onConfigureAnother: () => void;
}

export default function SuccessScreen({ platform, onConfigureAnother }: SuccessScreenProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center py-8 gap-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
      >
        <CheckCircle className="w-24 h-24 text-green-500" strokeWidth={1.5} />
      </motion.div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-gray-800">Integração finalizada</h2>
        <p className="text-gray-500">
          A integração com <span className="font-medium text-gray-700">{PLATFORM_LABELS[platform]}</span> foi configurada com sucesso.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Button
          variant="outline"
          onClick={onConfigureAnother}
        >
          Configurar outra plataforma
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => router.push("/home")}
        >
          Ir para o Dashboard
        </Button>
      </div>
    </motion.div>
  );
}
