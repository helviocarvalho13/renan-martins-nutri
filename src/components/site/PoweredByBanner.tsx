"use client";

export default function PoweredByBanner() {
  return (
    <>
      <div className="fixed bottom-3 right-3 z-[9999] pointer-events-none hidden md:block">
        <div className="backdrop-blur-md bg-black/60 rounded-lg px-3 py-1.5 pointer-events-auto flex items-center gap-2 border border-white/10" data-testid="banner-powered-by">
          <span className="text-[10px] text-neutral-400">Powered by</span>
          <img src="/assets/luna-powered-by.png" alt="Luna Tecnologia" className="h-5 w-auto object-contain" data-testid="img-powered-by-logo" />
        </div>
      </div>
      <div className="fixed top-1/2 left-0 -translate-y-1/2 z-[9999] pointer-events-none md:hidden">
        <div className="backdrop-blur-md bg-black/60 rounded-r-lg px-1 py-2 pointer-events-auto flex flex-col items-center gap-1 border border-white/10 border-l-0" data-testid="banner-powered-by-mobile">
          <span className="text-[8px] text-neutral-400 [writing-mode:vertical-rl] rotate-180">Powered by</span>
          <img src="/assets/luna-powered-by.png" alt="Luna Tecnologia" className="h-3 w-auto object-contain rotate-90" data-testid="img-powered-by-logo-mobile" />
        </div>
      </div>
    </>
  );
}
