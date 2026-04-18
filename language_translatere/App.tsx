import { useState } from "react";
import { Header } from "./components/Header";
import { TranslatorCard } from "./components/TranslatorCard";
import { TranslationHistory } from "./components/TranslationHistory";
import { LanguagePreset } from "./components/LanguagePreset";
import { TranslationStats } from "./components/TranslationStats";
import { Translation } from "./types/translation";

export default function App() {
  const [history, setHistory] = useState<Translation[]>([]);
  const [sourceLang, setSourceLang] = useState("english");
  const [targetLang, setTargetLang] = useState("spanish");

  const addToHistory = (translation: Translation) => {
    setHistory((prev) => [translation, ...prev].slice(0, 20));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LanguagePreset
              sourceLang={sourceLang}
              targetLang={targetLang}
              onSourceChange={setSourceLang}
              onTargetChange={setTargetLang}
            />
            <TranslatorCard
              sourceLang={sourceLang}
              targetLang={targetLang}
              onTranslate={addToHistory}
            />
            <TranslationStats history={history} />
          </div>
          <div className="lg:col-span-1">
            <TranslationHistory history={history} onClear={clearHistory} />
          </div>
        </div>
      </main>
    </div>
  );
}