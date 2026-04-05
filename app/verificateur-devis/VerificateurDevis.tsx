"use client";
import { useState, useCallback } from "react";

interface Mention {
  id: number;
  label: string;
  status: "present" | "absent" | "partiel";
  detail: string;
}

interface Resultat {
  mentions: Mention[];
  score: number;
  verdict: string;
  resume: string;
}

export default function VerificateurDevis() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultat, setResultat] = useState<Resultat | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setResultat(null);
    setErreur(null);

    if (f.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const analyser = async () => {
    if (!file) return;
    setLoading(true);
    setErreur(null);
    setResultat(null);

    try {
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          const base64Data = result.split(",")[1];
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const response = await fetch("/api/verify-devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64,
          mimeType: file.type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErreur(data.error || "Erreur lors de l'analyse");
        return;
      }

      setResultat(data);
    } catch {
      setErreur("Erreur de connexion. Veuillez reessayer.");
    } finally {
      setLoading(false);
    }
  };

  const statusIcon = (status: string) => {
    if (status === "present") return <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">&#10003;</span>;
    if (status === "partiel") return <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold">~</span>;
    return <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold">&#10007;</span>;
  };

  return (
    <div className="space-y-8">
      {/* Zone d'upload */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
          file ? "border-blue-300 bg-blue-50/30" : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/20"
        }`}
      >
        {preview ? (
          <div className="space-y-4">
            <img src={preview} alt="Apercu devis" className="max-h-64 mx-auto rounded-xl shadow-sm" />
            <p className="text-sm text-slate-500">{file?.name}</p>
          </div>
        ) : file ? (
          <div className="space-y-2">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center text-3xl">📄</div>
            <p className="text-sm font-medium text-slate-700">{file.name}</p>
            <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(0)} Ko</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center text-3xl">📋</div>
            <p className="text-slate-600 font-medium">Deposez votre devis ici</p>
            <p className="text-xs text-slate-400">PDF, JPG, PNG (max 10 Mo)</p>
          </div>
        )}

        <label className="mt-4 inline-block px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 cursor-pointer transition-all">
          {file ? "Changer de fichier" : "Choisir un fichier"}
          <input
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </label>
      </div>

      {/* Bouton analyser */}
      {file && !loading && (
        <button
          onClick={analyser}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-200/60 hover:-translate-y-0.5 transition-all"
        >
          Analyser la conformite du devis
        </button>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-8">
          <div className="w-12 h-12 mx-auto border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-slate-500 mt-4 text-sm">Analyse en cours par l&apos;IA...</p>
          <p className="text-xs text-slate-400 mt-1">Verification des 16 mentions obligatoires</p>
        </div>
      )}

      {/* Erreur */}
      {erreur && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <p className="text-red-600 font-medium">{erreur}</p>
        </div>
      )}

      {/* Resultats */}
      {resultat && (
        <div className="space-y-6">
          {/* Score global */}
          <div className={`rounded-2xl p-8 shadow-lg text-white ${
            resultat.verdict === "conforme" ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-200/50" :
            resultat.verdict === "a corriger" ? "bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-200/50" :
            "bg-gradient-to-br from-red-500 to-rose-600 shadow-red-200/50"
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80 mb-1">Score de conformite</p>
                <p className="text-5xl font-extrabold">{resultat.score}<span className="text-2xl font-semibold">/16</span></p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold capitalize">{resultat.verdict}</p>
                <p className="text-sm opacity-80 mt-1">{resultat.resume}</p>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">16 mentions obligatoires</h2>
            <div className="space-y-3">
              {resultat.mentions.map((m) => (
                <div key={m.id} className={`flex items-start gap-3 p-3 rounded-xl ${
                  m.status === "present" ? "bg-green-50/50" : m.status === "partiel" ? "bg-amber-50/50" : "bg-red-50/50"
                }`}>
                  {statusIcon(m.status)}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-700">{m.id}. {m.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{m.detail}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    m.status === "present" ? "bg-green-100 text-green-700" :
                    m.status === "partiel" ? "bg-amber-100 text-amber-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {m.status === "present" ? "OK" : m.status === "partiel" ? "Partiel" : "Manquant"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Legende */}
          <div className="flex gap-4 justify-center text-xs text-slate-500">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Present</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> Partiel</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Manquant</span>
          </div>
        </div>
      )}
    </div>
  );
}
