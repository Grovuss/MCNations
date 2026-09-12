import PageTitle from "../components/PageTitle";
import Logo from "../components/Logo";
import MonthlyCreatorSection from "../components/MonthlyCreatorSection";
import { PrimaryButton, SecondaryButton, CopyField } from "../components/ui";
import { site } from "../config/site";
import logoMark from "../assets/logo-mark.png";

const features = [
  {
    title: "Nations",
    body: "Build, organize, and lead your own nation.",
  },
  {
    title: "Java + Bedrock",
    body: "Players from both editions play together, with parity-focused crossplay.",
  },
  {
    title: "A Better World",
    body: "Enhanced world generation built for long-term survival and civilization building.",
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
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] opacity-[0.05]"
          style={{
            backgroundImage: `url(${logoMark})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden="true"
        />
        <div className="container-page relative py-20 sm:py-28">
          <div className="flex flex-col items-start text-left sm:max-w-xl">
            <Logo className="mb-8" />

            <h1 className="text-4xl sm:text-5xl leading-[1.1]">{site.headline}</h1>
            <p className="mt-4 text-lg text-parchment-300 max-w-md">{site.tagline}</p>

            <div className="mt-8">
              <CopyField value={site.serverAddressJava} label="Server" />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton to="/how-to-join">How to Join</PrimaryButton>
              <SecondaryButton href={site.discordUrl}>Discord</SecondaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="border-b border-ink-700">
        <div className="container-page py-16 sm:py-20">
          <p className="max-w-2xl text-xl sm:text-2xl leading-relaxed text-parchment-100 font-display">
            MCNations is a Minecraft nations server where players build civilizations, form
            alliances, compete for territory, and create their own history.
          </p>
        </div>
      </section>

      {/* Monthly Creator (only renders if one is set and enabled) */}
      <MonthlyCreatorSection />

      {/* Features */}
      <section className="border-b border-ink-700">
        <div className="container-page py-16 sm:py-20">
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            {features.map((f) => (
              <div key={f.title}>
                <div className="h-0.5 w-8 bg-bronze-500" />
                <h2 className="mt-4 text-lg font-display text-parchment-100">{f.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-parchment-300">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container-page py-20 sm:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl">Ready to make your mark?</h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryButton to="/how-to-join">How to Join</PrimaryButton>
            <SecondaryButton href={site.discordUrl}>Discord</SecondaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
