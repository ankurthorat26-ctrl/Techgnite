import React from 'react';
import { X, ShieldCheck, Trash2, CheckCircle2 } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { useWishlist } from '../../context/WishlistContext';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const { clearProfile, hasCompletedQuiz } = useProfile();
  const { clearWishlist, wishlistCount } = useWishlist();
  const [clearedNotice, setClearedNotice] = React.useState(false);

  if (!isOpen) return null;

  const handleClearAll = () => {
    clearProfile();
    clearWishlist();
    setClearedNotice(true);
    setTimeout(() => {
      setClearedNotice(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-[#FAF6F0] border border-[#D9B98C]/40 rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative"
        role="dialog"
        aria-labelledby="privacy-title"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-[#292521]/60 hover:text-[#292521] transition-colors"
          aria-label="Close privacy modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#7A263A]/10 text-[#7A263A] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 id="privacy-title" className="font-serif text-2xl text-[#292521]">
              Privacy & Ethical Color Advisory
            </h3>
            <p className="text-xs text-[#6E675F]">
              Your data stays in your browser. Period.
            </p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs text-[#292521]/80 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
          <div className="p-3 bg-white/70 rounded-xl border border-black/5">
            <p className="font-semibold text-[#7A263A] mb-1">1. Local Storage Only</p>
            <p>
              ShadeMatch stores your quiz answers, color palette, and wishlist strictly in your browser&apos;s local storage (<code>localStorage</code>). We do not send your personal data or preferences to an external database.
            </p>
          </div>

          <div className="p-3 bg-white/70 rounded-xl border border-black/5">
            <p className="font-semibold text-[#7A263A] mb-1">2. Zero Photo Persistence</p>
            <p>
              If you choose to use the optional photo assistance, image sampling happens strictly within your browser&apos;s local HTML5 canvas. Your photo is never uploaded to any remote server and is discarded as soon as you clear it or navigate away.
            </p>
          </div>

          <div className="p-3 bg-white/70 rounded-xl border border-black/5">
            <p className="font-semibold text-[#7A263A] mb-1">3. Respectful Color Recommendations</p>
            <p>
              We believe every skin tone is equally radiant and beautiful. Our color recommendations are designed purely as creative suggestions to help colors harmonize with your natural contrast, not rigid rules or assessments of beauty or identity.
            </p>
          </div>

          <div className="p-3 bg-white/70 rounded-xl border border-black/5">
            <p className="font-semibold text-[#7A263A] mb-1">4. Sample Catalog Notice</p>
            <p>
              All products in this initial MVP are realistic demo items curated for portfolio evaluation. Retailer buttons link to respective platforms for illustrative purposes.
            </p>
          </div>
        </div>

        {clearedNotice ? (
          <div className="mt-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>All local quiz answers and wishlist items have been cleared.</span>
          </div>
        ) : (
          <div className="mt-6 pt-4 border-t border-[#292521]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[11px] text-[#6E675F] text-center sm:text-left">
              Current state: {hasCompletedQuiz ? 'Quiz saved' : 'No quiz'} • {wishlistCount} item(s) in wishlist
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleClearAll}
                className="px-3.5 py-2 rounded-lg text-xs font-medium text-rose-700 hover:bg-rose-50 border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All Data
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#292521] text-white hover:bg-[#403B35] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
