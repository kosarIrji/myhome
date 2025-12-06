"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface RegionIntroModalProps {
  open: boolean;
  onStartMap: () => void;
}

const RegionIntroModal: React.FC<RegionIntroModalProps> = ({ open, onStartMap }) => {
  const router = useRouter();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center  backdrop-blur-md">
      {/* Glass Container */}
      <div className="relative w-[92%] max-w-xl rounded-3xl border border-white/15 bg-slate-900/60 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.7)] overflow-hidden">

        {/* Neon Glows */}
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-28 -right-10 h-60 w-60 rounded-full bg-cyan-400/25 blur-3xl" />
          <div className="absolute -bottom-28 -left-16 h-60 w-60 rounded-full bg-amber-400/25 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-7 pt-7 pb-6 text-right text-slate-100">
          
          <h2 className="text-xl md:text-[22px] font-extrabold tracking-tight text-white mb-3">
            انتخاب محله روی نقشه
          </h2>

          <p className="text-sm leading-relaxed text-slate-200/90 mb-3">
            برای مشاهده اطلاعات دقیق هر محله، ابتدا روی نقشه، محله مورد نظر خود را انتخاب کنید. هومینکس با
            نمایش جزئیات کالبدی، آماری و تحلیلی، شما را به صفحه معرفی کامل همان محله هدایت خواهد کرد.
          </p>

          <p className="text-xs leading-relaxed text-slate-300/85">
            محله‌های فعال روی نقشه، با افکت نئونی و نام مشخص شده‌اند. کافی است روی هر محله فعال کلیک کنید تا
            مسیر هدایت به صفحه اختصاصی آن آغاز شود.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">

            {/* Start Button */}
            <button
           
            
              onClick={onStartMap}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-yellow-300 via-amber-400 to-yellow-300 px-5 py-2 text-xs md:text-[13px] font-semibold text-slate-900 shadow-[0_0_28px_rgba(250,204,21,0.55)] hover:brightness-110 transition"
            >
              {/* Glass Icon */}
              <div className="p-1 rounded-xl bg-white/40 backdrop-blur-md border border-white/30">
                <svg width="16" height="16" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v3l2 1" />
                </svg>
              </div>

              <span className="font-bold">شروع انتخاب محله روی نقشه</span>
            </button>

            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg px-4 py-2 text-xs md:text-[13px] text-slate-100 hover:bg-white/20 hover:border-white/40 transition shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            >
              {/* Glass Icon */}
              <span>بازگشت به صفحه قبلی</span>
              <div className="p-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 8H3" />
                  <path d="M7 4L3 8L7 12" />
                </svg>
              </div>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionIntroModal;
