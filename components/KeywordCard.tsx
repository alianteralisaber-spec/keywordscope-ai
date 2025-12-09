import React from 'react';
import { KeywordData } from '../types';
import { TrendingUp, Activity, Target } from 'lucide-react';

interface KeywordCardProps {
  keyword: KeywordData;
}

export const KeywordCard: React.FC<KeywordCardProps> = ({ keyword }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDifficultyColor = (score: number) => {
    if (score >= 80) return 'bg-red-500'; // Hard
    if (score >= 50) return 'bg-yellow-500'; // Medium
    return 'bg-emerald-500'; // Easy
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-white select-all">{keyword.term}</h3>
        <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-700 text-slate-300">
          {keyword.category}
        </span>
      </div>
      
      <p className="text-sm text-slate-400 mb-4 line-clamp-2 min-h-[40px]">
        {keyword.reasoning}
      </p>

      <div className="space-y-3">
        {/* Popularity */}
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-blue-400" />
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1 text-slate-300">
              <span>الشعبية</span>
              <span>{keyword.popularityScore}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${getScoreColor(keyword.popularityScore)}`} 
                style={{ width: `${keyword.popularityScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Difficulty */}
        <div className="flex items-center gap-2">
          <Target size={16} className="text-orange-400" />
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1 text-slate-300">
              <span>المنافسة</span>
              <span>{keyword.difficultyScore}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${getDifficultyColor(keyword.difficultyScore)}`} 
                style={{ width: `${keyword.difficultyScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
