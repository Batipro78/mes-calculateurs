export interface HowToStep {
  name: string;
  text: string;
}

// Injecte un schema.org HowTo (etapes de calcul) en JSON-LD.
// Composant invisible : aide les moteurs IA (et le balisage structure) a
// comprendre la procedure de calcul de la page, etape par etape.
export default function HowToJsonLd({
  name,
  steps,
}: {
  name: string;
  steps: HowToStep[];
}) {
  if (!steps.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // On echappe < : JSON.stringify ne le fait pas, et un texte contenant
        // </script fermerait la balise et casserait silencieusement la page.
        __html: JSON.stringify(jsonLd).replace(/</g, String.fromCharCode(92) + "u003c"),
      }}
    />
  );
}
