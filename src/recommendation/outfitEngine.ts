import { 
  OutfitRecommendation, 
  PersonalStyle, 
  Occasion, 
  ColorSwatchItem, 
  BudgetRange,
  GenderPreference,
  Product
} from '../types';
import { PRODUCTS } from '../data/products';
import { checkGenderCompatibility, checkBudgetCompatibility } from './engine';

export interface StyleAssistantQuery {
  occasion: Occasion;
  style: PersonalStyle;
  budget: BudgetRange;
  gender?: GenderPreference;
  primaryCategory?: string;
  favoriteColorTone?: string;
}

/**
 * Filter and sort products for a specific gender archetype,
 * strictly prioritizing items designed directly for that gender.
 */
function getGenderPool(gender: GenderPreference): Product[] {
  return PRODUCTS.filter((p) => checkGenderCompatibility(p.gender, gender)).sort((a, b) => {
    // Direct gender matches come before unisex items
    if (gender !== 'all') {
      const aDirect = a.gender === gender ? 1 : 0;
      const bDirect = b.gender === gender ? 1 : 0;
      if (aDirect !== bDirect) return bDirect - aDirect;
    }
    return 0;
  });
}

function buildColorPalette(items: (Product | undefined)[]): ColorSwatchItem[] {
  const swatches: ColorSwatchItem[] = [];
  items.filter((item): item is Product => Boolean(item)).forEach((item) => {
    if (item.availableColors && item.availableColors.length > 0) {
      const color = item.availableColors[0];
      if (!swatches.some((s) => s.hex.toLowerCase() === color.hex.toLowerCase())) {
        swatches.push({ name: color.name, hex: color.hex });
      }
    }
  });

  // Ensure at least 3 swatches
  const defaultColors: ColorSwatchItem[] = [
    { name: 'Warm Terracotta', hex: '#C25E43' },
    { name: 'Champagne Gold', hex: '#D9B98C' },
    { name: 'Rich Espresso', hex: '#292521' },
  ];

  while (swatches.length < 3) {
    const fallback = defaultColors[swatches.length];
    if (fallback && !swatches.some((s) => s.hex.toLowerCase() === fallback.hex.toLowerCase())) {
      swatches.push(fallback);
    } else {
      break;
    }
  }

  return swatches.slice(0, 3);
}

export function generateOutfits(query: StyleAssistantQuery): OutfitRecommendation[] {
  const userGender = query.gender || 'all';

  if (userGender === 'men') {
    return generateMenOutfits(query);
  } else if (userGender === 'women') {
    return generateWomenOutfits(query);
  } else {
    return generateAllGenderOutfits(query);
  }
}

/**
 * Generate 3 dedicated menswear ensembles strictly using men's and unisex-friendly menswear items.
 */
