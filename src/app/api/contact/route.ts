import { NextRequest, NextResponse } from "next/server";

const FUB_API_URL = "https://api.followupboss.com/v1/events";

// Map the interest dropdown value to Follow Up Boss tags
function interestToTags(interest: string): string[] {
  switch (interest) {
    case "Buying":      return ["Buyer"];
    case "Selling":     return ["Seller"];
    case "Both":        return ["Buyer", "Seller"];
    case "Just Exploring": return ["Just Exploring"];
    default:            return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, interest, priceRange, message } =
      await req.json();

    // Basic validation — email and first name are required
    if (!firstName || !email) {
      return NextResponse.json(
        { error: "First name and email are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.FOLLOWUPBOSS_API_KEY;
    if (!apiKey) {
      console.error("FOLLOWUPBOSS_API_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    // Build the note from price range + message
    const noteParts: string[] = [];
    if (interest)    noteParts.push(`Interest: ${interest}`);
    if (priceRange)  noteParts.push(`Price Range: ${priceRange}`);
    if (message)     noteParts.push(`\nMessage:\n${message}`);
    const note = noteParts.join("\n");

    // Follow Up Boss Events API payload
    const payload = {
      source: "Website - Contact Form",
      system:  "Website",
      type:    "Registration",
      person: {
        firstName,
        lastName:  lastName  || "",
        emails:    [{ value: email,  type: "other" }],
        phones:    phone ? [{ value: phone, type: "mobile" }] : [],
        tags:      interestToTags(interest),
      },
      ...(note && { note }),
    };

    // Basic Auth: API key as username, empty password
    const credentials = Buffer.from(`${apiKey}:`).toString("base64");

    const fubRes = await fetch(FUB_API_URL, {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Basic ${credentials}`,
        "X-System":      "Jacky Luong Real Estate Website",
        "X-System-Key":  apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!fubRes.ok) {
      const errorBody = await fubRes.text();
      console.error("Follow Up Boss error:", fubRes.status, errorBody);
      return NextResponse.json(
        { error: "CRM submission failed." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
