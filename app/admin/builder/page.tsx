"use client";

import { Puck, type Data } from "@puckeditor/core";
import { puckConfig, type Props } from "@/lib/puck-config";
import { useState } from "react";

export default function BuilderPage() {
  const [slug, setSlug] = useState("home");
  const [data, setData] = useState<Data<Props>>({
    root: { props: {} },
    content: [],
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (newData: Data<Props>) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/save-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, data: newData }),
      });
      
      if (response.ok) {
      } else {
        alert('Failed to save page.');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#0B0C10] text-[#F8F9FA] flex flex-col">
      <div className="p-4 border-b border-gray-800 flex items-center gap-4">
        <span className="font-bold text-sm">Page Slug:</span>
        <input 
          type="text" 
          value={slug} 
          onChange={(e) => setSlug(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm focus:outline-none focus:border-[#D4AF37] w-48"
          placeholder="home"
        />
        <button 
          onClick={() => handleSave(data)}
          disabled={isSaving}
          className="ml-auto bg-[#D4AF37] text-[#0B0C10] px-4 py-2 rounded font-bold hover:bg-[#b8962e] transition disabled:opacity-50 text-sm"
        >
          {isSaving ? 'Saving...' : 'Publish Page'}
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <Puck
          config={puckConfig}
          data={data}
          onChange={setData}
          onPublish={handleSave}
        />
      </div>
    </div>
  );
}
