import PageTitle from "../components/PageTitle";
import { CopyField } from "../components/ui";
import { site } from "../config/site";

const steps = [
  "Join the server.",
  "Read the rules.",
  "Join the Discord.",
  "Find or create a nation.",
  "Start playing.",
];

export default function HowToJoin() {
  return (
    <>
      <PageTitle title="How to Join" description="How to connect to MCNations on Java Edition or Bedrock Edition." />

      <section className="border-b border-ink-700">
        <div className="container-page py-16 sm:py-20">
          <p className="text-sm font-medium text-steel-400">Get connected</p>
          <h1 className="mt-2 text-4xl sm:text-5xl">How to Join</h1>
          <p className="mt-4 max-w-xl text-parchment-300 leading-relaxed">
            MCNations supports Java and Bedrock Edition on the same server, so it doesn't matter
            which one you play on.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-sm border border-steel-500/40 bg-steel-500/[0.08] px-4 py-2 text-sm text-steel-400">
            Java + Bedrock Crossplay — everyone plays together
          </div>
        </div>
      </section>

      <section className="border-b border-ink-700">
        <div className="container-page my-16 sm:my-20">
          <div className="grid gap-px overflow-hidden rounded-sm border border-ink-700 bg-ink-700 sm:grid-cols-2">
          <div className="bg-ink-950 p-8 sm:p-10">
            <h2 className="text-2xl">Java Edition</h2>
            <p className="mt-2 text-sm text-parchment-300/70">Server Address</p>
            <div className="mt-3">
              <CopyField value={site.serverAddressJava} />
            </div>
            <ol className="mt-6 flex flex-col gap-3 text-sm leading-relaxed text-parchment-200">
              <li>1. Open Minecraft: Java Edition and go to Multiplayer.</li>
              <li>2. Select "Add Server."</li>
              <li>
                3. Enter <span className="text-parchment-100">MCNations</span> as the name and{" "}
                <span className="text-bronze-400">{site.serverAddressJava}</span> as the address.
              </li>
              <li>4. Save, then double-click the server to connect.</li>
            </ol>
          </div>

          <div className="bg-ink-950 p-8 sm:p-10">
            <h2 className="text-2xl">Bedrock Edition</h2>
            <p className="mt-2 text-sm text-parchment-300/70">Server Address</p>
            <div className="mt-3">
              <CopyField value={site.serverAddressBedrock} />
            </div>
            <p className="mt-3 text-sm text-parchment-300/70">Port</p>
            <div className="mt-3">
              <CopyField value={site.bedrockPort} />
            </div>
            <ol className="mt-6 flex flex-col gap-3 text-sm leading-relaxed text-parchment-200">
              <li>1. Open Minecraft and go to the Servers tab.</li>
              <li>2. Scroll down and select "Add Server."</li>
              <li>
                3. Enter <span className="text-parchment-100">MCNations</span> as the name, then set
                the address and port shown above.
              </li>
              <li>4. Save, then select the server to connect.</li>
            </ol>
          </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-16 sm:py-20">
          <h2 className="text-3xl">First steps</h2>
          <ol className="mt-8 flex flex-col divide-y divide-ink-800 border-y border-ink-800">
            {steps.map((step, i) => (
              <li key={step} className="flex items-center gap-5 py-4">
                <span className="font-display text-bronze-400 text-sm w-5 shrink-0">{i + 1}</span>
                <span className="text-parchment-200">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
