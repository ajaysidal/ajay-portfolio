import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { LayoutDashboard, Calendar, FileText, Shield, LogOut } from "lucide-react";

export const metadata = {
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/bookings", label: "Bookings", icon: Calendar },
  { href: "/dashboard/intake", label: "Intake", icon: FileText },
  { href: "/dashboard/audit", label: "Audit Log", icon: Shield },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#F8F9FA] flex">
      {/* Glassmorphic Sidebar */}
      <aside className="w-64 bg-[#0B0C10]/90 backdrop-blur-xl border-r border-[#F8F9FA]/10 flex flex-col fixed h-full">
        <div className="p-6 border-b border-[#F8F9FA]/10">
          <h2 className="text-xl font-bold text-[#D4AF37] tracking-tight">Sovereign Command</h2>
          <p className="text-xs text-[#aab3bd] mt-1 truncate">Welcome, {session.user?.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-[#aab3bd] hover:bg-[#1F2833] hover:text-[#D4AF37] transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#F8F9FA]/10">
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
