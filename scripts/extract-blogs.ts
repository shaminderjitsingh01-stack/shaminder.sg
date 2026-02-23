/**
 * Blog Extraction Script
 *
 * Reads all .html blog posts from the old shaminder1-source/blog/ directory,
 * extracts structured metadata and clean article content, and outputs a single
 * JSON file at src/data/blog-posts.json sorted by date (newest first).
 *
 * Usage:  bun scripts/extract-blogs.ts
 */

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, basename } from "node:path";
import * as cheerio from "cheerio";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const SOURCE_DIR = "C:/Users/Dell/Projects/shaminder1-source/blog";
const OUTPUT_FILE = "C:/Users/Dell/Projects/shaminder.sg/src/data/blog-posts.json";
const TODAY = "2026-02-23";
const EXCLUDE_FILES = new Set(["index.html", "TEMPLATE-blog-post.html"]);
const DEFAULT_IMAGE = "https://shaminder.sg/shaminder.jpg";
const DEFAULT_CATEGORY = "Digital Marketing";
const DEFAULT_READING_TIME = "5 min";

// Elements we want to keep in the cleaned content
const ALLOWED_TAGS = new Set([
  "h2", "h3", "p", "ul", "ol", "li", "strong", "em", "a",
  "img", "blockquote", "table", "th", "td", "tr", "thead", "tbody",
  "div", // kept temporarily for key-takeaways extraction, stripped later
]);

// ---------------------------------------------------------------------------
// Date parsing
// ---------------------------------------------------------------------------

const MONTH_MAP: Record<string, string> = {
  january: "01", february: "02", march: "03", april: "04",
  may: "05", june: "06", july: "07", august: "08",
  september: "09", october: "10", november: "11", december: "12",
  jan: "01", feb: "02", mar: "03", apr: "04",
  jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12",
};

