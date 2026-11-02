'use client';

import { Puck, type Data } from '@puckeditor/core';
import { puckConfig, type Props } from '@/lib/puck-config';
import { useState } from 'react';

export default function BuilderPage() {
  const [data, setData] = useState<Data<Props>>({
    root: { props: {} },
    content: [],
  });

  const handleSave = (newData: Data<Props>) => {
    console.log('Saving page data:', JSON.stringify(newData, null, 2));
    // TODO: Phase 5 - Wire this to save to GitHub API or local Postgres
    alert('Page layout logged to console! (Database/Git wiring pending in Phase 5)');
  };

  return (
    <div className="h-screen w-full bg-[#0B0C10] text-[#F8F9FA]">
      <Puck
        config={puckConfig}
        data={data}
        onChange={setData}
        onPublish={handleSave}
      />
    </div>
  );
}
