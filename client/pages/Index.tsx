import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="grid gap-10 lg:grid-cols-2 items-center">
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Live demo challenge
        </span>
        <h1 className="text-4xl/tight font-extrabold tracking-tight sm:text-5xl">
          Rate stores with role‑based dashboards
        </h1>
        <p className="text-muted-foreground text-lg">
          Minimal, modern React + Tailwind app with Axios, auth, and sortable tables. Admin, User, and Owner experiences included.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/signup" className="rounded-md bg-primary px-5 py-2.5 text-primary-foreground font-medium">Get started</Link>
          <Link to="/login" className="rounded-md border px-5 py-2.5">Sign in</Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 text-sm">
          <li className="rounded-lg border p-4"><b>Admin</b> • Stats + users/stores tables</li>
          <li className="rounded-lg border p-4"><b>User</b> • Search, rate, and update ratings</li>
          <li className="rounded-lg border p-4"><b>Owner</b> • View store averages and ratings</li>
          <li className="rounded-lg border p-4">Validations • Name, address, password, email</li>
        </ul>
        <div className="text-xs text-muted-foreground">
          Seed accounts: admin@example.com / Admin#1234 • owner@example.com / Owner#1234 • user@example.com / User#1234
        </div>
      </div>
      <div className="relative hidden lg:block">
        <div className="absolute -inset-12 -z-10 bg-gradient-to-br from-primary/20 via-fuchsia-500/10 to-transparent blur-3xl" />
        <div className="rounded-2xl border bg-card p-6 shadow-xl">
          <div className="mb-4 text-sm text-muted-foreground">Preview</div>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <div className="font-semibold">Aurora Coffee Roasters</div>
                <div className="text-xs text-muted-foreground">123 Bean Blvd, Brew City</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">4.6</div>
                <div className="text-xs text-muted-foreground">128 ratings</div>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <div className="font-semibold">Luna Bookstore & Cafe</div>
                <div className="text-xs text-muted-foreground">456 Story Ave, Readtown</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">4.2</div>
                <div className="text-xs text-muted-foreground">87 ratings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
