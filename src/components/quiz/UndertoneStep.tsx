import React from 'react';
import { Undertone } from '../../types';
import { Check, Info, Sparkles, Sun, Snowflake, Compass } from 'lucide-react';

interface UndertoneStepProps {
  selectedUndertone: Undertone;
  onSelectUndertone: (undertone: Undertone) => void;
}

interface UndertoneOption {
  value: Undertone;
  title: string;
  icon: React.ElementType;
  characteristics: string;
  clothingClues: string;
  gradient: string;
}

const UNDERTONE_OPTIONS: UndertoneOption[] = [
  {
    value: 'warm',
    title: 'Warm Undertone',
    icon: Sun,
    characteristics: 'Golden, peachy, honey, or yellow undertones beneath the skin surface.',
    clothingClues: 'You feel radiant in warm cream, terracotta, olive, camel, and yellow gold.',
    gradient: 'from-[#F5D0A9] via-[#E77863] to-[#D99B26]',
  },
  {
    value: 'cool',
    title: 'Cool Undertone',
    icon: Snowflake,
    characteristics: 'Pink, rosy, cocoa, or bluish undertones beneath the skin surface.',
    clothingClues: 'You feel fresh in berry, crisp white, royal cobalt blue, plum, and silver.',
    gradient: 'from-[#E2D4F0] via-[#C28493] to-[#64748B]',
  },
  {
    value: 'neutral',
    title: 'Neutral Undertone',
    icon: Compass,
    characteristics: 'A harmonious, balanced mix of both warm and cool nuances.',
    clothingClues: 'You look great in both gold and silver, dusty teal, soft rose, and sage.',
    gradient: 'from-[#EED9C4] via-[#B57C89] to-[#8FA2A6]',
  },
  {
    value: 'not_sure',
    title: 'Not Sure Yet',
    icon: Sparkles,
    characteristics: 'Uncertain of your undertone temperature? No problem at all.',
    clothingClues: 'We will curate a versatile palette of universally flattering colors to try.',
    gradient: 'from-[#F7F0E8] via-[#D9B98C] to-[#7A263A]',
  },
];

export const UndertoneStep: React.FC<UndertoneStepProps> = ({
  selectedUndertone,
  onSelectUndertone,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#7A263A] mb-1.5 block">
          Step 3 of 6
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#292521] font-medium mb-3">
          What is your undertone?
        </h2>
        <p className="text-sm text-[#6E675F] leading-relaxed">
          While skin tone is the depth of your skin surface, undertone is the subtle hue beneath that remains consistent across seasons.
        </p>
      </div>

      {/* Educational Advisory Callout */}
      <div className="max-w-3xl mx-auto p-4 bg-white/80 border border-[#D9B98C]/60 rounded-2xl flex items-start gap-3 shadow-xs">
        <div className="p-2 rounded-xl bg-[#7A263A]/10 text-[#7A263A] shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div className="text-xs text-[#292521]/80 leading-relaxed">
          <strong className="text-[#292521] block mb-1">
            The Truth About Vein & Jewelry Tests:
          </strong>
          Common internet tests (like looking at wrist veins or whether silver or gold looks &quot;better&quot;) are imperfect clues, not definitive science. Complexions often reflect ambient lighting, tanning, and personal taste. Choose the option that best reflects how colors make your skin look alive and vibrant.
        </div>
      </div>

      {/* Undertone Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
        {UNDERTONE_OPTIONS.map((opt) => {
          const isSelected = selectedUndertone === opt.value;
          const Icon = opt.icon;

          return (
            <div
              key={opt.value}
              onClick={() => onSelectUndertone(opt.value)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#7A263A] ring-2 ring-[#7A263A] shadow-md -translate-y-0.5'
                  : 'bg-white/70 border-[#D9B98C]/40 hover:bg-white hover:border-[#7A263A]/40'
              }`}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectUndertone(opt.value);
                }
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F7F0E8] text-[#7A263A] flex items-center justify-center border border-black/5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl font-medium text-[#292521]">
                      {opt.title}
                    </h3>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#7A263A] text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Micro gradient bar showing undertone atmosphere */}
                <div
                  className={`h-1.5 w-full rounded-full bg-gradient-to-r ${opt.gradient} mb-3 opacity-90`}
                />

                <p className="text-xs text-[#292521]/80 mb-2 font-medium">
                  {opt.characteristics}
                </p>
                <p className="text-xs text-[#6E675F] italic">
                  {opt.clothingClues}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
