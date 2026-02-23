export interface Industry {
  slug: string
  title: string
  badge: string
  headline: string
  headlineHighlight: string
  description: string
  features: { emoji: string; title: string; desc: string }[]
  benefits: string[]
  price: string
  priceNote: string
  ctaTitle: string
  ctaDesc: string
  faqs: { q: string; a: string }[]
}

export const industries: Industry[] = [
  {
    slug: 'dental',
    title: 'Dental Clinic Websites',
    badge: 'Dental Clinic Websites',
    headline: 'Attract More Patients With a Trusted',
    headlineHighlight: 'Dental Website',
    description: 'A professional website that builds trust, showcases your dental services, and makes it easy for patients to book appointments online.',
    features: [
      { emoji: '📅', title: 'Online Booking', desc: 'Let patients book appointments 24/7 directly from your website.' },
      { emoji: '🦷', title: 'Treatment Pages', desc: 'Detailed pages for each treatment to educate and convert patients.' },
      { emoji: '👨‍⚕️', title: 'Doctor Profiles', desc: 'Build trust with professional profiles of your dental team.' },
      { emoji: '⭐', title: 'Review Integration', desc: 'Showcase patient reviews and testimonials prominently.' },
      { emoji: '📱', title: 'Mobile-First', desc: 'Perfect on every device — most patients search on their phone.' },
      { emoji: '🔍', title: 'Local SEO', desc: 'Rank for "dentist near me" and attract local patients.' },
    ],
    benefits: ['Custom responsive design', 'Online appointment booking', 'Treatment gallery & photos', 'Patient review showcase', 'Google Maps integration', 'WhatsApp enquiry button', 'SEO optimized for local search', 'SSL security certificate', 'Fast loading speed', 'Contact form integration', '1 month free support', 'Delivered in 48-72 hours'],
    price: 'From $1,800',
    priceNote: 'Advanced booking systems and patient portals available as add-ons.',
    ctaTitle: 'Ready to Fill More Chairs?',
    ctaDesc: 'Get a dental website that attracts patients and builds trust. Book a free call to discuss your clinic.',
    faqs: [
      { q: 'How long does it take to build a dental website?', a: 'Standard dental websites are delivered within 48-72 hours after receiving all materials.' },
      { q: 'Can patients book appointments online?', a: 'Yes — we integrate online booking systems so patients can schedule appointments 24/7.' },
      { q: 'Will it show up on Google?', a: 'Absolutely. We optimize your site for local SEO so patients find you when searching for dentists nearby.' },
      { q: 'Can I update the content myself?', a: 'Yes — we provide a simple content management system and training.' },
      { q: 'Do you handle hosting?', a: 'Yes, first year of hosting is included. Ongoing hosting starts at $150/month.' },
    ],
  },
  {
    slug: 'restaurants',
    title: 'Restaurant & F&B Websites',
    badge: 'Restaurant & F&B Websites',
    headline: 'Get More Diners With a Website That',
    headlineHighlight: 'Makes Them Hungry',
    description: 'A mouth-watering website that showcases your menu, enables reservations, and turns online visitors into walk-in customers.',
    features: [
      { emoji: '📱', title: 'Mobile Menu', desc: 'QR-scannable digital menu that looks great on any phone.' },
      { emoji: '🍽️', title: 'Digital Menu', desc: 'Beautiful menu display with photos, descriptions, and pricing.' },
      { emoji: '📅', title: 'Reservations', desc: 'Online table booking system integrated into your site.' },
      { emoji: '🛵', title: 'Online Ordering', desc: 'Accept takeaway and delivery orders directly from your website.' },
      { emoji: '📸', title: 'Food Gallery', desc: 'Stunning photo galleries that make visitors crave your dishes.' },
      { emoji: '🔍', title: 'Local SEO', desc: 'Rank for "restaurant near me" and attract local diners.' },
    ],
    benefits: ['Custom responsive design', 'Digital menu with photos', 'Online reservation system', 'Online ordering integration', 'Google Maps & directions', 'WhatsApp enquiry button', 'SEO for local search', 'Food photo gallery', 'Social media integration', 'Contact form', '1 month free support', 'Delivered in 48-72 hours'],
    price: 'From $1,800',
    priceNote: 'Online ordering and advanced reservation systems available as add-ons.',
    ctaTitle: 'Ready to Get More Diners?',
    ctaDesc: 'Get a restaurant website that fills tables and drives online orders. Book a free call today.',
    faqs: [
      { q: 'Can customers order food online?', a: 'Yes — we can integrate online ordering for takeaway and delivery.' },
      { q: 'Do you include a digital menu?', a: 'Yes, with beautiful photos and easy-to-update pricing.' },
      { q: 'Can I update the menu myself?', a: 'Absolutely — we make it easy for you to update dishes, prices, and photos.' },
      { q: 'Will it help me rank on Google?', a: 'Yes, we optimize for local SEO so people find you when searching for restaurants nearby.' },
      { q: 'Do you do food photography?', a: 'We can recommend food photographers, or work with photos you already have.' },
    ],
  },
  // The remaining 37 industries follow the same pattern with industry-specific content
  ...generateRemainingIndustries(),
]

