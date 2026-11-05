import Image from "next/image";

interface BlogImageProps {
  src: string;
  alt: string;
  caption: string;
}

export default function BlogImage({ src, alt, caption }: BlogImageProps) {
  return (
    <div className="my-8 rounded-lg border border-[#D4AF37]/20 overflow-hidden bg-[#1F2833]">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={450}
        className="w-full h-auto object-cover"
        priority
      />
      <p className="text-sm text-[#aab3bd] text-center mt-2 italic px-4 pb-4">
        {caption}
      </p>
    </div>
  );
}
