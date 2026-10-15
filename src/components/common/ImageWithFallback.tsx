import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackColor?: string;
  categoryLabel?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackColor = '#E2D1BE',
  categoryLabel = 'ShadeMatch Fashion',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
        style={{
          background: `linear-gradient(135deg, ${fallbackColor}22 0%, #F7F0E8 100%)`,
          border: '1px solid rgba(41, 37, 33, 0.08)',
        }}
        role="img"
        aria-label={alt || 'Fashion item placeholder'}
      >
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-xs"
          style={{ backgroundColor: `${fallbackColor}55`, color: '#7A263A' }}
        >
          <Sparkles className="w-5 h-5" />
        </div>
        <p className="text-xs font-medium tracking-wider uppercase text-[#292521]/60">
          {categoryLabel}
        </p>
        <p className="text-xs text-[#292521]/40 mt-1 line-clamp-1 italic max-w-[80%]">
          {alt}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#F7F0E8] animate-pulse flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-[#D9B98C] animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        {...props}
      />
    </div>
  );
};
