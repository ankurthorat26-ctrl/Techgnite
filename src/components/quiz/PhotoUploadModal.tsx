import React, { useState, useRef } from 'react';
import { Camera, Upload, X, AlertCircle, Sparkles, Check, RefreshCw } from 'lucide-react';
import { SkinTone, Undertone } from '../../types';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyEstimate: (tone: SkinTone, undertone: Undertone) => void;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  onApplyEstimate,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [sampledColor, setSampledColor] = useState<string | null>(null);
  const [estimatedTone, setEstimatedTone] = useState<SkinTone>('medium');
  const [estimatedUndertone, setEstimatedUndertone] = useState<Undertone>('warm');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        analyzeSample(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeSample = (dataUrl: string) => {
    setIsAnalyzing(true);
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      try {
        const canvas = canvasRef.current;
        if (!canvas) {
          setIsAnalyzing(false);
          return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setIsAnalyzing(false);
          return;
        }

        canvas.width = 100;
        canvas.height = 100;
        ctx.drawImage(img, 0, 0, 100, 100);

        // Sample center area (representing skin surface)
        const imageData = ctx.getImageData(35, 35, 30, 30);
        const data = imageData.data;
        let r = 0, g = 0, b = 0;
        const totalPixels = data.length / 4;

        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }

        r = Math.round(r / totalPixels);
        g = Math.round(g / totalPixels);
        b = Math.round(b / totalPixels);

        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        setSampledColor(hex);

        // Approximate luminance to suggest a starting skin tone
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        let suggestedTone: SkinTone = 'medium';
        if (luminance > 195) suggestedTone = 'fair';
        else if (luminance > 165) suggestedTone = 'light';
        else if (luminance > 125) suggestedTone = 'medium';
        else if (luminance > 90) suggestedTone = 'tan';
        else suggestedTone = 'deep';

        // Check red-yellow vs blue-pink balance
        let suggestedUndertone: Undertone = 'warm';
        if (r > g && g > b) {
          suggestedUndertone = 'warm';
        } else if (Math.abs(r - b) < 20) {
          suggestedUndertone = 'neutral';
        } else {
          suggestedUndertone = 'cool';
        }

        setEstimatedTone(suggestedTone);
        setEstimatedUndertone(suggestedUndertone);
      } catch (err) {
        console.warn('Canvas analysis note:', err);
      } finally {
        setIsAnalyzing(false);
      }
    };
  };

  const handleRemovePhoto = () => {
    setImagePreview(null);
    setSampledColor(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApply = () => {
    onApplyEstimate(estimatedTone, estimatedUndertone);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF6F0] border border-[#D9B98C]/40 rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-[#292521]/60 hover:text-[#292521]"
          aria-label="Close photo analysis"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[#7A263A]/10 text-[#7A263A] flex items-center justify-center">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-2xl text-[#292521]">
              Photo-Assisted Tone Explorer
            </h3>
            <p className="text-xs text-[#6E675F]">
              Optional visual color check processed 100% on your device.
            </p>
          </div>
        </div>

        {/* Honest Disclosure Banner */}
        <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl my-4 flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Honest Science Note:</strong> Ambient lighting, digital camera sensors, makeup, and screen calibration significantly alter photo pixels. Image sampling provides an exploratory benchmark, but cannot definitive determine undertone. You can adjust the suggested values below.
          </div>
        </div>

        {/* Hidden Canvas for client-side local pixel sampling */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Upload Zone */}
        {!imagePreview ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#D9B98C] rounded-2xl p-8 text-center bg-white/60 hover:bg-white cursor-pointer transition-colors group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="w-12 h-12 rounded-full bg-[#F7F0E8] text-[#7A263A] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-[#292521] mb-1">
              Select or take a portrait in natural daylight
            </p>
            <p className="text-xs text-[#6E675F]">
              PNG, JPG, or WEBP. Image is never saved to a server.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/80 p-4 rounded-xl border border-black/5">
              <div className="relative w-28 h-28 rounded-xl overflow-hidden shrink-0 border border-[#D9B98C]/40">
                <img
                  src={imagePreview}
                  alt="Uploaded portrait for tone analysis"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grow space-y-2 text-center sm:text-left">
                {sampledColor && (
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-xs">
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 inline-block"
                      style={{ backgroundColor: sampledColor }}
                    />
                    <span className="font-mono text-[11px] text-[#6E675F]">
                      Sampled: {sampledColor.toUpperCase()}
                    </span>
                  </div>
                )}
                <p className="text-xs text-[#292521]/80">
                  {isAnalyzing
                    ? 'Sampling canvas pixels...'
                    : 'Initial estimate ready. You can calibrate the tone & undertone sliders below:'}
                </p>
                <button
                  onClick={handleRemovePhoto}
                  className="text-xs text-rose-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3 h-3" /> Remove Photo
                </button>
              </div>
            </div>

            {/* Manual Calibration Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/70 p-4 rounded-xl border border-black/5">
              <div>
                <label className="block text-xs font-semibold text-[#292521] mb-1.5 uppercase tracking-wider">
                  Skin Tone
                </label>
                <select
                  value={estimatedTone}
                  onChange={(e) => setEstimatedTone(e.target.value as SkinTone)}
                  className="w-full p-2 rounded-lg bg-white border border-[#292521]/20 text-xs font-medium focus:ring-1 focus:ring-[#7A263A]"
                >
                  <option value="fair">Fair</option>
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="tan">Tan</option>
                  <option value="deep">Deep</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#292521] mb-1.5 uppercase tracking-wider">
                  Undertone
                </label>
                <select
                  value={estimatedUndertone}
                  onChange={(e) => setEstimatedUndertone(e.target.value as Undertone)}
                  className="w-full p-2 rounded-lg bg-white border border-[#292521]/20 text-xs font-medium focus:ring-1 focus:ring-[#7A263A]"
                >
                  <option value="warm">Warm (Golden / Peachy)</option>
                  <option value="cool">Cool (Rosy / Bluish)</option>
                  <option value="neutral">Neutral (Balanced)</option>
                  <option value="not_sure">Not Sure (Universal)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="mt-6 pt-4 border-t border-[#292521]/10 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="text-xs text-[#6E675F] hover:text-[#292521] cursor-pointer"
          >
            Skip photo analysis & use quiz
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-[#292521] hover:bg-black/5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={!imagePreview && !sampledColor}
              className={`px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                imagePreview || sampledColor
                  ? 'bg-[#7A263A] text-white hover:bg-[#5E1D2D] cursor-pointer shadow-sm'
                  : 'bg-black/10 text-black/30 cursor-not-allowed'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              Apply Estimate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
