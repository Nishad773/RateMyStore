import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { currentUser } from "@/lib/auth";

export default function OwnerDashboard() {
  const me = currentUser();
  const [data, setData] = useState<{ stores: any[] } | null>(null);

  const load = async () => {
    const res = await api.get("/owner/stats", { params: { ownerId: me?.id } });
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Stores</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {data?.stores.map((s) => (
          <div
            key={s.id}
            className="rounded-xl border p-4 transition-transform hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{s.name}</h3>
                <p className="text-sm text-muted-foreground">{s.address}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {Number(s.avgRating || 0).toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {s.ratings.length} ratings
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {s.ratings.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  No ratings yet.
                </div>
              )}
              {s.ratings.map((r: any) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between rounded-lg border px-3 py-2"
                >
                  <div className="text-sm text-muted-foreground">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-sm font-medium">{r.value} / 5</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {!data?.stores?.length && (
          <p className="text-muted-foreground">No stores yet.</p>
        )}
      </div>
    </div>
  );
}
