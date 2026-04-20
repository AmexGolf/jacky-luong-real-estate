import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Look, San Francisco Is Still the Move in 2026. Here's Why I'm Doubling Down. | Jacky Luong",
  description: "SF real estate agent Jacky Luong shares why San Francisco remains the best city to buy a home in 2026 with real neighborhood insights.",
  openGraph: {
    title: "Look, San Francisco Is Still the Move in 2026. Here's Why I'm Doubling Down.",
    description: "SF real estate agent Jacky Luong shares why San Francisco remains the best city to buy a home in 2026 with real neighborhood insights.",
    type: "article",
    publishedTime: "2026-04-20",
    authors: ["Jacky Luong"],
  },
};

const sections = [
  {
  heading: `The Market Finally Makes Sense Again`,
  body: `Let me be real with you. The 2020 to 2022 market was bananas. We had people waiving inspections on two million dollar homes like it was nothing. Multiple offers within hours. It was exhausting for everyone, buyers especially. Fast forward to 2026, and things have genuinely stabilized in a way that feels healthy. Interest rates have settled into a range that people can actually work with. Inventory is up compared to the drought years, which means you're not fighting twelve other families for the same Noe Valley Victorian. Prices in some neighborhoods have come down ten to fifteen percent from peak, and in others they've held steady but with way more negotiating room. I helped a young couple close on a place in Glen Park last month, and we got the seller to cover closing costs and throw in a credit for some electrical work. That would have been unthinkable three years ago. The power dynamic has shifted, and honestly, it's made my job more fun because I can actually advocate for my buyers again.`,
  tip: `If you're pre-approved and ready to move, spring and early summer 2026 is looking like a sweet spot before more buyers catch on to how reasonable things have gotten.`
  },
  {
  heading: `The Neighborhoods You Wrote Off? Take Another Look.`,
  body: `Here's what most people don't know. Some of the neighborhoods that got hit hardest by the pandemic narrative are quietly becoming the best values in the city. The Mission is a perfect example. Yeah, it had some rough years. Some storefronts closed. But walk down Valencia on a Saturday now and tell me that street isn't buzzing. The restaurants are packed, the art scene is thriving, and you can still find a solid two bedroom condo for under a million if you know where to look. Bernal Heights is another one. I've walked those streets a thousand times, and the community up there is tight in the best way. People know their neighbors. Kids ride bikes. It feels like a small town inside a big city. And then there's the Sunset and Richmond districts, which honestly might be the most underrated parts of SF right now. Ocean Beach access, incredible Asian food on every block in the Richmond, fog that keeps you cozy, and prices that actually let normal people buy homes. I showed a family a place on 43rd Avenue last month with a backyard and an in-law unit. They couldn't believe what they were getting for their money.`,
  tip: `The western neighborhoods have longer commutes to downtown, but with hybrid work being the norm now, that trade-off makes a lot more sense than it did in 2019.`
  },
  {
  heading: `Tech Is Still Here. It Just Looks Different Now.`,
  body: `People love to say tech abandoned San Francisco. I always ask them, have you actually been to South Park lately? Have you walked through Mission Bay or Dogpatch? The office culture changed, sure. But the money, the innovation, the jobs? Still very much here. AI companies are everywhere right now. Biotech is booming down in the Mission Bay corridor. And here's something I think is underappreciated. A lot of tech workers who went remote and scattered to other cities in 2021 and 2022 have quietly come back. They missed it. They missed the food, the culture, the access to nature, the weirdness that makes SF special. I've helped three different clients this year who fit that exact profile. They tried Austin or Denver or wherever, and after a couple years they realized that nothing else felt quite like home. That return migration is real, and it's creating steady demand without the frenzied competition we saw before. It's the kind of demand that supports long-term property values.`,
  tip: `If you work in AI, biotech, or climate tech, living in SF puts you in the center of your industry's universe. That proximity has real career value beyond just the lifestyle.`
  },
  {
  heading: `The Peninsula and Marin Are Gorgeous But Different`,
  body: `Now look, I love the whole Bay Area. I really do. And if you want space and top schools and that suburban feel, places like Palo Alto, Hillsborough, and Atherton are incredible. Tiburon across the bridge has some of the most stunning views you'll ever see from a backyard. But I'll be honest with you. Those markets play by different rules. Atherton has a median home price that makes SF look affordable. Hillsborough requires a certain lifestyle budget. Palo Alto is still intensely competitive because of the school district. They're phenomenal places to live if that's your world. But when people ask me why SF specifically, here's what I tell them. The city gives you something the suburbs can't. Walkability. Density. Culture. The ability to stumble into a world-class dim sum spot or a jazz show or a random street fair on any given weekend. You can have a yard in Noe Valley and still walk to three different coffee shops. That combination is rare anywhere in the country, let alone California.`,
  tip: `If you're torn between SF and the Peninsula, spend a full weekend in each. Not just visiting friends. Actually live it. The right answer usually becomes obvious.`
  },
  {
  heading: `The Quality of Life Conversation Has Flipped`,
  body: `I remember 2021 and 2022, when every conversation about SF started with concerns about safety and cleanliness and whether the city was livable. I'm not going to pretend those issues didn't exist, because they did. But here's the thing. I walk through the Tenderloin, I walk through SOMA, I walk through every neighborhood in this city regularly. And the improvement over the past two years has been real and noticeable. More cops on the street. Better response times. Cleaner sidewalks in a lot of areas. It's not perfect, because no city is. But the trajectory is genuinely positive, and the people who write off SF based on what they saw in 2022 are working with outdated information. Meanwhile, the stuff that always made SF special? It's still here and honestly stronger than ever. Golden Gate Park on a sunny Sunday is pure magic. The Ferry Building farmers market is still one of the best in the country. The restaurant scene keeps innovating. Dolores Park fills up with people enjoying their lives. That energy, that vibrancy, that's not something you can manufacture or fake. It comes from people choosing to be here, and people are choosing to be here again.`,
  tip: `Trust me on this one. Spend time in the actual neighborhoods before you let internet narratives shape your opinion. The city speaks for itself.`
  },
  {
  heading: `Your Dollar Goes Further Than You Think`,
  body: `Here's a reality check that surprises a lot of people. Yes, San Francisco is expensive. Nobody's denying that. But compared to what? Manhattan still costs more per square foot in most neighborhoods. Parts of LA have caught up or passed us. And when you factor in California's property tax laws, specifically Prop 13, your long-term costs are actually quite predictable. Your property tax is capped in a way that most other states don't offer. I worked with a buyer last year who was comparing SF to Brooklyn. Similar condo, similar neighborhood vibe. The SF place was actually cheaper, and when we ran the numbers on property taxes over ten years, it wasn't even close. Plus, you get to live somewhere with actual outdoor access. You're two hours from Tahoe, one hour from wine country, twenty minutes from the beach. That quality of life stuff is hard to put a price tag on, but it matters when you're deciding where to plant roots for the long haul. And honestly, with the market where it is right now, I'm seeing buyers get into neighborhoods they never thought they could afford. Pacific Heights? Still pricey, obviously. But the lower tiers of that market have softened in ways that create real opportunity for people who do their homework.`,
  tip: `Don't just look at the sticker price. Run the full numbers on taxes, HOA, commute costs, and lifestyle spending. SF often pencils out better than people expect.`
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
              Market Insights
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
            Look, San Francisco Is Still the Move in 2026. Here's Why I'm Doubling Down.
          </h1>

          <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-base leading-relaxed mb-8">
            I know, I know. You've heard the doom and gloom about SF for years now. But here's the thing. The people actually buying homes here? They're smiling. Let me tell you what's really happening on the ground.
          </p>

          <div className="w-full aspect-[16/7] relative overflow-hidden">
            <Image
              src="/images/golf-harding-park.webp"
              alt="Look, San Francisco Is Still the Move in 2026. Here's Why I'm Doubling Down."
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
            So I was grabbing a cortado at Réveille on Columbus last week, and this couple from Austin sits down next to me. We get to talking, and they hit me with the question I've heard maybe a thousand times since 2020. Is San Francisco actually worth it anymore? I just laughed. Not at them. At the question. Because honestly, I get it. The headlines have been brutal. The narrative has been that everyone's fleeing to Texas or Miami or wherever. But here's what I see every single day walking these streets, showing homes, helping families plant roots. San Francisco in 2026 is not the city people think it is. It's better. It's more accessible. And for buyers who've been waiting on the sidelines? This might be the moment you've been waiting for without even knowing it.
          </p>

          {/* Sections */}
          {sections.map((section, i) => (
            <section key={i} className="mb-12">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-normal text-[#2C2825] mb-4">
                {section.heading}
              </h2>
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
              Look, I've been doing this for a while now, and I've never been more optimistic about San Francisco than I am right now. Not because I'm trying to sell you something, but because I genuinely love this city and I see what's happening on the ground every day. The opportunities are real. The quality of life is there. And the market is finally in a place where regular people can make moves without losing their minds in bidding wars. If you've been on the fence, if you've been waiting for the right moment, I think this is it. And if you want to talk through what buying in SF actually looks like for your situation, I'm always happy to grab coffee and walk you through it. No pressure, no pitch. Just real talk from someone who knows these streets and wants to help you find your spot. That's what I'm here for.
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
