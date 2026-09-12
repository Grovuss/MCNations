import { useEffect, useState, type FormEvent } from "react";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

interface Referral {
  slug: string;
  creatorName: string;
  discordLink: string;
  uniqueCount: number;
}

function slugify(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const inputClass =
  "w-full rounded-sm border border-ink-600 bg-ink-900 px-3 py-2.5 text-parchment-100 outline-none focus:border-bronze-500";

export default function ReferralManager() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [slugOverride, setSlugOverride] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db!, "referrals"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setReferrals(
          snap.docs.map((d) => {
            const data = d.data() as Omit<Referral, "slug">;
            return { slug: d.id, ...data };
          }),
        );
      },
      () => setError("Could not load referral links. Check the Firestore rules described in the README."),
    );
    return unsubscribe;
  }, []);

  const create = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const slug = slugify(slugOverride || name);
    if (!slug) {
      setError("Enter a creator name.");
      return;
    }
    if (!link.trim()) {
      setError("Enter a Discord link.");
      return;
    }
    setCreating(true);
    try {
      await setDoc(doc(db!, "referrals", slug), {
        creatorName: name.trim(),
        discordLink: link.trim(),
        uniqueCount: 0,
        createdAt: serverTimestamp(),
      });
      setName("");
      setLink("");
      setSlugOverride("");
    } catch {
      setError("Could not create the referral link.");
    } finally {
      setCreating(false);
    }
  };

  const remove = async (slug: string) => {
    if (!confirm(`Delete the referral link for "${slug}"? This can't be undone.`)) return;
    await deleteDoc(doc(db!, "referrals", slug));
  };

  const copy = async (slug: string) => {
    try {
      await navigator.clipboard.writeText(`https://mcnations.online/c/${slug}`);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 1600);
    } catch {
      // Clipboard unavailable — the link is still visible to copy manually.
    }
  };

  return (
    <div>
      <h2 className="text-2xl">Referral Links</h2>
      <p className="mt-1 text-sm text-parchment-300/70">
        Each link posts a notification to Discord and redirects the visitor to the creator's
        invite.
      </p>

      <form onSubmit={create} className="mt-6 grid max-w-md gap-4">
        <div>
          <label className="mb-1.5 block text-sm text-parchment-300">Creator name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-parchment-300">Discord link (redirect target)</label>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://discord.gg/..."
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-parchment-300">URL slug (optional)</label>
          <input
            value={slugOverride}
            onChange={(e) => setSlugOverride(e.target.value)}
            placeholder={name ? slugify(name) : "auto-generated from name"}
            className={inputClass}
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={creating}
          className="w-fit rounded-sm bg-bronze-500 px-5 py-2.5 text-sm font-semibold tracking-wide text-ink-950 transition-colors hover:bg-bronze-400 disabled:opacity-60"
        >
          {creating ? "Creating…" : "Create referral link"}
        </button>
      </form>

      <div className="mt-10 divide-y divide-ink-800 border-y border-ink-800">
        {referrals.length === 0 && (
          <p className="py-6 text-sm text-parchment-300/70">No referral links yet.</p>
        )}
        {referrals.map((r) => (
          <div key={r.slug} className="flex flex-wrap items-center justify-between gap-4 py-4">
            <div className="min-w-0">
              <p className="font-display text-parchment-100">{r.creatorName || r.slug}</p>
              <p className="text-sm text-bronze-400">mcnations.online/c/{r.slug}</p>
              <p className="mt-0.5 truncate text-xs text-parchment-300/60">→ {r.discordLink}</p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <span className="text-sm text-parchment-200">{r.uniqueCount ?? 0} unique</span>
              <button
                onClick={() => copy(r.slug)}
                className="text-sm text-parchment-300 hover:text-parchment-100"
              >
                {copiedSlug === r.slug ? "Copied" : "Copy"}
              </button>
              <button onClick={() => remove(r.slug)} className="text-sm text-red-400 hover:text-red-300">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
