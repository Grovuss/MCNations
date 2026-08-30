import PageTitle from "../components/PageTitle";

const pillars = [
  { title: "Player-created nations", body: "Every nation on the map was founded by players, not scripted in." },
  { title: "Community", body: "A shared world only works because people show up and take part in it." },
  { title: "Diplomacy", body: "Alliances, treaties, and rivalries that come from real players negotiating with each other." },
  { title: "Competition", body: "Territory and influence are earned, not handed out." },
  { title: "Building", body: "Nations need capitals, borders, and infrastructure — building is central, not incidental." },
  { title: "Emergent stories", body: "The best moments on MCNations aren't scripted. They come out of what players actually do." },
];

export default function AboutUs() {
  return (
    <>
      <PageTitle title="About Us" description="What MCNations is, and what it's built around." />

      <section className="border-b border-ink-700">
        <div className="container-page py-16 sm:py-20">
          <p className="text-sm font-medium text-steel-400">The project</p>
          <h1 className="mt-2 text-4xl sm:text-5xl">About MCNations</h1>
          <p className="mt-6 max-w-2xl text-lg text-parchment-200 leading-relaxed">
            MCNations is a Minecraft nations server, built to give players a place to found
            civilizations, negotiate with each other, and fight over what they've built. It's
            community-driven — the map is shaped by whoever's playing on it.
          </p>
        </div>
      </section>

      <section className="border-b border-ink-700">
        <div className="container-page py-16 sm:py-20">
          <h2 className="text-2xl">What it's centered around</h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="bg-ink-950 p-6">
                <h3 className="font-display text-parchment-100">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-parchment-300">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-16 sm:py-20">
          <div className="rounded-sm border border-dashed border-ink-600 p-8 sm:p-10">
            <h2 className="text-xl text-parchment-100">The team behind MCNations</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-parchment-300">
              This section is reserved for information about the people running and building
              MCNations — to be added as the team is ready to share it.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
