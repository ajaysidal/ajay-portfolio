'use client';

import { Puck, DefaultData } from '@puckeditor/core';
import { puckConfig, PageData } from '@/lib/puck-config';
import { useState } from 'react';

export default function BuilderPage() {
  const [data, setData] = useState<DefaultData<PageData>>({
    content: [],
  });

  const handleSave = (newData: DefaultData<PageData>) => {
    console.log('Saving page data:', JSON.stringify(newData, null, 2));
    // TODO: Phase 4 - Wire this to save to GitHub API or local Postgres
    alert('Page layout logged to console! (Database/Git wiring pending in Phase 4)');
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
