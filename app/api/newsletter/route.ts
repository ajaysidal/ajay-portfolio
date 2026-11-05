import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import { newsletterSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

let db: ReturnType<typeof Database> | null = null;

function getDb() {
  if (!db) {
    db = new Database("db.sqlite");
    db.exec(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        subscribedAt TEXT NOT NULL
      )
    `);
  }
  return db;
}

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    const result = newsletterSchema.safeParse(data);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    try {
      const stmt = getDb().prepare(
        `INSERT INTO newsletter_subscribers (id, email, subscribedAt) VALUES (?, ?, ?)`
      );
      stmt.run(crypto.randomUUID(), result.data.email, new Date().toISOString());
    } catch (dbError) {
      // Email already exists (UNIQUE constraint) - treat as success
      console.warn("Newsletter subscriber already exists:", result.data.email);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
};
