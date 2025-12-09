export interface KeywordData {
  term: string;
  category: 'High Volume' | 'Long-tail' | 'Niche Specific' | 'Broad';
  popularityScore: number;
  difficultyScore: number;
  reasoning: string;
}

export interface SEOResult {
  suggestedTitles: string[];
  keywords: string[];
  suggestedDescription: string;
}

export enum NicheType {
  EDUCATION = 'التعليم والدروس',
  TECH = 'التقنية والمراجعات',
  GAMING = 'الألعاب (Gaming)',
  LIFESTYLE = 'نط الحياة والروتين (Vlogs)',
  COOKING = 'الطبخ والوصفات',
  HEALTH = 'الصحة واللياقة',
  FINANCE = 'المال والاستثمار',
  ENTERTAINMENT = 'الترفيه والكوميديا',
  SELF_DEV = 'تطوير الذات',
  NEWS = 'الأخبار والترندات',
}

export enum Country {
  SAUDI_ARABIA = 'المملكة العربية السعودية',
  EGYPT = 'مصر',
  UAE = 'الإمارات العربية المتحدة',
  USA = 'الولايات المتحدة',
  UK = 'المملكة المتحدة',
  GERMANY = 'ألمانيا',
  FRANCE = 'فرنسا',
  GLOBAL_AR = 'العالم العربي (عام)',
  GLOBAL_EN = 'عالمي (إنجليزي)',
}