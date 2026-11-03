"use client";

import { Puck } from "@puckeditor/core";
import { puckConfig, type PuckData } from "@/lib/puck-config";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FileText, Plus, Save, ArrowLeft, Monitor, Smartphone, Tablet } from "lucide-react";
import { PuckErrorBoundary } from "@/components/PuckErrorBoundary";

function BuilderContent() {
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get("slug") || "home";
  
  const [slug, setSlug] = useState(initialSlug);
  const [files, setFiles] = useState<Array<{ slug: string; name: string }>>([]);
  const [data, setData] = useState<PuckData>({ root: { props: {} }, content: [], zones: {} });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");

  useEffect(() => { setIsHydrated(true); }, []);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const response = await fetch("/api/puck/files");
        if (response.ok) {
          const fileList = await response.json();
          if (Array.isArray(fileList)) setFiles(fileList);
        }
      } catch (error) { console.error("Failed to load files:", error); }
    };
    loadFiles();
  }, []);

  useEffect(() => {
    const loadPage = async (pageSlug: string) => {
      if (!pageSlug || pageSlug === "new") {
        setData({ root: { props: { title: "New Page", metaDescription: "" } }, content: [], zones: {} });
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(`/api/puck/load?slug=${pageSlug}`);
        if (response.ok) {
          const pageData = await response.json();
          if (pageData && typeof pageData === 'object' && 'root' in pageData && 'content' in pageData && Array.isArray(pageData.content)) {
            setData(pageData as PuckData);
          } else {
            console.warn("Invalid Puck data received, using empty structure");
            setData({ root: { props: {} }, content: [], zones: {} });
          }
        } else {
          setData({ root: { props: {} }, content: [], zones: {} });
        }
      } catch (error) {
        console.error("Load error:", error);
        setData({ root: { props: {} }, content: [], zones: {} });
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) loadPage(slug);
  }, [slug]);

  const handleCreateNew = () => {
    const newSlug = prompt("Enter new page slug (e.g., about-us):");
    if (newSlug) {
      const formattedSlug = newSlug.toLowerCase().replace(/\s+/g, "-");
      setSlug(formattedSlug);
      setData({ root: { props: { title: formattedSlug, metaDescription: "" } }, content: [], zones: {} });
    }
  };

  const handleSave = async () => {
    if (!slug || slug === "new") { alert("Please create or select a valid page first."); return; }
    setIsSaving(true);
    try {
      const response = await fetch("/api/puck/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, data }),
      });
      if (response.ok) {
        alert(`Page "${slug}" saved successfully!`);
        const res = await fetch("/api/puck/files");
        if (res.ok) {
          const updatedFiles = await res.json();
          if (Array.isArray(updatedFiles)) setFiles(updatedFiles);
        }
      } else { alert("Failed to save page."); }
    } catch (error) {
      console.error("Save error:", error);
      alert("An error occurred while saving.");
    } finally { setIsSaving(false); }
  };


  const currentFileName = files.find(f => f.slug === slug)?.name || (slug === "new" ? "New Page" : slug);

  if (!isHydrated || isLoading) {
    return (
      <div className="h-[calc(100vh-4rem)] w-full bg-[#0B0C10] flex items-center justify-center text-[#D4AF37] -m-8">
        <div className="animate-pulse text-xl font-bold">{isLoading ? `Loading: ${currentFileName}...` : "Initializing Editor..."}</div>
      </div>
    );
  }

  const viewportWidth = viewport === "mobile" ? "375px" : viewport === "tablet" ? "768px" : "100%";

  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-[#0B0C10] text-[#F8F9FA] flex -m-8">
      <aside className="w-64 bg-[#1F2833] border-r border-[#D4AF37]/20 flex flex-col shrink-0 z-20">
        <div className="p-4 border-b border-[#D4AF37]/20">
          <Link href="/dashboard" className="flex items-center gap-2 text-[#aab3bd] hover:text-[#D4AF37] transition mb-4"><ArrowLeft className="w-4 h-4" /> Back</Link>
          <h2 className="text-lg font-bold text-[#D4AF37]">Pages</h2>
        </div>
        <div className="p-4 border-b border-[#D4AF37]/20">
          <button onClick={handleCreateNew} className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] text-[#0B0C10] py-2 rounded-lg font-bold hover:bg-[#b8962e] transition"><Plus className="w-4 h-4" /> New Page</button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {files.map((file) => (
            <button key={file.slug} onClick={() => setSlug(file.slug)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${slug === file.slug ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30" : "text-[#aab3bd] hover:bg-[#0B0C10]/50 hover:text-[#F8F9FA]"}`}>
              <FileText className="w-4 h-4" /><span className="truncate">{file.name}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 relative">
        <div className="h-14 bg-[#1a1a1a] border-b border-gray-700 px-4 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Editing:</span>
            <span className="bg-gray-800 border border-gray-600 rounded px-2 py-0.5 text-xs font-mono text-white">{currentFileName}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1 border border-gray-700">
            <button onClick={() => setViewport("desktop")} className={`p-1.5 rounded ${viewport === "desktop" ? "bg-[#D4AF37] text-[#0B0C10]" : "text-[#aab3bd] hover:text-white"}`}><Monitor className="w-4 h-4" /></button>
            <button onClick={() => setViewport("tablet")} className={`p-1.5 rounded ${viewport === "tablet" ? "bg-[#D4AF37] text-[#0B0C10]" : "text-[#aab3bd] hover:text-white"}`}><Tablet className="w-4 h-4" /></button>
            <button onClick={() => setViewport("mobile")} className={`p-1.5 rounded ${viewport === "mobile" ? "bg-[#D4AF37] text-[#0B0C10]" : "text-[#aab3bd] hover:text-white"}`}><Smartphone className="w-4 h-4" /></button>
          </div>
          <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 bg-[#D4AF37] text-[#0B0C10] px-4 py-1.5 rounded font-bold hover:bg-[#b8962e] transition disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow"><Save className="w-4 h-4" /> {isSaving ? "Saving..." : "Save"}</button>
        </div>

        <div className="flex-1 overflow-hidden bg-[#0B0C10] flex justify-center p-4">
          <div style={{ width: viewportWidth, height: "100%", transition: "width 0.3s ease" }} className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-800">
            <style jsx global>{`:root { --puck-color-primary: #D4AF37; --puck-color-primary-hover: #b8962e; --puck-color-background: #0B0C10; --puck-color-surface: #1F2833; --puck-color-text: #F8F9FA; }`}</style>
            
            <PuckErrorBoundary>
              <Puck 
                config={puckConfig} 
                data={data} 
                onChange={setData} 
                onPublish={handleSave}

              />
            </PuckErrorBoundary>
            
          </div>
        </div>
      </main>
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
