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
          content: `You are helping Jacky Luong, a real estate agent in the San Francisco Bay Area who writes in a casual, friendly, mayor-of-the-neighborhood voice. He's warm, funny, direct, and knows SF inside out.

Today is ${today}. Suggest 6 blog post ideas that Jacky could write about. Topics should feel like things a well-connected local would want to share — not dry market reports.

Mix of:
- SF Bay Area housing market (real talk, not jargon)
- Specific neighborhoods: Pacific Heights, Atherton, Hillsborough, Palo Alto, Tiburon, Noe Valley, Daly City
- Lifestyle (golf, restaurants, schools, hidden gems, weekend spots)
- Practical buyer/seller tips told like insider advice from a friend
- Seasonal or timely angles

Return ONLY a valid JSON array (no markdown, no explanation):
[
  { "title": "Conversational, punchy title", "description": "One engaging sentence about what this post covers.", "category": "Market Insights | Buying Guide | Selling Guide | Lifestyle | Neighborhood" },
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
