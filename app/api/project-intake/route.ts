import { NextResponse } from "next/server";
import Database from "better-sqlite3";

export const dynamic = 'force-dynamic';

let db: ReturnType<typeof Database> | null = null;

function getDb() {
  if (!db) {
    db = new Database("db.sqlite");
    db.exec(`
      CREATE TABLE IF NOT EXISTS project_intake (
        id TEXT PRIMARY KEY,
        companyName TEXT NOT NULL,
        companyWebsite TEXT,
        currentTechStack TEXT NOT NULL,
        primaryPainPoints TEXT NOT NULL,
        desiredOutcomes TEXT,
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
      `INSERT INTO project_intake (id, companyName, companyWebsite, currentTechStack, primaryPainPoints, desiredOutcomes, budgetRange, timeline, ipHash, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    stmt.run(
      crypto.randomUUID(),
      data.companyName,
      data.companyWebsite,
      data.currentTechStack,
      data.primaryPainPoints,
      data.desiredOutcomes,
      data.budgetRange,
      data.timeline,
      data.ipHash || "",
      new Date().toISOString()
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving project intake:", error);
    return NextResponse.json(
      { error: "Failed to save project intake" },
      { status: 500 }
    );
  }
};