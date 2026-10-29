import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#F8F9FA]/10 bg-[#0B0C10]/70 backdrop-blur-xl py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-6">
          <Link href="/" className="text-2xl font-bold text-[#F8F9FA] tracking-tight">
            AS
          </Link>
          <p className="text-[#aab3bd] text-sm max-w-md">
            Technology &amp; Operations Leader | Creative Technologist
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="mailto:ajay@buildwithai.digital"
              className="text-[#D4AF37] hover:text-[#F8F9FA] transition-colors"
            >
              ajay@buildwithai.digital
            </a>
            <a
              href="tel:+64223260583"
              className="text-[#D4AF37] hover:text-[#F8F9FA] transition-colors"
            >
              +64 22 326 0583
            </a>
          </div>
          <div className="flex gap-6 text-sm">
            <a
              href="https://www.linkedin.com/in/ajay-sidal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#aab3bd] hover:text-[#D4AF37] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/ajaysidal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#aab3bd] hover:text-[#D4AF37] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.nzbn.govt.nz/mynzbn/search/9429047928589/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#aab3bd] hover:text-[#D4AF37] transition-colors"
            >
              NZBN
            </a>
          </div>
          <div className="pt-6 border-t border-[#F8F9FA]/10 w-full">
            <p className="text-[#aab3bd] text-xs">
              Auckland 1021, New Zealand · Built on a Sovereign AI ethos.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}