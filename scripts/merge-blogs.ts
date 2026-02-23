import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const root = join(import.meta.dir, '..')
const dataPath = join(root, 'src/data/blog-posts.json')

const existing = JSON.parse(readFileSync(dataPath, 'utf-8'))
const batch1 = JSON.parse(readFileSync(join(root, 'scripts/ai-blogs-batch1.json'), 'utf-8'))
const batch2 = JSON.parse(readFileSync(join(root, 'scripts/ai-blogs-batch2.json'), 'utf-8'))

const merged = [...existing, ...batch1, ...batch2]

// Sort by date descending
merged.sort((a: any, b: any) => b.date.localeCompare(a.date))

writeFileSync(dataPath, JSON.stringify(merged, null, 2))

const published = merged.filter((p: any) => p.status === 'published').length
const scheduled = merged.filter((p: any) => p.status === 'scheduled').length
console.log(`Merged: ${merged.length} total (${published} published, ${scheduled} scheduled)`)
console.log(`Added ${batch1.length + batch2.length} new AI blogs`)
