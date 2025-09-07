export type Role = "admin" | "user" | "owner";

export interface UserSafe {
  id: string;
  name: string;
  email: string;
  role: Role;
  storeId?: string;
}

export interface StoreSummary {
  id: string;
  name: string;
  address: string;
  ownerId: string;
  avgRating?: number;
  ratingsCount?: number;
}

export interface RatingDTO {
  id: string;
  userId: string;
  storeId: string;
  value: number;
  createdAt: number;
}

export interface AuthResponse {
  token: string;
  role: Role;
  name: string;
  email: string;
}

export interface AdminStats {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
}

export interface OwnerStats {
  stores: Array<StoreSummary & { ratings: RatingDTO[] }>;
}

export interface DemoResponse {
  message: string;
}
