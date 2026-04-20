import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";

const execAsync = promisify(exec);
const CWD = path.join(process.cwd());

// ─── Types ────────────────────────────────────────────────────────────────────
interface BlogSection {
  heading: string;
  body: string;
  tip?: string;
  photoQuery?: string; // Claude provides this per section
  photo?: string;      // filled in after Pexels download
}

interface GeneratedBlog {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  readTime: string;
  metaDescription: string;
  intro: string;
  sections: BlogSection[];
  conclusion: string;
  photoQuery: string; // hero image query
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function escapeForTemplate(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 80);
}

async function fetchPexelsPhoto(query: string, apiKey: string): Promise<string | null> {
  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape`;
    const res = await fetch(url, { headers: { Authorization: apiKey } });
    if (!res.ok) return null;
    const data = await res.json() as { photos?: Array<{ src: { large2x: string; large: string } }> };
    return data.photos?.[0]?.src?.large2x || data.photos?.[0]?.src?.large || null;
  } catch {
    return null;
  }
}

async function downloadPhoto(imageUrl: string, fileName: string): Promise<string> {
  const dir = path.join(CWD, "public", "images", "blog");
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, fileName);

  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`Failed to download photo: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(filePath, buffer);
  return `/images/blog/${fileName}`;
}

function generatePageFile(blog: GeneratedBlog, heroImage: string): string {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const isoDate = today.toISOString().split("T")[0];

  const sectionsCode = blog.sections.map((s) => {
    const tipCode = s.tip
      ? `,\n    tip: \`${escapeForTemplate(s.tip)}\``
      : "";
    const photoCode = s.photo
      ? `,\n    photo: "${s.photo}"`
      : "";
    return `  {\n    heading: \`${escapeForTemplate(s.heading)}\`,\n    body: \`${escapeForTemplate(s.body)}\`${tipCode}${photoCode}\n  }`;
  }).join(",\n");

  return `import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "${escapeForTemplate(blog.title)} | Jacky Luong",
  description: "${escapeForTemplate(blog.metaDescription)}",
  openGraph: {
    title: "${escapeForTemplate(blog.title)}",
    description: "${escapeForTemplate(blog.metaDescription)}",
    type: "article",
    publishedTime: "${isoDate}",
    authors: ["Jacky Luong"],
  },
};

const sections = [
${sectionsCode}
];

export default function BlogPost() {
  return (
    <>
      <Header />
      <main role="main" className="bg-[#FFFCF8] min-h-screen">

        {/* Back link */}
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-body)] text-[11px] tracking-[0.15em] uppercase text-[#B8956A] hover:text-[#8B6F47] transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </a>
        </div>

        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.25em] uppercase text-[#B8956A] font-medium">
              ${escapeForTemplate(blog.category)}
            </span>
            <span className="w-px h-3 bg-[#E8E0D8]" aria-hidden="true" />
            <span className="font-[family-name:var(--font-body)] text-sm text-[#B5ADA5]">
              ${dateStr}
            </span>
            <span className="w-px h-3 bg-[#E8E0D8]" aria-hidden="true" />
            <span className="font-[family-name:var(--font-body)] text-sm text-[#B5ADA5]">
              ${blog.readTime}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-[#2C2825] mb-6">
            ${escapeForTemplate(blog.title)}
          </h1>

          <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-base leading-relaxed mb-8">
            ${escapeForTemplate(blog.excerpt)}
          </p>

          <div className="w-full aspect-[16/7] relative overflow-hidden">
            <Image
              src="${heroImage}"
              alt="${escapeForTemplate(blog.title)}"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
        </header>

        {/* Article */}
        <article className="max-w-[720px] mx-auto px-6 pb-20">
          <div className="w-10 h-px bg-[#B8956A]/50 mb-10" aria-hidden="true" />

          {/* Intro */}
          <p className="font-[family-name:var(--font-body)] text-[#2C2825] text-lg leading-[1.85] mb-12">
            ${escapeForTemplate(blog.intro)}
          </p>

          {/* Sections */}
          {sections.map((section, i) => (
            <section key={i} className="mb-14">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-normal text-[#2C2825] mb-5">
                {section.heading}
              </h2>

              {"photo" in section && section.photo && (
                <div className="w-full aspect-[16/9] relative overflow-hidden mb-6">
                  <Image
                    src={section.photo as string}
                    alt={section.heading}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 720px"
                  />
                </div>
              )}

              <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-base leading-[1.9] mb-4">
                {section.body}
              </p>
              {section.tip && (
                <div className="border-l-2 border-[#B8956A] pl-5 py-2 my-6">
                  <p className="font-[family-name:var(--font-body)] text-[#2C2825] text-sm italic leading-relaxed">
                    {section.tip}
                  </p>
                </div>
              )}
              {i < sections.length - 1 && (
                <div className="mt-12 w-full h-px bg-[#E8E0D8]" aria-hidden="true" />
              )}
            </section>
          ))}

          {/* Conclusion */}
          <div className="mt-10 pt-10 border-t border-[#E8E0D8]">
            <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-base leading-[1.9]">
              ${escapeForTemplate(blog.conclusion)}
            </p>
          </div>
        </article>

        {/* CTA */}
        <div
          className="py-20 px-6 text-center"
          style={{ background: "linear-gradient(135deg, #2C2825 0%, #1C1612 100%)" }}
        >
          <p className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.35em] uppercase text-[#B8956A] mb-4">
            Ready to Make a Move?
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-light text-[#F5F0EB] mb-6">
            Let&apos;s Talk About Your Goals
          </h2>
          <p className="font-[family-name:var(--font-body)] text-[#F5F0EB]/55 text-sm max-w-md mx-auto mb-10">
            Whether you&apos;re buying, selling, or just exploring your options — I&apos;m here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contact"
              className="font-[family-name:var(--font-body)] text-[11px] tracking-[0.2em] uppercase font-medium px-10 py-4 bg-[#B8956A] text-[#FFFCF8] hover:bg-[#8B6F47] transition-all duration-300"
            >
              Schedule a Consultation
            </a>
            <a
              href="tel:4155721220"
              className="font-[family-name:var(--font-body)] text-[11px] tracking-[0.2em] uppercase font-medium px-10 py-4 border border-[#F5F0EB]/30 text-[#F5F0EB] hover:border-[#B8956A] hover:text-[#B8956A] transition-all duration-300"
            >
              Call 415.572.1220
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
`;
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    if (!topic?.trim()) {
      return NextResponse.json({ error: "Topic is required." }, { status: 400 });
    }

    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicKey || anthropicKey === "your-anthropic-api-key-here") {
      return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured." }, { status: 500 });
    }

    // ── Step 1: Generate blog content via Claude ─────────────────────────────
    const client = new Anthropic({ apiKey: anthropicKey });
    const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: `You are Jacky Luong, a real estate agent at Kinetic Real Estate in the San Francisco Bay Area. Write in Jacky's authentic voice: casual, warm, and friendly — like the mayor of your neighborhood who knows everyone, loves the city deeply, and genuinely wants to help people find their home. NOT stiff or corporate. Think: chatting with a trusted friend over coffee who happens to know everything about SF real estate.

Voice guidelines:
- Talk like a real person, not a brochure. Use "I", "you", "we", "honestly", "look", "here's the thing"
- Short punchy sentences mixed with longer ones. Natural rhythm
- Drop in personal anecdotes, local color, specific street names, what it FEELS like to live somewhere
- Be enthusiastic about the Bay Area — you love this place
- Humor is welcome. Light, warm, not try-hard
- Say things like: "I'll be honest with you...", "Here's what most people don't know...", "I've walked these streets a thousand times...", "Trust me on this one"
- Avoid em dashes (—) entirely. Use periods, commas, or just start a new sentence instead
- Avoid: "leverage", "curated", "seamless", "journey", "expertise", "game-changer", "delve", "it's worth noting", corporate-speak
- Do not use bullet points or lists inside section body text. Write in natural paragraphs like a human
- Vary sentence length naturally. No pattern of "short. Short. Longer sentence with detail."
- Every section should feel like you're telling a story or sharing insider knowledge, not reciting facts

Today's date: ${today}

Write a blog post about: "${topic}"

Return ONLY a valid JSON object (no markdown code fences, no explanation):
{
  "title": "Catchy, conversational title — not too formal",
  "slug": "url-friendly-slug-max-60-chars",
  "category": "Market Insights",
  "excerpt": "2-3 casual, engaging sentences that make someone want to read more",
  "readTime": "X min read",
  "metaDescription": "SEO meta description under 155 characters",
  "intro": "150-200 word opening that pulls the reader in — start with a story, a bold statement, or a question. Sound like Jacky talking directly to a friend.",
  "sections": [
    {
      "heading": "Conversational section heading (can be fun, not stuffy)",
      "body": "200-300 words. Specific SF Bay Area details, real neighborhood names, what it actually feels like. Personal, direct, warm.",
      "tip": "Optional: an honest tip, local secret, or straight-talk insight in 1-2 sentences",
      "photoQuery": "3-5 word Pexels search query specifically matching what THIS section is about (e.g. 'Pacific Heights Victorian homes' or 'open house staging living room')"
    }
  ],
  "conclusion": "100-150 word closing that feels personal — remind them Jacky is here to help, but make it genuine not salesy",
  "photoQuery": "3-5 word Pexels search query for hero image (e.g. san francisco neighborhood street)"
}

Requirements:
- Write 5-6 sections
- Each section MUST have a photoQuery that matches the specific content of that section — not a generic query
- Mention specific places: Pacific Heights, Atherton, Hillsborough, Palo Alto, Tiburon, Noe Valley, Daly City, Mission District — whichever fit naturally
- Include real talk about market conditions, prices, or what buyers/sellers actually experience
- Category must be one of: Market Insights, Buying Guide, Selling Guide, Lifestyle, Neighborhood
- slug: lowercase, hyphens only, no special characters`,
        },
      ],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text.trim() : "";
    const clean = raw.replace(/^```[a-z]*\n?/i, "").replace(/\n?```$/i, "").trim();
    const blog: GeneratedBlog = JSON.parse(clean);

    // Ensure slug is clean
    blog.slug = slugify(blog.slug || blog.title);

    const pexelsKey = process.env.PEXELS_API_KEY;
    const hasPexels = pexelsKey && pexelsKey !== "your-pexels-api-key-here";

    // ── Step 2: Fetch hero photo from Pexels ─────────────────────────────────
    let heroImage = "/images/golf-harding-park.webp"; // fallback

    if (hasPexels) {
      const heroUrl = await fetchPexelsPhoto(blog.photoQuery || "san francisco luxury real estate", pexelsKey!);
      if (heroUrl) {
        heroImage = await downloadPhoto(heroUrl, `${blog.slug}-hero.jpg`);
      }
    }

    // ── Step 3: Fetch per-section photos from Pexels ─────────────────────────
    if (hasPexels) {
      const photoPromises = blog.sections.map(async (section, i) => {
        if (!section.photoQuery) return;
        const url = await fetchPexelsPhoto(section.photoQuery, pexelsKey!);
        if (url) {
          section.photo = await downloadPhoto(url, `${blog.slug}-section-${i}.jpg`);
        }
      });
      await Promise.all(photoPromises);
    }

    // ── Step 4: Write the Next.js page file ───────────────────────────────────
    const blogDir = path.join(CWD, "src", "app", "(site)", "blog", blog.slug);
    await fs.mkdir(blogDir, { recursive: true });
    const pageContent = generatePageFile(blog, heroImage);
    await fs.writeFile(path.join(blogDir, "page.tsx"), pageContent, "utf-8");

    // ── Step 5: Update blog-posts.json ────────────────────────────────────────
    const dataPath = path.join(CWD, "src", "data", "blog-posts.json");
    const existingRaw = await fs.readFile(dataPath, "utf-8");
    const existing = JSON.parse(existingRaw);
    const dateStr = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

    const newPost = {
      id: String(Date.now()),
      category: blog.category,
      title: blog.title,
      excerpt: blog.excerpt.substring(0, 200),
      date: dateStr,
      readTime: blog.readTime,
      slug: blog.slug,
      image: heroImage,
      imageAlt: blog.title,
      gradient: "linear-gradient(135deg, #2C2825 0%, #1C1612 100%)",
      patternColor: "#B8956A",
    };

    existing.unshift(newPost); // Add to top of list
    await fs.writeFile(dataPath, JSON.stringify(existing, null, 2), "utf-8");

    // ── Step 6: Git commit and push ───────────────────────────────────────────
    try {
      await execAsync(`git add -A`, { cwd: CWD });
      await execAsync(
        `git commit -m "Auto-generated blog post: ${blog.title.replace(/"/g, "'")}"`,
        { cwd: CWD }
      );
      await execAsync(`git push origin main`, { cwd: CWD });
    } catch (gitErr) {
      console.error("Git push failed:", gitErr);
      // Don't fail the request — post was created locally
    }

    return NextResponse.json({
      success: true,
      slug: blog.slug,
      title: blog.title,
      url: `/blog/${blog.slug}`,
    });
  } catch (err) {
    console.error("generate-blog error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