function generateMenOutfits(query: StyleAssistantQuery): OutfitRecommendation[] {
  const pool = getGenderPool('men');
  const clothes = pool.filter((p) => p.category === 'clothing');
  const jewelry = pool.filter((p) => p.category === 'jewelry');
  const accessories = pool.filter((p) => p.category === 'accessories');
  const grooming = pool.filter((p) => p.category === 'makeup'); // men's lip balm, concealer

  // Outfit 1: Artisanal / Heritage Menswear (Kurta / Bandhgala / Linen + Signet Ring / Cuban Chain + Leather Wallet / Balm)
  const c1 = clothes.find(
    (c) => (c.suggestedStyle.includes(query.style) || c.relevantOccasions.includes(query.occasion)) &&
           c.gender === 'men'
  ) || clothes.find((c) => c.gender === 'men') || clothes[0];

  const j1 = jewelry.find(
    (j) => j.gender === 'men' && j.compatibleUndertones?.some((u) => c1?.compatibleUndertones?.includes(u))
  ) || jewelry.find((j) => j.gender === 'men') || jewelry[0];

  const m1 = accessories.find((a) => a.gender === 'men') || 
             grooming.find((g) => g.gender === 'men') || 
             accessories[0];

  const items1 = [c1, j1, m1].filter((item): item is Product => Boolean(item));
  const total1 = items1.reduce((sum, item) => sum + item.price, 0);

  const outfit1: OutfitRecommendation = {
    id: 'outfit-men-signature',
    name: `${c1?.brand || 'Manyavar'} Men's ${query.style === 'ethnic_indowestern' ? 'Artisanal Festive Ensemble' : 'Heritage Tailoring'}`,
    description: `A distinguished masculine ensemble centering on the ${c1?.name || 'tailored apparel'}, accented by ${j1?.name || 'signature jewelry'} and functional leather craftsmanship.`,
    occasion: query.occasion,
    style: query.style,
    gender: 'men',
    suggestedColors: buildColorPalette(items1),
    items: items1,
    totalPrice: total1,
    explanation: `The sharp cut of the ${c1?.name} sets a stately tone. Paired with ${j1?.name} and finished with ${m1?.name}, this look achieves balanced proportion and timeless sophistication without visual clutter.`,
  };

  // Outfit 2: Contemporary Modern (Blazer / Polo Sweater / Chinos + Leather Bracelet / Chain + Messenger Bag / Pocket Square)
  const c2 = clothes.find(
    (c) => c.id !== c1?.id && (c.relevantOccasions.includes(query.occasion) || c.suggestedStyle.includes(query.style))
  ) || clothes.find((c) => c.id !== c1?.id) || clothes[1] || clothes[0];

  const j2 = jewelry.find((j) => j.id !== j1?.id) || jewelry[1] || jewelry[0];

  const a2 = accessories.find((a) => a.id !== m1?.id && a.gender === 'men') || 
             accessories.find((a) => a.id !== m1?.id) || 
             accessories[1] || 
             accessories[0];

  const items2 = [c2, a2, j2].filter((item): item is Product => Boolean(item));
  const total2 = items2.reduce((sum, item) => sum + item.price, 0);

  const outfit2: OutfitRecommendation = {
    id: 'outfit-men-contemporary',
    name: "Men's Monochrome Tailored Poise",
    description: 'Understated smart-casual poise pairing versatile menswear silhouettes with tactile leather accessories and geometric metal accents.',
    occasion: query.occasion,
    style: query.style,
    gender: 'men',
    suggestedColors: buildColorPalette(items2),
    items: items2,
    totalPrice: total2,
    explanation: `Clean architectural lines from ${c2?.name} create an effortless foundation. Accenting with ${a2?.name} and finished by ${j2?.name} delivers rugged, purposeful charm.`,
  };

  // Outfit 3: Editorial Layered Look (Menswear Top + Layer/Trousers or Grooming + Statement Silk Pocket Square / Stole)
  const c3 = clothes.find((c) => c.id !== c1?.id && c.id !== c2?.id) || clothes[2] || clothes[0];

  const m3 = grooming.find((g) => g.gender === 'men') || 
             clothes.find((c) => c.id !== c1?.id && c.id !== c2?.id && c.id !== c3?.id) || 
             accessories.find((a) => a.id !== m1?.id && a.id !== a2?.id) || 
             jewelry.find((j) => j.id !== j1?.id && j.id !== j2?.id);

  const a3 = accessories.find((a) => a.id !== m1?.id && a.id !== a2?.id && a.id !== m3?.id) || 
             accessories.find((a) => a.id !== a2?.id) || 
             accessories[0];

  const items3 = [c3, m3, a3].filter((item): item is Product => Boolean(item));
  const total3 = items3.reduce((sum, item) => sum + item.price, 0);

  const outfit3: OutfitRecommendation = {
    id: 'outfit-men-editorial',
    name: "Men's Evening Grandeur & Contrast",
    description: 'A striking evening menswear curation built around rich pigments, refined drape, and artisanal silk accessories.',
    occasion: query.occasion,
    style: query.style,
    gender: 'men',
    suggestedColors: buildColorPalette(items3),
    items: items3,
    totalPrice: total3,
    explanation: `Deep saturated hues in ${c3?.name || 'the tailored garment'} command attention. Completing the look with ${m3?.name || 'essential grooming'} and ${a3?.name || 'coordinated accessories'} achieves an editorial, photography-ready finish.`,
  };

  return [outfit1, outfit2, outfit3];
}

