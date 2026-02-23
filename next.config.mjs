/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    // 15 removed tools → /tools
    const removedTools = [
      'website-calculator',
      'website-grader',
      'invoice-generator',
      'media-compressor',
      'business-name-generator',
      'color-palette-generator',
      'privacy-policy-generator',
      'linkedin-post-generator',
      'cold-email-generator',
      'headline-analyzer',
      'meta-tag-generator',
      'roi-calculator',
      'proposal-generator',
      'link-in-bio',
      'content-calendar',
    ]

    const toolRedirects = removedTools.map((slug) => ({
      source: `/tools/${slug}.html`,
      destination: '/tools',
      permanent: true,
    }))

    // Also redirect clean URLs for removed tools
    const toolCleanRedirects = removedTools.map((slug) => ({
      source: `/tools/${slug}`,
      destination: '/tools',
      permanent: true,
    }))

    return [
      // .html → clean URL redirects
      {
        source: '/blog/:slug.html',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/services/:slug.html',
        destination: '/#packages',
        permanent: true,
      },
      {
        source: '/services/:slug',
        destination: '/#packages',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/#packages',
        permanent: true,
      },
      {
        source: '/industries/:slug.html',
        destination: '/industries/:slug',
        permanent: true,
      },
      {
        source: '/tools/:slug.html',
        destination: '/tools/:slug',
        permanent: true,
      },
      {
        source: '/privacy-policy.html',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms-of-service.html',
        destination: '/terms-of-service',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/index.html',
        destination: '/#packages',
        permanent: true,
      },
      {
        source: '/industries/index.html',
        destination: '/industries',
        permanent: true,
      },
      {
        source: '/tools/index.html',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/blog/index.html',
        destination: '/blog',
        permanent: true,
      },
      ...toolRedirects,
      ...toolCleanRedirects,
    ]
  },
}

export default nextConfig
