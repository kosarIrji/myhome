"use client";

export default function HxLoading() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0B1220]/80 backdrop-blur-2xl">
      {/* Container */}
      <div className="relative flex flex-col items-center">
        
        {/* Glow Aura */}
        <div className="absolute w-56 h-56 rounded-full bg-cyan-400/30 blur-3xl animate-glow-pulse"></div>
        <div className="absolute w-40 h-40 rounded-full bg-yellow-400/20 blur-2xl animate-glow-pulse-rev"></div>

        {/* Glass Loader Ring */}
        <div className="
          relative w-28 h-28 rounded-full 
          border-[6px] border-white/20 backdrop-blur-xl 
          shadow-[0_0_35px_rgba(0,200,255,0.35),_0_0_25px_rgba(255,200,0,0.25)]
          animate-spin-slow
        ">
          {/* Neon Border */}
          <div className="
            absolute inset-0 rounded-full border-[6px] 
            border-transparent border-t-cyan-400 border-b-yellow-400
            blur-[1px] animate-border-pulse
          "></div>
        </div>

        {/* Text */}
        <p className="mt-6 text-sm text-slate-300 tracking-wide animate-fade-in">
          در حال بارگذاری اطلاعات محلات...
        </p>
      </div>
    </div>
  );
}
