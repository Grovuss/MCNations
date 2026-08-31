import PageTitle from "../components/PageTitle";

interface RuleSection {
  title: string;
  note?: string;
  rules: string[];
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
      "Play within the intended systems and mechanics of the server.",
      "No actions intended to deliberately damage the server or its infrastructure.",
    ],
  },
  {
    title: "Nations & Conflict",
    note: "Nation and war-specific rules are still being finalized and will be added here.",
    rules: ["Nations are expected to follow the same general and gameplay rules as individual players."],
  },
  {
    title: "Exploits & Cheating",
    rules: [
      "No cheating, hacked clients, exploits, or unauthorized modifications.",
      "Do not abuse bugs or unintended mechanics.",
    ],
  },
  {
    title: "Staff Enforcement",
    rules: [
      "Rule violations may result in punishments at staff discretion, ranging from warnings to temporary or permanent removal, depending on severity and context.",
    ],
  },
];

export default function Rules() {
  return (
    <>
      <PageTitle title="Rules" description="MCNations server rules, organized by category." />

      <section>
        <div className="container-page py-16 sm:py-20">
          <h1 className="text-4xl sm:text-5xl">Rules</h1>
          <p className="mt-4 max-w-xl text-parchment-300 leading-relaxed">
            Organized by category so you can find what applies to you.
          </p>

          <div className="mt-12 divide-y divide-ink-800 border-y border-ink-800">
            {sections.map((section) => (
              <details key={section.title} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4">
                  <span className="text-lg font-display text-parchment-100">{section.title}</span>
                  <ChevronIcon className="h-4 w-4 shrink-0 text-parchment-300 transition-transform group-open:rotate-180" />
                </summary>
                <div className="pb-6">
                  {section.note && (
                    <p className="mb-3 text-sm italic text-parchment-300/70">{section.note}</p>
                  )}
                  <ul className="flex flex-col gap-2.5">
                    {section.rules.map((rule) => (
                      <li key={rule} className="flex gap-3 text-parchment-200 leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-500/70" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.8}>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
