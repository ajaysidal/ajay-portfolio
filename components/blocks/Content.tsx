import React from 'react';

export type ContentData = { body: string };

export const Content = ({ data }: { data: ContentData }) => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto prose prose-invert max-w-none">
        <p className="text-[#aab3bd] whitespace-pre-wrap">{data.body}</p>
      </div>
    </section>
  );
};
