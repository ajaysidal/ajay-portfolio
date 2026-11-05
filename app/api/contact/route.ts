import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import { contactFormSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

let db: ReturnType<typeof Database> | null = null;

function getDb() {
  if (!db) {
    db = new Database("db.sqlite");
    db.exec(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        ipHash TEXT NOT NULL,
        createdAt TEXT NOT NULL
      )
    `);
  }
  return db;
}

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    const result = contactFormSchema.safeParse(data);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const stmt = getDb().prepare(
      `INSERT INTO contact_submissions (id, name, email, company, subject, message, ipHash, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );

    stmt.run(
      crypto.randomUUID(),
      result.data.name,
      result.data.email,
      result.data.company || null,
      result.data.subject,
      result.data.message,
      data.ipHash || "",
      new Date().toISOString()
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving contact submission:", error);
    return NextResponse.json(
      { error: "Failed to save contact submission" },
      { status: 500 }
    );
  }
};
