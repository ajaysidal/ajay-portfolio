import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "System Monitoring | Sovereign Command",
  robots: { index: false, follow: false },
};

export default async function MonitoringPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8F9FA]">System Monitoring</h1>
        <p className="text-[#aab3bd] mt-2">Real-time infrastructure monitoring via Uptime Kuma.</p>
      </div>

      {/* Embedded Uptime Kuma Status Page */}
      <div className="glass-tilt p-1 rounded-lg overflow-hidden border border-[#F8F9FA]/10" style={{ height: "80vh" }}>
        <iframe
          src="http://157.173.127.188:3003/status/buildwithai-digital"
          className="w-full h-full border-0 rounded-md"
          title="Uptime Kuma Status Page"
          sandbox="allow-same-origin allow-scripts"
        />
      </div>

      <div className="mt-6 p-4 rounded-lg bg-[#1F2833]/50 border border-[#D4AF37]/20">
        <p className="text-sm text-[#aab3bd]">
          <span className="text-[#D4AF37] font-semibold">SOC2 Note:</span> All monitoring data is logged in the audit trail. 
          Uptime Kuma tracks service availability, response times, and incidents for compliance reporting.
        </p>
      </div>
    </div>
  );
}
