import PageTitle from "../components/PageTitle";
import Logo from "../components/Logo";
import ServerStatus from "../components/ServerStatus";
import { PrimaryButton, SecondaryButton, SectionHeading, CopyField } from "../components/ui";
import { site } from "../config/site";
import logoMark from "../assets/logo-mark.png";

const features = [
  {
    title: "Java + Bedrock crossplay",
    body: "One server, both editions. Play alongside friends regardless of which version of Minecraft they own.",
    icon: IconCrossplay,
  },
  {
    title: "Parity-focused gameplay",
    body: "Mechanics are kept even between editions, so no version has an unfair advantage over the other.",
    icon: IconScales,
  },
  {
    title: "Nations and geopolitics",
    body: "Found a nation, draw your borders, forge alliances, and contest territory with the rest of the map.",
    icon: IconBanner,
  },
  {
    title: "Enhanced world generation",
    body: "Terrain built to give nations real land worth settling, defending, and expanding into.",
    icon: IconTerrain,
  },
  {
    title: "Anti-cheat",
    body: "Active anti-cheat protection keeps fights, builds, and economies fair for everyone.",
    icon: IconShield,
  },
  {
    title: "Custom server features",
    body: "Systems built specifically for MCNations, tuned around nations, diplomacy, and long-term play.",
    icon: IconGear,
  },
];

export default function Home() {
  return (
    <>
      <PageTitle
        title="Home"
        description="MCNations is a Minecraft nations server — build civilizations, forge alliances, and compete for territory. Java + Bedrock crossplay."
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-700">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[32rem] w-[32rem] opacity-[0.05] sm:opacity-[0.07]"
          style={{
            backgroundImage: `url(${logoMark})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden="true"
        />
        <div className="container-page relative py-20 sm:py-28">
          <div className="flex flex-col items-start text-left sm:max-w-2xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-sm border border-bronze-500/30 bg-bronze-500/[0.06] px-3 py-1 text-xs tracking-wide text-bronze-400">
              Now accepting new nations
            </span>

            <h1 className="text-5xl sm:text-6xl leading-[1.05]">MCNATIONS</h1>
            <p className="mt-4 text-lg sm:text-xl text-parchment-200 max-w-lg">
              {site.tagline}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CopyField value={site.serverAddressJava} label="Server" />
              <ServerStatus />
            </div>

            <div className="mt-8 flex flex-col gap-3 xs:flex-row sm:flex-row">
              <PrimaryButton to="/how-to-join">How to Join</PrimaryButton>
              <SecondaryButton href={site.discordUrl}>Join the Discord</SecondaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="border-b border-ink-700 bg-ink-900/40">
        <div className="container-page py-16 sm:py-20">
          <div className="grid gap-10 sm:grid-cols-[auto_1fr] sm:items-start">
            <Logo markOnly className="sm:mt-1" />
            <div className="max-w-2xl">
              <p className="text-xl sm:text-2xl leading-relaxed text-parchment-100 font-display">
                MCNations is a Minecraft nations server focused on building civilizations, forming
                alliances, competing for territory, and creating your own history.
              </p>
              <p className="mt-4 text-parchment-300 leading-relaxed">
                Whether you're founding a new nation or joining an established one, the map is
                shaped by the players on it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-ink-700">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            kicker="On the server"
            title="What you're joining"
            lede="A short rundown of what's actually running on MCNations right now."
          />

          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="bg-ink-950 p-6 sm:p-7">
                <f.icon className="h-6 w-6 text-bronze-400" />
                <h3 className="mt-4 text-base font-display text-parchment-100">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-parchment-300">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="container-page py-20 sm:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl">Ready to build your nation?</h2>
          <p className="mt-3 text-parchment-300">
            Drop into {site.serverAddressJava} and start writing your history.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryButton to="/how-to-join">How to Join</PrimaryButton>
            <SecondaryButton href={site.discordUrl}>Discord</SecondaryButton>
          </div>
        </div>
      </section>
    </>
  );
}

function IconCrossplay({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <rect x="2.5" y="6" width="8" height="12" rx="1.2" />
      <rect x="13.5" y="4" width="8" height="16" rx="1.2" />
      <path d="M10.5 12h3" strokeLinecap="round" />
    </svg>
  );
}
function IconScales({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path d="M12 3v18M6 7h12M4 7l-2 5a3 3 0 0 0 6 0L6 7Zm14 0l-2 5a3 3 0 0 0 6 0l-2-5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconBanner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path d="M6 3v18l6-4 6 4V3H6Z" strokeLinejoin="round" />
    </svg>
  );
}
function IconTerrain({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path d="M2 18l5-8 4 5 3-4 8 7H2Z" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
function IconShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconGear({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" strokeLinecap="round" />
    </svg>
  );
}
