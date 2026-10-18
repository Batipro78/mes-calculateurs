# P1 — Décision noindex des pages-variantes (dossier prêt à trancher)

> Préparé par Claude en autonomie le 27/06/2026. **Rien n'a été appliqué ni déployé.**
> Ce document existe pour que tu dises juste **OUI / NON / variante** à ton retour.

## ⚠️ MISE À JOUR 27/06 (soir) — données Search Console réelles → RECO CHANGÉE

Fethi a collé la liste des **123 pages réellement indexées** par Google. Analyse :
- **~85 % = de VRAIES pages** (calcul-imc, prix-electricien, simulateur-impot-revenu, calculateurs belges `/be/...`). Google indexe bien le vrai contenu.
- **~13 % = des variantes** (16 repérées) : `calcul-taxe-fonciere/toulouse|strasbourg|dijon|aix-en-provence`, `calcul-poids-ideal/homme-160cm-50ans`, `calculateur-dpe/150m2-electrique-apres-2012`, `simulateur-facture-gaz/chauffage-80m2-zone2`, `simulateur-credit-auto/20000-euros-48-mois`, `calcul-risque-cardiovasculaire/...`, etc.

**Conséquences :**
1. Le diagnostic « 0,65 % indexé » était **trompeur** (comparé aux 10 700 URLs variantes incluses). En réalité **~la moitié des vraies pages sont indexées** et **ça progresse mois par mois** (dates avril→juin).
2. L'Option A (noindex radical) ferait **perdre ces ~16 variantes** indexées (certaines utiles : taxe foncière par ville) pour un bénéfice désormais **plus faible** (les racines s'indexent déjà).

**➡️ RECO RÉVISÉE : NE PAS faire le noindex radical.** Soit (1) ne rien toucher côté indexation et miser sur backlinks + temps (+ le HowTo déjà fait pour les IA), soit (2) version douce plus tard (retirer du sitemap seulement la masse jamais indexée, garder les variantes indexées). À rediscuter demain. Le reste du dossier ci-dessous garde sa valeur technique si on choisit un jour la version douce.

---

## 1. Le constat chiffré (mesuré aujourd'hui, pas la mémoire)

Script : `node scripts/audit-variants.cjs` (lecture seule, transpile `app/lib/sitemap-data.ts` et compte les URLs réelles du sitemap).

```
TOTAL : 9 033 URLs | racines : 173 | variantes [params] : 8 860
```

- **173 pages racine** = les vraies pages utiles (un calculateur FR = une racine 1-segment).
- **8 860 pages-variantes** = en MAJORITÉ des combinaisons quasi-dupliquées générées par les dossiers
  `[params]` (villes, montants, scénarios…). Elles représentent **98 %** des URLs.

> ⚠️ **Nuance importante (à ne pas rater)** : le décompte « variante » = toute URL à 2+ segments.
> Or `/be/*` (~14 vrais calculateurs belges : `/be/calcul-tva`, `/be/salaire-brut-net`…) et `/en/*`
> (~5 vrais calculateurs anglais) sont des **pages calculateur à part entière**, pas des doublons —
> elles sont juste rangées sous un préfixe de langue/pays, donc comptées ici dans les « variantes ».
> **Il faut les préserver** : ne noindexer, sous `/be` et `/en`, que leurs propres sous-variantes
> (3+ segments), pas les racines calculateur. Le mécanisme ci-dessous (§4) gère ce cas. Soit ~19
> vraies pages à garder indexables en plus des 173.

Snapshot indexation mémoire (16/06) : ~93 pages indexées par Google sur ~10 700 = **0,65 %**.
Même si Google n'indexe pas les variantes, **leur simple présence dans le sitemap dilue le budget de
crawl** d'un domaine jeune sans autorité → il n'indexe même pas les 173 racines qui comptent.
AdSense avait déjà qualifié ces pages de masse de « faible valeur ».

### Les gros pourvoyeurs de variantes (top 25)

| variantes | calculateur |
|----------:|-------------|
| 969 | be (section Belgique entière) |
| 594 | calcul-calories |
| 468 | simulateur-chomage |
| 320 | en (section anglaise entière) |
| 270 | calcul-poids-ideal |
| 220 | calcul-metabolisme-base |
| 175 | calculateur-dpe |
| 165 | calcul-consommation-eau |
| 145 | prix-peintre |
| 142 | prix-couvreur |
| 136 | prix-macon |
| 132 | indemnite-licenciement |
| 120 | calcul-masse-grasse |
| 120 | simulateur-cout-voiture |
| 120 | simulateur-bunker |
| 109 | prix-electricien |
| 104 | calcul-imc |
| 104 | prix-panneaux-solaires |
| 93 | calcul-taux-endettement |
| 90 | calcul-age-metabolique |
| 90 | calcul-risque-cardiovasculaire |
| 84 | simulateur-pension-alimentaire |
| 84 | calculateur-autonomie |
| 81 | calcul-rapport-taille-tour-de-taille |
| 80 | simulateur-bombe-nucleaire |

(Liste complète reproductible à tout moment via le script.)

## 2. Ce que ça change (le compromis honnête)

- **Pour** : on concentre le crawl Google sur les 173 racines → meilleure chance qu'elles soient
  TOUTES indexées et fraîchement recrawlées. C'est le levier n°1 identifié.
- **Contre** : on renonce (au moins temporairement) à la stratégie long-tail d'origine
  (« prix electricien à Mantes », « 20 % de 1500 €»…). Sur un domaine jeune ces pages ne rankent
  quasiment pas de toute façon, mais c'est un choix à assumer.
