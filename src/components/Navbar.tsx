import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { site } from "../config/site";

type NavItem =
  | { kind: "internal"; label: string; to: string }
  | { kind: "external"; label: string; href: string };

const links: NavItem[] = [
  { kind: "internal", to: "/", label: "Home" },
  { kind: "external", href: site.mapUrl, label: "Map" },
  { kind: "internal", to: "/rules", label: "Rules" },
  { kind: "internal", to: "/how-to-join", label: "How to Join" },
  { kind: "internal", to: "/about", label: "About Us" },
  { kind: "internal", to: "/donate", label: "Donate" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-1 text-[0.93rem] transition-colors ${
      isActive ? "text-parchment-100" : "text-parchment-300 hover:text-parchment-100"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "bg-ink-950/90 border-ink-700 backdrop-blur"
          : "bg-ink-950/60 border-transparent backdrop-blur-sm"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <NavLink to="/" className="shrink-0" aria-label="MCNations home">
          <Logo />
        </NavLink>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {links.map((l) =>
            l.kind === "external" ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative py-1 text-[0.93rem] text-parchment-300 transition-colors hover:text-parchment-100"
              >
                <span className="group inline-block">
                  {l.label}
                  <span className="block h-px mt-1 w-0 bg-bronze-400 transition-all group-hover:w-full" />
                </span>
              </a>
            ) : (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>
                {({ isActive }) => (
                  <span className="group inline-block">
                    {l.label}
                    <span
                      className={`block h-px mt-1 bg-bronze-400 transition-all ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </span>
                )}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-sm border border-steel-500/60 bg-steel-500/10 px-4 py-2 text-sm font-medium text-parchment-100 transition-colors hover:bg-steel-500/20 hover:border-steel-400"
          >
            <DiscordIcon className="h-4 w-4" />
            Discord
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-sm border border-ink-600 text-parchment-100"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink-700 bg-ink-950">
          <nav className="container-page flex flex-col py-3" aria-label="Mobile">
            {links.map((l) =>
              l.kind === "external" ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="py-3 border-b border-ink-800 text-[0.95rem] text-parchment-200"
                >
                  {l.label}
                </a>
              ) : (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `py-3 border-b border-ink-800 last:border-b-0 text-[0.95rem] ${
                      isActive ? "text-bronze-400" : "text-parchment-200"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ),
            )}
            <a
              href={site.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-sm border border-steel-500/60 bg-steel-500/10 px-4 py-2.5 text-sm font-medium text-parchment-100"
            >
              <DiscordIcon className="h-4 w-4" />
              Join the Discord
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.8}>
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.8}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
export function DiscordIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.369A19.79 19.79 0 0 0 15.885 3c-.211.375-.444.876-.608 1.276a18.27 18.27 0 0 0-5.552 0A12.64 12.64 0 0 0 9.115 3 19.74 19.74 0 0 0 4.68 4.372C1.867 8.548 1.098 12.62 1.482 16.635a19.9 19.9 0 0 0 6.041 3.049c.487-.657.92-1.354 1.293-2.087a12.9 12.9 0 0 1-2.037-.973c.171-.124.338-.253.5-.386 3.93 1.803 8.191 1.803 12.074 0 .164.133.331.262.5.386-.649.389-1.336.71-2.04.974.375.732.807 1.43 1.294 2.086a19.84 19.84 0 0 0 6.045-3.05c.457-4.658-.762-8.694-3.185-12.265ZM8.62 14.21c-1.183 0-2.15-1.086-2.15-2.418 0-1.333.949-2.42 2.15-2.42 1.21 0 2.174 1.096 2.15 2.42 0 1.332-.947 2.418-2.15 2.418Zm7.11 0c-1.183 0-2.148-1.086-2.148-2.418 0-1.333.947-2.42 2.148-2.42 1.212 0 2.175 1.096 2.15 2.42 0 1.332-.938 2.418-2.15 2.418Z" />
    </svg>
  );
}
