import Link from "next/link";
import fs from "fs";
import path from "path";

export default function CMSPage() {
  const pagesDir = path.join(process.cwd(), "content", "pages");
  let pages: { slug: string; name: string; lastModified: string }[] = [];

  if (fs.existsSync(pagesDir)) {
    const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith(".json"));
    pages = files.map((file) => {
      const slug = file.replace(".json", "");
      const stats = fs.statSync(path.join(pagesDir, file));
      return {
        slug,
        name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
        lastModified: stats.mtime.toLocaleDateString(),
      };
    });
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#F8F9FA]">Content Manager</h1>
        <p className="text-[#aab3bd] mt-2">Visually edit and manage your website pages.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/dashboard/cms/builder?slug=new-page"
          className="block p-6 rounded-lg bg-[#D4AF37]/10 border-2 border-dashed border-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all duration-200 group"
        >
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <span className="text-4xl text-[#D4AF37] mb-2">+</span>
            <h3 className="text-lg font-semibold text-[#D4AF37]">Create New Page</h3>
          </div>
        </Link>

        {pages.map((page) => (
          <div key={page.slug} className="glass-tilt p-6 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xs text-[#aab3bd] bg-gray-800 px-2 py-1 rounded">{page.lastModified}</span>
            </div>
            <h3 className="text-xl font-bold mb-1 text-[#F8F9FA]">{page.name}</h3>
            <p className="text-sm text-[#aab3bd] mb-6 font-mono">/{page.slug === "home" ? "" : page.slug}</p>
            
            <div className="flex gap-3 mt-auto">
              <Link 
                href={`/dashboard/cms/builder?slug=${page.slug}`}
                className="flex-1 bg-[#D4AF37] text-[#0B0C10] text-center py-2 rounded-lg font-bold hover:bg-[#b8962e] transition text-sm"
              >
                Edit Visually
              </Link>
              <Link 
                href={page.slug === "home" ? "/" : `/${page.slug}`}
                target="_blank"
                className="flex-1 border border-gray-700 text-[#F8F9FA] text-center py-2 rounded-lg font-medium hover:border-[#D4AF37] hover:text-[#D4AF37] transition text-sm"
              >
                View Live
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
