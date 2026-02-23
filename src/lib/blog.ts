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
