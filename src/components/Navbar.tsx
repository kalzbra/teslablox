"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/data/nav";
import { accent } from "@/lib/accents";
import LightningBolt from "@/components/decorative/LightningBolt";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b-4 border-spark-400 bg-white/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6"
      >
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2 font-heading text-xl font-bold text-ink-700"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-electric-500 shadow-card">
            <LightningBolt className="wiggle h-6 w-6 text-spark-300" />
          </span>
          Tesla<span className="text-electric-600">Blox</span>
        </Link>

        {/* All nine items only fit on one line on wide screens — below that, the menu button. */}
        <ul className="hidden items-center gap-1 xl:flex">
          {navItems.map((item, i) => {
            const a = accent(i);
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[0.85rem] font-semibold transition-colors ${
                    active ? `${a.solid} shadow-card` : `text-ink-700 ${a.hover}`
                  }`}
                >
                  <span aria-hidden="true" className="wiggle inline-block">
                    {item.emoji}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-electric-500 px-4 py-2 font-heading font-semibold text-white shadow-card xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            )}
          </svg>
          <span aria-hidden="true">Menu</span>
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="grid grid-cols-2 gap-2 border-t border-ink-700/5 px-4 pb-4 pt-3 sm:grid-cols-3 xl:hidden"
        >
          {navItems.map((item, i) => {
            const a = accent(i);
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-3 font-heading text-base font-semibold ${
                    active ? `${a.solid} shadow-card` : `${a.soft} ${a.text}`
                  }`}
                >
                  <span aria-hidden="true" className="text-xl">
                    {item.emoji}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
