import { getAllPosts } from '@/lib/blog'

export async function GET() {
  const posts = getAllPosts()

  const escapeXml = (str: string): string =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')

  const rssItems = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://shaminder.sg/blog/${post.slug}</link>
      <guid isPermaLink="true">https://shaminder.sg/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${new Date(post.date + 'T00:00:00+08:00').toUTCString()}</pubDate>
    </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>shaminder.sg Blog</title>
    <link>https://shaminder.sg/blog</link>
    <description>Insights on web design, digital marketing, SEO, and AI for Singapore SMEs</description>
    <language>en-sg</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://shaminder.sg/blog/feed.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
