// One-time setup script: grants the `admin: true` custom claim to a
// Firebase Auth user, by email. Run this once after creating the admin
// user in the Firebase Console (Authentication → Users → Add user).
//
// Firestore security rules and the admin dashboard both check this
// claim, not just "is this user signed in" — so a user without it
// (which should never happen unless you create a second account)
// can't read or write anything in the admin dashboard.
//
// Usage:
//   node scripts/set-admin-claim.mjs admin@example.com
//
// Requires the same service account credentials used by the /api
// redirect function (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL,
// FIREBASE_PRIVATE_KEY). Put them in a local .env file (see .env.example)
// and this script will read them — it does NOT need to run on Vercel.

import { readFileSync, existsSync } from "node:fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

function loadDotEnv() {
  if (!existsSync(".env")) return;
  for (const line of readFileSync(".env", "utf8").split("\n")) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^"(.*)"$/, "$1");
    }
  }
}

loadDotEnv();

const email = process.argv[2];
if (!email) {
  console.error("Usage: node scripts/set-admin-claim.mjs <admin-email>");
  process.exit(1);
}

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  console.error(
    "Missing FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY.\n" +
      "Set them in a local .env file (see .env.example) before running this script.",
  );
  process.exit(1);
}

initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });

const user = await getAuth().getUserByEmail(email);
await getAuth().setCustomUserClaims(user.uid, { admin: true });

console.log(`Granted admin claim to ${email} (uid: ${user.uid}).`);
console.log("They may need to sign out and back in for the claim to take effect.");
