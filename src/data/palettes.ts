import { PaletteRecommendation, SkinTone, Undertone } from '../types';

export const PALETTES: Record<string, PaletteRecommendation> = {
  'warm_fair_light': {
    id: 'warm_fair_light',
    name: 'Peach & Golden Almond',
    subtitle: 'Warm Fair to Light Harmony',
    skinTone: 'light',
    undertone: 'warm',
    description: 'Soft golden reflections, peachy warmth, and honey undertones harmonize beautifully with earth tones, warm ivories, and glowing corals.',
    bestStartingColors: [
      { name: 'Warm Terracotta', hex: '#C25E43' },
      { name: 'Warm Ivory', hex: '#F7F0E8' },
      { name: 'Soft Olive', hex: '#708238' },
      { name: 'Golden Amber', hex: '#D99B26' },
      { name: 'Peachy Coral', hex: '#E77863' },
    ],
    neutrals: [
      { name: 'Cream Alabaster', hex: '#F9F5EC' },
      { name: 'Warm Camel', hex: '#C19A6B' },
      { name: 'Espresso Brown', hex: '#292521' },
      { name: 'Toasted Oat', hex: '#D6C7B2' },
    ],
    accents: [
      { name: 'Burgundy Wine', hex: '#7A263A' },
      { name: 'Forest Moss', hex: '#4A5D4E' },
      { name: 'Burnt Ochre', hex: '#BF5700' },
      { name: 'Sunset Rust', hex: '#A84C32' },
    ],
    clothingSuggestions: [
      'Warm ivory and textured linens instead of stark bluish white.',
      'Earthy greens like sage and olive for casual jackets and kurtas.',
      'Rust, terracotta, and warm brick red knitwear and tops.',
      'Camel coats and warm espresso trousers for an editorial look.',
    ],
    jewelrySuggestions: {
      metals: ['Yellow Gold (18k/22k)', 'Warm Champagne Brass', 'Soft Rose Gold'],
      description: 'Lustrous yellow gold and warm brass reflect natural peach and golden undertones with effortless warmth.',
      gemstones: ['Amber', 'Tiger Eye', 'Warm Citrine', 'Champagne Pearl'],
    },
    makeupSuggestions: {
      lipColors: ['Peachy Nude', 'Warm Coral Stain', 'Terracotta Red', 'Spiced Toffee'],
      blushTones: ['Apricot Peach', 'Warm Rosy Amber', 'Golden Coral'],
      eyeShades: ['Champagne Shimmer', 'Bronze Copper', 'Warm Taupe', 'Chocolate Brown'],
      tips: 'Choose lipsticks with yellow, peach, or brown undertones over icy magenta or blue-reds.',
    },
  },

  'warm_medium_tan': {
    id: 'warm_medium_tan',
    name: 'Spiced Saffron & Amber Olive',
    subtitle: 'Warm Medium to Tan Harmony',
    skinTone: 'medium',
    undertone: 'warm',
    description: 'Luminous olive and golden-amber undertones that come alive with rich spices, deep saffron, terracotta, and regal jewel tones.',
    bestStartingColors: [
      { name: 'Royal Terracotta', hex: '#B85333' },
      { name: 'Deep Olive Green', hex: '#556B2F' },
      { name: 'Champagne Gold', hex: '#D9B98C' },
      { name: 'Spiced Rust', hex: '#A83B24' },
      { name: 'Warm Mustard', hex: '#CC7A00' },
    ],
    neutrals: [
      { name: 'Warm Sand', hex: '#E2D1BE' },
      { name: 'Rich Espresso', hex: '#292521' },
      { name: 'Toffee Khaki', hex: '#A67B5B' },
      { name: 'Cream Silk', hex: '#F5EBE1' },
    ],
    accents: [
      { name: 'Heritage Burgundy', hex: '#7A263A' },
      { name: 'Peacock Teal', hex: '#005F73' },
      { name: 'Burnt Tangerine', hex: '#E06D37' },
      { name: 'Deep Emerald', hex: '#1B4D3E' },
    ],
    clothingSuggestions: [
      'Rich jewel tones: emerald, peacock teal, and saffron look regal and commanding.',
      'Terracotta and warm brick kurtas, shirts, and dresses create an instant healthy glow.',
      'Warm cream and champagne silks instead of stark white.',
      'Chocolate brown and espresso leather accessories complement your natural contrast.',
    ],
    jewelrySuggestions: {
      metals: ['Yellow Gold (22k/24k)', 'Antique Brass', 'Kundan & Polki Gold'],
      description: 'Deep yellow gold, antique brass, and warm kundan jewelry illuminate warm olive and golden skin tones.',
      gemstones: ['Emerald', 'Ruby', 'Carnelian', 'South Sea Golden Pearl'],
    },
    makeupSuggestions: {
      lipColors: ['Spiced Caramel', 'Warm Brick Red', 'Terracotta Rose', 'Deep Peach Nude'],
      blushTones: ['Terracotta Peach', 'Warm Burnt Rose', 'Bronze Highlighter'],
      eyeShades: ['Antique Gold', 'Burnished Bronze', 'Warm Copper', 'Deep Espresso'],
      tips: 'A swipe of warm terracotta or brick lipstick instantly enlivens your face with no heavy foundation needed.',
    },
  },

  'warm_deep': {
    id: 'warm_deep',
    name: 'Rich Mahogany & Sunset Ochre',
    subtitle: 'Warm Deep Harmony',
    skinTone: 'deep',
    undertone: 'warm',
    description: 'Deep, rich complexion with warm copper and golden undertones that reflect brilliant saturated colors, high-contrast metallics, and glowing earth tones.',
    bestStartingColors: [
      { name: 'Sunset Ochre', hex: '#D97706' },
      { name: 'Burnished Copper', hex: '#B45309' },
      { name: 'Regal Emerald', hex: '#047857' },
      { name: 'Warm Mahogany', hex: '#581C10' },
      { name: 'Champagne Lustre', hex: '#D9B98C' },
    ],
    neutrals: [
      { name: 'Warm Caramel', hex: '#9A5B2D' },
      { name: 'Deep Espresso', hex: '#1C1917' },
      { name: 'Rich Bronze', hex: '#78350F' },
      { name: 'Warm Cream', hex: '#FDF8F0' },
    ],
    accents: [
      { name: 'Cobalt Saffron', hex: '#F59E0B' },
      { name: 'Deep Burgundy', hex: '#7A263A' },
      { name: 'Imperial Violet', hex: '#4C1D95' },
      { name: 'Vibrant Tangerine', hex: '#EA580C' },
    ],
    clothingSuggestions: [
      'Bold, saturated jewel tones: electric cobalt, golden ochre, and emerald shine strikingly.',
      'Warm metallics: copper, bronze, and champagne create striking architectural elegance.',
      'Rich berry and burgundy jackets and kurtis provide refined evening glamour.',
      'High contrast styling with warm cream and deep espresso coordinates.',
    ],
    jewelrySuggestions: {
      metals: ['High-Shine Yellow Gold', 'Burnished Copper', 'Textured Brass'],
      description: 'Brilliant yellow gold and luminous brass provide dramatic, regal contrast against deep warm skin tones.',
      gemstones: ['Citrine', 'Golden Topaz', 'Deep Garnet', 'Onyx with Gold Rim'],
    },
    makeupSuggestions: {
      lipColors: ['Deep Chocolate Berry', 'Spiced Mahogany', 'Warm Ruby', 'Copper Bronze Gloss'],
      blushTones: ['Rich Terracotta', 'Deep Raisin', 'Golden Bronze Sheen'],
      eyeShades: ['Molten Gold', 'Copper Leaf', 'Deep Plum', 'Smoky Mahogany'],
      tips: 'Rich pigments with golden and berry undertones look incredibly sophisticated and never ashy.',
    },
  },

  'cool_fair_light': {
    id: 'cool_fair_light',
    name: 'Rose Quartz & Winter Berry',
    subtitle: 'Cool Fair to Light Harmony',
    skinTone: 'light',
    undertone: 'cool',
    description: 'Delicate pink, rosy, or cool porcelain undertones that flourish in crisp icy blues, soft berry shades, cool charcoals, and silvery accents.',
    bestStartingColors: [
      { name: 'Cool Berry', hex: '#8E2848' },
      { name: 'Dusty Rose', hex: '#C28493' },
      { name: 'Cool Royal Navy', hex: '#1E293B' },
      { name: 'Icy Slate Blue', hex: '#64748B' },
      { name: 'Plum Mist', hex: '#582B46' },
    ],
    neutrals: [
      { name: 'Crisp Soft White', hex: '#F8FAFC' },
      { name: 'Cool Slate Gray', hex: '#94A3B8' },
      { name: 'Charcoal Mist', hex: '#334155' },
      { name: 'Deep Midnight Navy', hex: '#0F172A' },
    ],
    accents: [
      { name: 'Burgundy Crimson', hex: '#7A263A' },
      { name: 'Vibrant Magenta', hex: '#9D174D' },
      { name: 'Icy Emerald', hex: '#0D9488' },
      { name: 'Cool Lilac', hex: '#A855F7' },
    ],
    clothingSuggestions: [
      'Crisp soft white and cool pastels illuminate rosy undertones.',
      'Rich berry, wine, and cool burgundy tops and dresses look polished and timeless.',
      'Slate blue, icy lavender, and navy are effortless staples for daily wear.',
      'Cool charcoal and heather gray tailored trousers instead of warm khaki.',
    ],
    jewelrySuggestions: {
      metals: ['Sterling Silver', 'White Gold', 'Platinum', 'Rose Gold'],
      description: 'Bright silver, platinum, and white gold echo the cool undertones with clean, luminous elegance.',
      gemstones: ['Sapphire', 'Amethyst', 'Cool Pearl', 'Rose Quartz'],
    },
    makeupSuggestions: {
      lipColors: ['Mauve Rose', 'Cool Berry Stain', 'Pink Nude', 'Classic Blue-Red'],
      blushTones: ['Cool Rose Pink', 'Soft Mauve', 'Dusty Peony'],
      eyeShades: ['Cool Taupe', 'Silver Champagne', 'Smoky Plum', 'Slate Gray'],
      tips: 'Look for lip and blush colors with blue or pink bases; avoid yellow-leaning oranges and muddy bronzers.',
    },
  },

  'cool_medium_tan': {
    id: 'cool_medium_tan',
    name: 'Midnight Plum & Regal Sapphire',
    subtitle: 'Cool Medium to Tan Harmony',
    skinTone: 'medium',
    undertone: 'cool',
    description: 'Medium to tan skin with cool rosy, cocoa, or bluish undertones that look striking in jewel tones, saturated berry wines, and platinum finishes.',
    bestStartingColors: [
      { name: 'Regal Plum', hex: '#632B56' },
      { name: 'Deep Sapphire', hex: '#1E3A8A' },
      { name: 'Burgundy Reserve', hex: '#7A263A' },
      { name: 'Cool Teal', hex: '#0E7490' },
      { name: 'Dusty Mauve', hex: '#936B82' },
    ],
    neutrals: [
      { name: 'Cool Charcoal', hex: '#374151' },
      { name: 'Midnight Navy', hex: '#111827' },
      { name: 'Soft Chalk White', hex: '#F1F5F9' },
      { name: 'Pewter Ash', hex: '#6B7280' },
    ],
    accents: [
      { name: 'Vibrant Raspberry', hex: '#BE185D' },
      { name: 'Pine Emerald', hex: '#065F46' },
      { name: 'Royal Amethyst', hex: '#6D28D9' },
      { name: 'Cool Cobalt', hex: '#2563EB' },
    ],
    clothingSuggestions: [
      'Deep sapphire blue, pine green, and berry shades make your complexion look crisp and radiant.',
      'Cool charcoal and midnight navy suits, blazers, and jackets offer sharp refinement.',
      'Burgundy and wine silhouettes provide elevated drama for evening and festive wear.',
      'Chalk white and silver-toned accents enhance your natural depth.',
    ],
    jewelrySuggestions: {
      metals: ['White Gold', 'Oxidized Silver', 'Platinum', 'Two-Tone Silver & Rose Gold'],
      description: 'Oxidized silver, white gold, and platinum accentuate the cool depth of medium-tan skin tones.',
      gemstones: ['Deep Sapphire', 'Tanzanite', 'Ruby Wine', 'Grey Pearl'],
    },
    makeupSuggestions: {
      lipColors: ['Deep Plum Wine', 'Berry Rose', 'Cool Cocoa Nude', 'Crimson Red'],
      blushTones: ['Deep Berry', 'Cool Plum Rose', 'Mauve Glow'],
      eyeShades: ['Gunmetal Shimmer', 'Deep Amethyst', 'Cool Espresso', 'Silvery Champagne'],
      tips: 'Deep berry and cool wine lip shades instantly elevate your style without overwhelming your face.',
    },
  },

  'cool_deep': {
    id: 'cool_deep',
    name: 'Royal Amethyst & Midnight Onyx',
    subtitle: 'Cool Deep Harmony',
    skinTone: 'deep',
    undertone: 'cool',
    description: 'Deep espresso complexion with rich blue, ebony, or violet undertones that carry high-drama jewel tones, icy contrasts, and silver brilliance.',
    bestStartingColors: [
      { name: 'Royal Amethyst', hex: '#581C87' },
      { name: 'Deep Cobalt', hex: '#1D4ED8' },
      { name: 'Burgundy Velvet', hex: '#7A263A' },
      { name: 'Vivid Fuchsia', hex: '#C026D3' },
      { name: 'Icy Mint Contrast', hex: '#A7F3D0' },
    ],
    neutrals: [
      { name: 'Midnight Onyx', hex: '#0B0F19' },
      { name: 'Deep Steel Gray', hex: '#1F2937' },
      { name: 'Stark Clean White', hex: '#FFFFFF' },
      { name: 'Cool Slate', hex: '#4B5563' },
    ],
    accents: [
      { name: 'Electric Violet', hex: '#7C3AED' },
      { name: 'Jewel Teal', hex: '#0891B2' },
      { name: 'Crimson Wine', hex: '#991B1B' },
      { name: 'Silver Moonbeam', hex: '#E2E8F0' },
    ],
    clothingSuggestions: [
      'Bold jewel tones: electric cobalt, vivid fuchsia, and regal amethyst look breathtaking.',
      'Stark contrast: pure white against deep skin creates high-fashion editorial impact.',
      'Cool burgundy and deep plum provide rich texture for festive and formal wear.',
      'Sleek onyx monochrome with silver metal accents.',
    ],
    jewelrySuggestions: {
      metals: ['Bright Platinum', 'Polished Silver', 'White Gold with Diamonds/CZ'],
      description: 'High-polish silver and platinum create an electric, high-fashion contrast with cool deep skin.',
      gemstones: ['Sapphire', 'Emerald', 'Deep Amethyst', 'Black Onyx with Silver'],
    },
    makeupSuggestions: {
      lipColors: ['Blackberry Wine', 'Deep Violet Plum', 'Cool Cherry', 'Frosted Berry Gloss'],
      blushTones: ['Rich Plum', 'Deep Berry Wine', 'Cool Bronzer with Sheen'],
      eyeShades: ['Midnight Blue', 'Smoky Silver', 'Violet Shimmer', 'Cool Charcoal'],
      tips: 'Rich jewel tones and deep berries make deep cool skin tones look radiant and regal.',
    },
  },

  'neutral_all': {
    id: 'neutral_all',
    name: 'Cashmere Rose & Dusty Teal',
    subtitle: 'Neutral Balance Harmony',
    skinTone: 'medium',
    undertone: 'neutral',
    description: 'The best of both worlds: balanced undertones that can effortlessly flex between warm and cool shades, soft neutrals, and muted jewel tones.',
    bestStartingColors: [
      { name: 'Dusty Teal', hex: '#3B7A87' },
      { name: 'Cashmere Rose', hex: '#B57C89' },
      { name: 'Soft Terracotta', hex: '#BC6D58' },
      { name: 'Burgundy Heritage', hex: '#7A263A' },
      { name: 'Champagne Sand', hex: '#D9B98C' },
    ],
    neutrals: [
      { name: 'Warm Ivory', hex: '#F7F0E8' },
      { name: 'Taupe Greige', hex: '#9E948B' },
      { name: 'Espresso Roast', hex: '#292521' },
      { name: 'Soft Heather Slate', hex: '#63666A' },
    ],
    accents: [
      { name: 'Deep Sage', hex: '#587B6D' },
      { name: 'Muted Coral', hex: '#DE7C68' },
      { name: 'Royal Plum', hex: '#5C2D4F' },
      { name: 'Navy Sapphire', hex: '#1E293B' },
    ],
    clothingSuggestions: [
      'You have versatile freedom! Soft muted tones like dusty teal, sage, and cashmere rose flatter effortlessly.',
      'Champagne and warm ivory offer refined quiet luxury.',
      'Mix warm camel outerwear with cool navy or charcoal trousers.',
      'Heritage burgundy and muted emerald add timeless depth for special occasions.',
    ],
    jewelrySuggestions: {
      metals: ['Mixed Metals (Gold + Silver)', 'Rose Gold', 'Soft Champagne Gold', 'Antique Silver'],
      description: 'Neutral complexions look stunning in mixed metals: pair rose gold with silver or yellow gold with white gold seamlessly.',
      gemstones: ['Morganite', 'Labradorite', 'Tahitian Pearl', 'Soft Opal'],
    },
    makeupSuggestions: {
      lipColors: ['Rosy Nude', 'Soft Spice', 'Muted Berry', 'Neutral Terracotta Pink'],
      blushTones: ['Peach-Rose Hybrid', 'Soft Terracotta Buff', 'Nude Flush'],
      eyeShades: ['Champagne Shimmer', 'Muted Taupe', 'Rose Bronze', 'Soft Charcoal'],
      tips: 'Neutral undertones thrive with balanced tones: a rose-nude or soft spice is your go-to everyday color.',
    },
  },

  'not_sure_universal': {
    id: 'not_sure_universal',
    name: 'Universal Harmony & Classic Neutrals',
    subtitle: 'Universal Flattering Spectrum',
    skinTone: 'not_sure',
    undertone: 'not_sure',
    description: 'A curated selection of globally flattering shades that balance warm and cool temperatures, giving you a fail-safe starting point to explore your personal style.',
    bestStartingColors: [
      { name: 'Classic Navy', hex: '#1E293B' },
      { name: 'Teal Harbor', hex: '#266B78' },
      { name: 'Dusty Rose', hex: '#BA7A8A' },
      { name: 'Heritage Burgundy', hex: '#7A263A' },
      { name: 'Warm Ivory', hex: '#F7F0E8' },
    ],
    neutrals: [
      { name: 'Soft Cream', hex: '#FAF6F0' },
      { name: 'Rich Espresso', hex: '#292521' },
      { name: 'Medium Slate', hex: '#64748B' },
      { name: 'Champagne Taupe', hex: '#D9B98C' },
    ],
    accents: [
      { name: 'Deep Forest', hex: '#2E5339' },
      { name: 'Spiced Terracotta', hex: '#B85E43' },
      { name: 'Midnight Plum', hex: '#582B46' },
      { name: 'Royal Cobalt', hex: '#1D4ED8' },
    ],
    clothingSuggestions: [
      'Universally flattering colors like teal, navy, and burgundy balance both warm and cool pigments.',
      'Warm ivory and soft cream look softer and more luxurious than stark fluorescent white.',
      'Pair neutral bases with one accent shade to discover what feels most authentic to you.',
      'Experiment freely—personal style is about how colors make you feel, not rigid limitations!',
    ],
    jewelrySuggestions: {
      metals: ['Mixed Metals', 'Rose Gold', 'Soft Gold & Silver'],
      description: 'Try holding both silver and gold against your wrist in natural daylight to observe which tone brings out your natural glow.',
      gemstones: ['Pearl', 'Teal Sapphire', 'Rose Quartz', 'Smoky Quartz'],
    },
    makeupSuggestions: {
      lipColors: ['Universal Nude Rose', 'Soft Berry Tint', 'Spiced Coral', 'Muted Pink'],
      blushTones: ['Soft Rose Peach', 'Natural Flush Tint'],
      eyeShades: ['Champagne Nude', 'Warm Taupe', 'Bronze Sheen'],
      tips: 'Start with versatile neutral-rose lips and soft mascara to see if your features lean warmer or cooler.',
    },
  },
};

export function getPaletteForAnswers(skinTone: SkinTone, undertone: Undertone): PaletteRecommendation {
  if (undertone === 'not_sure' || skinTone === 'not_sure') {
    return PALETTES['not_sure_universal'];
  }

  if (undertone === 'neutral') {
    return PALETTES['neutral_all'];
  }

  if (undertone === 'warm') {
    if (skinTone === 'fair' || skinTone === 'light') {
      return PALETTES['warm_fair_light'];
    }
    if (skinTone === 'deep') {
      return PALETTES['warm_deep'];
    }
    return PALETTES['warm_medium_tan'];
  }

  if (undertone === 'cool') {
    if (skinTone === 'fair' || skinTone === 'light') {
      return PALETTES['cool_fair_light'];
    }
    if (skinTone === 'deep') {
      return PALETTES['cool_deep'];
    }
    return PALETTES['cool_medium_tan'];
  }

  return PALETTES['not_sure_universal'];
}