function parseDate(raw: string): string | null {
  if (!raw) return null;
  const s = raw.trim();

  // YYYY-MM-DD
  const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) return s;

  // "March 15, 2026" or "Mar 15, 2026"
  const longMatch = s.match(/^(\w+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (longMatch) {
    const month = MONTH_MAP[longMatch[1].toLowerCase()];
    if (month) {
      return `${longMatch[3]}-${month}-${longMatch[2].padStart(2, "0")}`;
    }
  }

  // "15 March 2026"
  const dmyMatch = s.match(/^(\d{1,2})\s+(\w+)\s+(\d{4})$/);
  if (dmyMatch) {
    const month = MONTH_MAP[dmyMatch[2].toLowerCase()];
    if (month) {
      return `${dmyMatch[3]}-${month}-${dmyMatch[1].padStart(2, "0")}`;
    }
  }

  // "Jan 9, 2026" style from date-meta (short month with day, year)
  const shortMatch = s.match(/^(\w{3})\s+(\d{1,2}),?\s+(\d{4})$/);
  if (shortMatch) {
    const month = MONTH_MAP[shortMatch[1].toLowerCase()];
    if (month) {
      return `${shortMatch[3]}-${month}-${shortMatch[2].padStart(2, "0")}`;
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Content cleaning
// ---------------------------------------------------------------------------

function cleanContent($: cheerio.CheerioAPI, article: cheerio.Cheerio<cheerio.Element>): string {
  // Clone the article so we don't mutate the original
  const clone = article.clone();

  // Remove elements we don't want
  clone.find("script").remove();
  clone.find("style").remove();
  clone.find("nav").remove();
  clone.find("footer").remove();
  clone.find(".cta").remove();
  clone.find(".cta-section").remove();
  clone.find(".related-articles").remove();
  clone.find(".author-box").remove();
  clone.find(".whatsapp-float").remove();
  clone.find(".date-meta").remove();
  clone.find(".breadcrumb").remove();

  // For classic structure: remove header (contains h1 and meta info)
  clone.find("header").remove();

  // For modern structure: remove h1 directly, hero images (we store image separately)
  clone.find("h1").remove();
  clone.find(".hero-image").remove();
  clone.find("img.hero-image").remove();

  // Remove meta paragraph (Published: ... | Category: ... | Reading Time: ...)
  clone.find("p.meta").remove();

  // Remove inline SVG date display paragraph
  clone.find("p.date-meta").remove();

  // Now extract from .content div (modern) or sections (classic)
  let contentRoot: cheerio.Cheerio<cheerio.Element>;

  const contentDiv = clone.find(".content");
  if (contentDiv.length > 0) {
    contentRoot = contentDiv;
  } else {
    contentRoot = clone;
  }

  // Remove CTA divs inside content (class="cta" used in modern posts)
  contentRoot.find(".cta").remove();
  contentRoot.find("div.cta").remove();

  // Build clean HTML from allowed elements
  const cleanHtml = buildCleanHtml($, contentRoot);
  return cleanHtml.trim();
}

function buildCleanHtml($: cheerio.CheerioAPI, root: cheerio.Cheerio<cheerio.Element>): string {
  const parts: string[] = [];

  root.children().each((_, el) => {
    const tagName = (el as cheerio.TagElement).tagName?.toLowerCase();
    if (!tagName) return;

    const $el = $(el);

    // Skip unwanted elements
    if ($el.hasClass("cta") || $el.hasClass("cta-section") ||
        $el.hasClass("related-articles") || $el.hasClass("author-box") ||
        $el.hasClass("whatsapp-float") || $el.hasClass("date-meta") ||
        $el.hasClass("hero-image")) {
      return;
    }

    if (tagName === "section") {
      // Check if section is a CTA section
      if ($el.hasClass("cta-section") || $el.hasClass("cta")) return;

      // Unwrap section: process its children directly
      const sectionContent = buildCleanHtml($, $el);
      if (sectionContent.trim()) {
        parts.push(sectionContent);
      }
      return;
    }

    if (tagName === "div") {
      // Key takeaways div - convert to semantic HTML
      if ($el.hasClass("key-takeaways")) {
        const h3 = $el.find("h3").first().text().trim();
        const listItems: string[] = [];
        $el.find("li").each((_, li) => {
          listItems.push(`<li>${$(li).html()?.trim() || ""}</li>`);
        });
        if (listItems.length > 0) {
          parts.push(`<h3>${h3 || "Key Takeaways"}</h3>`);
          parts.push(`<ul>${listItems.join("")}</ul>`);
        }
        return;
      }

      // Infographic or other wrapper divs - unwrap children
      const divContent = buildCleanHtml($, $el);
      if (divContent.trim()) {
        parts.push(divContent);
      }
      return;
    }

    if (ALLOWED_TAGS.has(tagName)) {
      const outerHtml = $.html(el);
      if (outerHtml) {
        parts.push(outerHtml.trim());
      }
    }
  });

  return parts.join("\n");
}

// ---------------------------------------------------------------------------
// Blog post interface
// ---------------------------------------------------------------------------

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
  image: string;
  status: "published" | "scheduled";
  content: string;
}

// ---------------------------------------------------------------------------
// Single file extraction
// ---------------------------------------------------------------------------

function extractBlogPost(html: string, filename: string): BlogPost | null {
  const $ = cheerio.load(html);
  const slug = basename(filename, ".html");

  // --- Title ---
  let title = $("title").text().trim();
  // Remove " | shaminder.sg" suffix (case-insensitive)
  title = title.replace(/\s*\|\s*shaminder\.sg$/i, "").trim();

  // --- Description ---
  const description = $('meta[name="description"]').attr("content")?.trim() || "";

  // --- Date: try JSON-LD datePublished first ---
  let date: string | null = null;

  $('script[type="application/ld+json"]').each((_, el) => {
    if (date) return; // already found
    try {
      const jsonText = $(el).html();
      if (!jsonText) return;
      const data = JSON.parse(jsonText);
      // Some pages have Article, some BlogPosting; both can have datePublished
      if (data.datePublished && (data["@type"] === "Article" || data["@type"] === "BlogPosting")) {
        const parsed = parseDate(data.datePublished);
        if (parsed) {
          // Prefer the Article schema date over BlogPosting if Article is present
          if (data["@type"] === "Article") {
            date = parsed;
          } else if (!date) {
            date = parsed;
          }
        }
      }
    } catch {
      // JSON parse error — skip
    }
  });

  // Fallback: try visible meta line "Published: ..."
  if (!date) {
    const metaText = $("p.meta").text();
    const pubMatch = metaText.match(/Published:\s*([^|]+)/i);
    if (pubMatch) {
      date = parseDate(pubMatch[1].trim());
    }
  }

  // Fallback: try date-meta text (e.g. "Jan 9, 2026")
  if (!date) {
    const dateMeta = $("p.date-meta").text().trim();
    if (dateMeta) {
      date = parseDate(dateMeta);
    }
  }

  // Last resort: use today
  if (!date) {
    date = TODAY;
  }

  // --- Category ---
  let category = DEFAULT_CATEGORY;
  const metaText = $("p.meta").text();
  const catMatch = metaText.match(/Category:\s*([^|]+)/i);
  if (catMatch) {
    category = catMatch[1].trim();
  }

  // --- Reading Time ---
  let readingTime = DEFAULT_READING_TIME;
  const rtMatch = metaText.match(/Reading Time:\s*(\d+\s*min)/i);
  if (rtMatch) {
    readingTime = rtMatch[1].trim();
  }

  // --- Image ---
  let image = $('meta[property="og:image"]').attr("content")?.trim() || DEFAULT_IMAGE;
  // If og:image is the default shaminder.jpg, try to find hero-image in the article
  if (image === DEFAULT_IMAGE || image === "https://shaminder.sg/shaminder.jpg") {
    const heroImg = $("img.hero-image").attr("src");
    if (heroImg) {
      image = heroImg;
    }
  }

  // --- Status ---
  const status: "published" | "scheduled" = date > TODAY ? "scheduled" : "published";

  // --- Content ---
  const article = $("article").first();
  if (!article.length) {
    console.warn(`  [WARN] No <article> found in ${filename}, skipping.`);
    return null;
  }

  const content = cleanContent($, article);

  return {
    slug,
    title,
    description,
    date,
    category,
    readingTime,
    image,
    status,
    content,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("Reading blog files from:", SOURCE_DIR);

  const files = await readdir(SOURCE_DIR);
  const htmlFiles = files.filter(
    (f) => f.endsWith(".html") && !EXCLUDE_FILES.has(f)
  );

  console.log(`Found ${htmlFiles.length} blog HTML files (excluding index.html and TEMPLATE).`);

  const posts: BlogPost[] = [];
  let skipped = 0;

  for (const file of htmlFiles) {
    const filePath = join(SOURCE_DIR, file);
    const html = await readFile(filePath, "utf-8");
    const post = extractBlogPost(html, file);
    if (post) {
      posts.push(post);
    } else {
      skipped++;
    }
  }

  // Sort by date descending (newest first)
  posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return a.slug.localeCompare(b.slug);
  });

  // Ensure output directory exists
  const outputDir = join(OUTPUT_FILE, "..");
  await mkdir(outputDir, { recursive: true });

  await writeFile(OUTPUT_FILE, JSON.stringify(posts, null, 2), "utf-8");

  const published = posts.filter((p) => p.status === "published").length;
  const scheduled = posts.filter((p) => p.status === "scheduled").length;

  console.log(`\nExtraction complete!`);
  console.log(`  Total posts: ${posts.length}`);
  console.log(`  Published:   ${published}`);
  console.log(`  Scheduled:   ${scheduled}`);
  console.log(`  Skipped:     ${skipped}`);
  console.log(`  Output:      ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
