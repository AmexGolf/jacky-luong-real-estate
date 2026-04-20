import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Daly City Is Having a Moment and Your Parents Were Right All Along | Jacky Luong",
  description: "Daly City real estate is booming. Local agent Jacky Luong breaks down why buyers are flocking to this underrated Bay Area city.",
  openGraph: {
    title: "Daly City Is Having a Moment and Your Parents Were Right All Along",
    description: "Daly City real estate is booming. Local agent Jacky Luong breaks down why buyers are flocking to this underrated Bay Area city.",
    type: "article",
    publishedTime: "2026-04-20",
    authors: ["Jacky Luong"],
  },
};

const sections = [
  {
    heading: `The Numbers Don't Lie, and Neither Does Your Tita`,
    body: `Let's talk real numbers for a second. The median home price in Daly City right now is hovering around $1.1 million. That sounds like a lot until you realize a similar single family home in Noe Valley would run you $2.3 million. We're talking about nearly half the price for a home that's maybe a 15 minute drive away. I had a client last month, young couple working in tech, who had been looking in the Mission District for almost a year. Every time they found something they liked, they'd get outbid by $200K. Cash offers, no contingencies, the whole nightmare. I finally convinced them to look at a place off Hillside Boulevard in Daly City. Three bedrooms, updated kitchen, actual backyard with room for their dog to run around. They got it for $1.05 million with a normal offer. Normal! When's the last time anything in Bay Area real estate felt normal? They closed last month and honestly, I don't think I've seen two happier people.`,
    tip: `Homes in the Westlake neighborhood tend to move faster because of the mid-century architecture and proximity to BART. If you see one pop up, don't wait a week to tour it.`,
    photo: "/images/blog/daly-city-having-a-moment-parents-were-right-section-0.jpg"
  },
  {
    heading: `The Fog Thing Is Real, But Also Kind of Overhyped`,
    body: `I'll be honest with you. Yes, it's foggy. If you're someone who needs sunshine every day to feel alive, Daly City might test your patience from June through August. But here's what most people don't know. The fog burns off way more often than you'd think, especially if you're on the eastern side of town near the 280. And those summer mornings where the fog is rolling over the hills and everything is quiet and gray? Some of us actually love that. It feels cozy. It feels like home. I grew up in the Sunset, so maybe I'm just wired for marine layer life. But I've had clients from Phoenix and LA move to Daly City and tell me they've never slept better. No air conditioning needed, ever. You can open your windows at night and just breathe. Try doing that in Palo Alto in July when it's 95 degrees. The fog keeps things cool, calm, and surprisingly peaceful. Plus your energy bills will be a fraction of what they'd be in the South Bay.`,
    tip: `The neighborhoods closer to Serramonte tend to be sunnier than those right against the coast. If weather matters to you, pay attention to the specific street.`,
    photo: "/images/blog/daly-city-having-a-moment-parents-were-right-section-1.jpg"
  },
  {
    heading: `The Food Scene Is Lowkey Amazing`,
    body: `Okay, this is where I get really excited. The food in Daly City is incredible and I will argue about this with anyone. You've got some of the best Filipino food in the entire Bay Area, maybe the entire country. Jollibee gets all the attention, sure, but the real magic is in spots like Tselogs for all day silog breakfasts or Nick's Crispy Tacos on Mission Street. And it's not just Filipino food. There's amazing Chinese food, incredible Korean BBQ, and hole in the wall Vietnamese spots that would have lines around the block if they were in the city. I took my parents to this tiny Szechuan place off Geneva Avenue last month and my dad, who complains about everything, said it was the best mapo tofu he's ever had. When my dad gives a compliment, you know it's real. The best part is that parking is actually manageable. You can just drive up, park, eat, and leave without circling for 20 minutes or paying $8 an hour. It's the little things.`,
    tip: `Check out the area around Westlake Shopping Center for a mix of old school spots and newer restaurants that have opened in the last two years.`,
    photo: "/images/blog/daly-city-having-a-moment-parents-were-right-section-2.jpg"
  },
  {
    heading: `BART Access Changes Everything`,
    body: `Here's the thing about Daly City that a lot of SF buyers overlook. The Daly City BART station is literally where the yellow, green, red, blue, and orange lines all connect. It's a major hub. You can be in downtown SF in under 15 minutes. That's faster than some people who actually live in San Francisco can get to work. I have a friend who lives in the Outer Richmond and it takes her 45 minutes to get to the Financial District by Muni. My clients who bought near Top of the Hill in Daly City? They walk to BART in 10 minutes and they're at Montgomery Street station before their coffee gets cold. The Colma BART station is another option if you're on the southern end of Daly City, and that one has way more parking if you need to drive and ride. For hybrid workers who only go into the office two or three days a week, this setup is kind of perfect. You get the space of a suburban home but you're still connected to everything.`,
    tip: `Look for homes within a half mile of either BART station. That walkability is a huge selling point if you ever decide to rent or sell.`,
    photo: "/images/blog/daly-city-having-a-moment-parents-were-right-section-3.jpg"
  },
  {
    heading: `Families Have Known This Secret Forever`,
    body: `I've walked these streets a thousand times showing homes, and one thing always strikes me. There are kids everywhere. Riding bikes, walking to school, playing in front yards. Daly City has this family energy that reminds me of what the Bay Area used to feel like before everything got so expensive and competitive. The schools are solid. Jefferson Elementary and Fernando Rivera Middle School both have active parent communities. And yeah, they're not Palo Alto schools with a $4 million price tag for entry, but they're good. Really good. Parents here are involved. There are youth sports leagues, community centers, and parks that actually get used. Marchbank Park on a Saturday morning is packed with families having picnics and kids running around. Compare that to some of the wealthier neighborhoods I work in where everything feels quiet and a little sterile. Don't get me wrong, Atherton is beautiful. But there's a warmth to Daly City's family neighborhoods that you just can't manufacture with money.`,
    tip: `The area around Westmoor High School has seen a lot of family buyers lately. Great schools plus newer construction makes it competitive, so be ready to move fast.`,
    photo: "/images/blog/daly-city-having-a-moment-parents-were-right-section-4.jpg"
  },
  {
    heading: `What This Means If You're Thinking About Buying`,
    body: `Look, I'm not going to pretend Daly City is the right fit for everyone. If you want Victorian charm and walkability to fancy cocktail bars, stick with the Mission or Hayes Valley. But if you want actual space, a garage, maybe even a yard, and you don't want to spend $2 million to get it? Daly City deserves a serious look. The market there has picked up, so I'm not saying it's a secret anymore. Prices are climbing and multiple offers happen on the best properties. But it's still way more accessible than most of San Francisco, and the inventory is more forgiving. You actually have time to think about an offer instead of making a decision in 24 hours. I've been helping more and more buyers explore Daly City this year, and almost all of them have the same reaction after touring. They say something like, why didn't I look here sooner? And honestly, I get it. I had the same realization myself. Sometimes the unglamorous choice turns out to be the smartest one.`,
    tip: `If you're pre-approved and ready to go, spring and early summer see the most inventory. Waiting until fall means fewer options.`,
    photo: "/images/blog/daly-city-having-a-moment-parents-were-right-section-5.jpg"
  }
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
              Neighborhood
            </span>
            <span className="w-px h-3 bg-[#E8E0D8]" aria-hidden="true" />
            <span className="font-[family-name:var(--font-body)] text-sm text-[#B5ADA5]">
              April 2026
            </span>
            <span className="w-px h-3 bg-[#E8E0D8]" aria-hidden="true" />
            <span className="font-[family-name:var(--font-body)] text-sm text-[#B5ADA5]">
              7 min read
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-[#2C2825] mb-6">
            Daly City Is Having a Moment and Your Parents Were Right All Along
          </h1>

          <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-base leading-relaxed mb-8">
            Remember when your mom kept saying you should just buy in Daly City? Turns out she was onto something. Here's why the fog belt is finally getting the love it deserves.
          </p>

          <div className="w-full aspect-[16/7] relative overflow-hidden">
            <Image
              src="/images/blog/daly-city-having-a-moment-parents-were-right-hero.jpg"
              alt="Daly City Is Having a Moment and Your Parents Were Right All Along"
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
            Okay, I need to start with a confession. Five years ago, when buyers told me they were considering Daly City, I'd nod politely and then immediately pivot to showing them places in the Excelsior or Outer Sunset. Not because anything was wrong with Daly City. I just didn't get it yet. I was too focused on keeping people inside those San Francisco city limits, like crossing into San Mateo County was some kind of defeat. Meanwhile, Filipino aunties and immigrant families who'd been buying there for decades were sitting on homes that have nearly doubled in value. They knew something I didn't. They knew that sometimes the smartest move is the one that doesn't look flashy on paper. So here I am, eating my words and writing this post, because Daly City is having a serious moment and I'm finally ready to talk about it.
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
              So yeah. Your parents were right. Mine were too, honestly. They kept telling me not to sleep on Daly City and I smiled and nodded and showed people places in the Excelsior instead. Live and learn, right? If you're curious about what's actually available out there right now, or you just want to talk through whether Daly City makes sense for your situation, reach out. I love driving around that area and pointing out all the little things that make each neighborhood different. No pressure, no pitch. Just a real conversation about what you're looking for and whether this might be your move. Sometimes the best opportunities are the ones that don't look exciting until you take a closer look. Trust me on this one.
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
