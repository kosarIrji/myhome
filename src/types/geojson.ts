// src/types/geojson.ts
export type Position = [number, number];

export interface PolygonGeometry {
  type: "Polygon";
  coordinates: Position[][];
}

export interface MultiPolygonGeometry {
  type: "MultiPolygon";
  coordinates: Position[][][];
}

export type RegionGeometry = PolygonGeometry | MultiPolygonGeometry;
