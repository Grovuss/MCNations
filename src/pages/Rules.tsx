import PageTitle from "../components/PageTitle";

type Rule = string;
interface RuleSection {
  title: string;
  note?: string;
  rules: Rule[];
}

const sections: RuleSection[] = [
  {
    title: "General",
    rules: [
      "Respect other players.",
      "No harassment, hate speech, or intentionally disruptive behavior.",
      "Follow staff instructions.",
    ],
  },
  {
    title: "Gameplay",
    rules: [
      "No cheating, hacked clients, exploits, or unauthorized modifications.",
      "Do not abuse bugs or unintended mechanics.",
      "No actions intended to deliberately damage the server or its infrastructure.",
    ],
  },
  {
    title: "Nations",
    note: "Placeholder — MCNations' full nation and war rules will be published here.",
    rules: [
      "Nations are expected to follow the same general and gameplay rules as individual players.",
      "Specific rules covering diplomacy, warfare, and territory will be added here.",
    ],
  },
];

export default function Rules() {
  return (
    <>
      <PageTitle title="Rules" description="MCNations server rules, organized by category." />

      <section className="border-b border-ink-700">
        <div className="container-page py-16 sm:py-20">
          <p className="text-sm font-medium text-steel-400">Read before you play</p>
          <h1 className="mt-2 text-4xl sm:text-5xl">Rules</h1>
          <p className="mt-4 max-w-xl text-parchment-300 leading-relaxed">
            Organized by category so you can find what applies to you without wading through a wall
            of text.
          </p>
        </div>
      </section>

      <section>
        <div className="container-page py-16 sm:py-20">
          <div className="flex flex-col gap-12">
            {sections.map((section) => (
              <div key={section.title} className="grid gap-6 sm:grid-cols-[14rem_1fr]">
                <div>
                  <h2 className="text-2xl">{section.title}</h2>
                  {section.note && (
                    <p className="mt-2 text-sm italic text-parchment-300/70">{section.note}</p>
                  )}
                </div>
                <ul className="flex flex-col divide-y divide-ink-800 border-t border-ink-800 sm:border-t-0">
                  {section.rules.map((rule) => (
                    <li key={rule} className="flex gap-3 py-3.5 text-parchment-200 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-500/70" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="grid gap-6 sm:grid-cols-[14rem_1fr] border-t border-ink-700 pt-12">
              <h2 className="text-2xl">Punishments</h2>
              <p className="max-w-xl text-parchment-200 leading-relaxed">
                Rule violations may result in punishments at staff discretion, ranging from warnings
                to temporary or permanent removal from the server, depending on severity and context.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
