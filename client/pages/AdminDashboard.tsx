import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Table from "@/components/Table";
import { Users, Store, Star } from "lucide-react";

interface Stats {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);

  const load = async () => {
    const s = await api.get("/admin/stats");
    setStats(s.data);
    const u = await api.get("/admin/users");
    setUsers(u.data);
    const st = await api.get("/admin/stores");
    setStores(st.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="relative overflow-hidden rounded-xl border p-4">
          <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 via-fuchsia-500/10 to-transparent blur-2xl" />
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Users</div>
              <div className="text-2xl font-bold">{stats?.totalUsers ?? 0}</div>
            </div>
            <div className="rounded-full border p-2 text-muted-foreground">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl border p-4">
          <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500/20 via-primary/10 to-transparent blur-2xl" />
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Stores</div>
              <div className="text-2xl font-bold">{stats?.totalStores ?? 0}</div>
            </div>
            <div className="rounded-full border p-2 text-muted-foreground">
              <Store className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl border p-4">
          <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-yellow-400/20 via-primary/10 to-transparent blur-2xl" />
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Ratings</div>
              <div className="text-2xl font-bold">{stats?.totalRatings ?? 0}</div>
            </div>
            <div className="rounded-full border p-2 text-muted-foreground">
              <Star className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Users</h2>
        <Table
          data={users}
          columns={[
            { key: "name", header: "Name" },
            { key: "email", header: "Email" },
            { key: "role", header: "Role" },
          ]}
        />
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Stores</h2>
        <Table
          data={stores}
          columns={[
            { key: "name", header: "Name" },
            { key: "address", header: "Address" },
            { key: "avgRating", header: "Avg" },
          ]}
        />
      </section>
    </div>
  );
}
