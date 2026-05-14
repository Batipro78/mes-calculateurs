# Indexation automatique - mescalculateurs.fr

Push automatique des URLs vers Google + Bing/Yandex chaque jour pour forcer l'indexation.

## Comment ca marche

- **Google Indexing API** : 200 URLs/jour pousses en rotation. Cycle complet (~6700 URLs) en ~34 jours.
- **IndexNow (Bing/Yandex)** : tout le sitemap pousse chaque lundi + a chaque modif du sitemap.

## Setup Google Indexing API (a faire une fois)

### 1. Activer l'API
- Aller sur https://console.cloud.google.com/
- Creer un projet (ex: "mescalculateurs-indexing") ou utiliser un projet existant
- Menu -> APIs & Services -> Library
- Chercher "Web Search Indexing API" -> Enable

### 2. Creer un service account
- Menu -> IAM & Admin -> Service Accounts -> Create Service Account
- Nom: `indexing-pusher`
- Role: aucun a ajouter (skip)
- Create

### 3. Generer la cle JSON
- Cliquer sur le service account cree
- Onglet "Keys" -> Add Key -> Create new key -> JSON
- Telecharger le fichier (le garder PRECIEUSEMENT, on ne peut pas le retelecharger)

### 4. Ajouter le service account dans Search Console
- Copier le `client_email` du JSON (ex: `indexing-pusher@projet.iam.gserviceaccount.com`)
- Aller sur https://search.google.com/search-console
- Selectionner la propriete mescalculateurs.fr
- Settings (engrenage en bas) -> Users and permissions -> Add user
- Email du service account, role: **Owner** (obligatoire pour l'Indexing API)

### 5. Mettre le JSON en GitHub Secret
- Repo GitHub -> Settings -> Secrets and variables -> Actions -> New repository secret
- Nom: `GOOGLE_INDEXING_CREDENTIALS`
- Valeur: coller le **contenu complet** du fichier JSON (tout, accolades comprises)
- Add secret

## Setup IndexNow (rien a faire)

Tout est deja en place. Apres deploiement, le fichier `public/8f4d3c2b1a9e8f7d6c5b4a3e2d1c9b8a.txt` sera accessible sur https://mescalculateurs.fr/8f4d3c2b1a9e8f7d6c5b4a3e2d1c9b8a.txt et IndexNow validera automatiquement.

## Lancer manuellement

- Repo GitHub -> Actions -> "Google Indexing API" -> Run workflow
- Repo GitHub -> Actions -> "IndexNow (Bing/Yandex)" -> Run workflow

## Suivi

- Google : Search Console -> Indexing -> Pages (verifier la progression chaque semaine)
- Bing : https://www.bing.com/webmasters (ajouter le site avec la meme cle IndexNow pour suivre)

## Cycle Google

Le script pousse 200 URLs/jour en rotation. Avec ~6700 URLs au sitemap :
- ~34 jours pour un cycle complet
- Puis le cycle recommence (Google reverifie les pages deja indexees, normal)
