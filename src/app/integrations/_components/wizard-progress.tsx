interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function WizardProgress({ currentStep, totalSteps }: WizardProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`rounded-full transition-all duration-300 ${
            index < currentStep
              ? "w-3 h-3 bg-blue-600"
              : index === currentStep
              ? "w-4 h-4 bg-blue-600 ring-2 ring-blue-200"
              : "w-3 h-3 bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
