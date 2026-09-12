import { useEffect, useState } from "react";

interface MonthlyCreator {
  enabled: boolean;
  name: string;
  blurb: string;
  link: string;
}

/** Loosely-typed shape of a Firestore REST API document response —
 * just enough to read the couple of fields this section needs. */
interface FirestoreValue {
  stringValue?: string;
  booleanValue?: boolean;
  mapValue?: { fields?: Record<string, FirestoreValue> };
}

/** Reads config/home directly from the Firestore REST API (plain fetch,
 * no SDK) and shows the Monthly Creator section only when one is set and
 * enabled. Using REST instead of the firebase/firestore SDK here means
 * regular visitors never download any Firebase code at all — only the
 * /admin dashboard does, since it needs auth and writes. This read only
 * works if Firestore rules allow public read access to config/home (see
 * README).
 *
 * Fails silently (renders nothing) if Firebase isn't configured, the doc
 * doesn't exist yet, or the request fails — a missing Monthly Creator
 * should never break the homepage. */
export default function MonthlyCreatorSection() {
  const [creator, setCreator] = useState<MonthlyCreator | null>(null);

  useEffect(() => {
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined;
    if (!projectId) return;

    let cancelled = false;
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/config/home`;

    fetch(url)
      .then((res) => (res.ok ? res.json() : null))
      .then((json: { fields?: Record<string, FirestoreValue> } | null) => {
        if (cancelled || !json) return;
        const fields = json.fields?.monthlyCreator?.mapValue?.fields;
        if (!fields) return;
        const data: MonthlyCreator = {
          enabled: fields.enabled?.booleanValue === true,
          name: fields.name?.stringValue ?? "",
          blurb: fields.blurb?.stringValue ?? "",
          link: fields.link?.stringValue ?? "",
        };
        if (data.enabled && data.name) setCreator(data);
      })
      .catch(() => {
        // Intentionally silent — see comment above.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!creator) return null;

  return (
    <section className="border-b border-ink-700">
      <div className="container-page py-16 sm:py-20">
        <h2 className="text-3xl">Monthly Creator</h2>
        <p className="mt-2 font-display text-xl text-bronze-400">{creator.name}</p>
        {creator.blurb && (
          <p className="mt-3 max-w-xl text-parchment-300 leading-relaxed">{creator.blurb}</p>
        )}
        {creator.link && (
          <a
            href={creator.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex text-sm font-medium text-bronze-400 hover:text-bronze-300"
          >
            Check them out →
          </a>
        )}
      </div>
    </section>
  );
}
