import { Link } from "react-router-dom";
import Logo from "./Logo";
import { DiscordIcon } from "./Navbar";
import { site } from "../config/site";

export default function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink-900">
      <div className="container-page py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo />
            <p className="mt-3 font-display text-sm tracking-wide text-bronze-400">
              {site.serverAddressJava}
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 sm:flex sm:gap-8" aria-label="Footer">
            <Link to="/" className="text-sm text-parchment-300 hover:text-parchment-100 transition-colors">
              Home
            </Link>
            <a
              href={site.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-parchment-300 hover:text-parchment-100 transition-colors"
            >
              Map
            </a>
            <Link to="/rules" className="text-sm text-parchment-300 hover:text-parchment-100 transition-colors">
              Rules
            </Link>
            <Link to="/how-to-join" className="text-sm text-parchment-300 hover:text-parchment-100 transition-colors">
              How to Join
            </Link>
            <Link to="/about" className="text-sm text-parchment-300 hover:text-parchment-100 transition-colors">
              About Us
            </Link>
            <Link to="/donate" className="text-sm text-parchment-300 hover:text-parchment-100 transition-colors">
              Donate
            </Link>
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

        <div className="mt-8 border-t border-ink-800 pt-5 text-xs text-parchment-300/70">
          <p>© {new Date().getFullYear()} MCNations. Not affiliated with Mojang or Microsoft.</p>
        </div>
      </div>
    </footer>
  );
}
