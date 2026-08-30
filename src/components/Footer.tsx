import { Link } from "react-router-dom";
import Logo from "./Logo";
import { DiscordIcon } from "./Navbar";
import { site } from "../config/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/map", label: "Map" },
  { to: "/rules", label: "Rules" },
  { to: "/how-to-join", label: "How to Join" },
  { to: "/about", label: "About Us" },
  { to: "/donate", label: "Donate" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink-900">
      <div className="container-page py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo />
            <p className="mt-3 font-display text-sm tracking-wide text-bronze-400">
              {site.serverAddressJava}
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 sm:flex sm:gap-8" aria-label="Footer">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm text-parchment-300 hover:text-parchment-100 transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={site.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-parchment-300 hover:text-parchment-100 transition-colors"
            >
              <DiscordIcon className="h-3.5 w-3.5" />
              Discord
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-ink-800 pt-6 text-xs text-parchment-300/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MCNations. Not affiliated with Mojang or Microsoft.</p>
          <p>Built for players who build nations.</p>
        </div>
      </div>
    </footer>
  );
}
