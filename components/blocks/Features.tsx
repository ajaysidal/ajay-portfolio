import React from 'react';
import { Bot, Server, FileText, Zap, Shield, Globe } from 'lucide-react';

type FeatureItem = { title: string; text: string; icon?: string };
export type FeaturesData = { 
  items: FeatureItem[];
  columns?: number;
};

const getIcon = (iconName?: string) => {
  switch(iconName) {
    case 'bot': return Bot;
    case 'server': return Server;
    case 'file': return FileText;
    case 'zap': return Zap;
    case 'shield': return Shield;
    case 'globe': return Globe;
    default: return FileText;
  }
};

export const Features = ({ data }: { data: FeaturesData }) => {
  const columns = data.columns || 3;
  const gridClass = columns === 2 ? 'md:grid-cols-2' : columns === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3';
  
  return (
    <section className="py-16 px-6">
      <div className={}>
        {data.items?.map((item, i) => {
          const Icon = getIcon(item.icon);
          return (
            <div key={i} className="glass-tilt p-8 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#F8F9FA]">{item.title}</h3>
              <p className="text-[#aab3bd] text-sm">{item.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
