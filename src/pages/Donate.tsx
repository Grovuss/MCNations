import PageTitle from "../components/PageTitle";

const tiers = [
  { name: "Supporter", note: "Entry-level supporter rank" },
  { name: "Contributor", note: "Mid-tier supporter rank" },
  { name: "Patron", note: "Top-tier supporter rank" },
];

const noAdvantages = [
  "Items",
  "Money",
  "Land",
  "Commands",
  "Gameplay advantages",
  "Special abilities",
  "Priority gameplay benefits",
  "Other in-game advantages",
];

export default function Donate() {
  return (
    <>
      <PageTitle title="Donate" description="Support MCNations. Donations are completely optional and provide no gameplay advantage." />

      <section className="border-b border-ink-700">
        <div className="container-page py-16 sm:py-20">
          <p className="text-sm font-medium text-steel-400">Optional</p>
          <h1 className="mt-2 text-4xl sm:text-5xl">Support MCNations</h1>
          <p className="mt-6 max-w-2xl text-lg text-parchment-200 leading-relaxed">
            MCNations is supported by players who choose to contribute toward the continued
            operation and development of the server.
          </p>
        </div>
      </section>

      <section className="border-b border-ink-700 bg-ink-900/40">
        <div className="container-page py-12 sm:py-14">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="border-l-2 border-bronze-500 pl-5">
              <p className="text-lg text-parchment-100 leading-relaxed">
                Donations are completely optional. You do not need to donate to play MCNations.
              </p>
            </div>
            <div className="border-l-2 border-bronze-500 pl-5">
              <p className="text-lg text-parchment-100 leading-relaxed">
                Donations do <span className="text-bronze-400">not</span> provide gameplay
                advantages or perks on the server.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink-700">
        <div className="container-page py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-parchment-200 leading-relaxed">
              You can play MCNations, join a nation, participate in wars, build, explore, and enjoy
              the server without spending any money.
            </p>
            <p className="mt-4 text-parchment-200 leading-relaxed">
              If you choose to donate, you're helping support the costs of running and developing
              MCNations — things like server hosting, infrastructure, and ongoing development. In
              recognition of your support, you receive a supporter rank in-game and in the
              MCNations Discord.
            </p>
            <p className="mt-4 font-display text-parchment-100">
              Supporter ranks do not provide gameplay perks or advantages.
            </p>
          </div>

          <div className="mt-10 rounded-sm border border-ink-700 bg-ink-900/60 p-6 sm:p-8">
            <h2 className="text-sm font-medium text-steel-400">
              A supporter rank never includes any of the following
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
              {noAdvantages.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-parchment-300">
                  <span className="text-parchment-300/50">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-16 sm:py-20">
          <h2 className="text-2xl">Supporter ranks</h2>
          <p className="mt-2 max-w-xl text-sm text-parchment-300">
            Placeholder tiers — names, pricing, and payment options will be added here once they're
            finalized.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="flex flex-col rounded-sm border border-dashed border-ink-600 p-6"
              >
                <h3 className="font-display text-lg text-parchment-100">{tier.name}</h3>
                <p className="mt-1 text-xs text-parchment-300/70">{tier.note}</p>
                <div className="mt-5 flex-1 rounded-sm border border-ink-700 bg-ink-900/60 p-4 text-xs text-parchment-300/60">
                  Price and benefits to be configured.
                </div>
                <button
                  type="button"
                  disabled
                  className="mt-4 w-full cursor-not-allowed rounded-sm border border-ink-600 py-2.5 text-xs font-medium text-parchment-300/50"
                >
                  Not yet available
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
