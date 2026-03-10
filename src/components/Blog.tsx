"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const posts = [
  {
    category: "Market Update",
    title: "SF Bay Area Luxury Market: What to Expect in 2026",
    excerpt:
      "The Bay Area luxury market continues to evolve. Here's what buyers and sellers need to know heading into the second half of the year.",
    date: "March 2026",
    readTime: "5 min read",
    href: "#blog", // Update when this post has its own page
    // Placeholder gradient — replace with: <Image src="/images/blog-market-update.jpg" ... />
    gradient: "linear-gradient(135deg, #E8E0D8 0%, #DDD5CB 50%, #D4C9BC 100%)",
    patternColor: "#B8956A",
  },
  {
    category: "Buyer's Guide",
    title: "First-Time Luxury Home Buyer? 7 Things You Need to Know",
    excerpt:
      "Purchasing your first luxury property is exciting but comes with unique considerations. From inspections to negotiations, here's your essential guide.",
    date: "February 2026",
    readTime: "8 min read",
    href: "#blog", // Update when this post has its own page
    // Placeholder gradient — replace with: <Image src="/images/blog-buyers-guide.jpg" ... />
    gradient: "linear-gradient(135deg, #E0D8D0 0%, #D0C5B8 50%, #C8BAA8 100%)",
    patternColor: "#B8956A",
  },
  {
    category: "Lifestyle",
    title: "The Best Golf Courses in San Francisco & the Bay Area",
    excerpt:
      "From world-renowned championship courses to hidden gems with stunning bay views, discover the top golf destinations that make the Bay Area a golfer's paradise.",
    date: "March 2026",
    readTime: "6 min read",
    href: "/blog/best-golf-courses-san-francisco-bay-area",
    // Placeholder gradient — replace with: <Image src="/images/blog-golf-courses.jpg" ... />
    // Suggested photo: aerial or fairway shot of a Bay Area course (e.g. Harding Park, Pebble Beach)
    gradient: "linear-gradient(135deg, #7A9B68 0%, #A08C48 55%, #C4A84E 100%)",
    patternColor: "#5A7A42",
  },
];

interface BlogCardProps {
  post: (typeof posts)[number];
  index: number;
  inView: boolean;
}


function BlogCard({ post, index, inView }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: 0.1 + index * 0.12,
      }}
      className="group flex flex-col bg-[#FAF7F3] border border-[#E8E0D8] hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
    >
      {/* Placeholder image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden flex-shrink-0">
        <div
          className="absolute inset-0"
          style={{ background: post.gradient }}
          aria-hidden="true"
        />
        {/* Subtle decorative pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${post.patternColor} 0px, ${post.patternColor} 1px, transparent 0px, transparent 50%)`,
            backgroundSize: "20px 20px",
          }}
          aria-hidden="true"
        />
        {/* Category tag overlaid on image */}
        <div className="absolute top-4 left-4">
          <span className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.25em] uppercase text-[#B8956A] bg-[#FFFCF8]/90 px-3 py-1.5 font-medium">
            {post.category}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title */}
        <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-normal leading-snug text-[#2C2825] group-hover:text-[#B8956A] transition-colors duration-300 mb-3">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-sm leading-relaxed flex-1 mb-6">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E8E0D8]">
          <div className="flex items-center gap-3">
            <span className="font-[family-name:var(--font-body)] text-[#B5ADA5] text-[11px]">
              {post.date}
            </span>
            <span className="w-px h-3 bg-[#E8E0D8]" aria-hidden="true" />
            <span className="font-[family-name:var(--font-body)] text-[#B5ADA5] text-[11px]">
              {post.readTime}
            </span>
          </div>
          <a
            href={post.href}
            className="font-[family-name:var(--font-body)] text-[11px] tracking-[0.15em] uppercase text-[#B8956A] group-hover:text-[#8B6F47] transition-colors duration-300 font-medium"
            aria-label={`Read more about ${post.title}`}
          >
            Read More →
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="blog"
      ref={ref}
      aria-label="Blog — Insights and expertise"
      className="bg-[#FFFCF8] py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Header ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-14"
        >
          <p className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.4em] uppercase text-[#B8956A] mb-4 font-light">
            Insights &amp; Expertise
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-normal text-[#2C2825] mb-4">
            From the Blog
          </h2>
          <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-sm max-w-md mx-auto leading-relaxed">
            Market insights, buying tips, and Bay Area real estate expertise
          </p>
        </motion.div>

        {/* ── Cards grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {posts.map((post, i) => (
            <BlogCard key={post.title} post={post} index={i} inView={inView} />
          ))}
        </div>

        {/* ── View All Posts CTA ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            delay: 0.5,
          }}
          className="flex justify-center"
        >
          <a
            href="#blog"
            className="font-[family-name:var(--font-body)] text-[11px] tracking-[0.2em] uppercase font-medium px-10 py-4 border border-[#2C2825] text-[#2C2825] hover:bg-[#2C2825] hover:text-[#FFFCF8] transition-all duration-300"
          >
            View All Posts
          </a>
        </motion.div>

      </div>
    </section>
  );
}
