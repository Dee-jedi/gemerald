// Deploys firestore.rules and storage.rules using the service account key.
//
// Usage: node scripts/deploy-rules.mjs [path/to/serviceAccountKey.json]
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp, cert } from "firebase-admin/app";
import { getSecurityRules } from "firebase-admin/security-rules";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const keyPath =
  process.argv[2] ??
  path.join(
    root,
    readdirSync(root).find((f) => /-firebase-adminsdk-.*\.json$/.test(f)) ?? ""
  );
const bucketName = "gemerald-bb2ab.firebasestorage.app";

initializeApp({
  credential: cert(JSON.parse(readFileSync(keyPath, "utf8"))),
  storageBucket: bucketName,
});

const rules = getSecurityRules();
await rules.releaseFirestoreRulesetFromSource(
  readFileSync(path.join(root, "firestore.rules"), "utf8")
);
console.log("✓ Firestore rules deployed");
await rules.releaseStorageRulesetFromSource(
  readFileSync(path.join(root, "storage.rules"), "utf8"),
  bucketName
);
console.log("✓ Storage rules deployed");
