export interface FaqItem {
  q: string;
  a: string;
}

// FAQ reutilisable : affiche les questions/reponses ET injecte le schema
// FAQPage (rich results Google) a partir de la meme source de donnees.
// La prose passe par des chaines (props), donc pas de souci d'echappement
// d'apostrophes ou de caracteres < / > dans le JSX.
export default function Faq({
  items,
  title = "Questions frequentes",
}: {
  items: FaqItem[];
  title?: string;
}) {
  if (!items.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-xl font-bold text-slate-800 mb-6">{title}</h2>
      <div className="space-y-5">
        {items.map((it, i) => (
          <div key={i} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
            <h3 className="font-semibold text-slate-800 mb-1.5">{it.q}</h3>
            <p className="text-slate-600 leading-relaxed">{it.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
