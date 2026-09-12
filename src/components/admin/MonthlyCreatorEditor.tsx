import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

interface MonthlyCreator {
  enabled: boolean;
  name: string;
  blurb: string;
  link: string;
}

const empty: MonthlyCreator = { enabled: false, name: "", blurb: "", link: "" };

const inputClass =
  "w-full rounded-sm border border-ink-600 bg-ink-900 px-3 py-2.5 text-parchment-100 outline-none focus:border-bronze-500";

export default function MonthlyCreatorEditor() {
  const [data, setData] = useState<MonthlyCreator>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db!, "config", "home"));
        const stored = snap.exists() ? (snap.data().monthlyCreator as Partial<MonthlyCreator> | undefined) : undefined;
        if (stored) setData({ ...empty, ...stored });
      } catch {
        setError("Could not load the current Monthly Creator setting.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      await setDoc(doc(db!, "config", "home"), { monthlyCreator: data }, { merge: true });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Could not save. Check the Firestore rules described in the README.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-parchment-300">Loading…</p>;

  return (
    <div>
      <h2 className="text-2xl">Monthly Creator</h2>
      <p className="mt-1 text-sm text-parchment-300/70">
        Shown on the homepage when enabled. Turn it off to hide the section entirely.
      </p>

      <label className="mt-6 inline-flex items-center gap-2.5">
        <input
          type="checkbox"
          checked={data.enabled}
          onChange={(e) => setData({ ...data, enabled: e.target.checked })}
          className="h-4 w-4 accent-bronze-500"
        />
        <span className="text-sm text-parchment-200">Show on homepage</span>
      </label>

      <div className="mt-5 grid max-w-md gap-4">
        <div>
          <label className="mb-1.5 block text-sm text-parchment-300">Name</label>
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-parchment-300">Short blurb</label>
          <textarea
            value={data.blurb}
            onChange={(e) => setData({ ...data, blurb: e.target.value })}
            rows={3}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-parchment-300">Link (channel, profile, etc.)</label>
          <input
            value={data.link}
            onChange={(e) => setData({ ...data, link: e.target.value })}
            placeholder="https://..."
            className={inputClass}
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <button
        onClick={save}
        disabled={saving}
        className="mt-6 rounded-sm bg-bronze-500 px-5 py-2.5 text-sm font-semibold tracking-wide text-ink-950 transition-colors hover:bg-bronze-400 disabled:opacity-60"
      >
        {saving ? "Saving…" : saved ? "Saved" : "Save"}
      </button>
    </div>
  );
}
