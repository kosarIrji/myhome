"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { MapContainer, GeoJSON, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { RegionGeoJSON, RegionFeature } from "@/types/region";

interface Props {
  regions: RegionGeoJSON | null;
  activeId?: number | null;
  clickableIds: number[];
  onRegionClick?: (f: RegionFeature) => void;
  onRegionHover?: (f: RegionFeature | null) => void;
}

// استایل‌های ثابت خارج از رندر برای سرعت بیشتر
const STYLES = {
  default: {
    color: "rgba(255,255,255,0.8)",
    weight: 1.5,
    fillColor: "rgba(255, 223, 0, 0.12)",
    fillOpacity: 0.3,
  },
  hover: { weight: 5, fillColor: "rgba(255, 223, 0, 0.25)", fillOpacity: 0.5 },
  active: { weight: 6, fillColor: "rgba(255, 223, 0, 0.15)", fillOpacity: 0.6},
  disabled: {
    color: "rgba(255,255,255,0.1)",
    weight: 1,
    fillColor: "transparent",
    fillOpacity: 0,
  },
};



export default function RegionMap({
  regions,
  activeId,
  clickableIds,
  onRegionClick,
  onRegionHover,
}: Props) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const geoJsonRef = useRef<L.GeoJSON>(null);

  // ۱. محاسبه مراکز فقط زمانی که کل دیتا تغییر کند (Memoized)
  const centers = useMemo(() => {
    const centersMap: Record<number, [number, number]> = {};
    if (!regions?.features) return centersMap;

    regions.features.forEach((f) => {
      const geom = f.geometry;
      const coords =
        geom.type === "Polygon" ? geom.coordinates[0] : geom.coordinates[0][0];
      let sumX = 0,
        sumY = 0;
      // به جای p: any
      coords.forEach((p: number[]) => {
        sumX += p[0];
        sumY += p[1];
      });
      centersMap[f.properties.id] = [
        sumY / coords.length,
        sumX / coords.length,
      ];
    });
    return centersMap;
  }, [regions]);

  // ۲. تعیین استایل اولیه (جلوگیری از نمایش لایه آبی پیش‌فرض)
 // تعریف دقیق تایپ ورودی برای مطابقت با کتابخانه
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getInitialStyle = (feature?: import("geojson").Feature<import("geojson").Geometry, any>): L.PathOptions => {
  // ۱. بررسی وجود feature (رفع خطای اصلی شما)
  if (!feature || !feature.properties) {
    return STYLES.disabled;
  }

  // ۲. تبدیل ایمن به تایپ اختصاصی شما (بدون استفاده از any)
  const f = feature as unknown as RegionFeature;
  
  const isClickable = clickableIds.includes(f.properties.id);
  
  if (!isClickable) return STYLES.disabled;
  
  // ۳. بررسی وضعیت فعال بودن در لحظه رندر اولیه
  if (f.properties.id === activeId) return STYLES.active;
  
  return STYLES.default;
};
  // ۳. بروزرسانی استایل‌های Hover/Active به صورت مستقیم (بدون رندر مجدد)
  useEffect(() => {
    if (!geoJsonRef.current) return;

    geoJsonRef.current.eachLayer((l) => {
      // استفاده از Type Assertion کنترل شده
      const layer = l as L.Path & { feature: RegionFeature };
      const id = layer.feature.properties.id;
      const isClickable = clickableIds.includes(id);

      if (!isClickable) {
        layer.setStyle(STYLES.disabled);
        return;
      }

      if (id === activeId) layer.setStyle(STYLES.active);
      else if (id === hoveredId) layer.setStyle(STYLES.hover);
      else layer.setStyle(STYLES.default);
    });
  }, [hoveredId, activeId, clickableIds]);

  if (!regions) return null;

  return (
    <div className="relative w-full h-full bg-[#0D2238]">
      <MapContainer
      
        center={[37.4725, 57.3368]}
      zoom={15}
        minZoom={13}
        maxZoom={18}
        preferCanvas={true} // استفاده از GPU برای رندرینگ سریع
        zoomControl={false}
        className="w-full h-full"
        
      >
        <TileLayer
          url="https://api.maptiler.com/maps/streets-v2-dark/{z}/{x}/{y}.png?key=6O1oMlxMEMtFNT2KH6hE"
          attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
        />

        <GeoJSON
          ref={geoJsonRef}
          data={regions as unknown as import("geojson").GeoJSON}
          style={getInitialStyle}
          onEachFeature={(feature: RegionFeature, layer: L.Layer) => {
            if (!clickableIds.includes(feature.properties.id)) return;

            layer.on({
              mouseover: () => {
                setHoveredId(feature.properties.id);
                onRegionHover?.(feature);
              },
              mouseout: () => {
                setHoveredId(null);
                onRegionHover?.(null);
              },
              click: () => onRegionClick?.(feature),
            });
          }}
        />

        {/* لود کردن مارکرها فقط برای محله‌های کلیک‌پذیر جهت سرعت بیشتر */}
        {regions.features
          .filter((f) => clickableIds.includes(f.properties.id))
          .map((f) => (
            <Marker
              key={f.properties.id}
              position={centers[f.properties.id]}
              icon={L.divIcon({
                className: "custom-label",
                html: `<div class="pixel-label ${
                  activeId === f.properties.id ? "active" : ""
                }">${f.properties.name}</div>`,
              })}
              interactive={false}
            />
          ))}
      </MapContainer>
    </div>
  );
}
