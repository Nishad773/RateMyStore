import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Store, Star } from "lucide-react";
import { Marquee } from "@/components/fx/Marquee";

export default function Index() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(60%_60%_at_50%_0%,#000_40%,transparent_70%)]">
          <div className="absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/30 via-fuchsia-500/20 to-emerald-500/20 blur-3xl" />
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Live demo
              challenge
            </span>
            <h1 className="text-balance text-5xl font-extrabold tracking-tight sm:text-6xl">
              <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                Discover, rate, and compare local stores
              </span>
            </h1>
            <p className="max-w-prose text-muted-foreground">
              Clean, performant, and accessible. Role‑based dashboards for
              admins, owners, and users with a focus on delightful
              micro‑interactions.
            </p>
            <div className="flex flex-wrap gap-3">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/signup"
                  className="rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground shadow-md hover:shadow-lg"
                >
                  Get started
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/login" className="rounded-md border px-5 py-2.5">
                  Sign in
                </Link>
              </motion.div>
            </div>
            <div className="text-xs text-muted-foreground">
              Seed accounts: admin@example.com / Admin#1234 • owner@example.com
              / Owner#1234 • user@example.com / User#1234
            </div>
          </motion.div>

          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <div className="absolute -inset-12 -z-10 bg-gradient-to-br from-primary/20 via-fuchsia-500/10 to-transparent blur-3xl" />
            <div className="rounded-2xl border bg-card p-6 shadow-xl">
              <div className="mb-4 text-sm text-muted-foreground">Preview</div>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl border p-4 transition-transform hover:-translate-y-0.5">
                  <div>
                    <div className="font-semibold">Aurora Coffee Roasters</div>
                    <div className="text-xs text-muted-foreground">
                      123 Bean Blvd, Brew City
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">4.6</div>
                    <div className="text-xs text-muted-foreground">
                      128 ratings
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl border p-4 transition-transform hover:-translate-y-0.5">
                  <div>
                    <div className="font-semibold">Luna Bookstore & Cafe</div>
                    <div className="text-xs text-muted-foreground">
                      456 Story Ave, Readtown
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">4.2</div>
                    <div className="text-xs text-muted-foreground">
                      87 ratings
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee strip */}
      <section className="relative">
        <div className="rounded-xl border bg-card p-2">
          <Marquee
            items={[
              "Rate • Review • Discover",
              "Admin • Owner • User",
              "Fast • Accessible • Beautiful",
            ]}
            className="text-sm"
            speed={22}
          />
        </div>
      </section>

      {/* Roles overview (sticky layout) */}
      <section className="grid gap-8 lg:grid-cols-3">
        <div className="lg:sticky lg:top-24">
          <h2 className="text-2xl font-bold">Three focused dashboards</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Inspired by expressive, architectural layouts—kept practical and
            robust. Subtle motion, strong typography, and clear hierarchy.
          </p>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <Link to="/login" aria-label="Admin login" className="block group">
            <motion.div
              className="rounded-xl border p-5 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform group-hover:-translate-y-0.5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" /> Admin
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-sm">Stats overview</div>
                  <div className="text-xs text-muted-foreground">
                    Users, stores, and ratings
                  </div>
                </div>
                <div>
                  <div className="text-sm">Powerful tables</div>
                  <div className="text-xs text-muted-foreground">
                    Sortable, filterable data
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>

          <Link to="/login" aria-label="Owner login" className="block group">
            <motion.div
              className="rounded-xl border p-5 transition-transform group-hover:-translate-y-0.5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                <Store className="h-4 w-4" /> Owner
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-sm">Your stores at a glance</div>
                  <div className="text-xs text-muted-foreground">
                    Averages and rating history
                  </div>
                </div>
                <div>
                  <div className="text-sm">Trends</div>
                  <div className="text-xs text-muted-foreground">
                    Spot peaks and dips quickly
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>

          <Link to="/login" aria-label="User login" className="block group">
            <motion.div
              className="rounded-xl border p-5 transition-transform group-hover:-translate-y-0.5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                <Star className="h-4 w-4" /> User
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-sm">Search & rate</div>
                  <div className="text-xs text-muted-foreground">
                    Simple star ratings with updates
                  </div>
                </div>
                <div>
                  <div className="text-sm">Clean results</div>
                  <div className="text-xs text-muted-foreground">
                    Fast filtering and clear cards
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>
    </div>
  );
}
