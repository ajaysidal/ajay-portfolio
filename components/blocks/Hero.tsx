import React from 'react';

export type HeroData = {
  tagline: string;
  headline: string;
  text: string;
};

export const Hero = ({ data }: { data: HeroData }) => {
  return (
    <section className="py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        {data.tagline && <span className="mono block mb-4 text-[#D4AF37]">{data.tagline}</span>}
        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold tracking-tight mb-6 text-[#F8F9FA]">
          {data.headline}
        </h1>
        {data.text && <p className="text-[#aab3bd] text-lg max-w-2xl mx-auto">{data.text}</p>}
      </div>
    </section>
  );
};
