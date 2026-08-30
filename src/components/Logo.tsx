import logoMark from "../assets/logo-mark.png";

interface LogoProps {
  className?: string;
  markOnly?: boolean;
}

/**
 * Renders the MCNations crest mark alongside a typeset wordmark.
 * We use the mark-only PNG plus real text (rather than the combined
 * logo-with-text PNG) so the wordmark stays crisp at any size and
 * matches the site's typeface.
 */
export default function Logo({ className = "", markOnly = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={logoMark}
        alt="MCNations crest"
        className="h-8 w-8 sm:h-9 sm:w-9 shrink-0"
        style={{ filter: "drop-shadow(0 0 0 transparent)" }}
      />
      {!markOnly && (
        <span className="font-display text-[1.05rem] sm:text-lg tracking-wide text-parchment-100 leading-none">
          MCNATIONS
        </span>
      )}
    </span>
  );
}
