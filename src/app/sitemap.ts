import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const BASE_URL = 'https://shaminder.sg'

const industries = [
  'accounting', 'architecture', 'automotive', 'beauty', 'catering',
  'cleaning', 'clinics', 'construction', 'coworking', 'dental',
  'ecommerce', 'education', 'event-management', 'financial-advisors',
  'fitness', 'insurance-agents', 'interior-design', 'jewellery',
  'language-schools', 'legal', 'logistics', 'manufacturing',
  'mental-health', 'music-schools', 'pets', 'photography',
  'physiotherapy', 'preschools', 'real-estate', 'recruitment',
  'renovation', 'restaurants', 'security', 'spa-wellness',
  'tech-startups', 'travel', 'tuition', 'veterinary', 'wedding',
]

const tools = [
  'gst-calculator', 'pdf-merge-split', 'qr-generator',
  'email-signature', 'whatsapp-link-generator',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/industries`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/tools`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const industryPages: MetadataRoute.Sitemap = industries.map((slug) => ({
    url: `${BASE_URL}/industries/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const toolPages: MetadataRoute.Sitemap = tools.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...industryPages, ...toolPages, ...blogPages]
}
