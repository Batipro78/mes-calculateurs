# Indexation - mescalculateurs.fr

## Etat actuel (mai 2026)

- **IndexNow (Bing/Yandex)** : actif via `.github/workflows/indexnow.yml`. Pousse tout le sitemap chaque lundi + a chaque modif. Aucune action requise.
- **Google Indexing API** : **DESACTIVE** (workflow renomme `.disabled`). Voir section "Pourquoi desactive" plus bas.
- **Sitemap Google** : `sitemap-index.xml` soumis dans Google Search Console. Google crawl naturellement.

## Strategie d'indexation Google

Pour accelerer l'indexation des nouvelles pages :

1. **Sitemap dans GSC** : `https://mescalculateurs.fr/sitemap-index.xml` doit etre present dans Search Console -> Sitemaps. Verifier qu'il n'y a pas d'erreur de lecture.

2. **URL Inspection > Demander l'indexation** : pour les 10 calculateurs prioritaires (top volume Google), aller dans GSC -> "Inspecter une URL" -> coller l'URL -> "Demander l'indexation". Limite 10/jour mais ciblé et garanti.

3. **Backlinks** : campagne de prospection en cours (voir `backlinks-campagne.md` en memoire). C'est le levier le plus efficace pour l'autorite du domaine et donc la vitesse de crawl Google.

4. **Internal linking** : `RelatedCalculators.tsx` croise les calculateurs entre eux. Continuer a maintenir un maillage interne dense.

## Pourquoi le Google Indexing API a ete desactive (16/05/2026)

3 raisons structurelles :

1. **Non supporte officiellement pour les calculateurs**. Google reserve l'Indexing API aux pages `JobPosting` (offres d'emploi) et `BroadcastEvent` (livestreams). Pour le reste, Google peut ignorer les push ou meme blacklister un site qui abuse.

2. **Quota de 200 URLs/jour** : avec 6682 URLs au sitemap, un cycle complet prend 34 jours. Et Google n'indexe pas a la demande de toute facon — ça push juste une "suggestion" de crawl que Google peut ignorer.

3. **Setup complexe pour benefice incertain** : il faut creer un service account Google Cloud, le verifier comme Owner d'une propriete Search Console (impossible direct sur les proprietes Domain), et maintenir le secret GitHub. Le ROI ne le justifie pas.

Le script `scripts/google-indexing.mjs` est conserve mais inutilise. Le workflow `.github/workflows/google-indexing.yml.disabled` n'est plus execute par GitHub Actions (extension `.disabled` ignoree).

## Re-activer le workflow (si besoin un jour)

1. Renommer `.github/workflows/google-indexing.yml.disabled` -> `.github/workflows/google-indexing.yml`
2. Re-faire le setup Google Cloud + Search Console (voir l'historique git de ce fichier pour le guide original)
3. Verifier que le secret `GOOGLE_INDEXING_CREDENTIALS` existe encore dans GitHub
