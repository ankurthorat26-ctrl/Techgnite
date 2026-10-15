import { 
  OutfitRecommendation, 
  PersonalStyle, 
  Occasion, 
  ColorSwatchItem, 
  BudgetRange,
  GenderPreference
} from '../types';
import { PRODUCTS } from '../data/products';
import { checkGenderCompatibility } from './engine';

export interface StyleAssistantQuery {
  occasion: Occasion;
  style: PersonalStyle;
  budget: BudgetRange;
  gender?: GenderPreference;
  primaryCategory?: string;
  favoriteColorTone?: string;
}

export function generateOutfits(query: StyleAssistantQuery): OutfitRecommendation[] {
  const userGender = query.gender || 'all';

  // Filter products by gender compatibility first
  const pool = PRODUCTS.filter((p) => checkGenderCompatibility(p.gender, userGender));

  // Split catalog by category
  const clothes = pool.filter((p) => p.category === 'clothing');
  const makeup = pool.filter((p) => p.category === 'makeup');
  const jewelry = pool.filter((p) => p.category === 'jewelry');
  const accessories = pool.filter((p) => p.category === 'accessories');

  // Fallbacks if pool is empty for any subcategory
  const fallbackClothes = PRODUCTS.filter((p) => p.category === 'clothing');
  const fallbackJewelry = PRODUCTS.filter((p) => p.category === 'jewelry');
  const fallbackMakeup = PRODUCTS.filter((p) => p.category === 'makeup');
  const fallbackAcc = PRODUCTS.filter((p) => p.category === 'accessories');

  // Outfit 1: Signature Ensemble (Clothing + Jewelry + Makeup/Grooming or Accessory)
  const c1 = clothes.find(
    (c) => c.suggestedStyle.includes(query.style) || c.relevantOccasions.includes(query.occasion)
  ) || clothes[0] || fallbackClothes[0];

  const j1 = jewelry.find(
    (j) => j.compatibleUndertones?.some((u) => c1.compatibleUndertones?.includes(u))
  ) || jewelry[0] || fallbackJewelry[0];

  const m1 = (userGender === 'men' ? accessories : makeup).find(
    (item) => item.compatibleUndertones?.some((u) => c1.compatibleUndertones?.includes(u))
  ) || (userGender === 'men' ? accessories[0] : makeup[0]) || fallbackAcc[0];

  const items1 = [c1, j1, m1].filter(Boolean);
  const total1 = items1.reduce((sum, item) => sum + item.price, 0);

  const palette1: ColorSwatchItem[] = [
    { name: c1.availableColors[0]?.name || 'Warm Terracotta', hex: c1.availableColors[0]?.hex || '#C25E43' },
    { name: j1.availableColors[0]?.name || 'Champagne Gold', hex: j1.availableColors[0]?.hex || '#D9B98C' },
    { name: m1.availableColors[0]?.name || 'Cognac Earth', hex: m1.availableColors[0]?.hex || '#A65A42' },
  ];

  const genderLabel = userGender === 'men' ? "Men's " : userGender === 'women' ? "Women's " : '';

  const outfit1: OutfitRecommendation = {
    id: 'outfit-signature-ensemble',
    name: `${c1.brand} ${genderLabel}${query.style === 'ethnic_indowestern' ? 'Artisanal Ensemble' : 'Signature Tailoring'}`,
    description: `A thoughtfully balanced look centering on the ${c1.name}, accented by complementary ${j1.brand} craftsmanship.`,
    occasion: query.occasion,
    style: query.style,
    gender: userGender,
    suggestedColors: palette1,
    items: items1,
    totalPrice: total1,
    explanation: `The texture and cut of ${c1.name} creates an earthy, grounded canvas. Pairing it with ${j1.name} introduces high-contrast metallic lustre, while ${m1.name} coordinates the complete ensemble in harmonious undertone depth.`,
  };

  // Outfit 2: Contemporary Modern (Clothing + Accessory + Jewelry)
  const c2 = clothes.find(
    (c) => c.id !== c1.id && (c.relevantOccasions.includes(query.occasion) || c.price < 2500)
  ) || clothes[1] || clothes[0] || fallbackClothes[1];

  const a2 = accessories.find(
    (a) => a.id !== m1.id && (a.suggestedStyle.includes(query.style) || a.compatibleUndertones?.some((u) => c2.compatibleUndertones?.includes(u)))
  ) || accessories[0] || fallbackAcc[0];

  const j2 = jewelry.find(
    (j) => j.id !== j1.id
  ) || jewelry[1] || jewelry[0] || fallbackJewelry[1];

  const items2 = [c2, a2, j2].filter(Boolean);
  const total2 = items2.reduce((sum, item) => sum + item.price, 0);

  const palette2: ColorSwatchItem[] = [
    { name: c2.availableColors[0]?.name || 'Espresso', hex: c2.availableColors[0]?.hex || '#292521' },
    { name: a2.availableColors[0]?.name || 'Ivory Cream', hex: a2.availableColors[0]?.hex || '#F7F0E8' },
    { name: j2.availableColors[0]?.name || 'Lustre Metal', hex: j2.availableColors[0]?.hex || '#D9B98C' },
  ];

  const outfit2: OutfitRecommendation = {
    id: 'outfit-contemporary-chic',
    name: `${genderLabel}Monochrome Quiet Poise`,
    description: 'Understated refinement built around tailored architectural silhouettes and tactile leather/metal accessories.',
    occasion: query.occasion,
    style: query.style,
    gender: userGender,
    suggestedColors: palette2,
    items: items2,
    totalPrice: total2,
    explanation: `The clean cut of ${c2.name} establishes sharp lines. Accenting with ${a2.name} provides modern utility without visual clutter, perfectly finished by ${j2.name}.`,
  };

  // Outfit 3: Complete Editorial Look
  const c3 = clothes.find(
    (c) => c.id !== c1.id && c.id !== c2.id
  ) || clothes[2] || clothes[0] || fallbackClothes[2];

  const m3 = (userGender === 'men' ? pool.filter(p => p.category === 'clothing') : makeup).find(
    (item) => item.id !== c1.id && item.id !== c2.id && item.id !== c3.id
  ) || (userGender === 'men' ? pool.find(p => p.id === 'prod-men-acc-03') : makeup[1]) || accessories[1] || fallbackAcc[1];

  const a3 = accessories.find(
    (a) => a.id !== a2.id && a.id !== m1.id && a.id !== m3.id
  ) || accessories[1] || accessories[0] || fallbackAcc[2];

  const items3 = [c3, m3, a3].filter(Boolean);
  const total3 = items3.reduce((sum, item) => sum + item.price, 0);

  const palette3: ColorSwatchItem[] = [
    { name: c3.availableColors[0]?.name || 'Deep Berry', hex: c3.availableColors[0]?.hex || '#7A263A' },
    { name: m3?.availableColors[0]?.name || 'Champagne Glow', hex: m3?.availableColors[0]?.hex || '#D9B98C' },
    { name: a3.availableColors[0]?.name || 'Cognac Tan', hex: a3.availableColors[0]?.hex || '#A65A42' },
  ];

  const outfit3: OutfitRecommendation = {
    id: 'outfit-statement-glamour',
    name: `${genderLabel}Evening Radiance & Contrast`,
    description: 'An evocative look designed for vibrant self-expression, blending rich jewel pigment and glowing finish.',
    occasion: query.occasion,
    style: query.style,
    gender: userGender,
    suggestedColors: palette3,
    items: items3,
    totalPrice: total3,
    explanation: `Deep saturated hues in ${c3.name} create high visual impact. Adding ${m3.name} and the sculptural profile of ${a3.name} yields an editorial balance that photographs gorgeously.`,
  };

  return [outfit1, outfit2, outfit3];
}