/**
 * Generate 3 dedicated womenswear ensembles strictly using women's and unisex-friendly womenswear items.
 */
function generateWomenOutfits(query: StyleAssistantQuery): OutfitRecommendation[] {
  const pool = getGenderPool('women');
  const clothes = pool.filter((p) => p.category === 'clothing');
  const jewelry = pool.filter((p) => p.category === 'jewelry');
  const accessories = pool.filter((p) => p.category === 'accessories');
  const makeup = pool.filter((p) => p.category === 'makeup');

  // Outfit 1: Signature Ensemble (Dress / Kurta + Earrings / Choker + Hydrating Lipstick / Blush)
  const c1 = clothes.find(
    (c) => (c.suggestedStyle.includes(query.style) || c.relevantOccasions.includes(query.occasion)) &&
           c.gender === 'women'
  ) || clothes.find((c) => c.gender === 'women') || clothes[0];

  const j1 = jewelry.find(
    (j) => j.gender === 'women' && j.compatibleUndertones?.some((u) => c1?.compatibleUndertones?.includes(u))
  ) || jewelry.find((j) => j.gender === 'women') || jewelry[0];

  const m1 = makeup.find(
    (m) => m.gender === 'women' && m.compatibleUndertones?.some((u) => c1?.compatibleUndertones?.includes(u))
  ) || makeup.find((m) => m.gender === 'women') || makeup[0];

  const items1 = [c1, j1, m1].filter((item): item is Product => Boolean(item));
  const total1 = items1.reduce((sum, item) => sum + item.price, 0);

  const outfit1: OutfitRecommendation = {
    id: 'outfit-women-signature',
    name: `${c1?.brand || 'Anouk'} Women's ${query.style === 'ethnic_indowestern' ? 'Artisanal Ensemble' : 'Signature Tailoring'}`,
    description: `A thoughtfully balanced look centering on the ${c1?.name || 'dress'}, accented by complementary ${j1?.brand || 'fine jewelry'} craftsmanship and glowing undertone pigments.`,
    occasion: query.occasion,
    style: query.style,
    gender: 'women',
    suggestedColors: buildColorPalette(items1),
    items: items1,
    totalPrice: total1,
    explanation: `The fluid silhouette of ${c1?.name} creates an evocative foundation. Pairing it with ${j1?.name} introduces high-contrast metallic lustre, while ${m1?.name} unifies the complete palette with undertone warmth.`,
  };

  // Outfit 2: Contemporary Modern (Blazer / Wide-Leg Trousers / Poplin Shirt + Handbag / Baguette + Fine Jewelry)
  const c2 = clothes.find(
    (c) => c.id !== c1?.id && (c.relevantOccasions.includes(query.occasion) || c.suggestedStyle.includes(query.style))
  ) || clothes.find((c) => c.id !== c1?.id) || clothes[1] || clothes[0];

  const a2 = accessories.find(
    (a) => a.gender === 'women' && (a.suggestedStyle.includes(query.style) || a.compatibleUndertones?.some((u) => c2?.compatibleUndertones?.includes(u)))
  ) || accessories.find((a) => a.gender === 'women') || accessories[0];

  const j2 = jewelry.find((j) => j.id !== j1?.id) || jewelry[1] || jewelry[0];

  const items2 = [c2, a2, j2].filter((item): item is Product => Boolean(item));
  const total2 = items2.reduce((sum, item) => sum + item.price, 0);

  const outfit2: OutfitRecommendation = {
    id: 'outfit-women-contemporary',
    name: "Women's Monochrome Quiet Poise",
    description: 'Understated refinement built around tailored architectural silhouettes and tactile leather/metal accessories.',
    occasion: query.occasion,
    style: query.style,
    gender: 'women',
    suggestedColors: buildColorPalette(items2),
    items: items2,
    totalPrice: total2,
    explanation: `The clean cut of ${c2?.name} establishes sharp lines. Accenting with ${a2?.name} provides modern utility without visual clutter, perfectly finished by ${j2?.name}.`,
  };

  // Outfit 3: Complete Editorial Look (Evening Slip Dress / Tunic + Berry Lip Cream / Eyeshadow + Statement Bag / Stole)
  const c3 = clothes.find((c) => c.id !== c1?.id && c.id !== c2?.id) || clothes[2] || clothes[0];

  const m3 = makeup.find((m) => m.id !== m1?.id) || makeup[1] || makeup[0];

  const a3 = accessories.find((a) => a.id !== a2?.id) || accessories[1] || accessories[0];

  const items3 = [c3, m3, a3].filter((item): item is Product => Boolean(item));
  const total3 = items3.reduce((sum, item) => sum + item.price, 0);

  const outfit3: OutfitRecommendation = {
    id: 'outfit-women-editorial',
    name: "Women's Evening Radiance & Contrast",
    description: 'An evocative evening look designed for vibrant self-expression, blending rich jewel pigment and glowing finish.',
    occasion: query.occasion,
    style: query.style,
    gender: 'women',
    suggestedColors: buildColorPalette(items3),
    items: items3,
    totalPrice: total3,
    explanation: `Deep saturated hues in ${c3?.name} create high visual impact. Adding ${m3?.name} and the sculptural profile of ${a3?.name} yields an editorial balance that photographs gorgeously.`,
  };

  return [outfit1, outfit2, outfit3];
}

