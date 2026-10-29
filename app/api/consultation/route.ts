import { NextResponse } from "next/server";
import Database from "better-sqlite3";

export const dynamic = 'force-dynamic';

let db: ReturnType<typeof Database> | null = null;

function getDb() {
  if (!db) {
    db = new Database("db.sqlite");
    db.exec(`
      CREATE TABLE IF NOT EXISTS consultation_booking (
        id TEXT PRIMARY KEY,
        fullName TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        companyName TEXT NOT NULL,
        businessType TEXT NOT NULL,
        primaryPain TEXT NOT NULL,
        budgetRange TEXT NOT NULL,
        timeline TEXT NOT NULL,
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

    const stmt = getDb().prepare(
      `INSERT INTO consultation_booking (id, fullName, email, phone, companyName, businessType, primaryPain, budgetRange, timeline, ipHash, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    stmt.run(
      crypto.randomUUID(),
      data.fullName,
      data.email,
      data.phone,
      data.companyName,
      data.businessType,
      data.primaryPain,
      data.budgetRange,
      data.timeline,
      data.ipHash || "",
      new Date().toISOString()
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving consultation booking:", error);
    return NextResponse.json(
      { error: "Failed to save consultation booking" },
      { status: 500 }
    );
  }
};