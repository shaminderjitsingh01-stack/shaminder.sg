import blogPosts from '@/data/blog-posts.json'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string // YYYY-MM-DD
  category: string
  readingTime: string
  image: string
  content: string
  status: 'published' | 'scheduled'
}

const posts = blogPosts as BlogPost[]

/**
 * Get all published posts (status=published and date <= today), sorted newest first
 */
export function getAllPosts(): BlogPost[] {
  const today = new Date().toISOString().split('T')[0]
  return posts
    .filter((post) => post.status === 'published' && post.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date))
}

/**
 * Get a single post by slug (only if published and date <= today)
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  const today = new Date().toISOString().split('T')[0]
  return posts.find(
    (post) => post.slug === slug && post.status === 'published' && post.date <= today
  )
}

/**
 * Get all unique categories from published posts
 */
export function getCategories(): string[] {
  const published = getAllPosts()
  const categories = new Set(published.map((post) => post.category))
  return Array.from(categories).sort()
}

/**
 * Get published posts filtered by category
 */
export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category)
}

/**
 * Get all published slugs (for generateStaticParams)
 */
export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug)
}

/**
 * Extract FAQ-like Q&A pairs from HTML content.
 * Looks for patterns like: <h2/h3>Question?</h2/h3> followed by <p>Answer</p>
 */
export function extractFAQs(html: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = []

  // Match h2/h3 that end with ? followed by content until next heading
  const regex = /<h[23][^>]*>([^<]*\?)<\/h[23]>\s*<p>([^<]+(?:<[^/][^>]*>[^<]*<\/[^>]*>[^<]*)*)<\/p>/gi
  let match

  while ((match = regex.exec(html)) !== null) {
    const question = match[1].trim()
    // Strip HTML tags from answer
    const answer = match[2].replace(/<[^>]*>/g, '').trim()
    if (question.length > 10 && answer.length > 20) {
      faqs.push({ question, answer })
    }
  }

  return faqs.slice(0, 10) // Max 10 FAQs per page
}

/**
 * Get related posts — same category, excluding the current post, max 3
 */
export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  const current = getPostBySlug(slug)
  if (!current) return []

  const sameCategory = getAllPosts().filter(
    (post) => post.category === current.category && post.slug !== slug
  )

  // If not enough from same category, fill with recent posts from other categories
  if (sameCategory.length >= count) {
    return sameCategory.slice(0, count)
  }

  const others = getAllPosts().filter(
    (post) => post.slug !== slug && post.category !== current.category
  )
  return [...sameCategory, ...others].slice(0, count)
}
