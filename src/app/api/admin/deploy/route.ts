import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST() {
  try {
    const cwd = process.cwd();
    const timestamp = new Date().toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit", hour12: true,
    });

    // Stage all data file changes
    await execAsync("git add src/data/", { cwd });

    // Check if there's anything to commit
    const { stdout: statusOut } = await execAsync("git status --porcelain src/data/", { cwd });

    if (!statusOut.trim()) {
      return NextResponse.json({ ok: true, message: "Already up to date — no changes to publish." });
    }

    // Commit
    await execAsync(
      `git commit -m "Content update — ${timestamp}"`,
      { cwd }
    );

    // Push
    await execAsync("git push", { cwd });

    return NextResponse.json({ ok: true, message: "Published! Your site will update in ~1 minute." });
  } catch (err) {
    console.error("Deploy error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
