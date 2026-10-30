import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardOverview() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  // Fetch counts safely in parallel
  const [consultations, intakes, users] = await Promise.all([
    prisma.consultationBooking.count(),
    prisma.projectIntake.count(),
    prisma.user.count(),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#F8F9FA]">Sovereign Command Center</h1>
        <p className="text-[#aab3bd] mt-2">System overview and operational metrics.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Consultations Card */}
        <div className="glass-tilt p-6">
          <h3 className="text-[#aab3bd] text-sm font-medium uppercase tracking-wider">Consultations</h3>
          <p className="text-4xl font-bold text-[#D4AF37] mt-4">{consultations}</p>
          <p className="text-xs text-[#aab3bd] mt-2">Total bookings received</p>
        </div>

        {/* Project Intakes Card */}
        <div className="glass-tilt p-6">
          <h3 className="text-[#aab3bd] text-sm font-medium uppercase tracking-wider">Project Intakes</h3>
          <p className="text-4xl font-bold text-[#D4AF37] mt-4">{intakes}</p>
          <p className="text-xs text-[#aab3bd] mt-2">Total project requests</p>
        </div>

        {/* Admin Users Card */}
        <div className="glass-tilt p-6">
          <h3 className="text-[#aab3bd] text-sm font-medium uppercase tracking-wider">Admin Users</h3>
          <p className="text-4xl font-bold text-[#D4AF37] mt-4">{users}</p>
          <p className="text-xs text-[#aab3bd] mt-2">Authorized personnel</p>
        </div>
      </div>

      {/* Sovereign Services Portal */}
      <div className="glass-tilt p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#F8F9FA]">Sovereign Services Portal</h2>
          <span className="text-xs text-[#aab3bd] font-mono">Centralized Access Point</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* System Monitoring Card */}
          <Link 
            href="/dashboard/monitoring" 
            className="block p-6 rounded-lg bg-[#1F2833]/50 border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="text-lg font-semibold text-[#F8F9FA] group-hover:text-[#D4AF37]">System Monitoring</h3>
            </div>
            <p className="text-sm text-[#aab3bd] mb-2">Real-time uptime & infrastructure health</p>
            <p className="text-xs text-[#aab3bd] font-mono">Internal Dashboard View</p>
          </Link>

          {/* Public Status Page Card */}
          <a 
            href="http://157.173.127.188:3003/status/buildwithai-digital" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block p-6 rounded-lg bg-[#1F2833]/50 border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <h3 className="text-lg font-semibold text-[#F8F9FA] group-hover:text-[#D4AF37]">Public Status</h3>
            </div>
            <p className="text-sm text-[#aab3bd] mb-2">External status page for clients</p>
            <p className="text-xs text-[#aab3bd] font-mono">Opens in new tab</p>
          </a>

          {/* Audit Log Card */}
          <Link
            href="/dashboard/audit"
            className="block p-6 rounded-lg bg-[#1F2833]/50 border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <h3 className="text-lg font-semibold text-[#F8F9FA] group-hover:text-[#D4AF37]">Audit Log</h3>
            </div>
            <p className="text-sm text-[#aab3bd] mb-2">SOC2 compliance & activity tracking</p>
            <p className="text-xs text-[#aab3bd] font-mono">/dashboard/audit</p>
          </Link>

          {/* CMS Card - Placeholder */}
          <div className="block p-6 rounded-lg bg-[#1F2833]/30 border border-gray-600/20 opacity-60">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-lg font-semibold text-[#F8F9FA]">Content CMS</h3>
            </div>
            <p className="text-sm text-[#aab3bd] mb-2">Blog & case studies management</p>
            <p className="text-xs text-[#aab3bd]">Coming in Sprint 3</p>
          </div>

          {/* AI Agent Card - Placeholder */}
          <div className="block p-6 rounded-lg bg-[#1F2833]/30 border border-gray-600/20 opacity-60">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-lg font-semibold text-[#F8F9FA]">AI Agent</h3>
            </div>
            <p className="text-sm text-[#aab3bd] mb-2">Sovereign AI workflow automation</p>
            <p className="text-xs text-[#aab3bd]">Coming in Sprint 3</p>
          </div>

        </div>

        <div className="mt-6 pt-4 border-t border-[#1F2833]">
          <p className="text-xs text-[#aab3bd]">
            <span className="text-[#D4AF37]">SOC2 Note:</span> All service access and monitoring activities are logged in the audit trail for compliance tracking.
          </p>
        </div>
      </div>
    </div>
  );
}
