import PageTitle from "../components/PageTitle";
import { SecondaryButton } from "../components/ui";
import { site } from "../config/site";

export default function MapPage() {
  return (
    <>
      <PageTitle title="Map" description="Explore the MCNations world map and see how the server's nations are taking shape." />

      <section className="border-b border-ink-700">
        <div className="container-page py-16 sm:py-20">
          <p className="text-sm font-medium text-steel-400">The world</p>
          <h1 className="mt-2 text-4xl sm:text-5xl">MCNations World Map</h1>
          <p className="mt-4 max-w-xl text-parchment-300 leading-relaxed">
            Explore the world, discover nations, and see how the server is taking shape.
          </p>

          {site.mapUrl && (
            <div className="mt-8">
              <SecondaryButton href={site.mapUrl}>Open Full Map</SecondaryButton>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container-page py-16 sm:py-20">
          {site.mapUrl && site.mapEmbeddable ? (
            <div className="overflow-hidden rounded-sm border border-ink-700">
              <iframe
                title="MCNations live map"
                src={site.mapUrl}
                className="h-[70vh] w-full"
                loading="lazy"
              />
            </div>
          ) : (
            <MapPlaceholder />
          )}
        </div>
      </section>
    </>
  );
}

function MapPlaceholder() {
  return (
    <div className="relative overflow-hidden rounded-sm border border-ink-700 bg-ink-900/60">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <svg viewBox="0 0 400 260" className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="400" height="260" fill="url(#grid)" className="text-parchment-100" />
        </svg>
      </div>

      <div className="relative flex flex-col items-center justify-center gap-3 px-6 py-24 text-center sm:py-32">
        <CompassIcon className="h-10 w-10 text-bronze-400" />
        <h2 className="mt-2 text-2xl">The live map isn't connected yet</h2>
        <p className="max-w-md text-sm leading-relaxed text-parchment-300">
          Once MCNations' BlueMap or Dynmap instance is live, it will be embedded directly on this
          page — or linked here if it's hosted separately.
        </p>
      </div>
    </div>
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
