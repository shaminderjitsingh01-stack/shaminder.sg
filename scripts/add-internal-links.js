/**
 * Script to add internal links to blog post content.
 * Links to: tools, industry pages, and other blog posts.
 *
 * Run: node scripts/add-internal-links.js
 */

const fs = require('fs')
const path = require('path')

const postsPath = path.join(__dirname, '..', 'src', 'data', 'blog-posts.json')
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'))

// ===== LINK TARGETS =====

const toolLinks = [
  { phrases: ['gst calculator', 'gst calculation', 'calculate gst'], url: '/tools/gst-calculator', label: 'GST Calculator' },
  { phrases: ['qr code', 'qr codes'], url: '/tools/qr-generator', label: 'QR Code Generator' },
  { phrases: ['email signature', 'email signatures'], url: '/tools/email-signature', label: 'Email Signature Generator' },
  { phrases: ['whatsapp link', 'whatsapp button', 'click-to-chat'], url: '/tools/whatsapp-link-generator', label: 'WhatsApp Link Generator' },
  { phrases: ['pdf merge', 'merge pdf', 'split pdf', 'combine pdf'], url: '/tools/pdf-merge-split', label: 'PDF Merge & Split Tool' },
]

const industryLinks = [
  { phrases: ['dental clinic website', 'dental website'], url: '/industries/dental' },
  { phrases: ['restaurant website', 'f&b website'], url: '/industries/restaurants' },
  { phrases: ['fitness website', 'gym website'], url: '/industries/fitness' },
  { phrases: ['beauty salon website', 'salon website'], url: '/industries/beauty' },
  { phrases: ['law firm website', 'legal website', 'lawyer website'], url: '/industries/legal' },
  { phrases: ['real estate website', 'property website'], url: '/industries/real-estate' },
  { phrases: ['tuition centre website', 'tuition center website'], url: '/industries/tuition' },
  { phrases: ['ecommerce website', 'e-commerce website', 'online store'], url: '/industries/ecommerce' },
  { phrases: ['clinic website', 'medical clinic website'], url: '/industries/clinics' },
  { phrases: ['accounting website', 'accountant website'], url: '/industries/accounting' },
  { phrases: ['preschool website', 'childcare website'], url: '/industries/preschools' },
  { phrases: ['renovation website', 'renovation company website'], url: '/industries/renovation' },
]

const blogCrossLinks = [
  { phrases: ['local seo'], url: '/blog/local-seo-singapore' },
  { phrases: ['seo basics', 'search engine optimisation', 'search engine optimization'], url: '/blog/website-seo-basics' },
  { phrases: ['website cost singapore', 'how much does a website cost'], url: '/blog/how-much-does-website-cost-singapore' },
  { phrases: ['google business profile', 'google my business'], url: '/blog/google-my-business-tips' },
  { phrases: ['whatsapp marketing'], url: '/blog/whatsapp-marketing-singapore' },
  { phrases: ['content marketing strategy', 'content marketing for'], url: '/blog/content-marketing-for-smes' },
  { phrases: ['website speed optimization', 'page speed optimization', 'site speed'], url: '/blog/website-speed-optimization-singapore' },
  { phrases: ['ai lead generation'], url: '/blog/ai-lead-generation-singapore' },
  { phrases: ['mobile-first design', 'mobile-first website'], url: '/blog/mobile-first-website-design-singapore' },
  { phrases: ['ssl certificate', 'https security'], url: '/blog/importance-of-ssl-https' },
  { phrases: ['website maintenance'], url: '/blog/website-maintenance-singapore' },
  { phrases: ['email marketing strategy', 'email marketing vs'], url: '/blog/email-marketing-vs-social-media' },
  { phrases: ['crm implementation', 'crm system'], url: '/blog/crm-implementation-singapore' },
  { phrases: ['website redesign'], url: '/blog/website-redesign-singapore' },
  { phrases: ['domain name', 'choosing a domain'], url: '/blog/choosing-domain-name' },
  { phrases: ['call to action', 'call-to-action', 'cta button'], url: '/blog/call-to-action-examples' },
  { phrases: ['website analytics', 'google analytics'], url: '/blog/website-analytics-basics' },
  { phrases: ['website security'], url: '/blog/website-security-basics' },
  { phrases: ['customer reviews', 'online reviews'], url: '/blog/customer-reviews-importance' },
  { phrases: ['digital transformation'], url: '/blog/sme-digital-transformation' },
  { phrases: ['copywriting tips', 'website copywriting'], url: '/blog/website-copywriting-tips' },
  { phrases: ['government grant', 'psg grant', 'edg grant'], url: '/blog/government-grants-website' },
  { phrases: ['marketing automation'], url: '/blog/marketing-automation-singapore' },
  { phrases: ['linkedin lead generation', 'linkedin outreach'], url: '/blog/linkedin-lead-generation-singapore' },
  { phrases: ['ai chatbot', 'chatbot for'], url: '/blog/ai-chatbot-website-guide' },
  { phrases: ['landing page best practice', 'landing page design'], url: '/blog/landing-page-best-practices' },
  { phrases: ['color psychology', 'colour psychology'], url: '/blog/color-psychology-web-design' },
  { phrases: ['typography'], url: '/blog/typography-web-design-guide' },
  { phrases: ['website navigation'], url: '/blog/website-navigation-best-practices' },
  { phrases: ['web accessibility', 'wcag'], url: '/blog/web-accessibility-wcag-guide' },
]

