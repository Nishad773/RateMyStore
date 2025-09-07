import { RequestHandler } from "express";
import { db, averageRating } from "../data";

export const adminStats: RequestHandler = (_req, res) => {
  const totalUsers = db.users.length;
  const totalStores = db.stores.length;
  const totalRatings = db.ratings.length;
  res.json({ totalUsers, totalStores, totalRatings });
};

export const listUsers: RequestHandler = (req, res) => {
  const q = (req.query.q as string | undefined)?.toLowerCase() ?? "";
  const sort = (req.query.sort as string | undefined) ?? "name";
  const users = db.users
    .filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    )
    .sort((a: any, b: any) => (a[sort] > b[sort] ? 1 : -1));
  res.json(users.map(({ password, ...u }) => u));
};

export const listStoresAdmin: RequestHandler = (req, res) => {
  const q = (req.query.q as string | undefined)?.toLowerCase() ?? "";
  const sort = (req.query.sort as string | undefined) ?? "name";
  const stores = db.stores
    .filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q),
    )
    .map((s) => ({ ...s, avgRating: averageRating(s.id) }))
    .sort((a: any, b: any) => (a[sort] > b[sort] ? 1 : -1));
  res.json(stores);
};
