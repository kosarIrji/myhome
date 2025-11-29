"use client";

import React, { useMemo, useState, useEffect } from "react";
import { MapContainer, GeoJSON, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { RegionGeoJSON, RegionFeature } from "@/types/region";

/* --------------------- مرکز هندسی دقیق Polygon --------------------- */
function getPolygonCenter(coords: any[]): [number, number] {
  let area = 0,
    x = 0,
    y = 0;

  for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
    const p1 = coords[i];
    const p2 = coords[j];
    const f = p1[0] * p2[1] - p2[0] * p1[1];
    x += (p1[0] + p2[0]) * f;
    y += (p1[1] + p2[1]) * f;
    area += f;
  }
  area *= 0.5;
  const factor = area * 6;
  return [y / factor, x / factor];
}

/* --------------------- Label Glow Pixel Perfect --------------------- */
const createLabelIcon = (text: string, active: boolean, hover: boolean) =>
  L.divIcon({
    html: `
      <span class="pixel-label" style="
        opacity:${active ? 1 : hover ? 0.85 : 0.65};
      ">
        ${text}
      </span>
    `,
    className: "",
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

const isPolygon = (g: any) =>
  g?.type === "Polygon" && Array.isArray(g.coordinates);
const isMultiPolygon = (g: any) =>
  g?.type === "MultiPolygon" && Array.isArray(g.coordinates);

interface Props {
  regions: RegionGeoJSON;
  activeId?: number | null;
  clickableIds: number[];
  onRegionClick?: (f: RegionFeature) => void;
  onRegionHover?: (f: RegionFeature | null) => void;
}

export default function RegionMap({
  regions,
  activeId,
  clickableIds,
  onRegionClick,
  onRegionHover,
}: Props) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // تشخیص موبایل
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };

    handleResize(); // بار اول
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const features = useMemo(
    () =>
      regions.features.filter(
        (f: any) =>
          f.properties?.id &&
          (isPolygon(f.geometry) || isMultiPolygon(f.geometry))
      ) as RegionFeature[],
    [regions]
  );

  return (
    <div className="relative w-full h-full">
      {/* Vignette تاریک مثل تصویر */}
      <div className="map-vignette" />
      {/* Spotlight روی مرکز نقشه / محله‌ها */}
      <div className="map-spotlight" />

      <MapContainer
        center={[37.4725, 57.3368]}
        zoom={15}
        minZoom={13}
        maxZoom={18}
        zoomControl={false}
        style={{
          width: "100%",
          height: "100%",
          background: "#0D2238",
        }}
      >
        {/* ✅ پس‌زمینه واقعی نقشه با خیابان‌ها – MapTiler Dark */}
        <TileLayer
          url="https://api.maptiler.com/maps/streets-v2-dark/{z}/{x}/{y}.png?key=qmGbbfFqFSdRLXVGkBUW"
          attribution="<a href='https://www.maptiler.com/copyright/' target='_blank' rel='noreferrer'>&copy; MapTiler</a>"
        />

        {/* محلات با هایلایت نئونی آبی */}
        <GeoJSON
          data={features as any}
          style={(feature: any) => {
            const id = feature.properties.id;
            const isClickable = clickableIds.includes(id);
            const hovered = hoveredId === id;
            const active = activeId === id;

            if (!isClickable) {
              return {
                color: "rgba(255,255,255,0.18)",
                weight: 1,
                fillColor: "rgba(255,255,255,0.05)",
                fillOpacity: 0.3,
              };
            }

            return {
              color: "rgba(255,255,255,0.95)",
              weight: active ? 7 : hovered ? 5 : 2.2,
              fillColor: active
                ? "rgba(255, 223, 0, 0.45)" // زرد نئونی
                : hovered
                ? "rgba(255, 223, 0, 0.32)"
                : "rgba(255, 223, 0, 0.18)",
            };
          }}
          onEachFeature={(feature: any, layer: any) => {
            const id = feature.properties.id;
            const isClickable = clickableIds.includes(id);

            layer.on("mouseover", () => {
              if (!isClickable) return;
              setHoveredId(id);
              onRegionHover?.(feature);
            });

            layer.on("mouseout", () => {
              if (!isClickable) return;
              setHoveredId(null);
              onRegionHover?.(null);
            });

            layer.on("click", () => {
              if (!isClickable) return;
              onRegionClick?.(feature);
            });

            if (isClickable)
              layer.on("add", () => {
                const el = layer.getElement?.();
                if (el) el.style.cursor = "pointer";
              });
          }}
        />

        {/* لیبل‌های وسط محله با Glow – فقط روی دسکتاپ */}
        {!isMobile &&
          features.map((f) => {
            let coords: any[] = [];

            if (isPolygon(f.geometry)) coords = f.geometry.coordinates[0];
            if (isMultiPolygon(f.geometry)) coords = f.geometry.coordinates[0][0];

            if (!coords.length) return null;

            const [lat, lng] = getPolygonCenter(coords);

            return (
              <Marker
                key={f.properties.id}
                position={[lat, lng]}
                icon={createLabelIcon(
                  f.properties.name,
                  activeId === f.properties.id,
                  hoveredId === f.properties.id
                )}
                interactive={false}
              />
            );
          })}
      </MapContainer>
    </div>
  );
}
