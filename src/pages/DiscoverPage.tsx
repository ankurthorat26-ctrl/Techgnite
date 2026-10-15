import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizProgress } from '../components/quiz/QuizProgress';
import { GenderStep } from '../components/quiz/GenderStep';
import { ToneStep } from '../components/quiz/ToneStep';
import { UndertoneStep } from '../components/quiz/UndertoneStep';
import { StyleStep } from '../components/quiz/StyleStep';
import { CategoryStep } from '../components/quiz/CategoryStep';
import { BudgetOccasionStep } from '../components/quiz/BudgetOccasionStep';
import { useProfile } from '../context/ProfileContext';
import { 
  GenderPreference,
  SkinTone, 
  Undertone, 
  PersonalStyle, 
  ProductCategory, 
  BudgetRange, 
  Occasion,
  QuizAnswers 
} from '../types';
import { ArrowLeft, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

const STEP_TITLES = [
  'Gender Focus',
  'Skin Tone',
  'Undertone',
  'Style',
  'Categories',
  'Budget & Occasion',
];

export const DiscoverPage: React.FC = () => {
  const navigate = useNavigate();
  const { quizAnswers, saveQuizAnswers } = useProfile();

  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form states initialized from saved profile or sensible defaults
  const [genderPreference, setGenderPreference] = useState<GenderPreference>(
    quizAnswers?.genderPreference || 'women'
  );
  const [skinTone, setSkinTone] = useState<SkinTone>(quizAnswers?.skinTone || 'medium');
  const [undertone, setUndertone] = useState<Undertone>(quizAnswers?.undertone || 'warm');
  const [personalStyles, setPersonalStyles] = useState<PersonalStyle[]>(
    quizAnswers?.personalStyles || ['casual', 'minimalist']
  );
  const [categories, setCategories] = useState<ProductCategory[]>(
    quizAnswers?.categories || ['clothing', 'jewelry', 'makeup', 'accessories']
  );
  const [budget, setBudget] = useState<BudgetRange>(quizAnswers?.budget || 'all');
  const [occasions, setOccasions] = useState<Occasion[]>(quizAnswers?.occasions || ['everyday']);

  const handleToggleStyle = (style: PersonalStyle) => {
    setPersonalStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
    setErrorMessage(null);
  };

  const handleToggleCategory = (cat: ProductCategory) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setErrorMessage(null);
  };

  const handleToggleOccasion = (occ: Occasion) => {
    setOccasions((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ]
    );
  };

  const handleNext = () => {
    setErrorMessage(null);

    // Validation
    if (currentStep === 4 && personalStyles.length === 0) {
      setErrorMessage('Please select at least one personal style to tailor recommendations.');
      return;
    }
    if (currentStep === 5 && categories.length === 0) {
      setErrorMessage('Please select at least one category you want to shop for.');
      return;
    }

    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleCompleteQuiz();
    }
  };

  const handleBack = () => {
    setErrorMessage(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCompleteQuiz = () => {
    const finalAnswers: QuizAnswers = {
      genderPreference,
      skinTone,
      undertone,
      personalStyles,
      categories,
      budget,
      occasions,
    };
    saveQuizAnswers(finalAnswers);
    navigate('/results');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Quiz Stepper Header */}
      <QuizProgress
        currentStep={currentStep}
        totalSteps={6}
        stepTitles={STEP_TITLES}
      />

      {/* Error alert if validation fails */}
      {errorMessage && (
        <div className="max-w-2xl mx-auto mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Step Body */}
      <div className="min-h-[460px] flex flex-col justify-between">
        <div>
          {currentStep === 1 && (
            <GenderStep
              selectedGender={genderPreference}
              onSelectGender={setGenderPreference}
            />
          )}

          {currentStep === 2 && (
            <ToneStep
              selectedTone={skinTone}
              onSelectTone={setSkinTone}
              onApplyPhotoEstimate={(t, u) => {
                setSkinTone(t);
                setUndertone(u);
              }}
            />
          )}

          {currentStep === 3 && (
            <UndertoneStep
              selectedUndertone={undertone}
              onSelectUndertone={setUndertone}
            />
          )}

          {currentStep === 4 && (
            <StyleStep
              selectedStyles={personalStyles}
              onToggleStyle={handleToggleStyle}
            />
          )}

          {currentStep === 5 && (
            <CategoryStep
              selectedCategories={categories}
              onToggleCategory={handleToggleCategory}
            />
          )}

          {currentStep === 6 && (
            <BudgetOccasionStep
              budget={budget}
              onSelectBudget={setBudget}
              occasions={occasions}
              onToggleOccasion={handleToggleOccasion}
            />
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="max-w-3xl mx-auto w-full pt-10 mt-12 border-t border-[#292521]/10 flex items-center justify-between">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#292521]/20 hover:bg-white text-xs font-semibold text-[#292521] uppercase tracking-wider transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentStep === 6 && (
              <button
                type="button"
                onClick={handleCompleteQuiz}
                className="text-xs text-[#6E675F] hover:text-[#292521] underline mr-2 cursor-pointer"
              >
                Skip optional occasions
              </button>
            )}

            <button
              type="button"
              id="quiz-continue-button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#7A263A] hover:bg-[#5E1D2D] text-white text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg transition-all cursor-pointer hover:-translate-y-0.5"
            >
              {currentStep === 6 ? (
                <>
                  <Sparkles className="w-4 h-4 text-[#D9B98C]" />
                  Generate My Palette
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9B98C]" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
