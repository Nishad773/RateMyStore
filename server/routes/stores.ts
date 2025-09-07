import { RequestHandler } from "express";
import { db, validators, upsertRating, averageRating } from "../data";

export const listStores: RequestHandler = (req, res) => {
  const q = (req.query.q as string | undefined)?.toLowerCase() ?? "";
  const stores = db.stores
    .filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q),
    )
    .map((s) => ({
      ...s,
      avgRating: averageRating(s.id),
      ratingsCount: db.ratings.filter((r) => r.storeId === s.id).length,
    }));
  res.json(stores);
};

export const rateStore: RequestHandler = (req, res) => {
  const { storeId } = req.params as { storeId: string };
  const { value, userId } = req.body as any;
  const ratingRes = validators.rating.safeParse(Number(value));
  if (!ratingRes.success)
    return res.status(400).json({ error: "Invalid rating" });
  const store = db.stores.find((s) => s.id === storeId);
  if (!store) return res.status(404).json({ error: "Store not found" });
  const rating = upsertRating(userId, storeId, ratingRes.data);
  res.json({ rating, avg: averageRating(storeId) });
};

export const ownerStats: RequestHandler = (req, res) => {
  const ownerId = req.query.ownerId as string;
  const stores = db.stores
    .filter((s) => s.ownerId === ownerId)
    .map((s) => ({
      ...s,
      avgRating: averageRating(s.id),
      ratings: db.ratings.filter((r) => r.storeId === s.id),
    }));
  res.json({ stores });
};
