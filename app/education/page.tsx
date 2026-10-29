"use client";

import { motion } from "framer-motion";

const education = [
  {
    id: "bachelors-applied-management",
    year: "2023",
    title: "Bachelor's Degree in Applied Management",
    institution: "Otago Polytechnic | Te Pūkenga",
  },
  {
    id: "master-certificate-business-management",
    year: "2020",
    title: "Master Certificate in Business Management",
    institution: "",
  },
  {
    id: "business-management-units",
    year: "2013",
    title: "Business Management Units",
    institution: "Cornell Institute",
  },
];

const activities = [
  { id: "music", icon: "🎵", label: "Music" },
  { id: "tennis", icon: "🎾", label: "Tennis" },
  { id: "yoga", icon: "🧘", label: "Yoga" },
  { id: "reading-sci-fi-mysteries", icon: "📚", label: "Reading & sci-fi mysteries" },
  { id: "designing-websites-funnels", icon: "🎨", label: "Designing websites & funnels" },
];

export default function Education() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="mono block mb-4">Education & Activities</span>
          <h2 className="text-[clamp(2rem,6vw,3.6rem)] font-extrabold tracking-tight mb-6">
            Learning and life.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {education.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-tilt p-6"
            >
              <h4 className="text-2xl font-bold text-[#D4AF37] mb-3">{item.year}</h4>
              <p className="text-[#F8F9FA] font-medium mb-2">{item.title}</p>
              {item.institution && (
                <p className="text-[#aab3bd] text-sm">{item.institution}</p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-tilt p-6 text-center"
            >
              <div className="text-3xl mb-3">{activity.icon}</div>
              <p className="text-[#F8F9FA] text-sm font-medium">{activity.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}