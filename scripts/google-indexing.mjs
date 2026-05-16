import { JWT } from "google-auth-library";
import { fetchAllUrls } from "./lib/fetch-sitemap-urls.mjs";

const SCOPES = ["https://www.googleapis.com/auth/indexing"];
const ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish";
const SITEMAP_INDEX = "https://mescalculateurs.fr/sitemap-index.xml";
const DAILY_LIMIT = 200;
const MAX_CONSECUTIVE_403 = 5;

const credsJson = process.env.GOOGLE_INDEXING_CREDENTIALS;
if (!credsJson) {
  console.error("ERROR: missing GOOGLE_INDEXING_CREDENTIALS env var");
  process.exit(1);
}

let creds;
try {
  creds = JSON.parse(credsJson);
} catch (e) {
  console.error("ERROR: GOOGLE_INDEXING_CREDENTIALS is not valid JSON");
  process.exit(1);
}

console.log(`Service account: ${creds.client_email}`);
console.log(`Project: ${creds.project_id}`);

const client = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: SCOPES,
});

const { access_token: accessToken } = await client.authorize();
if (!accessToken) {
  console.error("ERROR: could not obtain access token");
  process.exit(1);
}

const allUrls = await fetchAllUrls(SITEMAP_INDEX);
console.log(`Total URLs in sitemap: ${allUrls.length}`);

const dayOfYear = Math.floor(
  (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
);
const cycleLength = Math.max(1, Math.ceil(allUrls.length / DAILY_LIMIT));
const cycleIndex = dayOfYear % cycleLength;
const offset = cycleIndex * DAILY_LIMIT;
const batch = allUrls.slice(offset, offset + DAILY_LIMIT);

console.log(
  `Cycle ${cycleIndex + 1}/${cycleLength} — pushing ${batch.length} URLs (offset ${offset})`
);

let success = 0;
let failed = 0;
let consecutive403 = 0;
let hit429 = false;
const errors = [];
const statusCounts = { 200: 0, 403: 0, 429: 0, other: 0 };

for (const url of batch) {
  if (consecutive403 >= MAX_CONSECUTIVE_403) {
    console.log(
      `\nABORT: ${MAX_CONSECUTIVE_403} erreurs 403 d'affilee — le service account n'est pas Proprietaire de mescalculateurs.fr dans Search Console.`
    );
    console.log(
      `Action: ajouter ${creds.client_email} comme Owner dans Search Console (Settings > Users and permissions).`
    );
    break;
  }
  if (hit429) {
    console.log(
      `\nABORT: quota daily Google Indexing API epuise (429). Reset minuit Pacifique (~9h Paris).`
    );
    break;
  }
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, type: "URL_UPDATED" }),
    });
    if (res.ok) {
      success++;
      consecutive403 = 0;
      statusCounts[200]++;
    } else {
      failed++;
      const body = await res.text().catch(() => "");
      if (res.status === 403) {
        consecutive403++;
        statusCounts[403]++;
      } else if (res.status === 429) {
        hit429 = true;
        statusCounts[429]++;
      } else {
        consecutive403 = 0;
        statusCounts.other++;
      }
      if (errors.length < 5) {
        errors.push(`${res.status} ${url} — ${body.slice(0, 200)}`);
      }
    }
  } catch (e) {
    failed++;
    consecutive403 = 0;
    statusCounts.other++;
    if (errors.length < 5) errors.push(`EXC ${url} — ${e.message}`);
  }
}

console.log(`\nDone. Success: ${success}, Failed: ${failed}`);
console.log(
  `Status: 200=${statusCounts[200]} 403=${statusCounts[403]} 429=${statusCounts[429]} other=${statusCounts.other}`
);
if (errors.length) {
  console.log("First errors:");
  errors.forEach((e) => console.log("  - " + e));
}

if (statusCounts[403] > 0 && success === 0) {
  console.error(
    `\nFIX: ajouter ${creds.client_email} comme Owner dans Google Search Console pour mescalculateurs.fr.`
  );
  process.exit(1);
}
if (hit429 && success === 0) {
  console.log("\nQuota epuise mais config OK — attendre reset puis re-run.");
  process.exit(0);
}
if (success === 0) process.exit(1);