function generateRemainingIndustries(): Industry[] {
  const industryData: { slug: string; name: string; emoji: string; keyword: string; cta: string }[] = [
    { slug: 'accounting', name: 'Accounting Firm', emoji: '📊', keyword: 'accountant', cta: 'Ready to Get More Clients?' },
    { slug: 'architecture', name: 'Architecture Firm', emoji: '🏗️', keyword: 'architect', cta: 'Ready to Win More Projects?' },
    { slug: 'automotive', name: 'Automotive & Car Workshop', emoji: '🚗', keyword: 'car workshop', cta: 'Ready to Fill More Bays?' },
    { slug: 'beauty', name: 'Beauty Salon', emoji: '💅', keyword: 'beauty salon', cta: 'Ready to Book More Clients?' },
    { slug: 'catering', name: 'Catering Service', emoji: '🍲', keyword: 'catering', cta: 'Ready to Get More Bookings?' },
    { slug: 'cleaning', name: 'Cleaning Service', emoji: '🧹', keyword: 'cleaning service', cta: 'Ready to Clean More Homes?' },
    { slug: 'clinics', name: 'Medical Clinic', emoji: '🏥', keyword: 'clinic', cta: 'Ready to See More Patients?' },
    { slug: 'construction', name: 'Construction Company', emoji: '🏗️', keyword: 'construction company', cta: 'Ready to Win More Contracts?' },
    { slug: 'coworking', name: 'Coworking Space', emoji: '🏢', keyword: 'coworking space', cta: 'Ready to Fill More Desks?' },
    { slug: 'ecommerce', name: 'E-commerce Business', emoji: '🛒', keyword: 'online store', cta: 'Ready to Sell More Online?' },
    { slug: 'education', name: 'Education Centre', emoji: '📚', keyword: 'education centre', cta: 'Ready to Enrol More Students?' },
    { slug: 'event-management', name: 'Event Management', emoji: '🎉', keyword: 'event planner', cta: 'Ready to Book More Events?' },
    { slug: 'financial-advisors', name: 'Financial Advisor', emoji: '💰', keyword: 'financial advisor', cta: 'Ready to Get More Clients?' },
    { slug: 'fitness', name: 'Fitness & Gym', emoji: '💪', keyword: 'gym', cta: 'Ready to Get More Members?' },
    { slug: 'insurance-agents', name: 'Insurance Agent', emoji: '🛡️', keyword: 'insurance agent', cta: 'Ready to Get More Leads?' },
    { slug: 'interior-design', name: 'Interior Design', emoji: '🏠', keyword: 'interior designer', cta: 'Ready to Win More Projects?' },
    { slug: 'jewellery', name: 'Jewellery Shop', emoji: '💍', keyword: 'jewellery shop', cta: 'Ready to Sell More Pieces?' },
    { slug: 'language-schools', name: 'Language School', emoji: '🗣️', keyword: 'language school', cta: 'Ready to Enrol More Students?' },
    { slug: 'legal', name: 'Law Firm', emoji: '⚖️', keyword: 'lawyer', cta: 'Ready to Get More Clients?' },
    { slug: 'logistics', name: 'Logistics Company', emoji: '🚚', keyword: 'logistics', cta: 'Ready to Get More Shipments?' },
    { slug: 'manufacturing', name: 'Manufacturing Company', emoji: '🏭', keyword: 'manufacturer', cta: 'Ready to Get More Orders?' },
    { slug: 'mental-health', name: 'Mental Health Practice', emoji: '🧠', keyword: 'therapist', cta: 'Ready to Help More Clients?' },
    { slug: 'music-schools', name: 'Music School', emoji: '🎵', keyword: 'music school', cta: 'Ready to Enrol More Students?' },
    { slug: 'pets', name: 'Pet Business', emoji: '🐾', keyword: 'pet shop', cta: 'Ready to Get More Customers?' },
    { slug: 'photography', name: 'Photography Studio', emoji: '📷', keyword: 'photographer', cta: 'Ready to Book More Shoots?' },
    { slug: 'physiotherapy', name: 'Physiotherapy Clinic', emoji: '🦴', keyword: 'physiotherapy', cta: 'Ready to See More Patients?' },
    { slug: 'preschools', name: 'Preschool & Childcare', emoji: '👶', keyword: 'preschool', cta: 'Ready to Enrol More Children?' },
    { slug: 'real-estate', name: 'Real Estate Agency', emoji: '🏠', keyword: 'real estate agent', cta: 'Ready to Close More Deals?' },
    { slug: 'recruitment', name: 'Recruitment Agency', emoji: '👥', keyword: 'recruitment agency', cta: 'Ready to Place More Candidates?' },
    { slug: 'renovation', name: 'Renovation Contractor', emoji: '🔨', keyword: 'renovation', cta: 'Ready to Win More Projects?' },
    { slug: 'security', name: 'Security Company', emoji: '🔒', keyword: 'security company', cta: 'Ready to Get More Contracts?' },
    { slug: 'spa-wellness', name: 'Spa & Wellness', emoji: '🧖', keyword: 'spa', cta: 'Ready to Book More Appointments?' },
    { slug: 'tech-startups', name: 'Tech Startup', emoji: '💻', keyword: 'tech startup', cta: 'Ready to Get More Users?' },
    { slug: 'travel', name: 'Travel Agency', emoji: '✈️', keyword: 'travel agency', cta: 'Ready to Book More Trips?' },
    { slug: 'tuition', name: 'Tuition Centre', emoji: '📖', keyword: 'tuition centre', cta: 'Ready to Enrol More Students?' },
    { slug: 'veterinary', name: 'Veterinary Clinic', emoji: '🐶', keyword: 'vet clinic', cta: 'Ready to See More Pets?' },
    { slug: 'wedding', name: 'Wedding Services', emoji: '💒', keyword: 'wedding planner', cta: 'Ready to Book More Weddings?' },
  ]

  return industryData.map((ind) => ({
    slug: ind.slug,
    title: `${ind.name} Websites`,
    badge: `${ind.name} Websites`,
    headline: `Grow Your ${ind.name} Business With a`,
    headlineHighlight: 'Professional Website',
    description: `A professional website designed for ${ind.name.toLowerCase()}s in Singapore. Attract more customers, build trust, and grow your business online.`,
    features: [
      { emoji: ind.emoji, title: 'Industry-Specific Design', desc: `Custom design tailored for ${ind.name.toLowerCase()} businesses in Singapore.` },
      { emoji: '📱', title: 'Mobile-First', desc: 'Perfect on every device — most customers search on their phone.' },
      { emoji: '🔍', title: 'Local SEO', desc: `Rank for "${ind.keyword} near me" and attract local customers.` },
      { emoji: '💬', title: 'WhatsApp Integration', desc: 'One-click enquiry button for instant customer contact.' },
      { emoji: '⭐', title: 'Review Showcase', desc: 'Display customer testimonials and reviews prominently.' },
      { emoji: '⚡', title: 'Fast Loading', desc: 'Sub-2 second load times for better conversions and rankings.' },
    ],
    benefits: [
      'Custom responsive design',
      `Tailored for ${ind.name.toLowerCase()} businesses`,
      'WhatsApp enquiry button',
      'Google Maps integration',
      'SEO optimized for local search',
      'Contact form integration',
      'Social media links',
      'SSL security certificate',
      'Fast loading speed',
      'Photo gallery',
      '1 month free support',
      'Delivered in 48-72 hours',
    ],
    price: 'From $1,800',
    priceNote: 'Advanced features and integrations available as add-ons.',
    ctaTitle: ind.cta,
    ctaDesc: `Get a professional website that attracts more customers to your ${ind.name.toLowerCase()} business. Book a free call today.`,
    faqs: [
      { q: `How long does it take to build a ${ind.name.toLowerCase()} website?`, a: 'Standard websites are delivered within 48-72 hours after receiving all materials.' },
      { q: 'Will it help me rank on Google?', a: `Yes — we optimize for local SEO so customers find you when searching for "${ind.keyword} near me".` },
      { q: 'Can I update the content myself?', a: 'Yes — we provide a simple system and training so you can make updates easily.' },
      { q: 'Do you handle hosting?', a: 'Yes, first year of hosting is included. Ongoing hosting starts at $150/month.' },
      { q: `What makes this different from a generic website?`, a: `We design specifically for ${ind.name.toLowerCase()} businesses, with industry-specific features and messaging that resonates with your customers.` },
    ],
  }))
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug)
}
