// Build With AI SQLite database helper using better-sqlite3

import Database from "better-sqlite3";

const db = new Database("db.sqlite");

// Consultation bookings table
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

// Project intakes table
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

export const consultationBooking = {
  create: (data: {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
    companyName: string;
    businessType: string;
    primaryPain: string;
    budgetRange: string;
    timeline: string;
    ipHash: string;
    createdAt: Date;
  }) => {
    const stmt = db.prepare(
      `INSERT INTO consultation_booking (id, fullName, email, phone, companyName, businessType, primaryPain, budgetRange, timeline, ipHash, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    stmt.run(
      data.id,
      data.fullName,
      data.email,
      data.phone,
      data.companyName,
      data.businessType,
      data.primaryPain,
      data.budgetRange,
      data.timeline,
      data.ipHash,
      data.createdAt
    );
  },
};

export const projectIntake = {
  create: (data: {
    id: string;
    companyName: string;
    companyWebsite?: string;
    currentTechStack: string;
    primaryPainPoints: string;
    desiredOutcomes?: string;
    budgetRange: string;
    timeline: string;
    ipHash: string;
    createdAt: Date;
  }) => {
    const stmt = db.prepare(
      `INSERT INTO project_intake (id, companyName, companyWebsite, currentTechStack, primaryPainPoints, desiredOutcomes, budgetRange, timeline, ipHash, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    stmt.run(
      data.id,
      data.companyName,
      data.companyWebsite,
      data.currentTechStack,
      data.primaryPainPoints,
      data.desiredOutcomes,
      data.budgetRange,
      data.timeline,
      data.ipHash,
      data.createdAt
    );
  },
};

const prismaConfig = {
  consultationBooking,
  projectIntake,
};

export default prismaConfig;