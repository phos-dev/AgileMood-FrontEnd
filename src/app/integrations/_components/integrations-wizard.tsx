"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import PlatformSelection from "./platform-selection";
import SuccessScreen from "./success-screen";
import TeamsWizard from "./platforms/teams-wizard";
import SlackWizard from "./platforms/slack-wizard";
import TrelloWizard from "./platforms/trello-wizard";
import PlannerWizard from "./platforms/planner-wizard";
import JiraWizard from "./platforms/jira-wizard";

export type Platform = "teams" | "slack" | "trello" | "planner" | "jira";

export const PLATFORM_LABELS: Record<Platform, string> = {
  teams: "Microsoft Teams",
  slack: "Slack",
  trello: "Trello",
  planner: "Microsoft Planner",
  jira: "Jira",
};

type WizardStage = "selection" | "configuring" | "success";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function IntegrationsWizard() {
  const [stage, setStage] = useState<WizardStage>("selection");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [stageKey, setStageKey] = useState(0);

  const handleSelectAndNext = () => {
    if (selectedPlatform) {
      setStageKey((k) => k + 1);
      setStage("configuring");
    }
  };

  const handleComplete = () => {
    setStageKey((k) => k + 1);
    setStage("success");
  };

  const handleReset = () => {
    setSelectedPlatform(null);
    setStageKey((k) => k + 1);
    setStage("selection");
  };

  const renderPlatformWizard = () => {
    switch (selectedPlatform) {
      case "teams":
        return <TeamsWizard onComplete={handleComplete} onBack={handleReset} />;
      case "slack":
        return <SlackWizard onComplete={handleComplete} onBack={handleReset} />;
      case "trello":
        return <TrelloWizard onComplete={handleComplete} onBack={handleReset} />;
      case "planner":
        return <PlannerWizard onComplete={handleComplete} onBack={handleReset} />;
      case "jira":
        return <JiraWizard onComplete={handleComplete} onBack={handleReset} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {stage === "selection" && (
        <motion.div
          key={`selection-${stageKey}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="w-full max-w-3xl"
        >
          <PlatformSelection
            selected={selectedPlatform}
            onSelect={setSelectedPlatform}
            onNext={handleSelectAndNext}
          />
        </motion.div>
      )}

      {stage === "configuring" && selectedPlatform && (
        <motion.div
          key={`config-${stageKey}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl"
        >
          {renderPlatformWizard()}
        </motion.div>
      )}

      {stage === "success" && selectedPlatform && (
        <motion.div
          key={`success-${stageKey}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl"
        >
          <Card className="p-6 shadow-lg">
            <CardContent className="pt-2">
              <SuccessScreen
                platform={selectedPlatform}
                onConfigureAnother={handleReset}
              />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
