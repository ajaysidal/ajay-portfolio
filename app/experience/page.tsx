"use client";

import { motion } from "framer-motion";

const eras = [
  {
    id: "ai-infrastructure",
    period: "Current",
    title: "AI & Infrastructure",
    roles: [
      {
        id: "founder-creative-technologist",
        title: "Founder & Creative Technologist — Self-Employed",
        date: "Mar 2025 – Present",
        bullets: [
          "Engineered AI-driven workflows.",
          "Maintained high-performance web infrastructure (Nginx, Certbot, DNS).",
          "Collaborated with AI agents for living documentation and technical storytelling.",
        ],
      },
    ],
  },
  {
    id: "leadership-healthcare-logistics",
    period: "Leadership",
    title: "Healthcare & Logistics",
    roles: [
      {
        id: "investment-operations-administrator",
        title: "Investment Operations Administrator — ANZ",
        date: "Jun 2024 – Mar 2025",
      },
      {
        id: "subcontractor-compliance-coordinator",
        title: "Subcontractor Compliance Coordinator — Ventia",
        date: "Nov 2023 – Feb 2024",
      },
      {
        id: "coordinator-technology-operations-team-lead",
        title: "Coordinator Technology & Operations – Team Lead — Te Whatu Ora",
        date: "Jun 2022 – Nov 2023",
      },
      {
        id: "communications-coordinator",
        title: "Communications Coordinator — BUPA NZ",
        date: "Mar 2022 – Jun 2022",
      },
    ],
  },
  {
    id: "foundation-banking-operations",
    period: "Foundation",
    title: "Banking & Operations",
    roles: [
      {
        id: "operations-administration-manager",
        title: "Operations & Administration Manager — Avantee Ltd & The Positive Property Service",
        date: "2016 – 2019",
      },
      {
        id: "various-roles-westpac",
        title: "Various Roles — Westpac Banking Corporation",
        date: "2001 – 2013 · Branch Management, Internet Payments Project Pioneer",
      },
    ],
  },
];

const roleHasBullets = (role: { title: string; date: string; bullets?: string[] }): role is { title: string; date: string; bullets: string[] } => {
  return "bullets" in role && Array.isArray(role.bullets);
};

export default function Experience() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="mono block mb-4">Experience</span>
          <h2 className="text-[clamp(2rem,6vw,3.6rem)] font-extrabold tracking-tight mb-6">
            The path so far.
          </h2>
        </div>

        <div className="space-y-12">
          {eras.map((era, eraIndex) => (
            <motion.div
              key={era.id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: eraIndex * 0.1 }}
              className="relative pl-8 border-l-2 border-[#1F2833]"
            >
              <div className="absolute -left-[9px] top-1 w-5 h-5 rounded-full bg-[#D4AF37] shadow-[0_0_0_5px_rgba(212,175,55,0.25)]" />
              <span className="mono text-sm mb-2 block">{era.period}</span>
              <h3 className="text-2xl font-bold mb-6">{era.title}</h3>

              <div className="space-y-6">
                {era.roles.map((role, roleIndex) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: roleIndex * 0.1 }}
                    className="glass-tilt p-6"
                  >
                    <h4 className="text-lg font-semibold mb-1">{role.title}</h4>
                    <p className="text-[#aab3bd] text-sm mb-3">{role.date}</p>
                    {roleHasBullets(role) && (
                      <ul className="list-disc list-inside space-y-1 text-[#aab3bd] text-sm">
                        {role.bullets!.map((bullet, bulletIndex) => (
                          <li key={bulletIndex}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
