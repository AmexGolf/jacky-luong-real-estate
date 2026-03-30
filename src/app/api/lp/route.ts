import { NextRequest, NextResponse } from "next/server";

const FUB_API_URL = "https://api.followupboss.com/v1/events";

function interestToTags(interest: string): string[] {
  const base = ["Ad Lead"];
  switch (interest) {
    case "Buy":   return [...base, "Buyer"];
    case "Sell":  return [...base, "Seller"];
    case "Both":  return [...base, "Buyer", "Seller"];
    case "Invest": return [...base, "Investor"];
    default:      return base;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, phone, email, interest } = await req.json();

    if (!firstName || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.FOLLOWUPBOSS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }

    const payload = {
      source: "Website - Ad Landing Page",
      system: "Website",
      type: "Registration",
      person: {
        firstName,
        lastName: lastName || "",
        emails: [{ value: email, type: "other" }],
        phones: [{ value: phone, type: "mobile" }],
        tags: interestToTags(interest),
      },
      note: `Interest: ${interest}\nSource: Paid Ad Landing Page`,
    };

    const credentials = Buffer.from(`${apiKey}:`).toString("base64");

    const fubRes = await fetch(FUB_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
        "X-System": "Jacky Luong Real Estate Website",
        "X-System-Key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!fubRes.ok) {
      const err = await fubRes.text();
      console.error("FUB error:", fubRes.status, err);
      return NextResponse.json({ error: "CRM submission failed." }, { status: 502 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Landing page API error:", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
