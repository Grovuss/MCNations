import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

export function PrimaryButton({
  to,
  href,
  children,
  className = "",
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-sm bg-bronze-500 px-6 py-3 text-sm font-semibold tracking-wide text-ink-950 transition-colors hover:bg-bronze-400 ${className}`;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to ?? "/"} className={cls}>
      {children}
    </Link>
  );
}

export function SecondaryButton({
  to,
  href,
  children,
  className = "",
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-sm border border-parchment-300/30 px-6 py-3 text-sm font-semibold tracking-wide text-parchment-100 transition-colors hover:border-parchment-100/70 hover:bg-white/5 ${className}`;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to ?? "/"} className={cls}>
      {children}
    </Link>
  );
}

export function CopyField({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API unavailable; the value is still visible to copy manually.
    }
  };

  return (
    <div className="inline-flex items-stretch overflow-hidden rounded-sm border border-ink-600 bg-ink-900">
      {label && (
        <span className="hidden sm:flex items-center border-r border-ink-600 px-3 text-xs uppercase tracking-widest text-parchment-300/70">
          {label}
        </span>
      )}
      <span className="flex items-center px-4 py-2.5 font-display text-sm sm:text-base text-parchment-100">
        {value}
      </span>
      <button
        type="button"
        onClick={copy}
        className="flex items-center gap-1.5 border-l border-ink-600 px-3 text-xs font-medium text-bronze-400 hover:bg-white/5 transition-colors"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
