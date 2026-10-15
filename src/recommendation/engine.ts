import { 
  Product, 
  QuizAnswers, 
  MatchScoreResult, 
  BudgetRange, 
  Undertone, 
  SkinTone,
  GenderPreference,
  ProductGender
} from '../types';

export const SCORING_WEIGHTS = {
  COLOR: 0.40,
  STYLE: 0.25,
  CATEGORY: 0.20,
  OCCASION: 0.10,
  BUDGET: 0.05,
};

export const BUDGET_LIMITS: Record<BudgetRange, { min: number; max: number }> = {
  under_500: { min: 0, max: 500 },
  '500_1000': { min: 500, max: 1000 },
  '1000_2500': { min: 1000, max: 2500 },
  '2500_above': { min: 2500, max: 100000 },
  all: { min: 0, max: 100000 },
};

export function checkBudgetCompatibility(price: number, budget: BudgetRange): boolean {
  if (budget === 'all') return true;
  const range = BUDGET_LIMITS[budget];
  return price >= range.min && price <= range.max;
}

export function checkGenderCompatibility(
  productGender?: ProductGender, 
  userGender?: GenderPreference
): boolean {
  if (!userGender || userGender === 'all') return true;
  if (!productGender || productGender === 'unisex') return true;
  return productGender === userGender;
}

export function calculateColorScore(
  product: Product, 
  userUndertone: Undertone, 
  userSkinTone: SkinTone
): { score: number; reason: string } {
  // If user selected not sure, universal colors score high (85-100)
  if (userUndertone === 'not_sure' || userSkinTone === 'not_sure') {
    const isUniversal = product.colorCompatibilityTags.includes('universal') || 
                        product.compatibleUndertones?.includes('not_sure') ||
                        product.colorCompatibilityTags.includes('neutral');
    if (isUniversal) {
      return { score: 100, reason: 'Versatile universal shade tailored for exploratory palettes.' };
    }
    return { score: 85, reason: 'Balanced color profile suitable for versatile experimentation.' };
  }

  // Exact undertone match
  const undertoneMatch = product.compatibleUndertones?.includes(userUndertone);
  const neutralFallback = product.compatibleUndertones?.includes('neutral') || userUndertone === 'neutral';
  
  // Skin tone match
  const skinToneMatch = !product.compatibleSkinTones || product.compatibleSkinTones.includes(userSkinTone);

  if (undertoneMatch && skinToneMatch) {
    return { score: 100, reason: `Direct harmony with your ${userUndertone} undertone.` };
  }
  if (undertoneMatch) {
    return { score: 90, reason: `Matches your ${userUndertone} undertone temperature.` };
  }
  if (neutralFallback) {
    return { score: 80, reason: 'Balanced neutral shade that complements your undertone seamlessly.' };
  }

  // Check color compatibility tags
  if (userUndertone === 'warm' && product.colorCompatibilityTags.some(t => ['warm', 'gold', 'earth', 'terracotta', 'peach'].includes(t))) {
    return { score: 85, reason: 'Warm undertone harmony in rich earth & golden hues.' };
  }
  if (userUndertone === 'cool' && product.colorCompatibilityTags.some(t => ['cool', 'silver', 'berry', 'blue', 'jewel'].includes(t))) {
    return { score: 85, reason: 'Cool undertone harmony with crisp jewel & berry tones.' };
  }

  return { score: 50, reason: 'Contrast experimental shade outside core palette.' };
}

export function calculateStyleScore(
  product: Product, 
  userStyles: string[]
): { score: number; matchedStyles: string[] } {
  if (!userStyles || userStyles.length === 0) {
    return { score: 80, matchedStyles: ['All Styles'] };
  }

  const matches = product.suggestedStyle.filter(s => userStyles.includes(s));
  if (matches.length > 0) {
    const ratio = matches.length / Math.min(product.suggestedStyle.length, userStyles.length);
    const score = Math.min(100, Math.round(75 + (ratio * 25)));
    return { score, matchedStyles: matches };
  }

  return { score: 40, matchedStyles: [] };
}

