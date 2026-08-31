import PageTitle from "../components/PageTitle";
import { donationTiers } from "../config/site";

export default function Donate() {
  return (
    <>
      <PageTitle title="Donate" description="Support MCNations. Donations are optional and provide no gameplay advantage." />

      <section>
        <div className="container-page py-16 sm:py-20">
          <h1 className="text-4xl sm:text-5xl">Support MCNations</h1>

          <p className="mt-6 max-w-2xl text-lg text-parchment-200 leading-relaxed">
            MCNations is free to play. Donations are completely optional and help support server
            hosting, infrastructure, development, and other operating costs.
          </p>

          <p className="mt-10 font-display text-2xl sm:text-3xl text-bronze-400">
            Donations do not provide gameplay advantages.
          </p>

          <p className="mt-4 max-w-2xl text-parchment-300 leading-relaxed">
            Supporters receive only a recognition rank in-game and a corresponding role in the
            MCNations Discord. These ranks do not provide items, money, commands, land, special
            abilities, priority access, or other gameplay benefits.
          </p>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {donationTiers.map((tier) => (
              <div
                key={tier.name}
                className="flex flex-col rounded-sm border border-ink-700 bg-ink-900/60 p-6 sm:p-7"
              >
                <h2 className="font-display text-lg text-parchment-100">{tier.name}</h2>
                <p className="mt-1 font-display text-2xl text-bronze-400">{tier.price}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-parchment-300">{tier.blurb}</p>
                <a
                  href={tier.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-sm bg-bronze-500 px-5 py-2.5 text-sm font-semibold tracking-wide text-ink-950 transition-colors hover:bg-bronze-400"
                >
                  Support MCN
                </a>
              </div>
            ))}
          </div>

          <p className="mt-12 text-sm text-parchment-300/70">
            Donations are optional and are intended to support the continued operation of
            MCNations.
          </p>
        </div>
      </section>
    </>
  );
}
