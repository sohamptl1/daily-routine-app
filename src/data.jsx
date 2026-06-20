export const ALL = [0, 1, 2, 3, 4, 5, 6];
export const DAY_GUJ = ['Ravivar', 'Somvar', 'Mangalvar', 'Budhvar', 'Guruvar', 'Shukravar', 'Shanivar'];
export const DAY_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const TIME_BLOCKS = [
  { id: 'wake', label: 'Uthte Ja', sub: 'Empty stomach', icon: 'sun' },
  { id: 'breakfast', label: 'Nashto', sub: 'Breakfast', icon: 'meal' },
  { id: 'preworkout', label: 'Workout se pehle', sub: 'Pre-workout', icon: 'dumbbell' },
  { id: 'postworkout', label: 'Workout ke baad', sub: 'Post-workout', icon: 'dumbbell' },
  { id: 'lunch', label: 'Lunch', sub: 'Main meal', icon: 'meal' },
  { id: 'afternoon', label: 'Bapore', sub: 'Afternoon', icon: 'clock' },
  { id: 'evening', label: 'Sanj', sub: 'Evening', icon: 'clock' },
  { id: 'dinner', label: 'Dinner', sub: 'Main meal', icon: 'meal' },
  { id: 'bedtime', label: 'Sone pehle', sub: 'Bedtime', icon: 'moon' },
  { id: 'allday', label: 'Pura din', sub: 'Topical / all-day', icon: 'drop' }
];

