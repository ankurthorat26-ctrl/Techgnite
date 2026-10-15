import React from 'react';
import { Check } from 'lucide-react';

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export const QuizProgress: React.FC<QuizProgressProps> = ({
  currentStep,
  totalSteps,
  stepTitles,
}) => {
  const percentage = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto mb-10">
      {/* Step Numbers & Labels */}
      <div className="flex items-center justify-between mb-3">
        {stepTitles.map((title, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={title} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#7A263A] text-white shadow-xs'
                    : isCurrent
                    ? 'bg-[#292521] text-white ring-4 ring-[#D9B98C]/40'
                    : 'bg-white border border-[#292521]/20 text-[#292521]/40'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
              </div>
              <span
                className={`text-[11px] mt-1.5 hidden md:block text-center font-medium ${
                  isCurrent
                    ? 'text-[#7A263A] font-bold'
                    : isCompleted
                    ? 'text-[#292521]'
                    : 'text-[#6E675F]/60'
                }`}
              >
                {title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress Bar Track */}
      <div className="w-full h-1.5 bg-[#D9B98C]/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#7A263A] transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
