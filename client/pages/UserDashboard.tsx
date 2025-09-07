import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import StoreCard from "@/components/StoreCard";
import { Input } from "@/components/ui/input";
import { currentUser } from "@/lib/auth";

interface StoreItem { id: string; name: string; address: string; avgRating?: number; ratingsCount?: number }

export default function UserDashboard() {
  const me = currentUser();
  const [q, setQ] = useState("");
  const [stores, setStores] = useState<StoreItem[]>([]);

  const load = async () => {
    const res = await api.get("/stores", { params: { q } });
    setStores(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-bold">Browse Stores</h1>
        <div className="flex items-center gap-2">
          <Input placeholder="Search stores" value={q} onChange={(e) => setQ(e.target.value)} />
          <button onClick={load} className="h-10 rounded-md bg-primary px-4 text-primary-foreground">Search</button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stores.map((s) => (
          <StoreCard key={s.id} {...s} canRate userId={me?.id} />
        ))}
        {stores.length === 0 && <p className="text-muted-foreground">No stores found.</p>}
      </div>
    </div>
  );
}
