// src/types/region.ts
import { RegionGeometry } from "./geojson";

export interface RegionApiProperties {
  OBJECTID: number;
  Name: string;
  mahalle_ID: number;
  tdad_qtaat: number;
  mean_area: number;
  dic_cntr_c: number;
  Q_mindly: number;
  Q_streets: number;
  mean_tbqe: number;
  mean_vahd: number;
  mean_qdmt: number;
  bayr: number;
  nosaz: number;
  in_build: number;
  sum_parcel: number;
  trakom_s: number;
  shib: number;
  Shape_Leng: number;
  Shape_Length: number;
  Shape_Area: number;
}

export interface RegionApiItem {
  id: number;
  object_id: number;
  geometry: RegionGeometry;
  properties: RegionApiProperties;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface RegionResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RegionApiItem[];
}

export interface RegionFeatureProperties {
  id: number;              // id از API
  name: string;            // Name
  mahalleId: number;       // mahalle_ID
  parcelsCount: number;    // tdad_qtaat
  shapeArea: number;       // Shape_Area (مترمربع)
}

export interface RegionFeature {
  type: "Feature";
  geometry: RegionGeometry;
  properties: RegionFeatureProperties;
}

export interface RegionGeoJSON {
  type: "FeatureCollection";
  features: RegionFeature[];
}
