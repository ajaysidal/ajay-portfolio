   
   import Link from "next/link";
   import fs from "fs";
   import path from "path";

   export default function CMSPage() {
     const pagesDir = path.join(process.cwd(), "content", "pages");
     let pages: { slug: string; name: string }[] = [];
     if (fs.existsSync(pagesDir)) {
       pages = fs.readdirSync(pagesDir).filter((f) => f.endsWith(".json")).map((file) => {
         const slug = file.replace(".json", "");
         return { slug, name: slug === "home" ? "Home Page" : slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ") };
       });
     }
     return (
       <div className="p-8 space-y-8">
         <h1 className="text-3xl font-bold text-[#F8F9FA]">Content Manager</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <Link href="/dashboard/cms/builder?slug=new" className="block p-6 rounded-lg bg-[#D4AF37]/10 border-2 border-dashed border-[#D4AF37] hover:bg-[#D4AF37]/20 transition text-center">
             <span className="text-4xl text-[#D4AF37] mb-2 block">+</span>
             <h3 className="text-lg font-semibold text-[#D4AF37]">Create New Page</h3>
           </Link>
           {pages.map((page) => (
             <div key={page.slug} className="p-6 rounded-lg bg-[#1F2833] border border-[#D4AF37]/20 flex flex-col">
               <h3 className="text-xl font-bold mb-1 text-[#F8F9FA]">{page.name}</h3>
               <p className="text-sm text-[#aab3bd] mb-6 font-mono">/{page.slug === "home" ? "" : page.slug}</p>
               <div className="flex gap-3 mt-auto">
                 <Link href={`/dashboard/cms/builder?slug=${page.slug}`} className="flex-1 bg-[#D4AF37] text-[#0B0C10] text-center py-2 rounded-lg font-bold hover:bg-[#b8962e] transition text-sm">Edit</Link>
                 <Link href={page.slug === "home" ? "/" : `/${page.slug}`} target="_blank" className="flex-1 border border-gray-700 text-[#F8F9FA] text-center py-2 rounded-lg font-medium hover:border-[#D4AF37] transition text-sm">View</Link>
               </div>
             </div>
           ))}
         </div>
       </div>
     );
   }
