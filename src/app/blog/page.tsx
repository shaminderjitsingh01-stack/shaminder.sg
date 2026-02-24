'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import blogPosts from '@/data/blog-posts.json'

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readingTime: string
  image: string
  content: string
  status: 'published' | 'scheduled'
}

const posts = (blogPosts as BlogPost[])
  .filter((post) => {
    const today = new Date().toISOString().split('T')[0]
    return post.status === 'published' && post.date <= today
  })
  .sort((a, b) => b.date.localeCompare(a.date))

const allCategories = Array.from(new Set(posts.map((p) => p.category))).sort()

const POSTS_PER_PAGE = 12

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

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = useMemo(() => {
    let result = posts

    if (activeCategory !== 'All') {
      result = result.filter((post) => post.category === activeCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query)
      )
    }

    return result
  }, [searchQuery, activeCategory])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  // Reset to page 1 when filters change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-indigo-50 py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog' },
              ]}
            />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Insights on web design, digital marketing, SEO, and AI for Singapore SMEs
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 px-4 sm:px-6 border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            {/* Search */}
            <div className="relative mb-6">
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <button
                onClick={() => handleCategoryChange('All')}
                className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition ${
                  activeCategory === 'All'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition ${
                    activeCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {paginatedPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('All')
                    setCurrentPage(1)
                  }}
                  className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {paginatedPosts.map((post) => (
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
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-5">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${getCategoryColor(
                            post.category
                          )}`}
                        >
                          {post.category}
                        </span>
                        <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {post.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>{formatDate(post.date)}</span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {post.readingTime}
                          </span>
                        </div>
                        <span className="inline-block mt-3 text-indigo-600 text-sm font-medium group-hover:text-indigo-700 transition">
                          Read more &rarr;
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-12">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 px-4 py-2 min-h-[40px] rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={16} />
                      Previous
                    </button>
                    <span className="text-sm text-gray-500">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 px-4 py-2 min-h-[40px] rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}

                <p className="text-center text-sm text-gray-400 mt-4">
                  Showing {(currentPage - 1) * POSTS_PER_PAGE + 1}&#8211;
                  {Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)} of{' '}
                  {filteredPosts.length} articles
                </p>
              </>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
