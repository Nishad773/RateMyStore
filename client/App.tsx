import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import { clearSession, getRole } from "./lib/api";

const queryClient = new QueryClient();

function Protected({
  role,
  children,
}: {
  role?: string;
  children: React.ReactNode;
}) {
  const r = getRole();
  const loc = useLocation();
  if (!r) return <Navigate to="/login" replace state={{ from: loc }} />;
  if (role && r !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function Layout({ children }: { children: React.ReactNode }) {
  const role = getRole();
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_0%,#000_40%,transparent_70%)]">
        <div className="absolute -top-20 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/30 via-fuchsia-500/20 to-emerald-500/20 blur-3xl" />
      </div>
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <motion.span
              whileHover={{ rotate: 10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block h-6 w-6 rounded bg-gradient-to-br from-primary via-fuchsia-500 to-emerald-500 shadow-sm"
            />
            RateMyStore
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            {role === "user" && (
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            )}
            {role === "owner" && (
              <Link to="/owner" className="hover:underline">
                Owner
              </Link>
            )}
            {role === "admin" && (
              <Link to="/admin" className="hover:underline">
                Admin
              </Link>
            )}
            {!role && (
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            )}
            {!role && (
              <Link
                to="/signup"
                className="rounded bg-primary px-3 py-1.5 text-primary-foreground"
              >
                Sign up
              </Link>
            )}
            {role && (
              <button
                onClick={() => {
                  clearSession();
                  location.assign("/");
                }}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>
      <main className="container py-8">{children}</main>
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} RateMyStore
      </footer>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <Protected>
                  <UserDashboard />
                </Protected>
              }
            />
            <Route
              path="/owner"
              element={
                <Protected role="owner">
                  <OwnerDashboard />
                </Protected>
              }
            />
            <Route
              path="/admin"
              element={
                <Protected role="admin">
                  <AdminDashboard />
                </Protected>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
