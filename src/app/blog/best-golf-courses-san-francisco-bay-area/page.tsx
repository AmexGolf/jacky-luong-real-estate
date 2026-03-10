import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Best Golf Courses in San Francisco & the Bay Area | Jacky Luong",
  description:
    "From TPC Harding Park to Half Moon Bay Golf Links, discover the top golf courses in San Francisco and the Bay Area — world-class play with stunning views.",
  openGraph: {
    title: "The Best Golf Courses in San Francisco & the Bay Area",
    description:
      "From TPC Harding Park to Half Moon Bay Golf Links, discover the top golf courses in San Francisco and the Bay Area.",
    type: "article",
    publishedTime: "2026-03-01",
    authors: ["Jacky Luong"],
  },
};

const courses = [
  {
    name: "TPC Harding Park",
    location: "San Francisco",
    tag: "Public · Championship Pedigree",
    body: `Few public courses in America carry the prestige of TPC Harding Park. Nestled along the shores of Lake Merced in the southwestern corner of San Francisco, Harding Park has hosted the PGA Championship, the WGC-Match Play, and Presidents Cup — attracting the world's best players to a course that everyday golfers can book and play. The tree-lined fairways demand accuracy off the tee, while the greens reward patience and touch. The vibe here is unpretentious but serious — you're walking the same ground as Rory McIlroy and Tiger Woods, and the course respects your game in return. Difficulty: Moderate to challenging.`,
    image: "/images/golf-harding-park.webp",
    imageAlt: "TPC Harding Park tree-lined fairway along Lake Merced, San Francisco — host of the PGA Championship",
  },
  {
    name: "The Olympic Club",
    location: "San Francisco",
    tag: "Private · Historic",
    body: `One of the most storied private clubs in American golf, The Olympic Club's Lake Course has hosted six U.S. Opens — more than any other course in California. Set among towering eucalyptus and cypress trees just minutes from the Pacific Ocean, the course plays longer than its yardage suggests, with narrow fairways that punish wayward shots and small, undulating greens that test even the sharpest short games. Membership here is among the most coveted in the Bay Area, and the club's history is unmatched. For those fortunate enough to play it, the experience is unforgettable. Difficulty: Challenging.`,
    image: "/images/golf-olympic-club.jpg",
    imageAlt: "The Olympic Club Lake Course lined with eucalyptus and cypress trees, San Francisco — six-time U.S. Open host",
  },
  {
    name: "Presidio Golf Course",
    location: "San Francisco",
    tag: "Public · Scenic",
    body: `Tucked inside the breathtaking Presidio National Park, Presidio Golf Course is one of the most beautiful — and most accessible — courses in the city. Dating back to 1895, this historic course winds through a forest of Monterey cypress and pine, with the Golden Gate Bridge peeking through the trees on clear days. The atmosphere is relaxed and welcoming, making it a favorite for both serious golfers and those looking for a scenic afternoon round. It's a rare gem: a historic, well-maintained course in a national park, open to the public at reasonable rates. Difficulty: Moderate.`,
    image: "/images/golf-presido.webp",
    imageAlt: "Presidio Golf Course fairway through Monterey cypress trees with Golden Gate Bridge views, San Francisco",
  },
  {
    name: "Crystal Springs Golf Course",
    location: "Burlingame",
    tag: "Public · Peninsula Views",
    body: `Located in Burlingame on the San Francisco Peninsula, Crystal Springs Golf Course offers some of the most dramatic scenery in Bay Area golf. The course overlooks the stunning Crystal Springs Reservoir — a protected watershed surrounded by rolling hills — with views that stretch for miles on a clear day. The layout is thoughtfully designed with varied elevation changes and interesting risk-reward holes that keep every round engaging. It's a well-kept secret among Peninsula locals, offering a quality golf experience without the crowds or price tag of more famous destinations. Difficulty: Moderate.`,
    image: "/images/goldf-crystal-springs.jpg",
    imageAlt: "Crystal Springs Golf Course with panoramic views of Crystal Springs Reservoir, Burlingame",
  },
  {
    name: "Half Moon Bay Golf Links",
    location: "Half Moon Bay",
    tag: "Public · Oceanfront",
    body: `Often called the "Pebble Beach of the Bay Area," Half Moon Bay Golf Links sits on the rugged Pacific coastline just 30 miles south of San Francisco. The resort features two championship courses — the Old Course and the Ocean Course — both offering dramatic cliffside holes with waves crashing below. The Ocean Course's par-3 finishing hole, perched directly above the Pacific, is one of the most photographed holes in California golf. Wind is always a factor here, making club selection an adventure. Stay for the weekend at the Ritz-Carlton Half Moon Bay for the full experience. Difficulty: Moderate to challenging.`,
    image: "/images/golf-half-moon-bay.jpg",
    imageAlt: "Half Moon Bay Golf Links cliffside hole perched above the Pacific Ocean, Half Moon Bay",
  },
  {
    name: "Pasatiempo Golf Club",
    location: "Santa Cruz",
    tag: "Semi-Private · Top-Ranked",
    body: `Designed by the legendary Alister MacKenzie — the same architect behind Augusta National and Cypress Point — Pasatiempo Golf Club in Santa Cruz is consistently ranked among the top public-access courses in the United States. The course dates to 1929 and retains MacKenzie's signature design philosophy: dramatic natural contours, deceptive greens, and holes that are equally beautiful and brutally challenging. Deep ravines, undulating fairways, and some of the most complex green complexes on the West Coast make every round a strategic puzzle. For serious golfers, a trip to Pasatiempo is a pilgrimage. Difficulty: Challenging.`,
    image: "/images/golf-pasatiemp.jpg",
    imageAlt: "Pasatiempo Golf Club dramatic fairway with natural ravines, Santa Cruz — designed by Alister MacKenzie",
  },
];

