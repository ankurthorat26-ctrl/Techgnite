import React, { createContext, useContext, useState, useEffect } from 'react';
import { QuizAnswers, PaletteRecommendation } from '../types';
import { getPaletteForAnswers } from '../data/palettes';

interface ProfileContextType {
  quizAnswers: QuizAnswers | null;
  palette: PaletteRecommendation | null;
  saveQuizAnswers: (answers: QuizAnswers) => void;
  updateToneAndUndertone: (skinTone: QuizAnswers['skinTone'], undertone: QuizAnswers['undertone']) => void;
  clearProfile: () => void;
  hasCompletedQuiz: boolean;
}

const STORAGE_KEY = 'shadematch_quiz_answers';

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved quiz answers', e);
    }
    return null;
  });

  const [palette, setPalette] = useState<PaletteRecommendation | null>(() => {
    if (quizAnswers) {
      return getPaletteForAnswers(quizAnswers.skinTone, quizAnswers.undertone);
    }
    return null;
  });

  useEffect(() => {
    if (quizAnswers) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(quizAnswers));
      } catch (e) {
        console.warn('Failed to save quiz answers to localStorage', e);
      }
      setPalette(getPaletteForAnswers(quizAnswers.skinTone, quizAnswers.undertone));
    } else {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.warn('Failed to remove quiz answers from localStorage', e);
      }
      setPalette(null);
    }
  }, [quizAnswers]);

  const saveQuizAnswers = (answers: QuizAnswers) => {
    const updated = {
      ...answers,
      completedAt: new Date().toISOString(),
    };
    setQuizAnswers(updated);
  };

  const updateToneAndUndertone = (skinTone: QuizAnswers['skinTone'], undertone: QuizAnswers['undertone']) => {
    if (!quizAnswers) {
      const defaultAnswers: QuizAnswers = {
        genderPreference: 'all',
        skinTone,
        undertone,
        personalStyles: ['casual', 'minimalist'],
        categories: ['clothing', 'jewelry', 'makeup', 'accessories'],
        budget: 'all',
        occasions: ['everyday'],
        completedAt: new Date().toISOString(),
      };
      setQuizAnswers(defaultAnswers);
      return;
    }
    setQuizAnswers({
      ...quizAnswers,
      skinTone,
      undertone,
    });
  };

  const clearProfile = () => {
    setQuizAnswers(null);
    setPalette(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear profile from localStorage', e);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        quizAnswers,
        palette,
        saveQuizAnswers,
        updateToneAndUndertone,
        clearProfile,
        hasCompletedQuiz: !!quizAnswers,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export function useProfile(): ProfileContextType {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
