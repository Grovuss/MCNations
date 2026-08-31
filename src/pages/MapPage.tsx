import PageTitle from "../components/PageTitle";
import { PrimaryButton } from "../components/ui";
import { site } from "../config/site";

export default function MapPage() {
  return (
    <>
      <PageTitle title="Map" description="Explore the MCNations world and see how nations are shaping the map." />

      <section>
        <div className="container-page py-16 sm:py-20">
          <h1 className="text-4xl sm:text-5xl">World Map</h1>
          <p className="mt-4 max-w-xl text-parchment-300 leading-relaxed">
            Explore the MCNations world and see how nations are shaping the map.
          </p>

          <div className="mt-8">
            <PrimaryButton href={site.mapUrl}>Open Live Map</PrimaryButton>
          </div>

          <div className="relative mt-14 overflow-hidden rounded-sm border border-ink-700 bg-ink-900/60">
            <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
              <svg viewBox="0 0 400 220" className="h-full w-full" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="400" height="220" fill="url(#grid)" className="text-parchment-100" />
              </svg>
            </div>
            <div className="relative flex flex-col items-center justify-center gap-3 px-6 py-20 text-center sm:py-28">
              <CompassIcon className="h-9 w-9 text-bronze-400" />
              <p className="text-sm text-parchment-300">Opens in a new tab</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.3}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-2 6-4 2 2-6 4-2Z" strokeLinejoin="round" />
    </svg>
  );
}
