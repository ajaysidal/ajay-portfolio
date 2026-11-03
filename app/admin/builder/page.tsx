"use client";

import { Puck, type Data } from "@puckeditor/core";
import {  puckConfig, type Props , type PuckData } from "@/lib/puck-config";
import { PuckErrorBoundary } from "@/components/PuckErrorBoundary";
import { useState } from "react";

// Validation helper to ensure data structure is valid for Puck
function isValidPuckData(data: unknown): data is PuckData {
  if (!data || typeof data !== "object") return false;
  const d = data as Partial<PuckData>;
  if (!d.root || typeof d.root !== "object") return false;
  if (!d.root.props || typeof d.root.props !== "object") return false;
  if (!d.content || !Array.isArray(d.content)) return false;
  if (!d.zones || typeof d.zones !== "object") return false;
  return d.content.every(
    (item) => item && typeof item.type === "string" && item.props && typeof item.props === "object"
  );
}

export default function BuilderPage() {
  const [slug, setSlug] = useState("");
  const [data, setData] = useState<PuckData>({
    root: { props: {} },
    content: [],
    zones: {},
  });
  const [isSaving, setIsSaving] = useState(false);
  const [loadedSlug, setLoadedSlug] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadPage = async (pageSlug: string) => {
    if (!pageSlug) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/puck/load?slug=${pageSlug}`);
      if (response.ok) {
        const pageData = await response.json();
        if (isValidPuckData(pageData)) {
          setData(pageData);
        } else {
          console.warn("Invalid Puck data received, using empty structure:", pageData);
          setData({ root: { props: {} }, content: [], zones: {} });
        }
      } else {
        setData({ root: { props: {} }, content: [], zones: {} });
      }
      setLoadedSlug(pageSlug);
    } catch (error) {
      console.error('Load error:', error);
      setData({ root: { props: {} }, content: [], zones: {} });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (newData: PuckData) => {
    if (!slug) {
      alert('Please enter a page slug first');
      return;
    }
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/puck/save', {
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
      {/* Page Slug Control Bar */}
      <div className="bg-[#1a1a1a] border-b border-gray-700 p-4 flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-3 flex-1">
          <label className="text-sm font-bold text-[#D4AF37]">Page Slug:</label>
          <input 
            type="text" 
            value={slug} 
            onChange={(e) => setSlug(e.target.value)}
            onBlur={(e) => e.target.value && loadPage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadPage(slug)}
            className="bg-gray-800 border border-gray-600 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] w-64 text-white placeholder-gray-400"
            placeholder="home, services, about..."
            autoComplete="off"
          />
          {loadedSlug && (
            <span className="text-xs bg-green-900/50 text-green-400 px-2 py-1 rounded">
              Editing: {loadedSlug}
            </span>
          )}
        </div>
        <button 
          onClick={() => handleSave(data)}
          disabled={!slug || isSaving}
          className="bg-[#D4AF37] text-[#0B0C10] px-6 py-2 rounded-lg font-bold hover:bg-[#b8962e] transition disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg"
        >
          {isSaving ? 'Saving...' : 'Publish Page'}
        </button>
      </div>
      
      {/* Puck Editor */}
      <div className="flex-1 overflow-hidden">
        <PuckErrorBoundary onError={(error, info) => {
          console.error("Puck Editor crashed:", error.message, info.componentStack);
        }}>
          <Puck
            config={puckConfig}
            data={data}
            onChange={setData}
            onPublish={handleSave}
          />
        </PuckErrorBoundary>
      </div>
    </div>
  );
}
