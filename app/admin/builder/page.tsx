"use client";

import { Puck, type Data } from "@puckeditor/core";
import { puckConfig, type Props } from "@/lib/puck-config";
import { useState } from "react";

export default function BuilderPage() {
  const [slug, setSlug] = useState("");
  const [data, setData] = useState<Data<Props>>({
    root: { props: {} },
    content: [],
  });
  const [isSaving, setIsSaving] = useState(false);
  const [loadedSlug, setLoadedSlug] = useState<string | null>(null);

  const loadPage = async (pageSlug: string) => {
    try {
      const response = await fetch(`/api/load-page?slug=${pageSlug}`);
      if (response.ok) {
        const pageData = await response.json();
        setData(pageData);
        setLoadedSlug(pageSlug);
      } else {
        setData({ root: { props: {} }, content: [] });
        setLoadedSlug(pageSlug);
      }
    } catch (error) {
      console.error('Load error:', error);
    }
  };

  const handleSave = async (newData: Data<Props>) => {
    if (!slug) {
      alert('Please enter a page slug first');
      return;
    }
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/save-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, data: newData }),
      });
      
      if (response.ok) {
        alert(`Page '${slug}' saved successfully!`);
        setLoadedSlug(slug);
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
      <div className="p-4 border-b border-gray-800 flex items-center gap-4 bg-[#0B0C10]">
        <div className="flex items-center gap-2">
          <label className="text-sm font-bold">Page Slug:</label>
          <input 
            type="text" 
            value={slug} 
            onChange={(e) => setSlug(e.target.value)}
            onBlur={(e) => e.target.value && loadPage(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm focus:outline-none focus:border-[#D4AF37] w-48"
            placeholder="home, services, about..."
          />
          {loadedSlug && (
            <span className="text-xs text-green-400">Editing: {loadedSlug}</span>
          )}
        </div>
        <button 
          onClick={() => handleSave(data)}
          disabled={!slug || isSaving}
          className="ml-auto bg-[#D4AF37] text-[#0B0C10] px-4 py-2 rounded font-bold hover:bg-[#b8962e] transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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
