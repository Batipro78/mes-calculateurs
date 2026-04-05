import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

const PROMPT_SYSTEM = `Tu es un expert juridique francais specialise dans la conformite des devis professionnels.
Analyse le texte du devis fourni et verifie la presence des 16 mentions obligatoires pour un devis professionnel en France (2026).

Pour chaque mention, reponds par:
- "present" si la mention est clairement presente dans le devis
- "absent" si la mention est manquante
- "partiel" si la mention est partiellement presente ou ambigue

Les 16 mentions obligatoires sont:
1. Date du devis
2. Numero du devis
3. Nom et adresse de l'entreprise
4. Numero SIRET
5. Forme juridique (SARL, SAS, EI, etc.)
6. Nom et adresse du client
7. Description detaillee des travaux/prestations
8. Quantites et prix unitaires HT
9. Taux de TVA applicable(s)
10. Montant total HT et TTC
11. Duree de validite du devis
12. Conditions de paiement (echeancier, acompte)
13. Assurance decennale (numero de police + nom assureur) - obligatoire BTP
14. Mention gestion des dechets (obligatoire travaux depuis 2021)
15. Date de debut et duree estimee des travaux
16. Signature et mention "Devis recu avant execution des travaux"

Reponds UNIQUEMENT en JSON valide avec cette structure exacte:
{
  "mentions": [
    { "id": 1, "label": "Date du devis", "status": "present|absent|partiel", "detail": "courte explication" },
    ...
  ],
  "score": nombre de mentions presentes sur 16,
  "verdict": "conforme" si score >= 14, "a corriger" si score >= 10, "non conforme" si score < 10,
  "resume": "resume en 2 phrases max"
}`;

export async function POST(request: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "Cle API Gemini non configuree" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { text, imageBase64, mimeType } = body;

    if (!text && !imageBase64) {
      return NextResponse.json({ error: "Aucun contenu a analyser" }, { status: 400 });
    }

    // Build parts for Gemini
    const parts: { text?: string; inlineData?: { mimeType: string; data: string } }[] = [
      { text: PROMPT_SYSTEM + "\n\nVoici le contenu du devis a analyser:\n" },
    ];

    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: mimeType || "image/jpeg",
          data: imageBase64,
        },
      });
      parts.push({ text: "\nAnalyse ce devis et verifie les 16 mentions obligatoires." });
    } else if (text) {
      parts.push({ text: text });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: "Erreur API Gemini", detail: err }, { status: 502 });
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      return NextResponse.json({ error: "Reponse vide de Gemini" }, { status: 502 });
    }

    const result = JSON.parse(content);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: "Erreur interne", detail: String(err) }, { status: 500 });
  }
}
