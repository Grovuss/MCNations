import { useEffect, useState } from "react";
import { site } from "../config/site";

type Status = { online: boolean; players: { online: number; max: number } };

/**
 * Displays live player count once `site.statusApiUrl` is configured to
 * point at a status endpoint returning { online, players: { online, max } }.
 * Until then, it shows an honest "not connected" state rather than a
 * fabricated number — swap in a real endpoint (e.g. a small proxy in
 * front of the server's query protocol, or mcsrvstat.us) when ready.
 */
export default function ServerStatus() {
  const [status, setStatus] = useState<Status | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!site.statusApiUrl) return;
    let cancelled = false;
    fetch(site.statusApiUrl)
      .then((res) => res.json())
      .then((data: Status) => {
        if (!cancelled) setStatus(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const connected = Boolean(site.statusApiUrl);

  return (
    <div className="inline-flex items-center gap-2.5 rounded-sm border border-ink-600 bg-ink-900/80 px-4 py-2.5">
      <span
        className={`h-2 w-2 rounded-full ${
          connected && status?.online
            ? "bg-emerald-400"
            : connected && failed
            ? "bg-red-400"
            : "bg-parchment-300/40"
        }`}
      />
      {connected ? (
        status ? (
          <span className="text-sm text-parchment-200">
            {status.online ? (
              <>
                <span className="text-parchment-100 font-medium">{status.players.online}</span> /{" "}
                {status.players.max} online
              </>
            ) : (
              "Server offline"
            )}
          </span>
        ) : (
          <span className="text-sm text-parchment-300/70">Checking status…</span>
        )
      ) : (
        <span className="text-sm text-parchment-300/70">Live status coming soon</span>
      )}
    </div>
  );
}
