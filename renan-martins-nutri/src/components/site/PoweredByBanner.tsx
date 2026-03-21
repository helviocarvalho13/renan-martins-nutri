"use client";

export default function PoweredByBanner() {
  return (
    <div className="fixed bottom-3 left-3 z-[9999] pointer-events-none">
      <div className="backdrop-blur-md bg-black/60 rounded-lg px-3 py-1.5 pointer-events-auto flex items-center gap-2 border border-white/10" data-testid="banner-powered-by">
        <span className="text-[10px] text-neutral-400">Powered by</span>
        <img src="/assets/luna-powered-by.png" alt="Luna Tecnologia" className="h-5 w-auto object-contain" data-testid="img-powered-by-logo" />
      </div>
    </div>
  );
}
