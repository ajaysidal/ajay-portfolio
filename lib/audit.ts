import Database from "better-sqlite3";
import path from "path";

export function logAudit(
  actor: string,
  action: string,
  entity: string,
  entityId: string | null,
  meta: string | null
) {
  const dbPath = path.join(process.cwd(), "data", "portfolio.db");
  const db = new Database(dbPath);
  
  try {
    db.prepare(`
      INSERT INTO AuditLog (id, actor, action, entity, entityId, meta, createdAt)
      VALUES (lower(hex(randomblob(16))), ?, ?, ?, ?, ?, datetime('now'))
    `).run(actor, action, entity, entityId, meta);
  } catch (error) {
    console.error("Audit log failed:", error);
  } finally {
    db.close();
  }
}
