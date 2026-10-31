import Database from "better-sqlite3";
import path from "path";

interface AuditLogEntry {
  id: number;
  actor: string;
  action: string;
  entity: string;
  entityId: string | null;
  meta: string | null;
  createdAt: string | number;
}

export const dynamic = "force-dynamic";

function getDb() {
  const dbPath = path.join(process.cwd(), "data", "portfolio.db");
  return new Database(dbPath, { readonly: true });
}

export default function AuditLogPage() {
  const db = getDb();
  const logs = db
    .prepare(
      "SELECT id, actor, action, entity, entityId, meta, createdAt FROM AuditLog ORDER BY createdAt DESC LIMIT 50"
    )
    .all() as AuditLogEntry[];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#F8F9FA]">Audit Log</h1>
        <p className="text-[#aab3bd] mt-2">Append-only record of system actions.</p>
      </div>

      <div className="glass-tilt overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1F2833] text-[#aab3bd] uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Actor</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Entity</th>
              <th className="px-6 py-4">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F2833]">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-[#aab3bd]">
                  No audit logs recorded yet.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#1F2833]/50 transition-colors">
                  <td className="px-6 py-4 text-[#aab3bd] font-mono text-xs">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-[#F8F9FA]">{log.actor}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-medium">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#F8F9FA]">{log.entity}</td>
                  <td className="px-6 py-4 text-[#aab3bd] font-mono text-xs truncate max-w-xs">
                    {log.meta || "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
