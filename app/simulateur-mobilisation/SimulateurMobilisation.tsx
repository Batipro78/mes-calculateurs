"use client";

import { useState } from "react";

type Sexe = "homme" | "femme";
type SituationMedicale = "apte" | "chronique" | "handicap";
type ExperienceMilitaire = "aucune" | "jdc" | "reserviste" | "ancien";
type SituationFamiliale = "seul" | "couple" | "parent-isole" | "enfants3plus";
type Profession =
  | "standard"
  | "sante"
  | "securite"
  | "defense"
  | "industrie"
  | "agricole"
  | "transport"
  | "education";

interface Resultat {
  categorie: "prioritaire" | "secondaire" | "reserve" | "exempte";
  label: string;
  couleur: string;
  icone: string;
  description: string;
  details: string[];
  base_legale: string;
}

function calculerMobilisation(
  age: number,
  sexe: Sexe,
  situation_medicale: SituationMedicale,
  experience: ExperienceMilitaire,
  profession: Profession,
  situation_familiale: SituationFamiliale
): Resultat {
  // Exemptions absolues
  if (age < 18 || age > 72) {
    return {
      categorie: "exempte",
      label: "Non mobilisable",
      couleur: "bg-green-100 text-green-800 border-green-300",
      icone: "🟢",
      description:
        age < 18
          ? "Vous etes mineur(e). La mobilisation ne concerne que les personnes agees de 18 a 72 ans."
          : "Vous avez depasse la limite d'age de 72 ans fixee pour la mobilisation generale.",
      details: [
        age < 18
          ? "Les mineurs ne peuvent pas etre mobilises, meme en cas de conflit majeur"
          : "Au-dela de 72 ans, vous etes exempte de toute obligation de mobilisation",
        "Cette limite est fixee par le Code de la defense",
      ],
      base_legale: "Articles L4221-1 et suivants du Code de la defense",
    };
  }

  if (situation_medicale === "handicap") {
    return {
      categorie: "exempte",
      label: "Exempte (medical)",
      couleur: "bg-green-100 text-green-800 border-green-300",
      icone: "🟢",
      description:
        "Votre situation medicale vous exempte de mobilisation. Les personnes en situation de handicap ou avec une pathologie grave certifiee sont dispensees.",
      details: [
        "Exemption medicale prononcee par une commission de reforme",
        "Certificat medical necessaire en cas de mobilisation reelle",
        "Possibilite de contribuer volontairement sur des postes adaptes",
      ],
      base_legale: "Article L4139-14 du Code de la defense",
    };
  }

  // Score de priorite
  let score = 0;
  const details: string[] = [];

  // Experience militaire (facteur principal)
  if (experience === "ancien") {
    score += 40;
    details.push(
      "Ancien militaire : vous seriez rappele en priorite pour vos competences operationnelles"
    );
  } else if (experience === "reserviste") {
    score += 35;
    details.push(
      "Reserviste : vous etes deja engage dans la reserve et mobilisable rapidement"
    );
  } else if (experience === "jdc") {
    score += 5;
    details.push(
      "JDC effectuee : vous avez rempli votre obligation de recensement"
    );
  } else {
    score += 0;
    details.push(
      "Aucune experience militaire : vous seriez mobilise en dernier recours"
    );
  }

  // Age
  if (age >= 18 && age <= 35) {
    score += 25;
    details.push(
      "18-35 ans : tranche d'age prioritaire pour la mobilisation"
    );
  } else if (age >= 36 && age <= 50) {
    score += 15;
    details.push(
      "36-50 ans : mobilisable en deuxieme vague"
    );
  } else if (age >= 51 && age <= 60) {
    score += 8;
    details.push(
      "51-60 ans : mobilisable pour des postes de soutien et logistique"
    );
  } else {
    score += 3;
    details.push(
      "61-72 ans : mobilisable uniquement en dernier recours, postes non-combattants"
    );
  }

  // Sexe
  if (sexe === "homme") {
    score += 10;
    details.push(
      "Homme : historiquement, les hommes sont mobilises en priorite"
    );
  } else {
    score += 5;
    details.push(
      "Femme : mobilisable au meme titre que les hommes depuis 1997, mais souvent en second temps dans la pratique historique"
    );
  }

  // Situation medicale
  if (situation_medicale === "chronique") {
    score -= 10;
    details.push(
      "Pathologie chronique : possible exemption partielle ou affectation a un poste adapte, selon la gravite (decidee par commission medicale)"
    );
  }

  // Profession strategique
  if (profession === "defense") {
    score += 15;
    details.push(
      "Secteur defense/armement : profil prioritaire, competences directement utilisables"
    );
  } else if (profession === "securite") {
    score -= 5;
    details.push(
      "Forces de l'ordre / securite : possibilite de maintien a votre poste civil pour assurer l'ordre interieur"
    );
  } else if (profession === "sante") {
    score -= 5;
    details.push(
      "Professionnel de sante : possible maintien en poste civil pour soigner les civils, ou affectation au service de sante des armees"
    );
  } else if (profession === "industrie") {
    score += 5;
    details.push(
      "Secteur industriel : competences potentiellement utiles pour l'effort de guerre (production, logistique)"
    );
  } else if (profession === "agricole") {
    score -= 3;
    details.push(
      "Secteur agricole : possible maintien pour assurer l'approvisionnement alimentaire"
    );
  } else if (profession === "transport") {
    score += 5;
    details.push(
      "Secteur transport : competences logistiques utiles, mobilisation probable"
    );
  } else if (profession === "education") {
    score -= 3;
    details.push(
      "Secteur education : pas de priorite particuliere, mais possible maintien en fonction civile"
    );
  }

  // Situation familiale
  if (situation_familiale === "parent-isole") {
    score -= 10;
    details.push(
      "Parent isole : possible report ou exemption pour assurer la charge de vos enfants"
    );
  } else if (situation_familiale === "enfants3plus") {
    score -= 5;
    details.push(
      "3 enfants ou plus : possible report pour charge familiale importante"
    );
  }

  // Determination de la categorie
  if (score >= 40) {
    return {
      categorie: "prioritaire",
      label: "Mobilisation prioritaire",
      couleur: "bg-red-100 text-red-800 border-red-300",
      icone: "🔴",
      description:
        "Selon votre profil, vous seriez mobilise en priorite en cas de mobilisation generale. Votre experience militaire et votre profil correspondent aux besoins immediats des armees.",
      details,
      base_legale:
        "Articles L2141-1 a L2142-1 du Code de la defense — Titre IV : Mobilisation et mise en garde",
    };
  } else if (score >= 25) {
    return {
      categorie: "secondaire",
      label: "Mobilisation probable",
      couleur: "bg-orange-100 text-orange-800 border-orange-300",
      icone: "🟠",
      description:
        "Votre profil correspond a une mobilisation en deuxieme vague. Vous pourriez etre appele si le conflit necessite des renforts au-dela des forces actives et des reservistes.",
      details,
      base_legale:
        "Articles L2141-1 a L2142-1 du Code de la defense — Titre IV : Mobilisation et mise en garde",
    };
  } else if (score >= 10) {
    return {
      categorie: "reserve",
      label: "Mobilisation peu probable",
      couleur: "bg-yellow-100 text-yellow-800 border-yellow-300",
      icone: "🟡",
      description:
        "Selon votre profil, une mobilisation serait peu probable sauf en cas de conflit prolonge necessitant un effort national massif. Vous pourriez etre affecte a des postes de soutien.",
      details,
      base_legale:
        "Articles L2141-1 a L2142-1 du Code de la defense — Titre IV : Mobilisation et mise en garde",
    };
  } else {
    return {
      categorie: "exempte",
      label: "Mobilisation tres peu probable",
      couleur: "bg-green-100 text-green-800 border-green-300",
      icone: "🟢",
      description:
        "Votre profil rend une mobilisation tres peu probable. Plusieurs facteurs (age, situation familiale, sante, profession) jouent en faveur d'une exemption ou d'un maintien en poste civil.",
      details,
      base_legale:
        "Articles L2141-1 a L2142-1 du Code de la defense — Titre IV : Mobilisation et mise en garde",
    };
  }
}

