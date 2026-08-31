import PageTitle from "../components/PageTitle";
import logoMark from "../assets/logo-mark.png";

export default function AboutUs() {
  return (
    <>
      <PageTitle title="About Us" description="What MCNations is, and what it's built around." />

      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-16 top-10 h-80 w-80 opacity-[0.05]"
          style={{
            backgroundImage: `url(${logoMark})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden="true"
        />
        <div className="container-page relative py-16 sm:py-24">
          <h1 className="text-4xl sm:text-5xl">About MCNations</h1>

          <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-parchment-200">
            <p>
              MCNations is a community-driven Minecraft server centered around player-created
              nations, diplomacy, conflict, building, and the stories that emerge from them.
            </p>
            <p>
              Our goal is to create a world where players have room to organize, compete,
              cooperate, and leave a lasting mark on the server.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
