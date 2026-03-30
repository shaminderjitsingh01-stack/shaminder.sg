import { NextResponse } from 'next/server'

const CHANNEL_ID = 'UCioAVhZQCXQ02AT3fZteWaw'
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

export const revalidate = 3600 // refresh every hour

export async function GET() {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error('Failed to fetch RSS')

    const xml = await res.text()
    const ids: string[] = []
    const regex = /<yt:videoId>([^<]+)<\/yt:videoId>/g
    let match
    while ((match = regex.exec(xml)) !== null) {
      ids.push(match[1])
    }

    return NextResponse.json({ videos: ids.slice(0, 6) })
  } catch {
    return NextResponse.json({ videos: [] }, { status: 500 })
  }
}
