import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import BlogFilter from '@/components/blog/BlogFilter'
import { getAllPosts, getCategories } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog — Digital Marketing, SEO & AI Insights for Singapore SMEs | Shaminder Singh',
  description:
    'Actionable guides on web design, SEO, digital marketing, and AI automation for Singapore small businesses. Written by Shaminder Singh.',
  alternates: { canonical: 'https://shaminder.sg/blog' },
  openGraph: {
    title: 'Blog | Shaminder Singh — Digital Marketing Consultant',
    description:
      'Actionable guides on web design, SEO, digital marketing, and AI automation for Singapore small businesses.',
    url: 'https://shaminder.sg/blog',
    type: 'website',
  },
}

export default function BlogPage() {
  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    category: post.category,
    readingTime: post.readingTime,
    image: post.image,
  }))

  const categories = getCategories()

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero — dark header */}
        <section className="bg-black py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0" style={{ opacity: 0.05, backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="max-w-6xl mx-auto relative">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog' },
              ]}
            />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Insights on web design, digital marketing, SEO, and AI for Singapore SMEs
            </p>
          </div>
        </section>

        {/* Client-side filtering — hydrates after initial server render */}
        <BlogFilter posts={posts} categories={categories} />

        <Footer />
      </div>
    </>
  )
}
