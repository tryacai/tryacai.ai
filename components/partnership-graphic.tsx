import Image from "next/image";

export function PartnershipGraphic() {
  return (
    <div className="w-full h-64 md:h-80 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg mb-12 md:mb-16 flex items-center justify-center gap-8 md:gap-16 px-8 border border-zinc-200 dark:border-zinc-800">
      {/* XUNA AI Logo */}
      <div className="flex items-center justify-center w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="text-5xl md:text-6xl font-bold text-zinc-800 dark:text-zinc-200 tracking-tight">
            XUNA
          </div>
        </div>
      </div>

      {/* Partnership Divider */}
      <div className="flex flex-col items-center gap-3 flex-shrink-0">
        <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-zinc-300 dark:via-zinc-600 to-transparent"></div>
        <div className="text-xs md:text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">
          Built on
        </div>
        <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-zinc-300 dark:via-zinc-600 to-transparent"></div>
      </div>

      {/* ACAI AI Logo */}
      <div className="flex items-center justify-center w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
        <div className="relative w-full h-full">
          <Image
            src="/justlogowithoutwordsACAI.jpeg"
            alt="ACAI AI Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

