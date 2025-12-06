"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // ✅ برای prefetch مخفی

interface MahalleMeta {
  title: string;
  rate: number;
  update: string;
  sections: number;
  area: number;
  url: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  meta: MahalleMeta | null;
}

export default function MahalleModal({ open, onClose, meta }: Props) {
  const router = useRouter();

///prefech urls
  useEffect(() => {
    if (meta?.url) {
      router.prefetch(meta.url);
    }
  }, [meta?.url]);
  
  // ESC برای بستن
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open || !meta) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* لایه شیشه‌ای + گرادیانت‌ها */}
      <div
        className="
          relative w-[92%] max-w-lg rounded-3xl overflow-hidden
          bg-slate-900/40 backdrop-blur-[25px]
          border border-white/15 shadow-[0_0_45px_rgba(0,0,0,0.7)]
          animate-modal-appear
        "
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-0 w-60 h-60 rounded-full bg-sky-500/25 blur-3xl animate-gradient-shift" />
          <div className="absolute -bottom-24 right-0 w-60 h-60 rounded-full bg-emerald-400/25 blur-3xl animate-gradient-shift-rev" />
        </div>

        {/* محتوای اصلی */}
        <div className="relative z-20 px-6 py-6 text-right text-slate-100">
          {/* نام محله - وسط چین */}
          <h2 className="text-xl font-extrabold text-white mb-4 text-center drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]">
            {meta.title}
          </h2>

          {/* ✅ لینک مخفی برای prefetch صفحه‌ی محله */}
          {meta.url && (
            <Link
              href={meta.url}
              prefetch
              className="hidden"
              aria-hidden="true"
            >
              prefetch
            </Link>
          )}

          {/* ردیف سه‌تایی اطلاعات پایه */}
          <div className="grid grid-cols-3 gap-4 text-center mb-5 text-sm">
            {/* تاریخ بروزرسانی */}
            <div>
              <span className="block text-[11px] text-slate-400 mb-0.5">
                آخرین بروزرسانی
              </span>
              <span className="block font-medium text-slate-100">
                {meta.update}
              </span>
            </div>

            {/* تعداد قطعات */}
            <div>
              <span className="block text-[11px] text-slate-400 mb-0.5">
                تعداد قطعات
              </span>
              <span className="block font-semibold">
                {meta.sections.toLocaleString("fa-IR")}
              </span>
            </div>

            {/* مساحت */}
            <div>
              <span className="block text-[11px] text-slate-400 mb-0.5">
                مساحت (هکتار)
              </span>
              <span className="block font-semibold">
                {meta.area.toLocaleString("fa-IR")}
              </span>
            </div>
          </div>

          {/* ردیف امتیاز در هومینکس - وسط چین */}
          <div className="mb-5 text-center">
            <span className="block text-[11px] text-slate-400 mb-1">
              امتیاز محله در هومینکس
            </span>
            <span
              className="
                inline-flex items-center gap-1 px-4 py-1.5 rounded-2xl
                bg-sky-500/15 border border-sky-400/40
                text-[13px] font-semibold text-sky-50
                shadow-[0_0_15px_rgba(56,189,248,0.35)]
              "
            >
               5/ {meta.rate?.toFixed(1) ?? "0.0"} ⭐
            </span>
          </div>

          {/* توضیح کوتاه */}
          <p className="text-xs text-slate-300 leading-6 mb-5 text-center">
            با انتخاب این محله می‌توانید اطلاعات کامل، تحلیل‌ها و ویژگی‌های
            کالبدی ثبت‌شده در هومینکس را مشاهده کنید.
          </p>

          {/* دکمه‌ها */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* دکمه اصلی - آبی هماهنگ با بکگراند */}
            <Link

            //بستن مودال برای بهبود سرعت
            onClick={() => {
              onClose(); // ابتدا مودال بسته شود
              setTimeout(() => router.push(meta.url), 50); // بعد ناوبری
            }}
              href={meta.url}
              prefetch
              className="
                flex-1 py-2.5 rounded-2xl font-semibold text-center
                bg-sky-800/80 text-white
                shadow-[0_0_18px_rgba(56,189,248,0.6)]
                hover:bg-sky-600 border-white/25
                hover:shadow-[0_0_28px_rgba(56,189,248,0.9)]
                hover:-translate-y-0.5
                transition
              "
            >
              مشاهده جزئیات محله
            </Link>


            {/* دکمه بازگشت - شیشه‌ای ملایم */}
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg px-4 py-2 text-xs md:text-[13px] text-slate-100 hover:bg-white/20 hover:border-white/40 transition shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            >
              {/* Glass Icon */}
              <span>بازگشت به صفحه قبلی</span>
              <div className="p-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
}
