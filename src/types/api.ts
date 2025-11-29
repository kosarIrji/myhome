// types/api.ts
import { RegionFeature } from "./region";
import { ParcelFeature } from "./parcel";

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type RegionResponse = PaginatedResponse<RegionFeature>;
export type ParcelResponse = PaginatedResponse<ParcelFeature>;