export default function GolfCoursesPost() {
  return (
    <>
      <Header />

      <main role="main" className="bg-[#FFFCF8] min-h-screen">

        {/* ── Back link ── */}
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

        {/* ── Article header ── */}
        <header className="max-w-3xl mx-auto px-6 pt-6 pb-10">
          {/* Category */}
          <p className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.35em] uppercase text-[#B8956A] mb-4 font-medium">
            Lifestyle
          </p>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-[3.25rem] font-normal leading-[1.1] text-[#2C2825] mb-6">
            The Best Golf Courses in San Francisco &amp; the Bay Area
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="font-[family-name:var(--font-body)] text-sm text-[#2C2825] font-medium">
              Jacky Luong
            </span>
            <span className="w-px h-3 bg-[#E8E0D8]" aria-hidden="true" />
            <span className="font-[family-name:var(--font-body)] text-sm text-[#B5ADA5]">
              March 2026
            </span>
            <span className="w-px h-3 bg-[#E8E0D8]" aria-hidden="true" />
            <span className="font-[family-name:var(--font-body)] text-sm text-[#B5ADA5]">
              6 min read
            </span>
          </div>

          <div className="w-full aspect-[16/7] relative overflow-hidden">
            <Image
              src="/images/golf-hero.jpg"
              alt="Aerial view of a championship golf course in the San Francisco Bay Area"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
        </header>

        {/* ── Article body ── */}
        <article className="max-w-[720px] mx-auto px-6 pb-20">

          {/* Divider */}
          <div className="w-10 h-px bg-[#B8956A]/50 mb-10" aria-hidden="true" />

          {/* Introduction */}
          <p className="font-[family-name:var(--font-body)] text-[#2C2825] text-lg leading-[1.85] mb-10">
            The Bay Area isn&apos;t just a tech and real estate hub — it&apos;s home to some of the
            most spectacular golf courses on the West Coast. Draped across coastal cliffs,
            woven through national parkland, and carved from championship-caliber terrain,
            the region&apos;s courses draw players from around the world. Whether you&apos;re a
            scratch golfer chasing a bucket-list round or a weekend warrior looking for
            views as impressive as your back nine, these courses offer world-class play
            with scenery that makes even a double bogey forgivable.
          </p>

          {/* Course sections */}
          {courses.map((course, i) => (
            <section key={course.name} className={i < courses.length - 1 ? "mb-14" : "mb-10"}>

              {/* Course image */}
              <div className="w-full aspect-[16/9] mb-6 relative overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 720px"
                />
              </div>

              {/* Course name */}
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-normal text-[#2C2825] mb-1">
                {i + 1}. {course.name}
              </h2>

              {/* Location + tag */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-[family-name:var(--font-body)] text-[11px] tracking-[0.15em] uppercase text-[#B8956A]">
                  {course.location}
                </span>
                <span className="w-px h-3 bg-[#E8E0D8]" aria-hidden="true" />
                <span className="font-[family-name:var(--font-body)] text-[11px] tracking-[0.1em] text-[#B5ADA5]">
                  {course.tag}
                </span>
              </div>

              {/* Body */}
              <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-base leading-[1.9]">
                {course.body}
              </p>

              {/* Divider between courses */}
              {i < courses.length - 1 && (
                <div className="mt-14 w-full h-px bg-[#E8E0D8]" aria-hidden="true" />
              )}
            </section>
          ))}

          {/* Closing paragraph */}
          <div className="mt-4 pt-10 border-t border-[#E8E0D8]">
            <p className="font-[family-name:var(--font-body)] text-[#2C2825] text-lg leading-[1.85] mb-6">
              What makes the Bay Area truly special for golfers is proximity. Many of these
              world-class courses sit minutes from the region&apos;s most prestigious
              neighborhoods — Pacific Heights, Hillsborough, Atherton, and the Peninsula
              communities that consistently rank among the most desirable addresses in
              the country. Imagine finishing an early morning round at Harding Park and
              being home in time for brunch, or catching the sunset from the cliffs at
              Half Moon Bay before returning to your coastal retreat.
            </p>
            <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-base leading-[1.9]">
              If the lifestyle the Bay Area offers — the courses, the culture, the
              neighborhoods — resonates with you, I&apos;d love to help you find a home
              that puts it all within reach. As someone who shares a deep love for this
              region and the game, I bring that same focus and discipline to every
              real estate transaction.
            </p>
          </div>

        </article>

        {/* ── CTA Section ── */}
        <section
          aria-label="Contact Jacky Luong"
          className="bg-[#2C2825] py-20 px-6"
        >
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.4em] uppercase text-[#B8956A] mb-4 font-light">
              Let&apos;s Connect
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-normal text-[#F5F0EB] mb-4 leading-snug">
              Looking for a home near<br className="hidden sm:block" /> your favorite course?
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#F5F0EB]/50 text-sm leading-relaxed mb-10 max-w-md mx-auto">
              I know these neighborhoods and these courses. Let&apos;s find you a home
              that makes the Bay Area lifestyle yours every day.
            </p>

            {/* CTA Button */}
            <a
              href="/#contact"
              className="inline-block font-[family-name:var(--font-body)] text-[11px] tracking-[0.2em] uppercase font-medium px-10 py-4 bg-[#B8956A] text-[#FFFCF8] hover:bg-[#8B6F47] transition-all duration-300 mb-10"
            >
              Schedule a Consultation
            </a>

            {/* Contact details */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <a
                href="tel:4155721220"
                className="flex items-center gap-2 font-[family-name:var(--font-body)] text-sm text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M2.5 1.5h2.25l1 2.5L4.5 5.25a8.5 8.5 0 003.25 3.25L9 7.25l2.5 1v2.25A1 1 0 0110.5 11.5C4.977 11.5 1.5 8.023 1.5 2.5A1 1 0 012.5 1.5z"
                    stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                415.572.1220
              </a>
              <span className="hidden sm:block w-px h-4 bg-[#F5F0EB]/20" aria-hidden="true" />
              <a
                href="mailto:jacky@kineticrealestate.com"
                className="flex items-center gap-2 font-[family-name:var(--font-body)] text-sm text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <rect x="1.5" y="3.5" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.25"/>
                  <path d="M1.5 4.5l6 4.5 6-4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                </svg>
                jacky@kineticrealestate.com
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
