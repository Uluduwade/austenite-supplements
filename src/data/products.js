// Product photos are transparent 800x800 cutouts in /public/products, named by product id (e.g. img: '/products/iso-xp.webp')
// To show a different photo per flavour, add flavourImg keyed by the exact flavour name (see `flavourImages` below).
export const CATEGORIES = ['All', 'Protein', 'Performance', 'Wellness', 'Fat Burners']
const base = [
  { id: 'iso-xp', name: 'ISO XP', cat: 'Protein', price: 34380, size: '1.8kg', flavours: ['Chocolate Dessert'], img: '/products/iso-xp.webp', desc: 'Ultra-clean whey isolate for lean muscle recovery.' },
  { id: 'essential-protein', name: 'Essential Protein', cat: 'Protein', price: 25000, size: '1.6kg', flavours: ['Double Chocolate'], img: '/products/essential-protein.webp', soon: true, desc: 'Complete everyday protein with 22g per serving.' },
  { id: 'critical-whey', name: 'Critical Whey', cat: 'Protein', price: 27580, size: '2kg', flavours: ['White Choc Pistachio', 'Chocolate', 'Vanilla'], img: '/products/critical-whey.webp', desc: 'Premium whey protein blend with a serious flavour hit.' },
  { id: 'critical-mass', name: 'Critical Mass', cat: 'Protein', price: 28000, size: '6kg', flavours: ['Chocolate'], img: '/products/critical-mass.webp', desc: 'High calorie mass gainer for hard gainers building size.' },
  { id: 'test-x', name: 'TEST X', cat: 'Performance', price: 13980, size: '120 capsules', flavours: [], img: '/products/test-x.webp', desc: 'Capsule support for strength and training drive.' },
  { id: 'creatine-hydration', name: 'Creatine + Hydration', cat: 'Performance', price: 10000, size: '30 servings', flavours: ['Non flavoured'], img: '/products/creatine-hydration.webp', desc: 'Creatine with added hydration support for harder sessions.' },
  { id: 'creatine-50', name: 'Creatine', cat: 'Performance', price: 7580, size: '50 servings', flavours: ['Strawberry & Raspberry', 'Icy Blue Razz', 'Apple & Cherry'], img: '/products/creatine-50.webp', desc: 'Classic creatine for power and repeat performance.' },
  { id: 'amino-fuel', name: 'Amino Fuel', cat: 'Performance', price: 10500, size: '30 servings', flavours: [], img: '/products/amino-fuel.webp', desc: 'Intra-workout amino acids to keep you fuelled.' },
  { id: 'abe', name: 'ABE Pre Workout', cat: 'Performance', price: 11180, size: '', flavours: ['Icy Blue', 'Cherry Cola', 'Twisted Citrus', 'Candy Icy Blast', 'Bubblegum Crush'], img: '/products/abe-icy-blue.webp', desc: 'Pre-workout for energy, focus and drive in five bold flavours.' },
  { id: 'unflavoured-500', name: 'Creatine Monohydrate unflavoured 100 servings', cat: 'Performance', price: 11980, size: '500g, 100 servings', flavours: ['Unflavoured'], img: '/products/unflavoured-500.webp',desc: 'Pure, unflavoured, mixes into anything.' },
  { id: 'unflavoured-250', name: 'Creatine Monohydrate unflavoured', cat: 'Performance', price: 7580, size: '250g, 50 servings', flavours: ['Unflavoured'], img: '/products/unflavoured-250.webp',desc: 'The smaller pack of our unflavoured powder.' },
  { id: 'shred-x', name: 'Shred X Fat Burner', cat: 'Fat Burners', price: 9500, size: '90 capsules', flavours: [], img: '/products/shred-x.webp', desc: 'Thermogenic capsules to support your cut.' },
  { id: 'shilajit', name: 'Shilajit', cat: 'Wellness', price: 7500, size: '90 capsules', flavours: [], img: '/products/shilajit.webp', desc: 'Traditional mineral-rich resin in easy capsules.' },
  { id: 'omega-3', name: 'Omega 3', cat: 'Wellness', price: 7000, size: '100 capsules', flavours: [], img: '/products/omega-3.webp', desc: 'Daily fish oil for heart, joints and recovery.' },
  { id: 'collagen', name: 'Collagen Peptide', cat: 'Wellness', price: 9980, size: '', flavours: [], img: '/products/collagen.webp', desc: 'Collagen support for skin, joints and connective tissue.' }, 
]
// Richer copy shown in the product popup: desc (short pitch), about (longer paragraph),
// highlights (key benefits), use (how to take it), who (best suited for), tip (small extra note).
// Check exact serving sizes and macros against the label on the tub before editing numbers in.
const details = {
  'iso-xp': {
    desc: 'Ultra-filtered whey isolate for clean, fast-absorbing protein after training.',
    about: 'ISO XP is a whey protein isolate, filtered to be higher in protein and lighter in fat and carbs than a standard whey. It mixes smoothly and digests quickly, which makes it a go-to for post-workout recovery or a lean protein top-up any time of day.',
    highlights: ['Whey isolate: high protein, light on fat and carbs', 'Fast digesting for post-workout recovery', 'Mixes smooth with water or milk', 'Rich chocolate dessert flavour'],
    use: 'Mix one serving with water or milk after training, or whenever you need to hit your daily protein. Follow the serving size on the label.',
    who: 'Lifters cutting or keeping carbs low, and anyone wanting a cleaner protein.',
  },
  'essential-protein': {
    desc: 'Complete everyday protein with 22g per serving and a rich double chocolate flavour.',
    about: 'Essential Protein is an everyday protein powder with a complete amino acid profile, giving you 22g of protein and 117 calories per serving. A 1.6kg tub gives you 50 servings, so it is an easy, good-value way to hit your daily protein.',
    highlights: ['22g protein and 117 calories per serving', 'Complete amino acid profile', '50 servings per 1.6kg tub', 'Double chocolate flavour'],
    use: 'Mix one serving with water or milk once or twice a day, after training or between meals. Follow the serving size on the label.',
    who: 'Anyone building muscle or topping up daily protein without fuss.',
    tip: 'Coming soon. Message us on WhatsApp and we will let you know when it lands.',
  },
  'critical-whey': {
    desc: 'Premium whey blend with a big protein hit and a flavour range that actually tastes good.',
    about: 'Critical Whey is a premium whey protein blend built for everyday muscle support. It is a great all-rounder: easy to mix, great in shakes, oats or smoothies, and available in several flavours so it never gets boring.',
    highlights: ['Premium whey protein blend', 'Three flavours to choose from', 'Easy mixing, great in shakes and recipes', 'Large 2kg tub for long-term value'],
    use: 'Mix one serving with water or milk once or twice a day, around training or between meals. Follow the serving size on the label.',
    who: 'Anyone building muscle or topping up daily protein without fuss.',
  },
  'critical-mass': {
    desc: 'High calorie mass gainer with 59g protein per serving, for building size.',
    about: 'Critical Mass is a high calorie gainer made for people who struggle to eat enough to grow. Each serving gives you 59g of protein and 902 calories, so one shake adds a big chunk of your daily intake. The 6kg bag gives you 25 servings.',
    highlights: ['59g protein and 902 calories per serving', 'High calorie gainer for building size', '6kg resealable bag, 25 servings', 'Rich chocolate flavour'],
    use: 'Mix with water or milk once or twice a day, between meals or after training. Follow the serving size on the label.',
    who: 'Hard gainers and anyone who needs extra calories to put on size.',
    tip: 'Check the label for the recommended serving, as a full serving is a large shake. You can split it across two smaller shakes.',
  },
  'test-x': {
    desc: 'Capsule formula designed to support strength, training drive and performance.',
    about: 'TEST X is a capsule supplement formulated for lifters who want extra support for training drive and strength. It is convenient, taste-free and easy to fit into a daily routine alongside a solid diet and training plan.',
    highlights: ['Convenient capsules, no mixing', '120 capsules per pack', 'Made for strength and training drive', 'Pairs well with creatine and protein'],
    use: 'Take as directed on the label with a meal and water. Do not exceed the recommended amount.',
    who: 'Experienced lifters looking to support their performance. Not for under 18s.',
    tip: 'Supplements work best alongside good sleep, food and consistent training.',
  },
  'creatine-hydration': {
    desc: 'Creatine paired with hydration support, for strength and harder sessions.',
    about: 'Creatine is one of the most researched supplements for strength and power. This version adds hydration support, so you get your creatine and help staying topped up through long, sweaty sessions in one scoop.',
    highlights: ['Creatine for strength and power output', 'Added hydration support', '30 servings per tub', 'Unflavoured style, mixes into anything'],
    use: 'Mix one serving with water daily, training day or rest day. Staying consistent matters more than timing.',
    who: 'Lifters and athletes training hard in warm conditions.',
    tip: 'Drink plenty of water through the day when taking creatine.',
  },
  'creatine-50': {
    desc: 'Classic creatine in three tasty flavours, for power and repeat performance.',
    about: 'Creatine is the most proven supplement for strength, power and repeat sprint performance. This flavoured powder takes the chalky taste out of it, so it is easy to take every single day, which is what makes it work.',
    highlights: ['Supports strength and power output', '50 servings per tub', 'Three flavours: Strawberry & Raspberry, Icy Blue Razz, Apple & Cherry', 'Daily use, no loading phase needed'],
    use: 'Mix one serving with water once a day, every day. Taking it with a meal or your post-workout shake works well.',
    who: 'Beginners and experienced lifters alike. It is the best first supplement after protein.',
    tip: 'Consistency beats timing. Take it daily, even on rest days.',
  },
  'amino-fuel': {
    desc: 'Flavoured amino acid drink to keep you fuelled through training.',
    about: 'Amino Fuel is a flavoured amino acid mix designed to be sipped during your workout. It is a light, refreshing way to support training and recovery, especially when you train fasted or for longer sessions.',
    highlights: ['Amino acids to sip during training', 'Refreshing flavoured drink', '30 servings per tub', 'Great for fasted or long sessions'],
    use: 'Mix one serving with water and sip before or during your workout. Follow the serving size on the label.',
    who: 'Anyone training fasted, doing long sessions or wanting a tasty gym drink.',
  },
  abe: {
    desc: 'Pre-workout for energy, focus and drive, in five bold flavours.',
    about: 'ABE is a pre-workout powder made to get you switched on before you train. Mix it up 20 to 30 minutes before your session for a boost in energy and focus, in a choice of flavours that are easy to drink and easy to stick with.',
    highlights: ['Pre-workout for energy, focus and training drive', 'Five flavours: Icy Blue, Cherry Cola, Twisted Citrus, Candy Icy Blast, Bubblegum Crush', 'Mixes easily with water', 'Ideal before heavy or high-intensity sessions'],
    use: 'Mix one serving with water 20 to 30 minutes before training. Follow the serving size on the label and do not exceed the recommended amount.',
    who: 'Experienced lifters and athletes who want a boost before training. Not for under 18s.',
    tip: 'Contains stimulants, so check the label for caffeine content and avoid taking it late in the evening.',
  },
  'unflavoured-500': {
    desc: 'Pure unflavoured creatine monohydrate in a big 100-serving tub.',
    about: 'Plain creatine monohydrate with nothing added. It dissolves into water, juice, shakes or even your coffee without changing the taste. The 500g tub gives you 100 servings, the best value way to stay consistent.',
    highlights: ['Pure creatine monohydrate', '500g tub, 100 servings', 'No flavour, mixes into anything', 'Best value for long-term use'],
    use: 'Mix one serving (around 3 to 5g, see label) into water, juice or a shake once a day, every day.',
    who: 'Anyone who wants simple, no-nonsense creatine at the best price per serving.',
    tip: 'Stir well and drink it straight away for the best mix.',
  },
  'unflavoured-250': {
    desc: 'Pure unflavoured creatine monohydrate in a smaller 50-serving tub.',
    about: 'The same pure creatine monohydrate in a smaller 250g tub. Ideal if you are trying creatine for the first time or want a pack that is easy to travel with.',
    highlights: ['Pure creatine monohydrate', '250g tub, 50 servings', 'No flavour, mixes into anything', 'A great starter size'],
    use: 'Mix one serving (around 3 to 5g, see label) into water, juice or a shake once a day, every day.',
    who: 'First-time creatine users and anyone who prefers a compact tub.',
    tip: 'Want better value? Our 500g tub gives you double the servings.',
  },
  'shred-x': {
    desc: 'Thermogenic capsules to support your cutting phase and daily energy.',
    about: 'Shred X is a thermogenic fat burner in capsule form, made to support your cut alongside a calorie-controlled diet and regular training. It is designed to help with energy and focus while you are in a deficit.',
    highlights: ['Thermogenic formula for your cutting phase', '90 capsules per pack', 'Supports energy and focus in a deficit', 'Easy capsules, no mixing'],
    use: 'Take as directed on the label with water, earlier in the day. Do not exceed the recommended amount.',
    who: 'Adults on a structured diet and training plan. Not for under 18s.',
    tip: 'Check the label for stimulant content and avoid taking it late in the evening. Not a substitute for diet and training.',
  },
  shilajit: {
    desc: 'Traditional mineral-rich resin, in easy-to-take capsules.',
    about: 'Shilajit is a traditional mineral-rich resin, long used in wellness routines. These capsules make it simple to take, with none of the sticky handling or strong taste of the raw resin.',
    highlights: ['Traditional mineral-rich resin', 'Easy capsules, no sticky resin', '90 capsules per pack', 'Fits easily into a daily wellness routine'],
    use: 'Take as directed on the label with water and food. Do not exceed the recommended amount.',
    who: 'Adults looking for a simple daily wellness supplement.',
    tip: 'If you are pregnant, on medication or have a medical condition, check with your doctor first.',
  },
  'omega-3': {
    desc: 'Daily fish oil softgels to support heart, joints and recovery.',
    about: 'Omega 3 fish oil is a daily staple for general health, supporting your heart, joints and recovery. These softgels are an easy way to cover the omega 3 many of us miss in our diet, especially if we do not eat much oily fish.',
    highlights: ['Fish oil omega 3 softgels', '100 softgels per pack', 'Supports heart and joint health', 'Easy daily habit'],
    use: 'Take as directed on the label with a meal and water, for better absorption.',
    who: 'Anyone who rarely eats oily fish, and active people looking after their joints.',
  },
  collagen: {
    desc: 'Collagen peptides to support skin, joints and connective tissue.',
    about: 'Collagen is a key protein in your skin, joints, tendons and ligaments. These peptides are broken down so they dissolve easily, making them simple to stir into a drink as part of a daily routine for skin, joint and connective tissue support.',
    highlights: ['Collagen peptides that dissolve easily', 'Supports skin, joints and connective tissue', 'Unflavoured, mixes into drinks and food', 'Easy daily habit'],
    use: 'Stir one serving into water, coffee, a smoothie or a shake once a day. Follow the serving size on the label.',
    who: 'Active people looking after their joints and anyone focused on skin health.',
    tip: 'Results come from steady daily use over weeks, not days.',
  },
}
// Per-flavour photos, e.g. abe: { 'Icy Blue': '/products/abe-icy-blue.webp' }. Flavours not listed use the main img.
const flavourImages = {
  'critical-whey': {
    'White Choc Pistachio': '/products/critical-whey-white-choc-pistachio.webp',
    Chocolate: '/products/critical-whey.webp',
    Vanilla: '/products/critical-whey-vanilla-ice-cream.webp',
  },
  'creatine-50': {
    'Strawberry & Raspberry': '/products/creatine-50-strawberry.webp',
    'Icy Blue Razz': '/products/creatine-50-icy-blue-razz.webp',
    'Apple & Cherry': '/products/creatine-50.webp',
  },
  abe: {
    'Icy Blue': '/products/abe-icy-blue.webp',
    'Cherry Cola': '/products/abe-cherry-cola.webp',
    'Twisted Citrus': '/products/abe-twisted-citrus.webp',
    'Candy Icy Blast': '/products/abe-candy-icy-blast.webp',
    'Bubblegum Crush': '/products/abe-bubblegum-crush.webp',
  },
}
export const products = base.map((p) => ({ ...p, ...details[p.id], flavourImg: flavourImages[p.id] }))
export const rs =(n) => 'Rs ' + n.toLocaleString('en-LK')
