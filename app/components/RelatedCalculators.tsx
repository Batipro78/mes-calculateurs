import { ALL_CALCULATORS } from "../lib/calculators-list";


const RELATED_MAP: Record<string, string[]> = {
  "/salaire-brut-net": ["/simulateur-impot-revenu", "/indemnite-licenciement", "/calcul-heures-travail", "/calcul-indemnites-kilometriques"],
  "/calcul-tva": ["/calcul-pourcentage", "/frais-de-notaire", "/convertisseur-devises", "/salaire-brut-net", "/verificateur-devis"],
  "/simulateur-pret-immobilier": ["/calcul-taux-endettement", "/frais-de-notaire", "/simulateur-epargne", "/simulateur-impot-revenu", "/simulateur-assurance-emprunteur"],
  "/calcul-pourcentage": ["/calcul-tva", "/salaire-brut-net", "/simulateur-epargne", "/convertisseur-devises"],
  "/calcul-imc": ["/calcul-poids-ideal", "/calcul-calories", "/calcul-age", "/calcul-date-accouchement", "/calcul-rapport-taille-tour-de-taille"],
  "/frais-de-notaire": ["/simulateur-pret-immobilier", "/simulateur-impot-revenu", "/calcul-tva", "/simulateur-epargne"],
  "/calcul-consommation-electrique": ["/calcul-puissance-climatisation", "/cout-climatisation", "/calcul-surface-peinture", "/simulateur-epargne", "/simulateur-blackout"],
  "/calcul-age": ["/calcul-date-accouchement", "/calcul-imc", "/calcul-heures-travail", "/simulateur-epargne"],
  "/indemnite-licenciement": ["/salaire-brut-net", "/calcul-heures-travail", "/simulateur-impot-revenu", "/calcul-indemnites-kilometriques"],
  "/convertisseur-devises": ["/calcul-tva", "/calcul-pourcentage", "/salaire-brut-net", "/simulateur-epargne"],
  "/calcul-surface-peinture": ["/calcul-consommation-electrique", "/simulateur-pret-immobilier", "/frais-de-notaire", "/calcul-pourcentage"],
  "/simulateur-epargne": ["/simulateur-impot-revenu", "/simulateur-pret-immobilier", "/salaire-brut-net", "/convertisseur-devises", "/simulateur-rendement-scpi", "/calcul-interet-compose"],
  "/calcul-heures-travail": ["/salaire-brut-net", "/indemnite-licenciement", "/calcul-indemnites-kilometriques", "/simulateur-impot-revenu"],
  "/calcul-indemnites-kilometriques": ["/calcul-heures-travail", "/salaire-brut-net", "/calcul-consommation-electrique", "/simulateur-impot-revenu"],
  "/simulateur-impot-revenu": ["/salaire-brut-net", "/simulateur-epargne", "/indemnite-licenciement", "/frais-de-notaire"],
  "/calcul-date-accouchement": ["/calcul-ovulation", "/calcul-age", "/calcul-imc", "/calcul-heures-travail"],
  "/simulateur-dca": ["/simulateur-epargne", "/calculateur-inflation", "/convertisseur-devises", "/simulateur-impot-revenu"],
  "/calculateur-inflation": ["/salaire-brut-net", "/simulateur-epargne", "/simulateur-dca", "/simulateur-impot-revenu"],
  "/simulateur-apl": ["/simulateur-impot-revenu", "/salaire-brut-net", "/simulateur-epargne", "/calcul-consommation-electrique"],
  "/calcul-calories": ["/calcul-imc", "/calcul-macros", "/calcul-age", "/calcul-date-accouchement", "/calcul-indice-inflammation"],
  "/calcul-macros": ["/calcul-calories", "/calcul-imc", "/calcul-metabolisme-base", "/conversion-poids", "/calcul-indice-glycemique"],
  "/calcul-masse-grasse": ["/calcul-imc", "/calcul-calories", "/calcul-age", "/calcul-date-accouchement"],
  "/simulateur-chomage": ["/salaire-brut-net", "/indemnite-licenciement", "/simulateur-impot-revenu", "/simulateur-micro-entreprise"],
  "/simulateur-micro-entreprise": ["/simulateur-impot-revenu", "/salaire-brut-net", "/calcul-tva", "/simulateur-chomage"],
  "/calcul-ovulation": ["/calcul-date-accouchement", "/calcul-imc", "/calcul-calories", "/calcul-age"],
  "/calcul-taux-endettement": ["/simulateur-pret-immobilier", "/frais-de-notaire", "/simulateur-impot-revenu", "/salaire-brut-net"],
  "/simulateur-mobilisation": ["/simulateur-bombe-nucleaire", "/simulateur-bunker", "/calcul-age", "/simulateur-chomage"],
  "/simulateur-bombe-nucleaire": ["/simulateur-mobilisation", "/simulateur-bunker", "/calcul-age", "/calcul-consommation-electrique"],
  "/simulateur-bunker": ["/simulateur-bombe-nucleaire", "/simulateur-mobilisation", "/calcul-surface-peinture", "/simulateur-epargne"],
  "/simulateur-pension-alimentaire": ["/simulateur-impot-revenu", "/salaire-brut-net", "/calcul-prime-activite", "/simulateur-chomage", "/calcul-prestation-compensatoire"],
  "/calcul-cout-garde-enfant": ["/simulateur-pension-alimentaire", "/calcul-prime-activite", "/simulateur-impot-revenu", "/calcul-date-accouchement"],
  "/simulateur-credit-conso": ["/simulateur-pret-immobilier", "/calcul-taux-endettement", "/simulateur-epargne", "/salaire-brut-net", "/audit-frais-bancaires"],
  "/simulateur-bonus-ecologique": ["/simulateur-credit-conso", "/simulateur-impot-revenu", "/calcul-prime-activite", "/simulateur-epargne"],
  "/calcul-prime-activite": ["/simulateur-chomage", "/simulateur-apl", "/salaire-brut-net", "/simulateur-impot-revenu"],
  "/simulateur-retraite": ["/salaire-brut-net", "/simulateur-impot-revenu", "/simulateur-chomage", "/simulateur-epargne", "/simulateur-rente-viagere"],
  "/simulateur-salaire-alternant": ["/salaire-brut-net", "/simulateur-chomage", "/simulateur-micro-entreprise", "/calcul-prime-activite"],
  "/calculateur-budget-survie": ["/calculateur-autonomie", "/simulateur-apl", "/calcul-prime-activite", "/salaire-brut-net"],
  "/calculateur-autonomie": ["/calculateur-budget-survie", "/simulateur-epargne", "/simulateur-chomage", "/calcul-prime-activite"],
  "/simulateur-blackout": ["/calcul-consommation-electrique", "/prix-electricien", "/simulateur-bunker", "/calculateur-budget-survie"],
  "/calcul-capacite-emprunt": ["/simulateur-pret-immobilier", "/calcul-taux-endettement", "/frais-de-notaire", "/simulateur-epargne", "/simulateur-assurance-emprunteur"],
  "/prix-macon": ["/prix-couvreur", "/prix-peintre", "/prix-electricien", "/prix-plombier", "/prix-travaux-maison"],
  "/prix-peintre": ["/calcul-surface-peinture", "/prix-macon", "/prix-couvreur", "/prix-electricien"],
  "/prix-electricien": ["/modele-devis-btp", "/calcul-consommation-electrique", "/prix-macon", "/prix-plombier", "/verificateur-devis"],
  "/prix-plombier": ["/prix-electricien", "/prix-macon", "/prix-peintre", "/prix-couvreur"],
  "/prix-couvreur": ["/prix-macon", "/prix-chauffagiste", "/prix-electricien", "/prix-plombier"],
  "/prix-chauffagiste": ["/calcul-puissance-climatisation", "/prix-plombier", "/prix-panneaux-solaires", "/calculateur-dpe"],
  "/prix-panneaux-solaires": ["/prix-chauffagiste", "/calculateur-dpe", "/calcul-consommation-electrique", "/simulateur-facture-gaz"],
  "/conversion-temperature": ["/calcul-temperature-ressentie", "/conversion-poids", "/conversion-longueur", "/calcul-pourcentage"],
  "/conversion-poids": ["/conversion-longueur", "/conversion-temperature", "/calcul-imc", "/calcul-calories"],
  "/conversion-longueur": ["/conversion-poids", "/conversion-temperature", "/calcul-surface-peinture", "/calcul-imc"],
  "/calcul-moyenne": ["/produit-en-croix", "/calcul-pourcentage", "/calcul-age", "/simulateur-impot-revenu", "/calcul-mention-bac"],
  "/produit-en-croix": ["/calcul-moyenne", "/calcul-pourcentage", "/calcul-tva", "/conversion-temperature"],
  "/calcul-conges-payes": ["/salaire-brut-net", "/calcul-heures-travail", "/indemnite-licenciement", "/simulateur-chomage"],
  "/calcul-plus-value-immobiliere": ["/frais-de-notaire", "/simulateur-pret-immobilier", "/calcul-rentabilite-locative", "/calcul-revenus-fonciers"],
  "/calcul-rentabilite-locative": ["/calcul-revenus-fonciers", "/calcul-plus-value-immobiliere", "/frais-de-notaire", "/calcul-taux-endettement", "/simulateur-rendement-scpi"],
  "/calcul-revenus-fonciers": ["/calcul-rentabilite-locative", "/calcul-plus-value-immobiliere", "/simulateur-impot-revenu", "/frais-de-notaire"],
  "/calcul-consommation-essence": ["/calcul-indemnites-kilometriques", "/calcul-consommation-electrique", "/conversion-temperature", "/calcul-pourcentage"],
  "/calcul-jours-ouvres": ["/calcul-conges-payes", "/calcul-heures-travail", "/salaire-brut-net", "/indemnite-licenciement"],
  "/calcul-interet-compose": ["/simulateur-epargne", "/simulateur-dca", "/calculateur-inflation", "/simulateur-impot-revenu"],
  "/calcul-malus-ecologique": ["/simulateur-bonus-ecologique", "/calcul-consommation-essence", "/simulateur-credit-conso", "/calcul-tva", "/simulateur-amende-exces-vitesse"],
  "/calcul-pgcd-ppcm": ["/calcul-moyenne", "/produit-en-croix", "/calcul-pourcentage", "/conversion-temperature"],
  "/calcul-duree-entre-dates": ["/calcul-jours-ouvres", "/calcul-age", "/calcul-conges-payes", "/calcul-heures-travail"],
  "/verificateur-devis": ["/modele-devis-btp", "/calcul-tva", "/frais-de-notaire", "/simulateur-micro-entreprise"],
  "/modele-devis-btp": ["/verificateur-devis", "/calcul-tva", "/simulateur-micro-entreprise", "/prix-electricien", "/prix-travaux-maison"],
  "/calcul-ascendant-astrologique": ["/calcul-age", "/calcul-date-accouchement", "/calcul-ovulation", "/calcul-duree-entre-dates"],
  "/calcul-gratification-stage": ["/simulateur-salaire-alternant", "/salaire-brut-net", "/calcul-conges-payes", "/simulateur-chomage"],
  "/calcul-droits-succession": ["/frais-de-notaire", "/simulateur-impot-revenu", "/calcul-plus-value-immobiliere", "/simulateur-epargne"],
  "/simulateur-cout-voiture": ["/calcul-cout-kilometrique", "/calcul-consommation-essence", "/calcul-malus-ecologique", "/simulateur-bonus-ecologique", "/calcul-cote-argus-voiture"],
  "/calcul-cout-kilometrique": ["/simulateur-cout-voiture", "/calcul-indemnites-kilometriques", "/calcul-consommation-essence", "/simulateur-impot-revenu"],
  "/calcul-pension-reversion": ["/simulateur-retraite", "/simulateur-impot-revenu", "/calcul-droits-succession", "/salaire-brut-net"],
  "/calcul-surface-cercle": ["/calcul-volume-cylindre", "/calcul-surface-peinture", "/calcul-pourcentage", "/calcul-racine-carree"],
  "/calcul-volume-cylindre": ["/calcul-surface-cercle", "/calcul-surface-peinture", "/calcul-racine-carree", "/calcul-pourcentage"],
  "/calcul-racine-carree": ["/calcul-pgcd-ppcm", "/calcul-moyenne", "/produit-en-croix", "/calcul-surface-cercle"],
  "/calcul-poids-ideal": ["/calcul-imc", "/calcul-masse-grasse", "/calcul-metabolisme-base", "/calcul-calories"],
  "/calcul-metabolisme-base": ["/calcul-calories", "/calcul-macros", "/calcul-proteines", "/calcul-imc", "/calcul-consommation-eau"],
  "/calcul-proteines": ["/calcul-macros", "/calcul-calories", "/calcul-metabolisme-base", "/calcul-masse-grasse"],
  "/calcul-besoin-sommeil": ["/calcul-metabolisme-base", "/calcul-calories", "/calcul-imc", "/calcul-age"],
  "/calcul-consommation-eau": ["/calcul-temperature-ressentie", "/calcul-imc", "/calcul-metabolisme-base", "/calcul-calories"],
  "/calcul-risque-cardiovasculaire": ["/calcul-imc", "/calcul-metabolisme-base", "/calcul-poids-ideal", "/calcul-calories", "/calcul-remboursement-mutuelle"],
  "/calcul-indice-glycemique": ["/calcul-calories", "/calcul-macros", "/calcul-imc", "/calcul-metabolisme-base"],
  "/calcul-age-metabolique": ["/calcul-metabolisme-base", "/calcul-imc", "/calcul-calories", "/calcul-masse-grasse"],
  "/calculateur-dpe": ["/calcul-puissance-climatisation", "/calcul-consommation-electrique", "/simulateur-pret-immobilier", "/calcul-rentabilite-locative"],
  "/simulateur-facture-gaz": ["/calcul-consommation-electrique", "/simulateur-pret-immobilier", "/prix-chauffagiste", "/calculateur-dpe"],
  "/simulateur-credit-auto": ["/simulateur-credit-conso", "/simulateur-cout-voiture", "/calcul-taux-endettement", "/calcul-capacite-emprunt", "/simulateur-loa-lld"],
  "/calcul-score-stress": ["/calcul-risque-cardiovasculaire", "/calcul-besoin-sommeil", "/calcul-imc", "/calcul-age-metabolique"],
  "/simulateur-electrique-vs-thermique": ["/simulateur-cout-voiture", "/calcul-malus-ecologique", "/simulateur-bonus-ecologique", "/calcul-consommation-essence"],
  "/calcul-vignette-critair": ["/calcul-malus-ecologique", "/simulateur-bonus-ecologique", "/simulateur-cout-voiture", "/simulateur-electrique-vs-thermique"],
  "/calcul-remboursement-mutuelle": ["/calcul-risque-cardiovasculaire", "/calcul-score-stress", "/calcul-prime-activite", "/simulateur-impot-revenu"],
  "/calcul-allocation-familiale": ["/calcul-cout-garde-enfant", "/simulateur-pension-alimentaire", "/calcul-prime-activite", "/simulateur-apl"],
  "/calcul-taxe-fonciere": ["/frais-de-notaire", "/calcul-rentabilite-locative", "/calcul-revenus-fonciers", "/calcul-plus-value-immobiliere", "/calcul-ifi"],
  "/simulateur-assurance-emprunteur": ["/simulateur-pret-immobilier", "/calcul-capacite-emprunt", "/frais-de-notaire", "/calcul-taux-endettement"],
  "/simulateur-rendement-scpi": ["/calcul-rentabilite-locative", "/simulateur-epargne", "/simulateur-dca", "/calcul-revenus-fonciers"],
  "/simulateur-rente-viagere": ["/simulateur-retraite", "/simulateur-epargne", "/calcul-pension-reversion", "/calculateur-autonomie"],
  "/calcul-ifi": ["/calcul-taxe-fonciere", "/calcul-plus-value-immobiliere", "/calcul-droits-succession", "/calcul-rentabilite-locative"],
  "/simulateur-impot-societe": ["/simulateur-micro-entreprise", "/simulateur-impot-revenu", "/calcul-tva", "/calculateur-autonomie", "/simulateur-dividendes"],
  "/simulateur-amende-exces-vitesse": ["/calcul-malus-ecologique", "/calcul-vignette-critair", "/simulateur-cout-voiture", "/calcul-consommation-essence"],
  "/simulateur-loa-lld": ["/simulateur-credit-auto", "/simulateur-cout-voiture", "/simulateur-electrique-vs-thermique", "/calcul-malus-ecologique"],
  "/calcul-indice-inflammation": ["/calcul-calories", "/calcul-macros", "/calcul-imc", "/calcul-risque-cardiovasculaire"],
  "/calcul-prestation-compensatoire": ["/simulateur-pension-alimentaire", "/calcul-cout-garde-enfant", "/calcul-allocation-familiale", "/salaire-brut-net"],
  "/calcul-prise-poids-grossesse": ["/calcul-date-accouchement", "/calcul-imc", "/calcul-ovulation", "/calcul-calories"],
  "/calcul-amortissement-lmnp": ["/calcul-rentabilite-locative", "/calcul-revenus-fonciers", "/frais-de-notaire", "/calcul-plus-value-immobiliere"],
  "/simulateur-dividendes": ["/simulateur-impot-societe", "/simulateur-impot-revenu", "/simulateur-micro-entreprise", "/calcul-taux-endettement"],
  "/audit-frais-bancaires": ["/calcul-taux-endettement", "/simulateur-credit-conso", "/simulateur-epargne", "/calculateur-budget-survie"],
  "/simulateur-girardin-industriel": ["/calcul-reduction-impot-dom", "/simulateur-denormandie", "/simulateur-impot-revenu", "/calcul-amortissement-lmnp"],
  "/calcul-octroi-de-mer": ["/calcul-reduction-impot-dom", "/calcul-tva", "/calcul-exoneration-lodeom", "/convertisseur-devises"],
  "/calcul-exoneration-lodeom": ["/salaire-brut-net", "/calcul-octroi-de-mer", "/simulateur-impot-societe", "/simulateur-micro-entreprise"],
  "/simulateur-denormandie": ["/simulateur-girardin-industriel", "/calcul-amortissement-lmnp", "/calcul-rentabilite-locative", "/frais-de-notaire"],
  "/calcul-reduction-impot-dom": ["/simulateur-girardin-industriel", "/simulateur-impot-revenu", "/calcul-octroi-de-mer", "/calcul-exoneration-lodeom"],
  "/convertisseur-sensibilite-fps": ["/convertisseur-monnaie-jeu", "/convertisseur-allure-course", "/calcul-ffmi", "/calcul-pourcentage"],
  "/convertisseur-allure-course": ["/calcul-imc", "/calcul-calories", "/calcul-masse-grasse", "/calcul-ffmi"],
  "/calcul-ffmi": ["/calcul-masse-grasse", "/calcul-imc", "/calcul-poids-ideal", "/calcul-proteines"],
  "/convertisseur-monnaie-jeu": ["/convertisseur-sensibilite-fps", "/convertisseur-devises", "/calcul-pourcentage", "/calcul-tva"],
  "/calcul-vma": ["/convertisseur-allure-course", "/calcul-calories-sport", "/calcul-imc", "/calcul-1rm"],
  "/calcul-1rm": ["/calcul-ffmi", "/calcul-masse-grasse", "/calcul-calories-sport", "/calcul-proteines"],
  "/calcul-calories-sport": ["/calcul-calories", "/calcul-vma", "/calcul-imc", "/calcul-1rm", "/calcul-classement-tennis-fft"],
  "/calcul-fov-jeu": ["/convertisseur-sensibilite-fps", "/convertisseur-monnaie-jeu", "/calcul-temps-telechargement", "/calcul-pourcentage"],
  "/calcul-temps-telechargement": ["/convertisseur-sensibilite-fps", "/convertisseur-monnaie-jeu", "/calcul-fov-jeu", "/calcul-pourcentage"],
  "/calcul-zakat": ["/calcul-zakat-al-fitr", "/convertisseur-calendrier-hijri", "/calcul-date-ramadan", "/calcul-pourcentage", "/calcul-kaffara-ramadan"],
  "/calcul-zakat-al-fitr": ["/calcul-zakat", "/calcul-date-ramadan", "/convertisseur-calendrier-hijri", "/calcul-pourcentage"],
  "/convertisseur-calendrier-hijri": ["/calcul-date-ramadan", "/calcul-zakat", "/calcul-age", "/calcul-duree-entre-dates"],
  "/calcul-date-ramadan": ["/convertisseur-calendrier-hijri", "/calcul-zakat-al-fitr", "/calcul-zakat", "/calcul-date-paques"],
  "/calcul-date-paques": ["/calcul-date-ramadan", "/calcul-duree-entre-dates", "/calcul-age", "/calcul-jours-ouvres", "/calcul-fetes-catholiques"],
  "/signe-astrologique-chinois": ["/calcul-age", "/convertisseur-calendrier-hebraique", "/convertisseur-calendrier-hijri", "/calcul-ascendant-astrologique"],
  "/calcul-fetes-catholiques": ["/calcul-date-paques", "/calcul-jours-ouvres", "/calcul-duree-entre-dates", "/calcul-age"],
  "/calcul-kaffara-ramadan": ["/calcul-zakat", "/calcul-zakat-al-fitr", "/calcul-date-ramadan", "/convertisseur-calendrier-hijri"],
  "/convertisseur-calendrier-hebraique": ["/calcul-date-bar-mitzvah", "/convertisseur-calendrier-hijri", "/calcul-age", "/calcul-duree-entre-dates"],
  "/calcul-date-bar-mitzvah": ["/convertisseur-calendrier-hebraique", "/calcul-age", "/calcul-duree-entre-dates", "/calcul-date-paques"],
  "/calcul-ftp-cyclisme": ["/calcul-vma", "/calcul-calories-sport", "/convertisseur-allure-course", "/calcul-1rm"],
  "/calcul-handicap-golf-whs": ["/calcul-calories-sport", "/calcul-imc", "/calcul-ftp-cyclisme", "/calcul-allure-natation"],
  "/calcul-allure-natation": ["/convertisseur-allure-course", "/calcul-vma", "/calcul-calories-sport", "/calcul-ftp-cyclisme", "/calcul-handicap-golf-whs"],
  "/calcul-classement-tennis-fft": ["/calcul-calories-sport", "/calcul-imc", "/calcul-vma", "/calcul-ftp-cyclisme"],
  "/calcul-rapport-taille-tour-de-taille": ["/calcul-imc", "/calcul-masse-grasse", "/calcul-ffmi", "/calcul-poids-ideal"],
  "/calcul-age-chien-humain": ["/calcul-age-chat-humain", "/calcul-ration-chien", "/calcul-calories-chien-chat", "/calcul-dose-medicament-animaux"],
  "/calcul-age-chat-humain": ["/calcul-age-chien-humain", "/calcul-calories-chien-chat", "/calcul-dose-medicament-animaux", "/calcul-age"],
  "/calcul-ration-chien": ["/calcul-calories-chien-chat", "/calcul-age-chien-humain", "/calcul-dose-medicament-animaux", "/calcul-age-chat-humain"],
  "/calcul-calories-chien-chat": ["/calcul-ration-chien", "/calcul-age-chien-humain", "/calcul-age-chat-humain", "/calcul-calories"],
  "/calcul-dose-medicament-animaux": ["/calcul-age-chien-humain", "/calcul-age-chat-humain", "/calcul-ration-chien", "/calcul-calories-chien-chat"],
  "/calcul-signe-zodiaque": ["/calcul-ascendant-astrologique", "/signe-astrologique-chinois", "/calcul-signe-lunaire", "/compatibilite-signes-astrologiques"],
  "/calcul-chemin-de-vie": ["/numerologie-nom-prenom", "/calcul-signe-zodiaque", "/calcul-ascendant-astrologique", "/calcul-age"],
  "/compatibilite-signes-astrologiques": ["/calcul-signe-zodiaque", "/calcul-ascendant-astrologique", "/calcul-signe-lunaire", "/calcul-chemin-de-vie"],
  "/calcul-signe-lunaire": ["/calcul-signe-zodiaque", "/calcul-ascendant-astrologique", "/compatibilite-signes-astrologiques", "/signe-astrologique-chinois"],
  "/numerologie-nom-prenom": ["/calcul-chemin-de-vie", "/calcul-signe-zodiaque", "/calcul-age", "/calcul-ascendant-astrologique"],
  "/calcul-mention-bac": ["/calcul-moyenne", "/calcul-pourcentage", "/calcul-gratification-stage", "/simulateur-salaire-alternant"],
  "/calcul-age-corrige-prema": ["/calcul-percentile-bebe", "/calcul-date-accouchement", "/calcul-ovulation", "/calcul-age"],
  "/calcul-percentile-bebe": ["/calcul-age-corrige-prema", "/calcul-imc", "/calcul-date-accouchement", "/calcul-prise-poids-grossesse"],
  "/calcul-cycles-sommeil": ["/calcul-dette-sommeil", "/calcul-besoin-sommeil", "/calcul-score-stress", "/calcul-metabolisme-base"],
  "/calcul-dette-sommeil": ["/calcul-cycles-sommeil", "/calcul-besoin-sommeil", "/calcul-score-stress", "/test-burnout-mbi"],
  "/test-depression-phq9": ["/test-anxiete-gad7", "/test-burnout-mbi", "/calcul-score-stress", "/calcul-besoin-sommeil"],
  "/test-anxiete-gad7": ["/test-depression-phq9", "/test-burnout-mbi", "/calcul-score-stress", "/calcul-dette-sommeil"],
  "/test-burnout-mbi": ["/test-depression-phq9", "/test-anxiete-gad7", "/calcul-score-stress", "/calcul-dette-sommeil"],
  "/calcul-cote-argus-voiture": ["/simulateur-cout-voiture", "/calcul-cout-trajet-voiture", "/calcul-malus-ecologique", "/calcul-vignette-critair"],
  "/calcul-cout-trajet-voiture": ["/calcul-consommation-essence", "/calcul-indemnites-kilometriques", "/calcul-cout-kilometrique", "/simulateur-cout-voiture", "/calcul-cote-argus-voiture"],
  "/prix-travaux-maison": ["/modele-devis-btp", "/prix-macon", "/prix-electricien", "/prix-plombier", "/verificateur-devis"],
  "/calculateur-gain-pari": ["/calculateur-pari-combine", "/convertisseur-cote-probabilite", "/calcul-pourcentage", "/convertisseur-devises"],
  "/calculateur-pari-combine": ["/calculateur-gain-pari", "/convertisseur-cote-probabilite", "/calcul-pourcentage", "/calcul-tva"],
  "/convertisseur-cote-probabilite": ["/calculateur-gain-pari", "/calculateur-pari-combine", "/calcul-pourcentage", "/convertisseur-devises"],
  "/calcul-puissance-climatisation": ["/cout-climatisation", "/rafraichir-maison-sans-clim", "/calcul-consommation-electrique", "/calcul-temperature-ressentie"],
  "/calcul-temperature-ressentie": ["/rafraichir-maison-sans-clim", "/calcul-puissance-climatisation", "/calcul-consommation-eau", "/conversion-temperature"],
  "/rafraichir-maison-sans-clim": ["/cout-climatisation", "/calcul-puissance-climatisation", "/calcul-temperature-ressentie", "/calcul-consommation-electrique"],
  "/cout-climatisation": ["/calcul-puissance-climatisation", "/rafraichir-maison-sans-clim", "/calcul-consommation-electrique", "/calcul-temperature-ressentie"],
};

interface RelatedCalculatorsProps {
  currentSlug: string;
}

export default function RelatedCalculators({ currentSlug }: RelatedCalculatorsProps) {
  const relatedSlugs = RELATED_MAP[currentSlug] || [];
  const related = relatedSlugs
    .map((slug) => ALL_CALCULATORS.find((c) => c.slug === slug))
    .filter(Boolean);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-800 mb-6">
        Calculateurs similaires
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((calc) => (
          <a
            key={calc!.slug}
            href={calc!.slug}
            className="group bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className={`w-10 h-10 bg-gradient-to-br ${calc!.color} rounded-lg flex items-center justify-center text-lg shadow-sm`}>
              {calc!.emoji}
            </div>
            <p className="text-sm font-semibold text-slate-700 mt-3 group-hover:text-blue-600 transition-colors">
              {calc!.title}
            </p>
            <div className="mt-2 text-xs font-medium text-blue-600 flex items-center gap-1">
              Calculer
              <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
