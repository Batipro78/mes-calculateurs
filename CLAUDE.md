# Mes Calculateurs

Site de calculateurs/simulateurs gratuits en ligne. SEO-first, AdSense monetise.

## Commandes

```bash
npm run dev      # Dev server
npm run build    # Build production (verifier avant push)
npm run lint     # Linting
```

## Stack

- Next.js 15.3.2, React 19, TypeScript 5.8
- Tailwind CSS 4.1 (classes en dur dans JSX, jamais d'objets JS dynamiques)
- Deploy : Vercel
- Domaine : mes-calculateurs.vercel.app

## Structure

```
app/
  layout.tsx              # Layout global + metadata + AdSense script
  page.tsx                # Accueil — liste tous les calculateurs (tableau `outils`)
  globals.css             # Styles globaux
  sitemap.ts              # Sitemap principal (gros fichier, toutes les URLs)
  sitemap-index.xml/      # Sitemap index manuel (Next.js ne le genere pas auto)
  robots.ts               # robots.txt + GEO
  components/             # Composants partages
    AdSlot.tsx             # Pub AdSense
    Breadcrumb.tsx         # Fil d'Ariane FR
    BreadcrumbEN.tsx       # Fil d'Ariane EN
    RelatedCalculators.tsx # Liens vers calculateurs similaires FR
    RelatedCalculatorsEN.tsx # Idem EN
    VillesLinks.tsx        # Liens villes (pages dynamiques artisans)
    WebAppJsonLd.tsx       # Schema.org WebApplication
  en/                     # Calculateurs anglais (strategie US)
  [calculateur]/           # Chaque calculateur = un dossier
    page.tsx               # Page principale
    calc[Name].ts          # Logique de calcul (ATTENTION: eviter pattern calcXxx.ts, preferer xxxCalc.ts)
    [Composant].tsx        # Composant React client
    [params]/              # Pages dynamiques (villes, variantes)
      page.tsx
```

## Ajouter un nouveau calculateur — Checklist

1. Creer le dossier `app/[nom-calculateur]/`
2. Creer : `page.tsx` (metadata + composant) + `[Name]Calc.ts` (logique) + `[Name].tsx` (composant client)
3. Creer `[params]/page.tsx` pour les pages dynamiques (villes, variantes)
4. Ajouter dans `app/sitemap.ts` (URLs statiques + dynamiques)
5. Ajouter dans `app/page.tsx` (tableau `outils` sur l'accueil)
6. Ajouter dans `RelatedCalculators.tsx` (liens croises)
7. Build pour verifier : `npm run build`

## Pieges connus

- **Noms de fichiers** : `calcXxx.ts` cause des erreurs RSC ("Could not find module in React Client Manifest"). Utiliser `xxxCalc.ts` a la place.
- **Tailwind v4** : classes dynamiques dans objets JS = non detectees. Toujours en dur dans le JSX.
- **Next.js 15** : `useSearchParams()` doit etre dans un `<Suspense>`.
- **generateSitemaps** : ne genere PAS de sitemap index auto. Utiliser le route handler manuel `app/sitemap-index.xml/route.ts`.
- **Pages dynamiques** : ne JAMAIS oublier les pages dynamiques + sitemap quand on ajoute un calculateur.
- **Imports dans pages dynamiques** : depuis `app/xxx/[params]/page.tsx`, les composants sont en `../components/` (pas `./components/`).

## SEO

- Metadata complete sur chaque page (title, description, openGraph, twitter)
- Breadcrumb JSON-LD + visible
- Schema.org WebApplication via `WebAppJsonLd.tsx`
- Sitemap index + sitemaps detailles
- robots.ts avec regles GEO
- "Mis a jour" dates pour fraicheur

## Calculateurs : ~56 FR + 5 EN

Categories : finance, sante/famille, immobilier, emploi/RH, conversions, survivalisme (EN), artisans (prix-*)
