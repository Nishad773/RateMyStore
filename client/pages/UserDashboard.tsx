import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import StoreCard from "@/components/StoreCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { currentUser } from "@/lib/auth";

interface StoreItem {
  id: string;
  name: string;
  address: string;
  avgRating?: number;
  ratingsCount?: number;
}

export default function UserDashboard() {
  const me = currentUser();
  const [q, setQ] = useState("");
  const [stores, setStores] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/stores", { params: { q } });
      setStores(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-bold">Browse Stores</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search stores"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Button onClick={load} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border p-5">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-56" />
                </div>
                <div className="text-right">
                  <Skeleton className="h-6 w-10" />
                </div>
              </div>
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        {!loading &&
          stores.map((s) => (
            <StoreCard key={s.id} {...s} canRate userId={me?.id} />
          ))}
        {!loading && stores.length === 0 && (
          <p className="text-muted-foreground">No stores found.</p>
        )}
      </div>
    </div>
  );
}
