// Type definitions for detailed destination itineraries

export interface DayThoughts {
  shared?: string[];
  lissi?: string[];
  alex?: string[];
}

export interface DayPhoto {
  src: string;
  alt: string;
  caption?: string;
  takenBy?: 'alex' | 'lissi' | 'both';
}

export interface AlternativeDay {
  title: string;
  description: string;
  highlights?: string[];
  notes?: string;
}

export interface ItineraryDay {
  date: string;
  title: string;
  description: string;
  highlights?: string[];
  accommodation?: string | null;
  meals?: string[];
  notes?: string;
  thoughts?: DayThoughts;
  photos?: DayPhoto[];
  alternativeDay?: AlternativeDay;
}

export interface PersonalHighlight {
  author: 'alex' | 'lissi';
  title: string;
  quote: string;
  favoritePhoto?: string;
  topMoments: string[];
}

export interface BusynessRating {
  stars: 1 | 2 | 3 | 4 | 5;
  description: string;
}

export interface EssentialInfoSection {
  title: string;
  items: string[];
}

export interface BudgetBreakdown {
  [key: string]: string;
}

export interface Recommendation {
  title: string;
  item: string;
  reason: string;
}

export interface DetailedItinerary {
  dates: string;
  days: ItineraryDay[];
  personalHighlights?: PersonalHighlight[];
  busynessRating?: BusynessRating;
  culturalObservations?: string[];
  essentialInfo?: EssentialInfoSection[];
  budgetBreakdown: BudgetBreakdown;
  topRecommendations: Recommendation[];
}