export const ITEMS = [
  { id: 'probiotics', block: 'wake', name: 'Probiotics & Prebiotics', dose: '1 cap, water only', freq: 'Daily', days: ALL },

  { id: 'multivit', block: 'breakfast', name: "Kirkland Men's Multivitamin", dose: '1 tab with food', freq: 'Daily', days: ALL },
  { id: 'vitc-serum', block: 'breakfast', name: 'Vitamin C Serum', dose: 'Face, before sunscreen', freq: 'Daily', days: ALL },
  { id: 'sunscreen', block: 'breakfast', name: 'Sunscreen SPF 50 PA++++', dose: 'Apply now, reapply ~3-4 hrs', freq: 'Daily', days: ALL },
  { id: 'd3k2', block: 'breakfast', name: 'D3 + K2 (MK-7)', dose: '1 cap with food', freq: '2x/week', days: [1, 4] },
  { id: 'vitc-d3-zinc', block: 'breakfast', name: 'Vitamin C + D3 + Zinc', dose: '1 tab with food', freq: '2x/week', days: [2, 5] },
  { id: 'b29', block: 'breakfast', name: 'B-29 Tablet', dose: '1 tab with food', freq: '2x/week', days: [3, 6] },
  { id: 'biotin', block: 'breakfast', name: 'Biotin 100% RDA', dose: '1 tab with food', freq: '2x/week', days: [3, 0] },
  { id: 'ha-serum', block: 'breakfast', name: 'Hyaluronic Acid Serum', dose: 'Face, on damp skin before Vit C', freq: 'Daily', days: ALL },
  { id: 'lipbalm', block: 'breakfast', name: 'SPF Lip Balm', dose: 'Reapply through the day', freq: 'Daily', days: ALL },
  { id: 'uvhairspray', block: 'breakfast', name: 'UV Hair Protectant Spray', dose: 'Before sun/wind exposure', freq: 'Daily', days: ALL },
  { id: 'scalpspf', block: 'breakfast', name: 'Scalp Sunscreen Mist', dose: 'Hair parting, before riding', freq: 'Riding day', days: ALL, cond: true },

  { id: 'citrulline', block: 'preworkout', name: 'L-Citrulline DL-Malate', dose: 'Per label, 30 min before', freq: 'Training day', days: ALL, cond: true },
  { id: 'electrolyte', block: 'preworkout', name: 'Electrolyte Powder', dose: '1 sachet', freq: 'Training/hot day', days: ALL, cond: true },

  { id: 'creatine', block: 'postworkout', name: 'Creatine Monohydrate', dose: '5g', freq: 'Daily', days: ALL },
  { id: 'whey', block: 'postworkout', name: 'Whey Protein', dose: '1 scoop', freq: 'Daily', days: ALL },

  { id: 'omega3', block: 'lunch', name: 'Salmon Omega-3 Fish Oil', dose: '1 cap with food', freq: 'Daily', days: ALL },
  { id: 'curcumin', block: 'lunch', name: 'Curcumin + Piperine', dose: '1 cap with food', freq: 'Daily', days: ALL },
  { id: 'enzyme', block: 'lunch', name: 'Digestive Enzyme Complex', dose: '1 cap with main meal', freq: 'Daily', days: ALL },
  { id: 'hsn-caps', block: 'lunch', name: 'Hair, Skin & Nails Capsules', dose: '1 cap', freq: '2x/week', days: [2, 6] },
  { id: 'greentea', block: 'lunch', name: 'Green Tea Extract (EGCG)', dose: '1 cap, away from iron foods', freq: '2x/week', days: [2, 5] },

  { id: 'bodylotion', block: 'afternoon', name: 'Body Lotion (Niacinamide/Arbutin)', dose: 'Arms', freq: 'Daily', days: ALL },

  { id: 'psyllium', block: 'evening', name: 'Psyllium Husk', dose: '1 tbsp, full glass water', freq: 'Daily', days: ALL },
  { id: 'betaalanine', block: 'evening', name: 'Beta-Alanine', dose: 'Per label', freq: 'Daily', days: ALL },
  { id: 'balamrut', block: 'evening', name: 'Sewa Balamrut Syrup', dose: 'With milk', freq: 'Weekly', days: [1, 2, 3, 4, 5, 6] },
  { id: 'hairominm', block: 'evening', name: 'Hairomin-M Capsule', dose: '1 cap', freq: '2x/week', days: [1, 5] },
  { id: 'musli', block: 'evening', name: 'Vaamveda Musli+', dose: 'With warm milk', freq: '2x/week', days: [4, 0] },

  { id: 'glucosamine', block: 'dinner', name: 'Glucosamine + Chondroitin', dose: '1 cap with food', freq: 'Daily', days: ALL },

  { id: 'magnesium', block: 'bedtime', name: 'Magnesium Glycinate', dose: '1 cap', freq: 'Daily', days: ALL },
  { id: 'ashwagandha', block: 'bedtime', name: 'Himalaya Ashwagandha', dose: '1-2 tabs', freq: 'Daily', days: ALL },

  { id: 'tugain', block: 'allday', name: 'Tugain F+ 5%', dose: 'Scalp, AM & PM', freq: 'Daily', days: ALL, caution: 'Contains Finasteride — confirm routine with dermatologist' },
  { id: 'niacinamide', block: 'allday', name: 'Niacinamide Serum', dose: 'Face, PM', freq: 'Daily', days: ALL },
  { id: 'nasal', block: 'allday', name: 'Bibo Saline Nasal Spray', dose: 'AM/PM', freq: 'Daily', days: ALL },
  { id: 'arbutin', block: 'allday', name: 'Alpha Arbutin / Kojic Serum', dose: 'Face, PM', freq: '2x/week', days: [3, 6] },
  { id: 'ketoshampoo', block: 'allday', name: 'Ketoconazole 2% Shampoo', dose: 'Wash day', freq: 'Weekly', days: [2, 5] },
  { id: 'caffeineshampoo', block: 'allday', name: 'Caffeine Shampoo/Tonic', dose: 'Wash day', freq: 'Weekly', days: [0, 3] },
  { id: 'ceramide', block: 'allday', name: 'Ceramide Moisturizer', dose: 'Face, AM & PM, after serums', freq: 'Daily', days: ALL },
  { id: 'micellar', block: 'allday', name: 'Micellar Water', dose: 'PM cleanse, before serums', freq: 'Daily', days: ALL },
  { id: 'vite', block: 'allday', name: 'Vitamin E Serum/Oil', dose: 'Face, PM, light layer', freq: '2x/week', days: [1, 4] },
  { id: 'clarshampoo', block: 'allday', name: 'Clarifying / Anti-pollution Shampoo', dose: 'Wash day, removes hard-water buildup', freq: 'Weekly', days: [6] }
];

export const ASNEEDED = [
  { name: 'Vicks Dry + Wet Cough Syrup', trigger: 'Cough or cold symptoms', note: null },
  { name: 'Amrox Cough Syrup', trigger: 'Productive cough only, short course', note: 'Contains Terbutaline — not for daily use, avoid stacking with other stimulants', caution: true },
  { name: 'ORS', trigger: 'Dehydration, loose motion, heavy sweating', note: null }
];

export const ICONS = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M4.5 19.5l2-2M17.5 6.5l2-2"/>',
  meal: '<path d="M6 2v8M6 2c-1.5 0-2 1-2 2v4c0 1 .5 2 2 2M6 2c1.5 0 2 1 2 2v4c0 1-.5 2-2 2M6 12v10M17 2c-2 0-3 2-3 5s1 5 3 5M17 2v18"/>',
  dumbbell: '<rect x="2" y="9" width="3" height="6" rx="1"/><rect x="19" y="9" width="3" height="6" rx="1"/><rect x="6" y="7" width="2.5" height="10" rx="1"/><rect x="15.5" y="7" width="2.5" height="10" rx="1"/><path d="M8.5 12h7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>',
  drop: '<path d="M12 2c4 5 7 9 7 13a7 7 0 0 1-14 0c0-4 3-8 7-13z"/>'
};

export function iconSvg(name) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: ICONS[name] }} />
  );
}