export function calculateCategoryScore(
  product: Product, 
  userCategories: string[]
): { score: number; matches: boolean } {
  if (!userCategories || userCategories.length === 0) {
    return { score: 100, matches: true };
  }
  const matches = userCategories.includes(product.category);
  return { score: matches ? 100 : 30, matches };
}

export function calculateOccasionScore(
  product: Product, 
  userOccasions: string[]
): { score: number; matchedOccasions: string[] } {
  if (!userOccasions || userOccasions.length === 0) {
    return { score: 90, matchedOccasions: ['Everyday Versatility'] };
  }

  const matches = product.relevantOccasions.filter(o => userOccasions.includes(o));
  if (matches.length > 0) {
    return { score: 100, matchedOccasions: matches };
  }
  return { score: 50, matchedOccasions: [] };
}

export function calculateBudgetScore(
  product: Product, 
  budget: BudgetRange
): { score: number; matches: boolean } {
  if (budget === 'all') return { score: 100, matches: true };
  const matches = checkBudgetCompatibility(product.price, budget);
  return { score: matches ? 100 : 20, matches };
}

export function evaluateProductMatch(
  product: Product, 
  quizAnswers: QuizAnswers
): MatchScoreResult {
  const { score: colorScore, reason: colorReason } = calculateColorScore(
    product, 
    quizAnswers.undertone, 
    quizAnswers.skinTone
  );
  
  const { score: styleScore, matchedStyles } = calculateStyleScore(
    product, 
    quizAnswers.personalStyles
  );

  const { score: categoryScore } = calculateCategoryScore(
    product, 
    quizAnswers.categories
  );

  const { score: occasionScore, matchedOccasions } = calculateOccasionScore(
    product, 
    quizAnswers.occasions
  );

  const { score: budgetScore } = calculateBudgetScore(
    product, 
    quizAnswers.budget
  );

  const weightedTotal = Math.round(
    (colorScore * SCORING_WEIGHTS.COLOR) +
    (styleScore * SCORING_WEIGHTS.STYLE) +
    (categoryScore * SCORING_WEIGHTS.CATEGORY) +
    (occasionScore * SCORING_WEIGHTS.OCCASION) +
    (budgetScore * SCORING_WEIGHTS.BUDGET)
  );

  const reasons: string[] = [];
  reasons.push(colorReason);
  
  if (matchedStyles.length > 0) {
    reasons.push(`Aligns with your ${matchedStyles.map(s => s.replace('_', ' ')).join(', ')} style.`);
  }
  if (matchedOccasions.length > 0) {
    reasons.push(`Ideal for ${matchedOccasions.map(o => o.replace('_', ' ')).join(' & ')}.`);
  }

  return {
    product,
    score: Math.min(100, Math.max(0, weightedTotal)),
    breakdown: {
      colorScore,
      styleScore,
      categoryScore,
      occasionScore,
      budgetScore,
    },
    reasons,
  };
}

export function getRecommendedProducts(
  products: Product[],
  quizAnswers: QuizAnswers,
  enforceBudgetFilter = true
): MatchScoreResult[] {
  let filtered = products;

  // Strict budget filtering
  if (enforceBudgetFilter && quizAnswers.budget && quizAnswers.budget !== 'all') {
    filtered = filtered.filter(p => checkBudgetCompatibility(p.price, quizAnswers.budget));
  }

  // Gender filtering
  if (quizAnswers.genderPreference && quizAnswers.genderPreference !== 'all') {
    filtered = filtered.filter(p => checkGenderCompatibility(p.gender, quizAnswers.genderPreference));
  }

  // Calculate scores
  const scored = filtered.map(product => evaluateProductMatch(product, quizAnswers));

  // Sort descending by match score
  scored.sort((a, b) => b.score - a.score);

  return scored;
}
