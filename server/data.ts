import { z } from "zod";

export type Role = "admin" | "user" | "owner";
export interface User { id: string; name: string; email: string; password: string; role: Role; storeId?: string }
export interface Store { id: string; name: string; address: string; ownerId: string }
export interface Rating { id: string; userId: string; storeId: string; value: number; createdAt: number }

export const validators = {
  name: z.string().min(20).max(60),
  address: z.string().max(400),
  password: z
    .string()
    .min(8)
    .max(16)
    .regex(/[A-Z]/, "Must include uppercase letter")
    .regex(/[!@#$%^&*(),.?\":{}|<>]/, "Must include special character"),
  email: z.string().email(),
  rating: z.number().min(1).max(5),
};

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export const db = {
  users: [] as User[],
  stores: [] as Store[],
  ratings: [] as Rating[],
};

// seed admin and some data
const admin: User = {
  id: uid("usr"),
  name: "Administrator Account Seed",
  email: "admin@example.com",
  password: "Admin#1234",
  role: "admin",
};

const owner: User = {
  id: uid("usr"),
  name: "Sample Store Owner Person",
  email: "owner@example.com",
  password: "Owner#1234",
  role: "owner",
};

const user: User = {
  id: uid("usr"),
  name: "Regular Sample User Name",
  email: "user@example.com",
  password: "User#1234",
  role: "user",
};

db.users.push(admin, owner, user);

const store1: Store = { id: uid("str"), name: "Aurora Coffee Roasters", address: "123 Bean Blvd, Brew City", ownerId: owner.id };
const store2: Store = { id: uid("str"), name: "Luna Bookstore & Cafe", address: "456 Story Ave, Readtown", ownerId: owner.id };

db.stores.push(store1, store2);

export function tokenFor(u: User) {
  // simple unsigned token for demo purposes only
  const payload = { id: u.id, role: u.role, email: u.email, name: u.name };
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

export function parseToken(token?: string) {
  if (!token) return null;
  try {
    const json = Buffer.from(token, "base64url").toString("utf8");
    return JSON.parse(json) as { id: string; role: Role; email: string; name: string };
  } catch {
    return null;
  }
}

export function averageRating(storeId: string) {
  const r = db.ratings.filter((x) => x.storeId === storeId);
  if (r.length === 0) return 0;
  return r.reduce((a, b) => a + b.value, 0) / r.length;
}

export function upsertRating(userId: string, storeId: string, value: number) {
  const existing = db.ratings.find((r) => r.userId === userId && r.storeId === storeId);
  if (existing) {
    existing.value = value;
    existing.createdAt = Date.now();
    return existing;
  }
  const rating: Rating = { id: uid("rat"), userId, storeId, value, createdAt: Date.now() };
  db.ratings.push(rating);
  return rating;
}
