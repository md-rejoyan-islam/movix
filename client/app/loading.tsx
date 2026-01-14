import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed h-screen inset-0 z-[5000] bg-[#04152d] flex flex-col items-center justify-center">
      <div className="text-4xl font-bold mb-4 text-primary animate-pulse">
        <Image
          src="/movix-logo.svg"
          alt="logo"
          width={220}
          height={220}
          priority
          className="w-48"
        />
      </div>

      <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full bg-[#da2b4a] animate-loading-bar" />
      </div>

      <p className="mt-4 text-slate-400">Loading amazing content...</p>
    </div>
  );
}
