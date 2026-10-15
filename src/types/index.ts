export type SkinTone = 'fair' | 'light' | 'medium' | 'tan' | 'deep' | 'not_sure';

export type Undertone = 'warm' | 'cool' | 'neutral' | 'not_sure';

export type GenderPreference = 'all' | 'women' | 'men';

export type ProductGender = 'women' | 'men' | 'unisex';

export type PersonalStyle = 
  | 'minimalist' 
  | 'casual' 
  | 'trendy' 
  | 'streetwear' 
  | 'elegant' 
  | 'ethnic_indowestern' 
  | 'romantic' 
  | 'bold';

export type ProductCategory = 'clothing' | 'makeup' | 'jewelry' | 'accessories';

export type Occasion = 
  | 'everyday' 
  | 'college' 
  | 'party' 
  | 'wedding_festive' 
  | 'office' 
  | 'special_occasion';

export type BudgetRange = 'under_500' | '500_1000' | '1000_2500' | '2500_above' | 'all';

export interface ColorSwatchItem {
  name: string;
  hex: string;
  description?: string;
  category?: 'primary' | 'neutral' | 'accent' | 'clothing' | 'makeup' | 'jewelry';
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number; // in INR
  image: string;
  fallbackColor?: string;
  availableColors: { name: string; hex: string }[];
  suggestedStyle: PersonalStyle[];
  relevantOccasions: Occasion[];
  shortDescription: string;
  retailerName: string;
  retailerUrl?: string;
  colorCompatibilityTags: string[]; // e.g. ['warm', 'neutral', 'earth', 'terracotta']
  compatibleSkinTones?: SkinTone[];
  compatibleUndertones?: Undertone[];
  gender?: ProductGender;
  isSample: boolean;
  rating?: number;
  featured?: boolean;
}

export interface QuizAnswers {
  genderPreference: GenderPreference;
  skinTone: SkinTone;
  undertone: Undertone;
  photoUploaded?: boolean;
  photoPreviewUrl?: string;
  personalStyles: PersonalStyle[];
  categories: ProductCategory[];
  budget: BudgetRange;
  maxBudget?: number;
  occasions: Occasion[];
  completedAt?: string;
}

export interface PaletteRecommendation {
  id: string;
  name: string;
  subtitle: string;
  skinTone: SkinTone;
  undertone: Undertone;
  description: string;
  bestStartingColors: ColorSwatchItem[];
  neutrals: ColorSwatchItem[];
  accents: ColorSwatchItem[];
  clothingSuggestions: string[];
  jewelrySuggestions: {
    metals: string[];
    description: string;
    gemstones: string[];
  };
  makeupSuggestions: {
    lipColors: string[];
    blushTones: string[];
    eyeShades: string[];
    tips: string;
  };
}

export interface MatchScoreResult {
  product: Product;
  score: number; // 0 to 100
  breakdown: {
    colorScore: number; // weight 40%
    styleScore: number; // weight 25%
    categoryScore: number; // weight 20%
    occasionScore: number; // weight 10%
    budgetScore: number; // weight 5%
  };
  reasons: string[];
}

export interface OutfitRecommendation {
  id: string;
  name: string;
  description: string;
  occasion: Occasion;
  style: PersonalStyle;
  gender?: GenderPreference;
  suggestedColors: ColorSwatchItem[];
  items: Product[];
  totalPrice: number;
  explanation: string;
}

export interface SavedOutfit {
  id: string;
  name: string;
  description: string;
  totalPrice: number;
  items: Product[];
  suggestedColors: ColorSwatchItem[];
  savedAt: string;
}
