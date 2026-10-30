import { prisma } from "../../lib/prisma";

export default async function DashboardOverview() {
  // Fetch counts safely in parallel
  const [consultations, intakes, users] = await Promise.all([
    prisma.consultationBooking.count(),
    prisma.projectIntake.count(),
    prisma.user.count(),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#F8F9FA]">Overview</h1>
        <p className="text-[#aab3bd] mt-2">Real-time pipeline metrics.</p>
      </div>

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
    </div>
  );
}