const allLinkRules = [...toolLinks, ...industryLinks, ...blogCrossLinks]

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Check if a position in HTML is inside an existing <a> tag or heading
 */
function isInsideTag(html, pos, tagName) {
  const before = html.substring(0, pos)
  const openPattern = new RegExp(`<${tagName}[\\s>]`, 'gi')
  const closePattern = new RegExp(`</${tagName}>`, 'gi')

  let lastOpen = -1
  let lastClose = -1
  let match

  while ((match = openPattern.exec(before)) !== null) lastOpen = match.index
  while ((match = closePattern.exec(before)) !== null) lastClose = match.index

  return lastOpen > lastClose
}

/**
 * Add internal links to a post's HTML content.
 */
function addInternalLinks(html, postSlug) {
  let linksAdded = 0
  const MAX_LINKS = 5
  let result = html
  const usedUrls = new Set()

  for (const rule of allLinkRules) {
    if (linksAdded >= MAX_LINKS) break
    if (usedUrls.has(rule.url)) continue

    // Skip self-links
    if (rule.url.includes(postSlug)) continue

    for (const phrase of rule.phrases) {
      if (linksAdded >= MAX_LINKS) break

      // Word-boundary match, case insensitive
      const regex = new RegExp(`\\b(${escapeRegex(phrase)})\\b`, 'i')
      const match = result.match(regex)

      if (match && match.index !== undefined) {
        // Check we're not inside an <a> tag or heading
        if (isInsideTag(result, match.index, 'a')) continue
        if (isInsideTag(result, match.index, 'h1')) continue
        if (isInsideTag(result, match.index, 'h2')) continue
        if (isInsideTag(result, match.index, 'h3')) continue
        if (isInsideTag(result, match.index, 'h4')) continue

        const original = match[0]
        const replacement = `<a href="${rule.url}">${original}</a>`
        result = result.substring(0, match.index) + replacement + result.substring(match.index + original.length)
        linksAdded++
        usedUrls.add(rule.url)
        break
      }
    }
  }

  return { html: result, linksAdded }
}

// ===== First, strip any links we may have added in a previous run =====
for (const post of posts) {
  // Remove links we previously added (they have no class attribute, just href)
  post.content = post.content.replace(/<a href="\/(tools|industries|blog)\/[^"]*">(.*?)<\/a>/g, '$2')
  // Also remove ones with class
  post.content = post.content.replace(/<a href="\/(tools|industries|blog)\/[^"]*" class="[^"]*">(.*?)<\/a>/g, '$2')
}

// ===== PROCESS ALL POSTS =====

let totalLinksAdded = 0
let postsModified = 0

for (const post of posts) {
  const { html, linksAdded } = addInternalLinks(post.content, post.slug)
  if (linksAdded > 0) {
    post.content = html
    totalLinksAdded += linksAdded
    postsModified++
  }
}

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2))

console.log(`Done!`)
console.log(`  Posts modified: ${postsModified} / ${posts.length}`)
console.log(`  Total internal links added: ${totalLinksAdded}`)
console.log(`  Average links per modified post: ${(totalLinksAdded / postsModified).toFixed(1)}`)
