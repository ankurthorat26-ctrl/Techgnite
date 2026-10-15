import React, { useState } from 'react';
import { SkinTone, Undertone } from '../../types';
import { Camera, Check } from 'lucide-react';
import { PhotoUploadModal } from './PhotoUploadModal';

interface ToneStepProps {
  selectedTone: SkinTone;
  onSelectTone: (tone: SkinTone) => void;
  onApplyPhotoEstimate?: (tone: SkinTone, undertone: Undertone) => void;
}

interface ToneOption {
  value: SkinTone;
  label: string;
  description: string;
  swatchHex: string;
}

const TONE_OPTIONS: ToneOption[] = [
  {
    value: 'fair',
    label: 'Fair',
    description: 'Porcelain or ivory complexion that burns easily in direct sun.',
    swatchHex: '#F6E4D6',
  },
  {
    value: 'light',
    label: 'Light',
    description: 'Light beige with gentle warm or cool undertones; tans moderately.',
    swatchHex: '#ECCBB2',
  },
  {
    value: 'medium',
    label: 'Medium',
    description: 'Warm wheatish, golden honey, or olive tones typical of South Asian complexions.',
    swatchHex: '#D4A373',
  },
  {
    value: 'tan',
    label: 'Tan',
    description: 'Rich caramel, bronze, and sunkissed golden-brown complexion.',
    swatchHex: '#A36F4C',
  },
  {
    value: 'deep',
    label: 'Deep',
    description: 'Lustrous chocolate, espresso, or ebony with high contrast.',
    swatchHex: '#5C3826',
  },
  {
    value: 'not_sure',
    label: 'Not Sure',
    description: 'Explore a balanced, universally flattering spectrum across all clothing & makeup.',
    swatchHex: '#D9B98C',
  },
];

export const ToneStep: React.FC<ToneStepProps> = ({
  selectedTone,
  onSelectTone,
  onApplyPhotoEstimate,
}) => {
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#7A263A] mb-1.5 block">
          Step 2 of 6
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#292521] font-medium mb-3">
          What is your skin tone?
        </h2>
        <p className="text-sm text-[#6E675F] leading-relaxed">
          Select the tone that feels closest to your natural skin in indirect daytime light.
        </p>

        {/* Optional Photo Assistance Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setPhotoModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D9B98C] bg-white/60 hover:bg-white text-xs font-semibold text-[#7A263A] transition-all hover:shadow-xs cursor-pointer"
          >
            <Camera className="w-4 h-4 text-[#7A263A]" />
            Optional: Upload a photo for tone assistance
          </button>
        </div>
      </div>

      {/* Tone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {TONE_OPTIONS.map((option) => {
          const isSelected = selectedTone === option.value;
          return (
            <div
              key={option.value}
              onClick={() => onSelectTone(option.value)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer text-left relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#7A263A] ring-2 ring-[#7A263A] shadow-md -translate-y-0.5'
                  : 'bg-white/70 border-[#D9B98C]/40 hover:bg-white hover:border-[#7A263A]/40'
              }`}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectTone(option.value);
                }
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full shadow-inner border border-black/10 shrink-0"
                    style={{ backgroundColor: option.swatchHex }}
                  />
                  <h3 className="font-serif text-xl font-medium text-[#292521]">
                    {option.label}
                  </h3>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#7A263A] text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
              <p className="text-xs text-[#6E675F] leading-relaxed">
                {option.description}
              </p>
            </div>
          );
        })}
      </div>

      <PhotoUploadModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        onApplyEstimate={(tone, undertone) => {
          onSelectTone(tone);
          onApplyPhotoEstimate?.(tone, undertone);
        }}
      />
    </div>
  );
};