- **100 % réversible** : on retire le bloc et on re-pousse → tout repart en indexable.

## 3. Trois options

| Option | Action | Pour qui |
|--------|--------|----------|
| **A — Radicale (recommandée)** | `noindex, follow` sur **toutes** les variantes. On garde les 173 racines FR **+ les ~19 racines calculateur `/be` et `/en`**. | Démarrage propre : on concentre tout le crawl, puis on ré-ouvrira des variantes calculateur par calculateur une fois l'autorité acquise. |
| **B — Médiane** | noindex les variantes **sauf une liste blanche** (ex. top 10-15 villes/montants à vraie demande par calculateur). | Si tu veux préserver quelques pages long-tail dès maintenant. Nécessite une liste blanche que je ne peux pas chiffrer finement sans données GSC/volumes. |
| **C — Statu quo** | Ne rien faire. | Si tu préfères miser sur le temps + les backlinks. |

`follow` est conservé partout : les liens des variantes continuent de transmettre du jus vers les racines.

**Ma reco : Option A.** C'est le geste le plus net, réversible, et il attaque directement le frein.
On mesure 4-8 semaines, puis on ré-ouvre sélectivement.

## 4. Mécanisme technique proposé (1 seul fichier)

Plutôt que d'éditer 168 fichiers `[params]/page.tsx`, on étend `middleware.ts` pour poser un en-tête
HTTP **`X-Robots-Tag: noindex, follow`** sur les chemins-variantes. Google respecte pleinement cet
en-tête. Avantages : un seul point de contrôle, réversible en 3 lignes, aucune touche au rendu.

Règle : un chemin est une **variante** s'il a ≥ 2 segments sous un calculateur connu
(ex. `/prix-electricien/installation-prise-ile-de-france`), en **excluant** les racines, `api`,
`embed`, `sitemap*`, et en gérant `en`/`be` selon ton choix (par défaut : on noindex AUSSI leurs
variantes, on garde les racines `/en` et `/be`).

Helper à ajouter dans `middleware.ts` (déjà rédigé, **non inséré**) :

```ts
// --- P1 : noindex des pages-variantes (concentration du crawl) ---
// Réversible : supprimer ce bloc + les 2 appels withNoindex() et re-push.
const LANG_PREFIXES = new Set(["be", "en"]); // sous /be et /en, le 2e segment est une RACINE calculateur
const ROOT_WHITELIST = new Set<string>([
  // (Option B) racines exactes à garder indexables même si variantes, ex. "prix-electricien/paris"
]);
function isVariantPath(pathname: string): boolean {
  const segs = pathname.split("/").filter(Boolean);
  if (segs.length < 2) return false;                        // racine FR 1-segment = indexable
  if (["api", "embed", "_next"].includes(segs[0])) return false;
  if (segs[0].startsWith("sitemap")) return false;
  // /be/<calc> et /en/<calc> sont de VRAIES racines calculateur : on ne noindex
  // que leurs sous-variantes (3+ segments).
  if (LANG_PREFIXES.has(segs[0])) return segs.length >= 3;
  if (ROOT_WHITELIST.has(segs.slice(0, 2).join("/"))) return false;
  return true;                                              // 2+ segments => variante => noindex
}
// Pose l'en-tête noindex sur la réponse si le chemin est une variante.
function withNoindex(req: NextRequest, res: NextResponse): NextResponse {
  if (isVariantPath(req.nextUrl.pathname)) {
    res.headers.set("X-Robots-Tag", "noindex, follow");
  }
  return res;
}
```

**Placement (attention)** : `middleware.ts` n'a PAS de `return` final unique — il fait des
**early-returns**. Le trafic normal (Googlebot inclus, continent NA/EU) sort dès la ligne
`if (!BLOCKED_CONTINENTS.has(continent)) return NextResponse.next();`. Il faut donc envelopper
**chaque** `NextResponse.next()` autorisé :

```ts
// ligne ~31-33 (trafic non bloqué — c'est par là que passe Googlebot) :
if (!BLOCKED_CONTINENTS.has(continent)) {
  return withNoindex(req, NextResponse.next());
}
// ...et plus bas, le passage "bots légitimes même en géo bloquée" :
if (ALLOWED_BOTS.test(ua)) {
  return withNoindex(req, NextResponse.next());
}
```

(La réponse 403 des scrapers bloqués n'a évidemment pas besoin de l'en-tête.)

(Option B = remplir `ROOT_WHITELIST` / affiner `isVariantPath` avec les slugs à garder.)

### Étape complémentaire conseillée
Retirer les variantes du **sitemap** (`getAllUrls`) pour ne plus les soumettre du tout : passer le
sitemap aux 173 racines seules. Je peux préparer ce patch en même temps (filtrage des URLs à 2+
segments). Ça renforce le signal « ne crawle que les racines ».

## 5. Ce que je n'ai PAS fait (volontairement)
- Aucune modif de `middleware.ts` ni du sitemap.
- Aucun déploiement.
- Aucune liste blanche inventée sans données (je ne devine pas la demande sans GSC).

## 6. Ce dont j'ai besoin de toi
1. **Option A, B ou C ?**
2. Si B : sur quels calculateurs veux-tu garder des variantes, et combien ?
3. Veux-tu aussi **purger le sitemap** (recommandé si A) ?

Dès ton feu vert, l'application + build + vérif prend ~15 min, et c'est réversible à tout instant.
