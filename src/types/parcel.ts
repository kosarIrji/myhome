// types/parcel.ts

export interface ParcelProperties {
  OBJECTID: number;
  landuse_name: string;
  activity_id: string;
  Landuse_id: number;
  tdad_tbqe: number;
  tdad_vahed: number;
  qdmt: number;
  nama: number;
  pelak: string;
  shoa_tasir: number;
  tdad_nbsh: number;
  mabar_id: string;
  mahalle_ID: number;
  malkiat: number;
  Func_Scale: number;
  noe_lu: number;
  neshane: number;
  blok_ID: number;
  jht_qte: number;
  aqb_nshini: number;
  id_parcel: number;
  bar_qte: number;
  Shape_Length: number;
  Shape_Area: number;
}

export interface Geometry {
  type: "Polygon" | "MultiPolygon";
  coordinates: any[]; // چون API Polygon[1][N][2] می‌دهد
}

export interface ParcelFeature {
  id: number;
  object_id: number;
  geometry: Geometry;

  landuse_type: number;
  landuse_type_name: string;
  floor_count: number | null;
  area: number;
  perimeter: number;
  longitude: number;
  latitude: number;
  created_at: string;
  updated_at: string;

  properties: ParcelProperties;

  tdad_tbqe: number;
  activity_label: string;
  activity_id_debug: Record<string, any>;
  activity_scale: number | null;

  /** برای سازگاری با react-leaflet */
  type: "Feature";
}

export interface ParcelGeoJSON {
  type: "FeatureCollection";
  features: ParcelFeature[];
}

export interface ParcelResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ParcelFeature[];
}
