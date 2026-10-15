import React from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  secondaryActionText?: string;
  secondaryActionHref?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Sparkles,
  title,
  description,
  actionText,
  actionHref,
  onActionClick,
  secondaryActionText,
  secondaryActionHref,
}) => {
  return (
    <div className="bg-white/70 border border-[#D9B98C]/30 rounded-2xl p-10 md:p-14 text-center max-w-lg mx-auto shadow-xs my-8">
      <div className="w-16 h-16 rounded-full bg-[#F7F0E8] text-[#7A263A] flex items-center justify-center mx-auto mb-5 shadow-inner">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-serif text-2xl font-normal text-[#292521] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[#6E675F] max-w-sm mx-auto mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {actionText && actionHref && (
          <Link
            to={actionHref}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#7A263A] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#5E1D2D] transition-colors shadow-sm"
          >
            {actionText}
          </Link>
        )}

        {actionText && onActionClick && !actionHref && (
          <button
            onClick={onActionClick}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#7A263A] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#5E1D2D] transition-colors shadow-sm cursor-pointer"
          >
            {actionText}
          </button>
        )}

        {secondaryActionText && secondaryActionHref && (
          <Link
            to={secondaryActionHref}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-[#292521]/20 text-[#292521] text-xs font-semibold tracking-wider uppercase hover:bg-[#F7F0E8] transition-colors"
          >
            {secondaryActionText}
          </Link>
        )}
      </div>
    </div>
  );
};
