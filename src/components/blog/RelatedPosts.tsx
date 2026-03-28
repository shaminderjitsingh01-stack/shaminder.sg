import Link from 'next/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'

interface RelatedPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readingTime: string
  image: string
}

const categoryColors: Record<string, string> = {
  'Web Design': 'bg-indigo-100 text-indigo-700',
  'SEO': 'bg-orange-100 text-orange-700',
  'Digital Marketing': 'bg-pink-100 text-pink-700',
  'AI': 'bg-purple-100 text-purple-700',
  'AI & Automation': 'bg-purple-100 text-purple-700',
  'AI Marketing': 'bg-purple-100 text-purple-700',
  'Content Marketing': 'bg-green-100 text-green-700',
  'E-commerce': 'bg-teal-100 text-teal-700',
  'Social Media': 'bg-blue-100 text-blue-700',
  'Email Marketing': 'bg-rose-100 text-rose-700',
  'Analytics': 'bg-cyan-100 text-cyan-700',
  'Branding': 'bg-amber-100 text-amber-700',
  'Singapore Business': 'bg-red-100 text-red-700',
  'Productivity': 'bg-lime-100 text-lime-700',
  'Website Design': 'bg-indigo-100 text-indigo-700',
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-SG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  if (posts.length === 0) return null

  return (
    <section className="py-12 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="aspect-video relative overflow-hidden bg-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2 ${
                    categoryColors[post.category] || 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {post.category}
                </span>
                <h3 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{formatDate(post.date)}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readingTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
