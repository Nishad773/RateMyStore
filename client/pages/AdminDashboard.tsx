import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Table from "@/components/Table";

interface Stats { totalUsers: number; totalStores: number; totalRatings: number }

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

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border p-4"><div className="text-sm text-muted-foreground">Users</div><div className="text-2xl font-bold">{stats?.totalUsers ?? 0}</div></div>
        <div className="rounded-xl border p-4"><div className="text-sm text-muted-foreground">Stores</div><div className="text-2xl font-bold">{stats?.totalStores ?? 0}</div></div>
        <div className="rounded-xl border p-4"><div className="text-sm text-muted-foreground">Ratings</div><div className="text-2xl font-bold">{stats?.totalRatings ?? 0}</div></div>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Users</h2>
        <Table data={users} columns={[{ key: "name", header: "Name" }, { key: "email", header: "Email" }, { key: "role", header: "Role" }]} />
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Stores</h2>
        <Table data={stores} columns={[{ key: "name", header: "Name" }, { key: "address", header: "Address" }, { key: "avgRating", header: "Avg" }]} />
      </section>
    </div>
  );
}
