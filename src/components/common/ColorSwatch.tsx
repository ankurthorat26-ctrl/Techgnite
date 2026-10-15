import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface ColorSwatchProps {
  name: string;
  hex: string;
  size?: 'sm' | 'md' | 'lg';
  showHex?: boolean;
  showName?: boolean;
  className?: string;
  allowCopy?: boolean;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  name,
  hex,
  size = 'md',
  showHex = true,
  showName = true,
  className = '',
  allowCopy = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!allowCopy) return;
    navigator.clipboard?.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const sizeStyles = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div 
      className={`inline-flex items-center gap-2.5 group cursor-pointer ${className}`}
      onClick={handleCopy}
      title={`${name} (${hex}) — Click to copy HEX`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCopy(e as unknown as React.MouseEvent);
        }
      }}
    >
      <div
        className={`${sizeStyles[size]} rounded-full shadow-inner border border-black/10 relative transition-transform duration-200 group-hover:scale-110 flex items-center justify-center shrink-0`}
        style={{ backgroundColor: hex }}
      >
        {copied && (
          <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />
        )}
      </div>

      {(showName || showHex) && (
        <div className="flex flex-col text-left">
          {showName && (
            <span className="text-xs font-medium text-[#292521] group-hover:text-[#7A263A] transition-colors leading-tight">
              {name}
            </span>
          )}
          {showHex && (
            <span className="text-[11px] font-mono text-[#6E675F] flex items-center gap-1">
              {hex.toUpperCase()}
              {allowCopy && !copied && (
                <Copy className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
