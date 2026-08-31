import PageTitle from "../components/PageTitle";
import { CopyField, SecondaryButton } from "../components/ui";
import { site } from "../config/site";

export default function HowToJoin() {
  return (
    <>
      <PageTitle title="How to Join" description="How to connect to MCNations on Java Edition or Bedrock Edition." />

      <section>
        <div className="container-page py-16 sm:py-20">
          <h1 className="text-4xl sm:text-5xl">Join MCNations</h1>

          <div className="mt-14 grid gap-12 sm:grid-cols-2">
            <div>
              <h2 className="text-2xl">Java Edition</h2>
              <p className="mt-3 text-sm text-parchment-300/70">Server Address</p>
              <div className="mt-2">
                <CopyField value={site.serverAddressJava} />
              </div>
              <ol className="mt-6 flex flex-col gap-2.5 text-sm leading-relaxed text-parchment-200">
                <li>1. Open Minecraft Java Edition.</li>
                <li>2. Select Multiplayer.</li>
                <li>3. Click Add Server.</li>
                <li>
                  4. Enter <span className="text-bronze-400">{site.serverAddressJava}</span>.
                </li>
                <li>5. Join.</li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl">Bedrock Edition</h2>
              <p className="mt-3 text-sm text-parchment-300/70">Server Address</p>
              <div className="mt-2">
                <CopyField value={site.serverAddressBedrock} />
              </div>
              <p className="mt-4 text-sm text-parchment-300/70">Port</p>
              <div className="mt-2">
                <CopyField value={site.bedrockPort} />
              </div>
              <ol className="mt-6 flex flex-col gap-2.5 text-sm leading-relaxed text-parchment-200">
                <li>1. Open Minecraft and go to the Servers tab.</li>
                <li>2. Select Add Server.</li>
                <li>3. Enter the address and port above.</li>
                <li>4. Join.</li>
              </ol>
            </div>
          </div>

          <div className="mt-14 inline-flex items-center gap-2 rounded-sm border border-steel-500/40 bg-steel-500/[0.08] px-4 py-2.5 text-sm text-steel-400">
            Java and Bedrock players play together on the same server.
          </div>

          <div className="mt-10">
            <SecondaryButton href={site.discordUrl}>Discord</SecondaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
