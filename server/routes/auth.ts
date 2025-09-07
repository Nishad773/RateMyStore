import { RequestHandler } from "express";
import { db, validators, tokenFor } from "../data";

export const signup: RequestHandler = (req, res) => {
  const { name, email, password, role, storeName, storeAddress } = req.body as any;

  const nameRes = validators.name.safeParse(name);
  const emailRes = validators.email.safeParse(email);
  const passRes = validators.password.safeParse(password);
  if (!nameRes.success || !emailRes.success || !passRes.success) {
    return res.status(400).json({ error: "Invalid input" });
  }
  if (db.users.some((u) => u.email === email)) {
    return res.status(409).json({ error: "Email already registered" });
  }
  const id = `usr_${Math.random().toString(36).slice(2, 10)}`;
  const user = { id, name, email, password, role: (role === "owner" ? "owner" : "user") as const };
  db.users.push(user);

  if (user.role === "owner" && storeName) {
    const addrValid = validators.address.safeParse(storeAddress ?? "");
    if (!addrValid.success) return res.status(400).json({ error: "Invalid store address" });
    const storeId = `str_${Math.random().toString(36).slice(2, 10)}`;
    db.stores.push({ id: storeId, name: storeName, address: storeAddress, ownerId: user.id });
  }

  const token = tokenFor(user);
  res.json({ token, role: user.role, name: user.name, email: user.email });
};

export const login: RequestHandler = (req, res) => {
  const { email, password } = req.body as any;
  const emailRes = validators.email.safeParse(email);
  if (!emailRes.success || typeof password !== "string") {
    return res.status(400).json({ error: "Invalid input" });
  }
  const user = db.users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const token = tokenFor(user);
  res.json({ token, role: user.role, name: user.name, email: user.email });
};

export const me: RequestHandler = (req, res) => {
  const auth = req.headers.authorization || "";
  const token = auth.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const payload = JSON.parse(Buffer.from(token, "base64url").toString("utf8"));
    res.json(payload);
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
};
