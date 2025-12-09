import React, { useState } from 'react';
import { SEOResult } from '../types';
import { Button } from './Button';
import { Copy, Check, FileText, Youtube, Hash, Type } from 'lucide-react';

interface ResultsSectionProps {
  data: SEOResult;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ data }) => {
  const [copiedTags, setCopiedTags] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);
  const [copiedTitleIndex, setCopiedTitleIndex] = useState<number | null>(null);

  const handleCopyTags = () => {
    // Join with commas for YouTube tags format
    const tags = data.keywords.join(',');
    navigator.clipboard.writeText(tags);
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  const handleCopyTitle = (title: string, index: number) => {
    navigator.clipboard.writeText(title);
    setCopiedTitleIndex(index);
    setTimeout(() => setCopiedTitleIndex(null), 2000);
  };

  const handleCopyDesc = () => {
    navigator.clipboard.writeText(data.suggestedDescription);
    setCopiedDesc(true);
    setTimeout(() => setCopiedDesc(false), 2000);
  };

  return (
    <div className="space-y-10 animate-fade-in-up pb-20">
      
      {/* SECTION 1: Suggested Titles */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-slate-800/80 p-6 border-b border-slate-700 flex items-center gap-3">
          <div className="bg-red-500/10 p-2 rounded-lg">
             <Youtube className="text-red-500" size={24} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">العناوين المقترحة (الأعلى بحثاً)</h2>
            <p className="text-slate-400 text-sm">مرتبة حسب احتمالية البحث والنقر (CTR)</p>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-4">
          {data.suggestedTitles.map((title, idx) => (
            <div key={idx} className="group bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center justify-between hover:border-slate-600 transition-all hover:bg-slate-800/80 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 text-slate-500 font-bold text-sm border border-slate-700">
                  {idx + 1}
                </span>
                <p className="text-lg text-slate-200 font-medium select-all">{title}</p>
              </div>
              <button 
                onClick={() => handleCopyTitle(title, idx)}
                className="text-slate-500 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
                title="نسخ العنوان"
              >
                {copiedTitleIndex === idx ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* SECTION 2: Ready Keywords (Tags) */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full">
          <div className="bg-slate-800/80 p-6 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 p-2 rounded-lg">
                <Hash className="text-blue-500" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">الكلمات الدلالية (Tags)</h2>
                <p className="text-slate-400 text-sm">{data.keywords.length} كلمة جاهزة للنسخ</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleCopyTags} className="text-xs px-3 py-2 h-auto gap-1">
              {copiedTags ? <Check size={14} /> : <Copy size={14} />}
              {copiedTags ? "تم النسخ" : "نسخ الكل"}
            </Button>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-2">
              {data.keywords.map((keyword, index) => (
                <span 
                  key={index} 
                  className="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg text-sm hover:text-white hover:border-slate-500 transition-colors select-all cursor-default"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <div className="mt-6 p-4 bg-slate-950/50 rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs text-center">
              💡 نصيحة: انسخ هذه الكلمات وضعها مباشرة في صندوق "العلامات" (Tags) في استوديو يوتيوب.
            </div>
          </div>
        </div>

        {/* SECTION 3: Professional Description */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full">
          <div className="bg-slate-800/80 p-6 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="bg-purple-500/10 p-2 rounded-lg">
                <Type className="text-purple-500" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">الوصف الاحترافي</h2>
                <p className="text-slate-400 text-sm">متوافق مع SEO 2025</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleCopyDesc} className="text-xs px-3 py-2 h-auto gap-1">
              {copiedDesc ? <Check size={14} /> : <Copy size={14} />}
              {copiedDesc ? "تم النسخ" : "نسخ الوصف"}
            </Button>
          </div>
          
          <div className="p-6 md:p-8 flex-grow">
            <div className="bg-slate-950/30 p-6 rounded-2xl border border-slate-800 h-full">
              <p className="text-slate-300 leading-8 whitespace-pre-line select-all text-justify">
                {data.suggestedDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};