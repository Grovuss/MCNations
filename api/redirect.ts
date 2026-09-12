import type { VercelRequest, VercelResponse } from "@vercel/node";
import { initializeApp, cert, getApps, type App } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import crypto from "node:crypto";

// Fallback if a slug isn't found, or anything goes wrong — never leave a
// visitor stuck on a broken page. Keep this in sync with site.discordUrl
// in src/config/site.ts (this file lives outside the Vite app, so it
// can't import that directly).
const FALLBACK_DISCORD_URL = "https://discord.gg/2Ph5Bd7Dqc";

// Known link-preview / crawler bots. When Discord, Slack, etc. unfurl a
// shared /c/<slug> link, they issue a real GET request to it — without
// this check, every time someone *pastes* a referral link (not just
// clicks it) would count as a visit and fire the webhook.
const BOT_USER_AGENT = /bot|crawl|spider|facebookexternalhit|discordbot|slackbot|twitterbot|telegrambot|whatsapp|linkedinbot|embedly|preview/i;

let app: App | null = null;

function getApp(): App | null {
  if (app) return app;
  if (getApps().length) {
    app = getApps()[0]!;
    return app;
  }
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) return null;
  app = initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const slugParam = req.query.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  const redirect = (url: string) => {
    res.setHeader("Cache-Control", "no-store");
    res.writeHead(302, { Location: url });
    res.end();
  };

  if (!slug) return redirect(FALLBACK_DISCORD_URL);

  const fbApp = getApp();
  if (!fbApp) {
    // Firebase Admin credentials aren't configured yet — fail safe by
    // still sending the visitor somewhere useful.
    console.error("redirect: Firebase Admin not configured (missing FIREBASE_* env vars)");
    return redirect(FALLBACK_DISCORD_URL);
  }

  try {
    const db = getFirestore(fbApp);
    const ref = db.collection("referrals").doc(slug);
    const snap = await ref.get();

    if (!snap.exists) return redirect(FALLBACK_DISCORD_URL);

    const data = snap.data() as { creatorName?: string; discordLink?: string; uniqueCount?: number };
    const destination = data.discordLink || FALLBACK_DISCORD_URL;
    const userAgent = (req.headers["user-agent"] as string) || "";
    const isBot = BOT_USER_AGENT.test(userAgent);

    if (isBot) {
      // Still send bots/crawlers on their way (so link previews work),
      // just don't count the hit or notify Discord for it.
      return redirect(destination);
    }

    const forwardedFor = (req.headers["x-forwarded-for"] as string) || "";
    const ip = forwardedFor.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
    const salt = process.env.REFERRAL_SALT || "";
    const ipHash = crypto.createHash("sha256").update(ip + salt).digest("hex");

    const hitRef = ref.collection("hits").doc(ipHash);
    let uniqueCount = data.uniqueCount || 0;

    await db.runTransaction(async (tx) => {
      const [hitSnap, refSnap] = await Promise.all([tx.get(hitRef), tx.get(ref)]);
      const current = (refSnap.data()?.uniqueCount as number | undefined) ?? 0;
      if (!hitSnap.exists) {
        tx.set(hitRef, { firstSeen: FieldValue.serverTimestamp() });
        tx.update(ref, { uniqueCount: current + 1 });
        uniqueCount = current + 1;
      } else {
        uniqueCount = current;
      }
    });

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `**${data.creatorName || slug}**\nTotal unique referral count: **${uniqueCount}**`,
          }),
        });
      } catch (err) {
        // Don't let a webhook failure block the redirect.
        console.error("redirect: Discord webhook failed", err);
      }
    }

    return redirect(destination);
  } catch (err) {
    console.error("redirect: unexpected error", err);
    return redirect(FALLBACK_DISCORD_URL);
  }
}