export default function SimulateurMobilisation() {
  const [age, setAge] = useState<string>("30");
  const [sexe, setSexe] = useState<Sexe>("homme");
  const [situationMedicale, setSituationMedicale] =
    useState<SituationMedicale>("apte");
  const [experience, setExperience] =
    useState<ExperienceMilitaire>("jdc");
  const [profession, setProfession] = useState<Profession>("standard");
  const [situationFamiliale, setSituationFamiliale] =
    useState<SituationFamiliale>("seul");
  const [afficher, setAfficher] = useState(false);

  const ageNum = parseInt(age) || 0;
  const resultat = calculerMobilisation(
    ageNum,
    sexe,
    situationMedicale,
    experience,
    profession,
    situationFamiliale
  );

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Age */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Votre age
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              setAfficher(false);
            }}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-lg font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Ex : 30"
          />
        </div>

        {/* Sexe */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Sexe
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { val: "homme", label: "Homme", icon: "👨" },
                { val: "femme", label: "Femme", icon: "👩" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.val}
                onClick={() => {
                  setSexe(opt.val);
                  setAfficher(false);
                }}
                className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all ${
                  sexe === opt.val
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {opt.icon} {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Situation medicale */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Situation medicale
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(
              [
                { val: "apte", label: "Apte", desc: "Bonne sante generale" },
                {
                  val: "chronique",
                  label: "Pathologie chronique",
                  desc: "Diabete, asthme, etc.",
                },
                {
                  val: "handicap",
                  label: "Handicap / Grave",
                  desc: "Incapacite certifiee",
                },
              ] as const
            ).map((opt) => (
              <button
                key={opt.val}
                onClick={() => {
                  setSituationMedicale(opt.val);
                  setAfficher(false);
                }}
                className={`rounded-xl border-2 px-4 py-3 text-left transition-all ${
                  situationMedicale === opt.val
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <p className="text-sm font-semibold text-slate-700">
                  {opt.label}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Experience militaire */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Experience militaire
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { val: "aucune", label: "Aucune" },
                { val: "jdc", label: "JDC effectuee" },
                { val: "reserviste", label: "Reserviste" },
                { val: "ancien", label: "Ancien militaire" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.val}
                onClick={() => {
                  setExperience(opt.val);
                  setAfficher(false);
                }}
                className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all ${
                  experience === opt.val
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Profession */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Secteur professionnel
          </label>
          <select
            value={profession}
            onChange={(e) => {
              setProfession(e.target.value as Profession);
              setAfficher(false);
            }}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="standard">Autre / Sans emploi</option>
            <option value="sante">Sante (medecin, infirmier...)</option>
            <option value="securite">
              Securite (police, gendarmerie, pompier)
            </option>
            <option value="defense">Defense / Armement</option>
            <option value="industrie">Industrie / BTP</option>
            <option value="agricole">Agriculture / Agroalimentaire</option>
            <option value="transport">Transport / Logistique</option>
            <option value="education">Education / Enseignement</option>
          </select>
        </div>

        {/* Situation familiale */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Situation familiale
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { val: "seul", label: "Celibataire / Couple sans enfant" },
                { val: "couple", label: "En couple avec enfant(s)" },
                { val: "parent-isole", label: "Parent isole" },
                { val: "enfants3plus", label: "3 enfants ou plus" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.val}
                onClick={() => {
                  setSituationFamiliale(opt.val);
                  setAfficher(false);
                }}
                className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold text-left transition-all ${
                  situationFamiliale === opt.val
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bouton */}
        <button
          onClick={() => setAfficher(true)}
          className="w-full bg-gradient-to-r from-slate-700 to-slate-900 text-white font-bold py-4 rounded-xl hover:from-slate-800 hover:to-black transition-all shadow-lg hover:shadow-xl"
        >
          Analyser mon profil
        </button>
      </div>

      {/* Resultat - 2 cols */}
      <div className="lg:col-span-2">
        {!afficher ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center">
            <div className="text-5xl mb-3">🪖</div>
            <p className="text-slate-400 text-sm">
              Remplissez le formulaire et cliquez sur &laquo;&nbsp;Analyser mon
              profil&nbsp;&raquo; pour voir votre resultat.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Categorie principale */}
            <div
              className={`rounded-2xl border-2 p-6 ${resultat.couleur}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{resultat.icone}</span>
                <h3 className="text-xl font-extrabold">{resultat.label}</h3>
              </div>
              <p className="text-sm leading-relaxed">{resultat.description}</p>
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-3">
                Analyse detaillee de votre profil
              </h4>
              <ul className="space-y-2">
                {resultat.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-slate-400 mt-0.5">&#8226;</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Base legale */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <h4 className="font-bold text-slate-700 mb-2 text-sm">
                Base legale
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {resultat.base_legale}
              </p>
            </div>

            {/* Avertissement */}
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Avertissement :</strong> Ce simulateur est un outil
                informatif base sur les textes legislatifs en vigueur (Code de
                la defense). Il ne constitue en aucun cas un avis juridique
                officiel. En cas de mobilisation reelle, seules les autorites
                militaires competentes determinent qui est mobilise.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
