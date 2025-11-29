"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { RegionGeoJSON, RegionResponse, RegionFeature } from "@/types/region";
import { getMahalleMeta } from "@/config/mahallat";
import RegionIntroModal from "@/components/regions/RegionIntroModal";
import MahalleModal from "@/components/regions/MahalleModal";

// 🧩 نگاشت بین نام‌های خام GIS و نام محله‌های نمایشی روی نقشه
const mahalleGroupMap: Record<string, { title: string; logicalId: number }> = {
  // گروه 1: هفده شهریور شمالی
  "ینگه قلعه": {
    title: "هفده شهریور ",
    logicalId: 1001,
  },
  "کلانتری11": {
    title: "هفده شهریور ",
    logicalId: 1001,
  },

  // گروه 2: شهید بهشتی شمالی
  "پورآدینه": {
    title: "شهید بهشتی ",
    logicalId: 1002,
  },
  "ساربان محله": {
    title: "شهید بهشتی ",
    logicalId: 1002,
  },
};

// Dynamic import برای جلوگیری از SSR روی Leaflet
const RegionMap = dynamic(() => import("@/components/map/RegionMap"), {
  ssr: false,
});

export default function RegionSelectionPage() {
  const [showIntroModal, setShowIntroModal] = useState(true);

  const [regions, setRegions] = useState<RegionGeoJSON | null>(null);
  const [clickableIds, setClickableIds] = useState<number[]>([]);

  const [selectedRegion, setSelectedRegion] = useState<RegionFeature | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<RegionFeature | null>(null);

  const [selectedMeta, setSelectedMeta] = useState<any | null>(null);
  const [showMahalleModal, setShowMahalleModal] = useState(false);

  const [isHoverSupported, setIsHoverSupported] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // تشخیص پشتیبانی Hover (دسکتاپ / موبایل)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(hover: hover)");
      setIsHoverSupported(mq.matches);
    }
  }, []);

  // دریافت محلات از API
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await fetch("https://hominex-backend.ir/api/mahalles/");
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات محلات");

        const data: RegionResponse = await res.json();

        const geojson: RegionGeoJSON = {
          type: "FeatureCollection",
          features: data.results.map((r) => {
            const rawName = r.properties.Name as string;
            const group = mahalleGroupMap[rawName];

            // اگر در گروهبندی بود → نام و ID منطقی
            const displayName = group ? group.title : rawName;
            const logicalId = group ? group.logicalId : r.properties.mahalle_ID;

            return {
              type: "Feature",
              geometry: r.geometry,
              properties: {
                id: r.id,
                name: displayName,     // ✅ هفده شهریور شمالی / شهید بهشتی شمالی / ...
                mahalleId: logicalId,  // ✅ شناسه منطقی گروه یا همان mahalle_ID قبلی
                parcelsCount: r.properties.tdad_qtaat,
                shapeArea: r.properties.Shape_Area,
              },
            };
          }),
        };

        setRegions(geojson);

        // فقط محله‌هایی که در config/mahallat تعریف شده‌اند، کلیک‌پذیر باشند
        const ids = geojson.features
          .filter((f) =>
            getMahalleMeta(f.properties.name, f.properties.mahalleId)
          )
          .map((f) => f.properties.id);

        setClickableIds(ids);
      } catch (err: any) {
        setError(err.message || "Error");
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  // بعد از انتخاب محله روی نقشه → مدال اطلاعات باز شود
  const handleRegionClick = (feature: RegionFeature) => {
    setSelectedRegion(feature);

    const meta = getMahalleMeta(
      feature.properties.name,
      feature.properties.mahalleId
    );

    if (!meta) {
      console.warn("محله در config پیدا نشد:", feature.properties.name);
      return;
    }

    setSelectedMeta(meta);
    setShowMahalleModal(true);
  };

  // برای دسکتاپ → hover / برای موبایل → کلیک
  const activeRegion =
    isHoverSupported && hoveredRegion ? hoveredRegion : selectedRegion;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0B1220]">
      {/* پس‌زمینه نئونی هومینکس */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.06),_rgba(13,34,56,1)_80%)]" />

      {/* نقشه شیشه‌ای */}
      <div className="absolute inset-4 z-0 rounded-2xl overflow-hidden glass-map-container glass-map-neon">
        {loading && (
          <div className="flex h-full w-full items-center justify-center text-slate-300 text-sm">
            در حال بارگذاری نقشه محلات...
          </div>
        )}

        {error && !loading && (
          <div className="flex h-full w-full items-center justify-center text-red-300 text-sm">
            خطا در دریافت اطلاعات محلات
          </div>
        )}

        {regions && !loading && !error && (
          <RegionMap
            regions={regions}
            activeId={activeRegion?.properties.id ?? null}
            clickableIds={clickableIds}
            onRegionClick={handleRegionClick}
            onRegionHover={setHoveredRegion}
          />
        )}
      </div>

      {/* مدال راهنمای اولیه */}
      <RegionIntroModal
        open={showIntroModal}
        onStartMap={() => setShowIntroModal(false)}
      />

      {/* مدال لوکس اطلاعات محله (Glassmorphism) */}
      <MahalleModal
        open={showMahalleModal}
        onClose={() => setShowMahalleModal(false)}
        meta={selectedMeta}
      />
    </div>
  );
}
