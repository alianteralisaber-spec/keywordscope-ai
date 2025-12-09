import React, { useState } from 'react';
import { Search, Globe, Sparkles, PenTool } from 'lucide-react';
import { NICHES, COUNTRIES, APP_NAME, APP_DESC } from './constants';
import { generateKeywords } from './services/geminiService';
import { SEOResult } from './types';
import { ResultsSection } from './components/ResultsSection';
import { Button } from './components/Button';

const App: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [country, setCountry] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SEOResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche || !country) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateKeywords(niche, country, topic);
      setResult(data);
    } catch (err) {
      setError("حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى لاحقاً.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500 selection:text-white">
      {/* Header Background Gradient */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none z-0"></div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Header */}
        <header className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-slate-800/50 border border-slate-700 shadow-xl mb-4">
            <Sparkles className="text-blue-400 w-8 h-8 ml-2" />
            <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight">
              {APP_NAME}
            </h1>
          </div>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            {APP_DESC}
          </p>
        </header>

        {/* Input Form */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl mb-12">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            
            {/* Niche Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300 mr-1">
                اختر التخصص (Niche) *
              </label>
              <div className="relative group">
                <Search className="absolute right-4 top-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" size={20} />
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full bg-slate-800 text-white border-2 border-slate-700 rounded-xl py-3 pr-12 pl-4 appearance-none focus:border-blue-500 focus:ring-0 transition-colors cursor-pointer hover:border-slate-600"
                  required
                >
                  <option value="" disabled>ما هو محتوى قناتك؟</option>
                  {NICHES.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                  <option value="other">أخرى (Other)</option>
                </select>
              </div>
            </div>

            {/* Country Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300 mr-1">
                الدولة المستهدفة *
              </label>
              <div className="relative group">
                <Globe className="absolute right-4 top-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" size={20} />
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-slate-800 text-white border-2 border-slate-700 rounded-xl py-3 pr-12 pl-4 appearance-none focus:border-emerald-500 focus:ring-0 transition-colors cursor-pointer hover:border-slate-600"
                  required
                >
                  <option value="" disabled>أين هو جمهورك؟</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Topic Input (Specific Request) */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mr-1 text-right">
                 ما هو موضوع الفيديو الذي تريد إنشاء عنوانه ووصفه؟
              </label>
              <div className="relative group">
                <PenTool className="absolute right-4 top-3.5 text-slate-500 group-hover:text-purple-400 transition-colors" size={20} />
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="مثلاً: مراجعة آيفون 16، طريقة عمل البيتزا، نصائح للمذاكرة..."
                  className="w-full bg-slate-800 text-white border-2 border-slate-700 rounded-xl py-3 pr-12 pl-4 focus:border-purple-500 focus:ring-0 transition-colors hover:border-slate-600 placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-2">
              <Button 
                type="submit" 
                className="w-full h-[56px] text-lg" 
                isLoading={loading}
                disabled={!niche || !country}
              >
                {topic ? 'تحليل وإنشاء المحتوى' : 'تحليل الكلمات الدلالية'}
              </Button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-200 p-4 rounded-xl text-center mb-8 animate-pulse">
            {error}
          </div>
        )}

        {/* Results Area */}
        {result && <ResultsSection data={result} />}

      </div>
    </div>
  );
};

export default App;