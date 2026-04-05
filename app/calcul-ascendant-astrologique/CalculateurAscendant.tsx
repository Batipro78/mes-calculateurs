"use client";
import { useState, useMemo } from "react";

interface SigneInfo {
  nom: string;
  symbole: string;
  dates: string;
  element: string;
  planete: string;
  personnalite: string;
  qualites: string[];
  defauts: string[];
  svg: string;
}

const SIGNES: SigneInfo[] = [
  { nom: "Belier", symbole: "\u2648", dates: "21 mars - 19 avril", element: "Feu", planete: "Mars",
    personnalite: "Le Belier est un leader ne, fonceur et passionne. Il aime l'action, deteste attendre et se lance dans les projets avec une energie debordante. Spontane et direct, il dit ce qu'il pense sans filtre.",
    qualites: ["Courageux", "Dynamique", "Confiant", "Enthousiaste"],
    defauts: ["Impatient", "Impulsif", "Agressif", "Egocentrique"],
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M30 80 Q30 30 50 20 Q70 30 70 80"/><path d="M50 20 L50 5"/><circle cx="35" cy="15" r="8"/><circle cx="65" cy="15" r="8"/></svg>` },
  { nom: "Taureau", symbole: "\u2649", dates: "20 avril - 20 mai", element: "Terre", planete: "Venus",
    personnalite: "Le Taureau est stable, patient et sensuel. Il aime le confort, la bonne nourriture et la securite materielle. Tres loyal, il est un ami et partenaire fiable sur qui on peut compter.",
    qualites: ["Fiable", "Patient", "Determine", "Sensuel"],
    defauts: ["Tetu", "Possessif", "Materialiste", "Resistant au changement"],
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="50" cy="55" r="25"/><path d="M25 55 Q15 30 25 15"/><path d="M75 55 Q85 30 75 15"/><circle cx="42" cy="50" r="3" fill="currentColor"/><circle cx="58" cy="50" r="3" fill="currentColor"/><path d="M42 65 Q50 72 58 65"/></svg>` },
  { nom: "Gemeaux", symbole: "\u264A", dates: "21 mai - 20 juin", element: "Air", planete: "Mercure",
    personnalite: "Les Gemeaux sont curieux, communicatifs et adaptables. Ils adorent apprendre, echanger et decouvrir. Leur esprit vif et leur humour en font des compagnons tres agreables, bien que parfois superficiels.",
    qualites: ["Communicatif", "Adaptable", "Intellectuel", "Drole"],
    defauts: ["Inconstant", "Nerveux", "Superficiel", "Indecis"],
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M30 15 L30 85"/><path d="M70 15 L70 85"/><path d="M30 15 Q50 5 70 15"/><path d="M30 85 Q50 95 70 85"/></svg>` },
  { nom: "Cancer", symbole: "\u264B", dates: "21 juin - 22 juillet", element: "Eau", planete: "Lune",
    personnalite: "Le Cancer est emotif, protecteur et tres attache a sa famille. Il a une grande sensibilite et une intuition remarquable. Son foyer est son refuge, et il prend soin de ses proches avec devouement.",
    qualites: ["Protecteur", "Intuitif", "Loyal", "Empathique"],
    defauts: ["Susceptible", "Lunatique", "Possessif", "Rancunier"],
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="35" cy="40" r="15"/><circle cx="65" cy="60" r="15"/><path d="M50 40 Q70 20 80 40"/><path d="M50 60 Q30 80 20 60"/></svg>` },
  { nom: "Lion", symbole: "\u264C", dates: "23 juillet - 22 aout", element: "Feu", planete: "Soleil",
    personnalite: "Le Lion est charismatique, genereux et theatral. Il adore etre au centre de l'attention et inspire naturellement les autres. Son energie solaire et sa confiance en font un leader naturel.",
    qualites: ["Charismatique", "Genereux", "Creatif", "Loyal"],
    defauts: ["Orgueilleux", "Autoritaire", "Dramatique", "Vaniteux"],
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="50" cy="55" r="20"/><path d="M30 45 Q20 20 40 15 Q50 10 60 15 Q80 20 70 45"/><path d="M35 25 Q30 15 35 10"/><path d="M50 20 Q50 8 55 5"/><path d="M65 25 Q70 15 65 10"/><path d="M50 75 Q50 90 60 95"/></svg>` },
  { nom: "Vierge", symbole: "\u264D", dates: "23 aout - 22 septembre", element: "Terre", planete: "Mercure",
    personnalite: "La Vierge est methodique, analytique et perfectionniste. Elle a le souci du detail et un sens pratique hors pair. Discrete et modeste, elle est souvent la personne la plus fiable de son entourage.",
    qualites: ["Analytique", "Fiable", "Modeste", "Pratique"],
    defauts: ["Perfectionniste", "Critique", "Anxieux", "Timide"],
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M25 20 L25 70 Q25 85 40 80"/><path d="M25 45 Q35 35 45 45 L45 70 Q45 85 60 80"/><path d="M45 45 Q55 35 65 45 L65 70"/><path d="M65 60 Q75 55 80 65 Q85 75 75 80"/></svg>` },
  { nom: "Balance", symbole: "\u264E", dates: "23 septembre - 22 octobre", element: "Air", planete: "Venus",
    personnalite: "La Balance recherche l'harmonie, l'equilibre et la beaute en toute chose. Diplomate nee, elle deteste les conflits et sait trouver le compromis. Elle a un gout prononce pour l'art et l'esthetique.",
    qualites: ["Diplomate", "Juste", "Social", "Esthetique"],
    defauts: ["Indecis", "Superficiel", "Dependant", "Evite les conflits"],
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="20" y1="75" x2="80" y2="75"/><line x1="50" y1="75" x2="50" y2="35"/><line x1="25" y1="35" x2="75" y2="35"/><path d="M25 35 L15 55 Q25 62 35 55 Z"/><path d="M75 35 L65 55 Q75 62 85 55 Z"/></svg>` },
  { nom: "Scorpion", symbole: "\u264F", dates: "23 octobre - 21 novembre", element: "Eau", planete: "Pluton",
    personnalite: "Le Scorpion est intense, mysterieux et passionne. Il vit ses emotions avec une profondeur rare et possede une volonte de fer. Loyal jusqu'au bout, il ne pardonne cependant pas facilement la trahison.",
    qualites: ["Determine", "Loyal", "Perspicace", "Passionne"],
    defauts: ["Jaloux", "Rancunier", "Manipulateur", "Obsessionnel"],
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M20 25 L20 70 Q20 85 35 75"/><path d="M20 50 Q30 40 40 50 L40 70 Q40 85 55 75"/><path d="M40 50 Q50 40 60 50 L60 70 L75 55"/><path d="M70 50 L80 60 L70 60"/></svg>` },
  { nom: "Sagittaire", symbole: "\u2650", dates: "22 novembre - 21 decembre", element: "Feu", planete: "Jupiter",
    personnalite: "Le Sagittaire est aventurier, optimiste et philosophe. Il a soif de liberte, de voyages et de connaissance. Son enthousiasme est contagieux et il voit toujours le verre a moitie plein.",
    qualites: ["Optimiste", "Aventurier", "Honnete", "Philosophe"],
    defauts: ["Imprudent", "Impatient", "Tactless", "Inconstant"],
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="25" y1="80" x2="75" y2="20"/><path d="M75 20 L60 20 M75 20 L75 35"/><line x1="35" y1="55" x2="65" y2="55"/></svg>` },
  { nom: "Capricorne", symbole: "\u2651", dates: "22 decembre - 19 janvier", element: "Terre", planete: "Saturne",
    personnalite: "Le Capricorne est ambitieux, discipline et responsable. Il travaille dur pour atteindre ses objectifs et ne baisse jamais les bras. Patient et perseverant, il bâtit sa reussite pierre par pierre.",
    qualites: ["Ambitieux", "Discipline", "Responsable", "Patient"],
    defauts: ["Froid", "Pessimiste", "Rigide", "Workaholic"],
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M20 70 Q20 20 50 25 Q65 28 60 50 L60 70 Q60 85 75 80 Q85 75 80 60"/><circle cx="80" cy="55" r="10"/></svg>` },
  { nom: "Verseau", symbole: "\u2652", dates: "20 janvier - 18 fevrier", element: "Air", planete: "Uranus",
    personnalite: "Le Verseau est original, independant et humaniste. Il pense differemment et n'a pas peur d'aller a contre-courant. Visionnaire, il s'interesse au progres et au bien-etre collectif.",
    qualites: ["Original", "Independant", "Humaniste", "Visionnaire"],
    defauts: ["Distant", "Imprevisible", "Rebelle", "Detache"],
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M15 35 Q30 25 45 35 Q60 45 75 35 L85 35"/><path d="M15 55 Q30 45 45 55 Q60 65 75 55 L85 55"/></svg>` },
  { nom: "Poissons", symbole: "\u2653", dates: "19 fevrier - 20 mars", element: "Eau", planete: "Neptune",
    personnalite: "Les Poissons sont intuitifs, creatifs et empathiques. Ils ont une sensibilite artistique et emotionnelle hors du commun. Reveurs et compassionnels, ils absorbent les emotions de leur entourage.",
    qualites: ["Intuitif", "Creatif", "Compassionnel", "Adaptable"],
    defauts: ["Reveur", "Naif", "Fuyant", "Influencable"],
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M20 35 Q35 20 50 35 Q35 50 20 35"/><path d="M80 65 Q65 50 50 65 Q65 80 80 65"/><line x1="50" y1="25" x2="50" y2="75"/></svg>` },
];

// Calcul du signe solaire
function getSigneSolaire(jour: number, mois: number): number {
  const dates = [[20,1],[19,2],[20,3],[20,4],[21,5],[21,6],[22,7],[23,8],[23,9],[23,10],[22,11],[22,12]];
  // Index: 0=Capricorne(dec22-jan19), on utilise une table de lookup
  const signeParMoisJour: [number, number, number][] = [
    // [mois, jourLimite, signeAvant]
    [1, 19, 9],  // avant 20 jan = Capricorne(9)
    [2, 18, 10], // avant 19 fev = Verseau(10)
    [3, 20, 11], // avant 21 mars = Poissons(11)
    [4, 19, 0],  // avant 20 avr = Belier(0)
    [5, 20, 1],  // avant 21 mai = Taureau(1)
    [6, 20, 2],  // avant 21 juin = Gemeaux(2)
    [7, 22, 3],  // avant 23 juil = Cancer(3)
    [8, 22, 4],  // avant 23 aout = Lion(4)
    [9, 22, 5],  // avant 23 sept = Vierge(5)
    [10, 22, 6], // avant 23 oct = Balance(6)
    [11, 21, 7], // avant 22 nov = Scorpion(7)
    [12, 21, 8], // avant 22 dec = Sagittaire(8)
  ];

  const entry = signeParMoisJour[mois - 1];
  if (jour <= entry[1]) return entry[2];
  return (entry[2] + 1) % 12;
}

// Calcul simplifie de l'ascendant (approximation basee sur l'heure de naissance)
function getAscendant(signeSolaire: number, heure: number): number {
  // L'ascendant change toutes les ~2h. A 6h du matin, l'ascendant = signe solaire
  const decalage = Math.floor(((heure - 6 + 24) % 24) / 2);
  return (signeSolaire + decalage) % 12;
}

export default function CalculateurAscendant() {
  const [jour, setJour] = useState<string>("15");
  const [mois, setMois] = useState<string>("6");
  const [annee, setAnnee] = useState<string>("1990");
  const [heure, setHeure] = useState<string>("14");
  const [minute, setMinute] = useState<string>("30");

  const resultat = useMemo(() => {
    const j = parseInt(jour);
    const m = parseInt(mois);
    const h = parseInt(heure);
    const min = parseInt(minute);
    if (isNaN(j) || isNaN(m) || isNaN(h) || j < 1 || j > 31 || m < 1 || m > 12 || h < 0 || h > 23) return null;

    const heureDecimale = h + (min || 0) / 60;
    const idxSolaire = getSigneSolaire(j, m);
    const idxAscendant = getAscendant(idxSolaire, heureDecimale);

    return {
      solaire: SIGNES[idxSolaire],
      ascendant: SIGNES[idxAscendant],
      element: SIGNES[idxSolaire].element,
    };
  }, [jour, mois, heure, minute]);

  return (
    <div className="space-y-8">
      {/* Formulaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-700 mb-4">Votre date et heure de naissance</p>
        <div className="grid grid-cols-5 gap-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Jour</label>
            <input type="text" inputMode="numeric" value={jour} onChange={(e) => setJour(e.target.value)} placeholder="15"
              className="w-full border border-slate-300 rounded-xl px-3 py-3 text-center text-lg font-semibold focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Mois</label>
            <select value={mois} onChange={(e) => setMois(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-2 py-3 text-sm font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white">
              {["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"].map((n, i) => (
                <option key={i} value={i + 1}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Annee</label>
            <input type="text" inputMode="numeric" value={annee} onChange={(e) => setAnnee(e.target.value)} placeholder="1990"
              className="w-full border border-slate-300 rounded-xl px-3 py-3 text-center text-lg font-semibold focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Heure</label>
            <input type="text" inputMode="numeric" value={heure} onChange={(e) => setHeure(e.target.value)} placeholder="14"
              className="w-full border border-slate-300 rounded-xl px-3 py-3 text-center text-lg font-semibold focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Min</label>
            <input type="text" inputMode="numeric" value={minute} onChange={(e) => setMinute(e.target.value)} placeholder="30"
              className="w-full border border-slate-300 rounded-xl px-3 py-3 text-center text-lg font-semibold focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" />
          </div>
        </div>
      </div>

      {resultat && (
        <>
          {/* Signe Solaire */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg shadow-purple-200/50">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center shrink-0" dangerouslySetInnerHTML={{ __html: resultat.solaire.svg.replace('currentColor', 'white') }} />
              <div className="flex-1">
                <p className="text-purple-200 text-sm mb-1">Votre signe solaire</p>
                <p className="text-4xl font-extrabold">{resultat.solaire.symbole} {resultat.solaire.nom}</p>
                <p className="text-purple-200 text-sm mt-1">{resultat.solaire.dates} &middot; {resultat.solaire.element} &middot; {resultat.solaire.planete}</p>
              </div>
            </div>
          </div>

          {/* Ascendant */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg shadow-amber-200/50">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center shrink-0" dangerouslySetInnerHTML={{ __html: resultat.ascendant.svg.replace('currentColor', 'white') }} />
              <div>
                <p className="text-amber-200 text-sm mb-1">Votre ascendant</p>
                <p className="text-2xl font-extrabold">{resultat.ascendant.symbole} {resultat.ascendant.nom}</p>
                <p className="text-amber-200 text-sm mt-1">{resultat.ascendant.element} &middot; {resultat.ascendant.planete}</p>
              </div>
            </div>
          </div>

          {/* Personnalite */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-3">Votre personnalite — {resultat.solaire.nom}</h2>
            <p className="text-slate-600 leading-relaxed mb-4">{resultat.solaire.personnalite}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-green-600 mb-2">Qualites</p>
                <div className="space-y-1">
                  {resultat.solaire.qualites.map((q) => (
                    <div key={q} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">+</span>
                      {q}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-red-500 mb-2">Points faibles</p>
                <div className="space-y-1">
                  {resultat.solaire.defauts.map((d) => (
                    <div key={d} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs">&minus;</span>
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Influence de l'ascendant */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-3">Influence de votre ascendant — {resultat.ascendant.nom}</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Votre ascendant {resultat.ascendant.nom} influence votre apparence et la facon dont les autres vous percoivent au premier contact.
            </p>
            <p className="text-slate-600 leading-relaxed">{resultat.ascendant.personnalite}</p>
          </div>

          {/* Carte recapitulative */}
          <div className="bg-slate-50 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Votre profil astral</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <p className="text-xs text-slate-400">Signe</p>
                <p className="text-2xl">{resultat.solaire.symbole}</p>
                <p className="text-sm font-bold text-slate-700">{resultat.solaire.nom}</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <p className="text-xs text-slate-400">Ascendant</p>
                <p className="text-2xl">{resultat.ascendant.symbole}</p>
                <p className="text-sm font-bold text-slate-700">{resultat.ascendant.nom}</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <p className="text-xs text-slate-400">Element</p>
                <p className="text-2xl">{resultat.solaire.element === "Feu" ? "🔥" : resultat.solaire.element === "Terre" ? "🌍" : resultat.solaire.element === "Air" ? "💨" : "💧"}</p>
                <p className="text-sm font-bold text-slate-700">{resultat.solaire.element}</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <p className="text-xs text-slate-400">Planete</p>
                <p className="text-2xl">{resultat.solaire.planete === "Soleil" ? "☀️" : resultat.solaire.planete === "Lune" ? "🌙" : resultat.solaire.planete === "Mars" ? "♂️" : "⭐"}</p>
                <p className="text-sm font-bold text-slate-700">{resultat.solaire.planete}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
