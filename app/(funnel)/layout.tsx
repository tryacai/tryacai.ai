import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function FunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[linear-gradient(135deg,_#0A0E42_0%,_#1C1550_22%,_#4A1E7A_42%,_#8A2E8F_60%,_#C93D7F_76%,_#F26B3A_90%,_#FFA340_100%)] text-white overflow-x-hidden">
      {children}
    </div>
  );
}
