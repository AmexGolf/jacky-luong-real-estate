import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function GET() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === "your-anthropic-api-key-here") {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured." }, { status: 500 });
  }

  const client = new Anthropic({ apiKey });
  const today = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are a content strategist for Jacky Luong, a luxury real estate agent in the San Francisco Bay Area (Kinetic Real Estate).

Today is ${today}. Generate 6 compelling, timely blog post ideas for a luxury Bay Area real estate audience.

Topics should cover a mix of:
- Current SF Bay Area housing market trends
- Specific neighborhoods: Pacific Heights, Atherton, Hillsborough, Palo Alto, Tiburon, Noe Valley
- Luxury lifestyle content (golf, dining, schools, commute, tech hub proximity)
- Buyer or seller guides for the SF/Silicon Valley market
- Investment and market timing insights

Return ONLY a valid JSON array (no markdown, no explanation):
[
  { "title": "...", "description": "One sentence pitch.", "category": "Market Insights | Buying Guide | Selling Guide | Lifestyle | Neighborhood" },
  ...
]`,
        },
      ],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text.trim() : "";
    // Strip markdown code fences if present
    const clean = raw.replace(/^```[a-z]*\n?/i, "").replace(/\n?```$/i, "").trim();
    const topics = JSON.parse(clean);
    return NextResponse.json(topics);
  } catch (err) {
    console.error("blog-topics error:", err);
    return NextResponse.json({ error: "Failed to generate topics." }, { status: 500 });
  }
}
