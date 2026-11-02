"use client";

import { Puck, type Data } from "@puckeditor/core";
import { puckConfig, type Props } from "@/lib/puck-config";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function BuilderContent() {
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get("slug") || "";
  
  const [slug] = useState(initialSlug);
  const [data, setData] = useState<Data<Props>>({ root: { props: {} }, content: [] });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPage = async (pageSlug: string) => {
      if (!pageSlug || pageSlug === "new-page") {
        setData({ root: { props: {} }, content: [] });
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch(`/api/load-page?slug=${pageSlug}`);
        if (response.ok) {
          const pageData = await response.json();
          setData(pageData);
        } else {
          setData({ root: { props: {} }, content: [] });
        }
      } catch (error) {
        console.error('Load error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (slug) loadPage(slug);
  }, [slug]);

  const handleSave = async (newData: Data<Props>) => {
    if (!slug || slug === "new-page") {
      alert("Cannot save: No valid slug specified. Create from CMS dashboard.");
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

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-4rem)] w-full bg-[#0B0C10] flex items-center justify-center text-[#D4AF37] -m-8">
        <div className="animate-pulse text-xl font-bold">Loading: {slug}...</div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-[#0B0C10] text-[#F8F9FA] flex flex-col -m-8">
      {/* Compact Top Bar */}
      <div className="bg-[#1a1a1a] border-b border-gray-700 px-4 py-2 flex items-center gap-4 shrink-0">
        <Link href="/dashboard/cms" className="text-[#aab3bd] hover:text-[#D4AF37] transition text-sm font-medium flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to CMS
        </Link>
        <div className="h-5 w-px bg-gray-700"></div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#D4AF37]">Editing:</span>
          <span className="bg-gray-800 border border-gray-600 rounded px-2 py-0.5 text-xs font-mono text-white">
            {slug === "new-page" ? "Untitled Page" : slug}
          </span>
        </div>
        <button 
          onClick={() => handleSave(data)}
          disabled={isSaving || slug === "new-page"}
          className="ml-auto bg-[#D4AF37] text-[#0B0C10] px-4 py-1 rounded font-bold hover:bg-[#b8962e] transition disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow"
        >
          {isSaving ? 'Saving...' : '💾 Save Page'}
        </button>
      </div>
      
      {/* Puck Editor Canvas */}
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

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="h-[calc(100vh-4rem)] w-full bg-[#0B0C10] flex items-center justify-center text-[#D4AF37] -m-8">Loading builder...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
