import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Clock, User, CalendarDays } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CTASection from '@/components/ui/CTASection'
import SchemaMarkup from '@/components/seo/SchemaMarkup'
import { getPostBySlug, getAllSlugs } from '@/lib/blog'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://shaminder.sg/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | Shaminder Singh`,
      description: post.description,
      url: `https://shaminder.sg/blog/${post.slug}`,
      type: 'article',
      images: [{ url: post.image, width: 1200, height: 630 }],
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
}

const categoryColors: Record<string, string> = {
  'Web Design': 'bg-indigo-100 text-indigo-700',
  'SEO': 'bg-orange-100 text-orange-700',
  'Digital Marketing': 'bg-pink-100 text-pink-700',
  'AI': 'bg-purple-100 text-purple-700',
  'Content Marketing': 'bg-green-100 text-green-700',
  'E-commerce': 'bg-teal-100 text-teal-700',
  'Social Media': 'bg-blue-100 text-blue-700',
  'Email Marketing': 'bg-rose-100 text-rose-700',
  'Analytics': 'bg-cyan-100 text-cyan-700',
  'Branding': 'bg-amber-100 text-amber-700',
  'Singapore Business': 'bg-red-100 text-red-700',
  'Productivity': 'bg-lime-100 text-lime-700',
}

function getCategoryColor(category: string): string {
  return categoryColors[category] || 'bg-gray-100 text-gray-700'
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-SG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const isDefaultImage = post.image.includes('shaminder.jpg')

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image.startsWith('http')
      ? post.image
      : `https://shaminder.sg${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Shaminder Singh',
      url: 'https://shaminder.sg',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Shaminder Technologies',
      url: 'https://shaminder.sg',
      logo: {
        '@type': 'ImageObject',
        url: 'https://shaminder.sg/favicon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://shaminder.sg/blog/${post.slug}`,
    },
    articleSection: post.category,
    wordCount: post.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
  }

  return (
    <>
      <SchemaMarkup data={articleSchema} />
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-indigo-50 py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: post.title.length > 50 ? post.title.slice(0, 50) + '...' : post.title },
              ]}
            />
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${getCategoryColor(
                post.category
              )}`}
            >
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <User size={16} />
                Shaminder Singh
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays size={16} />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} />
                {post.readingTime}
              </span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        {!isDefaultImage && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-2">
            <div className="aspect-video relative rounded-xl overflow-hidden shadow-lg my-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="py-8 md:py-12 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-sm md:prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-img:rounded-lg prose-blockquote:border-indigo-300 prose-blockquote:text-gray-700 prose-li:text-gray-600"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* CTA */}
        <CTASection
          title="Need Help With Your Digital Strategy?"
          subtitle="Whether it's web design, SEO, or AI automation, let's chat about how we can grow your business online. No hard sell. No obligations."
        />

        <Footer />
      </div>
      <WhatsAppFloat />
    </>
  )
}
