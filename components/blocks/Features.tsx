import React from 'react';

type FeatureItem = { title: string; text: string };
export type FeaturesData = { items: FeatureItem[] };

export const Features = ({ data }: { data: FeaturesData }) => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.items?.map((item, i) => (
          <div key={i} className="glass-tilt p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-3 text-[#F8F9FA]">{item.title}</h3>
            <p className="text-[#aab3bd] text-sm">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
