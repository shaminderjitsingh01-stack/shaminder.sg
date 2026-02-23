import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
  image: string;
  status: string;
  content: string;
}

// Read the blog posts file
const filePath = resolve(__dirname, "../src/data/blog-posts.json");
const fileContent = readFileSync(filePath, "utf-8");
const blogPosts: BlogPost[] = JSON.parse(fileContent);

// Filter scheduled posts and sort by their current date
const scheduledPosts = blogPosts
  .filter((post) => post.status === "scheduled")
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

console.log(`Found ${scheduledPosts.length} scheduled posts`);

// Redistribute dates starting from Feb 24, 2026
// 2 posts per day for 17 days (34 posts total)
const startDate = new Date("2026-02-24");
const postsPerDay = 2;

scheduledPosts.forEach((post, index) => {
  const dayOffset = Math.floor(index / postsPerDay);
  const newDate = new Date(startDate);
  newDate.setDate(newDate.getDate() + dayOffset);

  // Format as YYYY-MM-DD
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  console.log(
    `Post ${index + 1}: "${post.title.substring(0, 50)}..." → ${formattedDate}`
  );

  post.date = formattedDate;
});

// Write the updated file back
writeFileSync(filePath, JSON.stringify(blogPosts, null, 2));
console.log(
  `\nSuccessfully updated ${scheduledPosts.length} posts in blog-posts.json`
);