/**
 * When user selects 'all', provide a balanced, gender-coherent showcase:
 * 1. Curated Women's Ensemble
 * 2. Curated Men's Ensemble
 * 3. Contemporary Fluid / Unisex Ensemble
 */
function generateAllGenderOutfits(query: StyleAssistantQuery): OutfitRecommendation[] {
  const womenOutfits = generateWomenOutfits(query);
  const menOutfits = generateMenOutfits(query);

  const outfit1 = womenOutfits[0];
  const outfit2 = menOutfits[0];

  // Outfit 3: Fluid / Unisex Contemporary Ensemble
  const unisexPool = PRODUCTS.filter((p) => p.gender === 'unisex');
  const unisexClothes = unisexPool.filter((p) => p.category === 'clothing');
  const unisexJewel = unisexPool.filter((p) => p.category === 'jewelry');
  const unisexAcc = unisexPool.filter((p) => p.category === 'accessories');

  const c3 = unisexClothes[0] || PRODUCTS.find((p) => p.id === 'prod-cloth-08') || PRODUCTS[0];
  const j3 = unisexJewel[0] || PRODUCTS.find((p) => p.id === 'prod-jewel-05') || PRODUCTS[1];
  const a3 = unisexAcc[0] || PRODUCTS.find((p) => p.id === 'prod-acc-03') || PRODUCTS[2];

  const items3 = [c3, j3, a3].filter((item): item is Product => Boolean(item));
  const total3 = items3.reduce((sum, item) => sum + item.price, 0);

  const outfit3: OutfitRecommendation = {
    id: 'outfit-unisex-modern',
    name: 'Gender-Fluid Modern Minimalist',
    description: 'A contemporary gender-neutral curation highlighting timeless craftsmanship, liquid silver lines, and pure handwoven warmth.',
    occasion: query.occasion,
    style: query.style,
    gender: 'all',
    suggestedColors: buildColorPalette(items3),
    items: items3,
    totalPrice: total3,
    explanation: `Centered around the crisp tailoring of ${c3?.name}, effortlessly accented with ${j3?.name} and the soft drape of ${a3?.name} for universally flattering everyday refinement.`,
  };

  return [outfit1, outfit2, outfit3];
}
