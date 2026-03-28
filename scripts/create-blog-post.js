#!/usr/bin/env node

/**
 * Create a new SEO-optimized blog post.
 *
 * Usage:
 *   node scripts/create-blog-post.js --slug "my-post-slug" --title "My Post Title" --description "Meta description" --category "Digital Marketing" --date "2026-04-01" --content content.html
 *
 * Or interactive:
 *   node scripts/create-blog-post.js
 *
 * The script will:
 * 1. Create the post entry in blog-posts.json
 * 2. Run internal link injection
 * 3. Validate SEO best practices
 * 4. Report any issues
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const POSTS_PATH = path.join(__dirname, '..', 'src', 'data', 'blog-posts.json')

const VALID_CATEGORIES = [
  'Digital Marketing',
  'AI & Automation',
  'AI Marketing',
  'Website Design',
  'SEO',
  'Content Marketing',
  'E-commerce',
  'Social Media',
  'Email Marketing',
  'Analytics',
  'Branding',
  'Singapore Business',
  'Productivity',
]

// ===== SEO VALIDATION =====

function validateSEO(post) {
  const issues = []
  const warnings = []
  const passes = []
  const content = post.content
  const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  const wordCount = textContent.split(/\s+/).length

  // 1. Title length (50-60 chars ideal for Google)
  if (post.title.length < 30) issues.push(`Title too short (${post.title.length} chars). Aim for 50-60.`)
  else if (post.title.length > 70) warnings.push(`Title may be truncated in Google (${post.title.length} chars). Aim for 50-60.`)
  else passes.push(`Title length OK (${post.title.length} chars)`)

  // 2. Meta description (150-160 chars)
  if (post.description.length < 100) issues.push(`Meta description too short (${post.description.length} chars). Aim for 150-160.`)
  else if (post.description.length > 170) warnings.push(`Meta description may be truncated (${post.description.length} chars). Aim for 150-160.`)
  else passes.push(`Meta description length OK (${post.description.length} chars)`)

  // 3. Word count (1500+ for ranking)
  if (wordCount < 800) issues.push(`Content too thin (${wordCount} words). Aim for 1500+.`)
  else if (wordCount < 1500) warnings.push(`Content is OK but short (${wordCount} words). 1500+ ranks better.`)
  else passes.push(`Word count good (${wordCount} words)`)

  // 4. H2 headings (at least 3 for structure)
  const h2Count = (content.match(/<h2/gi) || []).length
  if (h2Count < 2) issues.push(`Only ${h2Count} H2 headings. Add more for structure (aim for 3+).`)
  else passes.push(`H2 headings: ${h2Count}`)

  // 5. No H1 in content (H1 is the page title)
  const h1Count = (content.match(/<h1/gi) || []).length
  if (h1Count > 0) issues.push(`Found ${h1Count} H1 tag(s) in content. Only the page title should be H1.`)
  else passes.push('No H1 in content (correct)')

  // 6. Internal links
  const internalLinks = (content.match(/href="\/(blog|tools|industries)\//gi) || []).length
  if (internalLinks === 0) warnings.push('No internal links. Add links to related posts, tools, or industry pages.')
  else passes.push(`Internal links: ${internalLinks}`)

  // 7. External links (good for E-E-A-T)
  const externalLinks = (content.match(/href="https?:\/\//gi) || []).length
  if (externalLinks === 0) warnings.push('No external links. Link to authoritative sources for E-E-A-T.')
  else passes.push(`External links: ${externalLinks}`)

  // 8. Images
  const imgCount = (content.match(/<img/gi) || []).length
  if (imgCount === 0) warnings.push('No images in content. Add relevant images with alt text.')
  else passes.push(`Images: ${imgCount}`)

  // 9. Image alt text
  const imgsWithoutAlt = (content.match(/<img(?![^>]*alt=)[^>]*>/gi) || []).length
  if (imgsWithoutAlt > 0) issues.push(`${imgsWithoutAlt} image(s) missing alt text.`)

  // 10. FAQ-like content (questions ending with ?)
  const questions = (content.match(/<h[23][^>]*>[^<]*\?<\/h[23]>/gi) || []).length
  if (questions >= 2) passes.push(`FAQ-ready: ${questions} question headings (will get FAQPage schema)`)
  else warnings.push('No FAQ-style headings found. Add H2/H3 questions (ending with ?) for FAQ schema.')

  // 11. Slug quality
  if (post.slug.length > 60) warnings.push(`Slug is long (${post.slug.length} chars). Keep under 60.`)
  if (post.slug.includes('--')) issues.push('Slug has double dashes.')
  if (!/^[a-z0-9-]+$/.test(post.slug)) issues.push('Slug should only contain lowercase letters, numbers, and hyphens.')

  // 12. "Singapore" mention (local SEO)
  const sgMentions = (textContent.match(/singapore/gi) || []).length
  if (sgMentions === 0) warnings.push('No mention of "Singapore". Add for local SEO relevance.')
  else passes.push(`Singapore mentions: ${sgMentions}`)

  // 13. Strong/bold text for emphasis
  const boldCount = (content.match(/<strong/gi) || []).length + (content.match(/<b>/gi) || []).length
  if (boldCount === 0) warnings.push('No bold/strong text. Use for emphasis on key phrases.')
  else passes.push(`Bold text instances: ${boldCount}`)

  // 14. Lists (ul/ol) for readability
  const listCount = (content.match(/<[uo]l/gi) || []).length
  if (listCount === 0) warnings.push('No lists. Add bullet/numbered lists for readability and featured snippets.')
  else passes.push(`Lists: ${listCount}`)

  return { issues, warnings, passes }
}

function printReport(post, result) {
  console.log('\n' + '='.repeat(60))
  console.log(`SEO AUDIT: ${post.title}`)
  console.log('='.repeat(60))

  if (result.passes.length > 0) {
    console.log('\n  PASS:')
    result.passes.forEach(p => console.log(`    [OK] ${p}`))
  }

  if (result.warnings.length > 0) {
    console.log('\n  WARNINGS:')
    result.warnings.forEach(w => console.log(`    [!] ${w}`))
  }

  if (result.issues.length > 0) {
    console.log('\n  ISSUES (fix these):')
    result.issues.forEach(i => console.log(`    [X] ${i}`))
  }

  const score = Math.round(
    (result.passes.length / (result.passes.length + result.warnings.length + result.issues.length)) * 100
  )
  console.log(`\n  SEO Score: ${score}%`)
  console.log('='.repeat(60))
}

// ===== MAIN =====

async function main() {
  const args = process.argv.slice(2)

  // If --audit flag, audit existing posts
  if (args.includes('--audit')) {
    const posts = JSON.parse(fs.readFileSync(POSTS_PATH, 'utf8'))
    const slug = args[args.indexOf('--audit') + 1]

    if (slug === 'all') {
      let totalScore = 0
      const lowScorePosts = []
      for (const post of posts) {
        const result = validateSEO(post)
        const score = Math.round(
          (result.passes.length / (result.passes.length + result.warnings.length + result.issues.length)) * 100
        )
        totalScore += score
        if (score < 50) lowScorePosts.push({ slug: post.slug, score })
      }
      console.log(`Average SEO score across ${posts.length} posts: ${Math.round(totalScore / posts.length)}%`)
      if (lowScorePosts.length > 0) {
        console.log(`\nPosts scoring below 50%:`)
        lowScorePosts.sort((a, b) => a.score - b.score).forEach(p => console.log(`  ${p.score}% - ${p.slug}`))
      }
      return
    }

    const post = posts.find(p => p.slug === slug)
    if (!post) {
      console.error(`Post not found: ${slug}`)
      process.exit(1)
    }
    printReport(post, validateSEO(post))
    return
  }

  // Parse CLI args
  let slug = '', title = '', description = '', category = '', date = '', contentFile = ''

  for (let i = 0; i < args.length; i += 2) {
    switch (args[i]) {
      case '--slug': slug = args[i + 1]; break
      case '--title': title = args[i + 1]; break
      case '--description': description = args[i + 1]; break
      case '--category': category = args[i + 1]; break
      case '--date': date = args[i + 1]; break
      case '--content': contentFile = args[i + 1]; break
    }
  }

  // Interactive mode if missing required fields
  if (!slug || !title || !description || !category || !contentFile) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    const ask = (q) => new Promise(resolve => rl.question(q, resolve))

    if (!slug) slug = await ask('Slug (e.g., seo-guide-singapore-2026): ')
    if (!title) title = await ask('Title: ')
    if (!description) description = await ask('Meta description (150-160 chars): ')
    if (!category) {
      console.log('\nCategories:', VALID_CATEGORIES.join(', '))
      category = await ask('Category: ')
    }
    if (!date) date = new Date().toISOString().split('T')[0]
    if (!contentFile) contentFile = await ask('Path to HTML content file: ')

    rl.close()
  }

  if (!date) date = new Date().toISOString().split('T')[0]

  // Validate category
  if (!VALID_CATEGORIES.includes(category)) {
    console.error(`Invalid category: "${category}"\nValid: ${VALID_CATEGORIES.join(', ')}`)
    process.exit(1)
  }

  // Read content
  if (!fs.existsSync(contentFile)) {
    console.error(`Content file not found: ${contentFile}`)
    process.exit(1)
  }
  const content = fs.readFileSync(contentFile, 'utf8').trim()

  // Calculate reading time
  const wordCount = content.replace(/<[^>]*>/g, ' ').split(/\s+/).length
  const readingTime = `${Math.max(1, Math.ceil(wordCount / 250))} min read`

  // Build post object
  const newPost = {
    slug,
    title,
    description,
    date,
    category,
    readingTime,
    image: '/shaminder.jpg',
    content,
    status: 'published',
  }

  // Validate SEO before saving
  const result = validateSEO(newPost)
  printReport(newPost, result)

  if (result.issues.length > 0) {
    console.log('\nFix the issues above before publishing.')
    console.log('Run with --force to save anyway.')
    if (!args.includes('--force')) {
      process.exit(1)
    }
  }

  // Save to blog-posts.json
  const posts = JSON.parse(fs.readFileSync(POSTS_PATH, 'utf8'))

  // Check for duplicate slug
  if (posts.find(p => p.slug === slug)) {
    console.error(`\nSlug "${slug}" already exists! Choose a different slug.`)
    process.exit(1)
  }

  posts.push(newPost)
  fs.writeFileSync(POSTS_PATH, JSON.stringify(posts, null, 2))
  console.log(`\nPost added: /blog/${slug}`)

  // Run internal linking
  console.log('Running internal link injection...')
  require('./add-internal-links.js')

  console.log('\nDone! Next steps:')
  console.log('  1. Review the post at /blog/' + slug)
  console.log('  2. Run `bun run build` to generate the static page')
  console.log('  3. Deploy to production')
}

main().catch(console.error)
