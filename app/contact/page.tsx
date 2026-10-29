import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="mono block mb-4">Contact</span>
        <h2 className="text-[clamp(2rem,6vw,3.6rem)] font-extrabold tracking-tight mb-6">
          Let&apos;s build.
        </h2>
        <p className="text-[#aab3bd] max-w-2xl mx-auto mb-12">
          Ready to transform your operations? Get in touch directly or book a consultation.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <a
            href="mailto:ajay@buildwithai.digital"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#D4AF37] rounded-lg text-[#F8F9FA] hover:bg-[#D4AF37] hover:text-[#0B0C10] transition-all duration-200"
          >
            <Mail className="w-5 h-5" />
            ajay@buildwithai.digital
          </a>
          <a
            href="tel:+64223260583"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#1F2833] rounded-lg text-[#F8F9FA] hover:border-[#D4AF37] transition-all duration-200"
          >
            <Phone className="w-5 h-5" />
            +64 22 326 0583
          </a>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#E5C25A] transition-colors text-sm font-medium"
          >
            Book a Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/project-intake"
            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#E5C25A] transition-colors text-sm font-medium"
          >
            Submit Project Intake
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-[#1F2833]">
          <div className="flex items-center justify-center gap-2 text-[#aab3bd] text-sm">
            <MapPin className="w-4 h-4" />
            Auckland 1021, New Zealand
          </div>
        </div>
      </div>
    </section>
  );
}