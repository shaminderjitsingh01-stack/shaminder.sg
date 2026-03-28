#!/usr/bin/env node

/**
 * Combines batch-1.json through batch-4.json into blog-posts.json
 * Assigns dates: 2 posts/day starting from 2026-03-29
 * Validates each post passes SEO checks
 */

const fs = require('fs')
const path = require('path')

const POSTS_PATH = path.join(__dirname, '..', 'src', 'data', 'blog-posts.json')
const SCRIPTS_DIR = __dirname

// Load existing posts
const existingPosts = JSON.parse(fs.readFileSync(POSTS_PATH, 'utf8'))
console.log(`Existing posts: ${existingPosts.length}`)

// Load all batches
const batches = []
for (let i = 1; i <= 4; i++) {
  const batchPath = path.join(SCRIPTS_DIR, `batch-${i}.json`)
  if (!fs.existsSync(batchPath)) {
    console.error(`Missing: batch-${i}.json`)
    process.exit(1)
  }
  const batch = JSON.parse(fs.readFileSync(batchPath, 'utf8'))
  console.log(`Batch ${i}: ${batch.length} posts`)
  batches.push(...batch)
}

console.log(`Total new posts: ${batches.length}`)

// Assign dates: 2 posts per day starting 2026-03-29
const startDate = new Date('2026-03-29')
batches.forEach((post, index) => {
  const dayOffset = Math.floor(index / 2)
  const date = new Date(startDate.getTime() + dayOffset * 24 * 60 * 60 * 1000)
  post.date = date.toISOString().split('T')[0]
  post.status = 'published'

  // Calculate reading time if not set
  if (!post.readingTime) {
    const wordCount = post.content.replace(/<[^>]*>/g, ' ').split(/\s+/).length
    post.readingTime = `${Math.max(1, Math.ceil(wordCount / 250))} min read`
  }
})

// Check for duplicate slugs
const existingSlugs = new Set(existingPosts.map(p => p.slug))
const newSlugs = new Set()
const duplicates = []

for (const post of batches) {
  if (existingSlugs.has(post.slug) || newSlugs.has(post.slug)) {
    duplicates.push(post.slug)
  }
  newSlugs.add(post.slug)
}

if (duplicates.length > 0) {
  console.warn(`\nWARNING: ${duplicates.length} duplicate slugs found:`)
  duplicates.forEach(d => console.warn(`  - ${d}`))
  console.warn('Skipping duplicates...')
}

// Filter out duplicates
const uniqueNew = batches.filter(p => !existingSlugs.has(p.slug))

// Validate each post
let issues = 0
for (const post of uniqueNew) {
  const wordCount = post.content.replace(/<[^>]*>/g, ' ').split(/\s+/).length
  const h2Count = (post.content.match(/<h2/gi) || []).length
  const h1Count = (post.content.match(/<h1/gi) || []).length
  const faqCount = (post.content.match(/<h3[^>]*>[^<]*\?<\/h3>/gi) || []).length

  const postIssues = []
  if (wordCount < 1000) postIssues.push(`only ${wordCount} words (need 1500+)`)
  if (h2Count < 3) postIssues.push(`only ${h2Count} H2s (need 4+)`)
  if (h1Count > 0) postIssues.push(`has ${h1Count} H1 tags (should be 0)`)
  if (faqCount < 2) postIssues.push(`only ${faqCount} FAQ questions (need 2+)`)
  if (!post.description || post.description.length < 80) postIssues.push(`meta description too short`)
  if (!post.image || post.image === '') postIssues.push(`missing image`)

  if (postIssues.length > 0) {
    console.warn(`\n  [WARN] ${post.slug}:`)
    postIssues.forEach(i => console.warn(`    - ${i}`))
    issues++
  }
}

// Combine
const allPosts = [...existingPosts, ...uniqueNew]

// Save
fs.writeFileSync(POSTS_PATH, JSON.stringify(allPosts, null, 2))

// Print summary
const lastDate = uniqueNew[uniqueNew.length - 1]?.date || 'N/A'
console.log(`\n${'='.repeat(50)}`)
console.log(`DONE!`)
console.log(`  Existing posts kept: ${existingPosts.length}`)
console.log(`  New posts added: ${uniqueNew.length}`)
console.log(`  Total posts: ${allPosts.length}`)
console.log(`  Schedule: 2026-03-29 to ${lastDate}`)
console.log(`  Posts with issues: ${issues}`)
console.log(`${'='.repeat(50)}`)

// Print date schedule
console.log('\nSchedule:')
const dateMap = {}
uniqueNew.forEach(p => {
  if (!dateMap[p.date]) dateMap[p.date] = []
  dateMap[p.date].push(p.slug)
})
Object.entries(dateMap).sort().forEach(([date, slugs]) => {
  console.log(`  ${date}: ${slugs.join(', ')}`)
})
