require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Testimonial = require('../models/Testimonial');
const Admin = require('../models/Admin');

if (process.env.NODE_ENV === 'production') {
  console.error('ERROR: Seed script cannot run in production!');
  process.exit(1);
}

const products = [
  { name: 'Premium Cow Beef', slug: 'premium-cow-beef', category: 'livestock', sortOrder: 1, description: 'Grass-fed cattle raised on open Plateau State pastures. Rich, lean, and ethically sourced for discerning tables.', image: { url: '/images/products/cow_beef.jpg', alt: 'Premium Cow Beef' }, tags: ['grass-fed','halal','protein'] },
  { name: 'Lamb Beef', slug: 'lamb-beef', category: 'livestock', sortOrder: 2, description: 'Tender lamb raised in the cool highlands of Jos. Celebrated across Nigerian festivals and everyday cuisine.', image: { url: '/images/products/lamp beef.jpg', alt: 'Lamb Beef' }, tags: ['highland','halal','festive'] },
  { name: 'Goat Meat', slug: 'goat-meat', category: 'livestock', sortOrder: 3, description: 'Free-range goats grazing on natural pasture. Full of flavour for pepper soup, suya, and traditional stews.', image: { url: '/images/products/goat_meat.jpg', alt: 'Goat Meat' }, tags: ['free-range','traditional'] },
  { name: 'Free-Range Chicken', slug: 'free-range-chicken', category: 'livestock', sortOrder: 4, description: 'Pasture-raised chickens with no growth hormones. Superior texture and taste compared to commercial broilers.', image: { url: '/images/products/chicken.jpg', alt: 'Free-Range Chicken' }, tags: ['hormone-free','pasture'] },
  { name: 'Organic Brown Rice', slug: 'organic-brown-rice', category: 'grains', sortOrder: 5, description: 'Whole-grain brown rice cultivated in the rich soils of Benue. Nutty, nutritious, and chemical-free.', image: { url: '/images/products/rice.jpg', alt: 'Organic Brown Rice' }, tags: ['organic','whole-grain'] },
  { name: 'Quinoa', slug: 'quinoa', category: 'grains', sortOrder: 6, description: 'Carefully cultivated quinoa — a complete protein powerhouse. Ideal for health-conscious urban households.', image: { url: '/images/products/quinoa.jpg', alt: 'Quinoa' }, tags: ['superfood','gluten-free'] },
  { name: 'Pearl Millet', slug: 'pearl-millet', category: 'grains', sortOrder: 7, description: 'Traditional fonio millet, drought-resilient and rich in iron. A staple of Northern Nigerian cuisine.', image: { url: 'https://picsum.photos/seed/millet/600/400', alt: 'Pearl Millet' }, tags: ['traditional','iron-rich'] },
  { name: 'Seasonal Vegetables', slug: 'seasonal-vegetables', category: 'produce', sortOrder: 8, description: 'A curated box of seasonal produce — tomatoes, spinach, peppers, and okra. Harvested to order, never stored.', image: { url: '/images/products/vegetables.jpg', alt: 'Seasonal Vegetables' }, tags: ['fresh','seasonal'] },
  { name: 'Fresh Herbs Bundle', slug: 'fresh-herbs-bundle', category: 'produce', sortOrder: 9, description: 'Aromatic herbs including basil, scent leaf (efirin), thyme, and lemongrass. Dried or fresh on request.', image: { url: '/images/products/herbs.jpg', alt: 'Fresh Herbs Bundle' }, tags: ['aromatic','culinary'] },
  { name: 'Tropical Fruits', slug: 'tropical-fruits', category: 'produce', sortOrder: 10, description: 'Mangoes, pawpaw, pineapple, and guava. Tree-ripened for maximum sweetness, never cold-stored.', image: { url: '/images/products/tropical_fruits.jpg', alt: 'Tropical Fruits' }, tags: ['tropical','seasonal'] },
  { name: 'Raw Nigerian Honey', slug: 'raw-nigerian-honey', category: 'specialty', sortOrder: 11, description: 'Wild-harvested honey from Plateau State beehives. Unfiltered, unpasteurized — medicinal quality.', image: { url: '/images/products/honey.jpg', alt: 'Raw Nigerian Honey' }, tags: ['raw','medicinal'] },
  { name: 'Artisan African Spices', slug: 'artisan-african-spices', category: 'specialty', sortOrder: 12, description: 'Hand-ground spice blends including suya spice, dawadawa, and uziza. Authentic West African flavours.', image: { url: '/images/products/spices.jpg', alt: 'Artisan African Spices' }, tags: ['traditional','hand-ground'] },
  { name: 'Irish Potatoes', slug: 'irish-potatoes', category: 'produce', sortOrder: 13, description: 'Fresh Irish potatoes grown on the cool highlands of Jos, Plateau State. Firm, starchy, and chemical-free.', image: { url: '/images/products/irish_potatoes.jpg', alt: 'Irish Potatoes' }, tags: ['fresh','highland','starchy'] },
];

const testimonials = [
  { quote: "Working with Alabira has transformed my farming. Their guidance and market access gave me the confidence to expand my operation threefold in just two years.", author: { name: 'Ibrahim Musa', role: 'Partner Farmer', location: 'Jos, Plateau State' }, type: 'farmer', rating: 5, isApproved: true, sortOrder: 1 },
  { quote: "As a wholesale buyer supplying Lagos restaurants, I need consistent quality and reliable delivery. Alabira has never missed a single order in 18 months.", author: { name: 'Chidinma Okonkwo', role: 'Wholesale Buyer', location: 'Abuja, FCT' }, type: 'wholesale', rating: 5, isApproved: true, sortOrder: 2 },
  { quote: "The freshness of Alabira's produce is unlike anything you find in the market. You can taste the difference — from their honey to their vegetables.", author: { name: 'Fatima Al-Hassan', role: 'Regular Customer', location: 'Lagos, Nigeria' }, type: 'customer', rating: 5, isApproved: true, sortOrder: 3 },
];

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB.');

  await Product.deleteMany({});
  await Testimonial.deleteMany({});
  console.log('Cleared products and testimonials.');

  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products.`);

  await Testimonial.insertMany(testimonials);
  console.log(`Seeded ${testimonials.length} testimonials.`);

  if (!(await Admin.findOne())) {
    await Admin.create({ name: 'Alabira Admin', email: 'admin@alabiraglobalfarm.com', password: 'Alabira@Admin2025!', role: 'superadmin' });
    console.log('\nDefault admin created:');
    console.log('  Email:    admin@alabiraglobalfarm.com');
    console.log('  Password: Alabira@Admin2025!');
    console.log('\n  !! Change this password immediately after first login !!\n');
  } else {
    console.log('Admin already exists — skipped.');
  }

  await mongoose.disconnect();
  console.log('Seed complete.');
};

run().catch((err) => { console.error('Seed failed:', err.message); process.exit(1); });
