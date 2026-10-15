export type MoodId =
  | 'bored'
  | 'stressed'
  | 'happy'
  | 'sad'
  | 'hungry'
  | 'lazy'
  | 'angry'
  | 'lonely'
  | 'motivated'
  | 'confused';

export type CourseType = 'Appetizer' | 'Main Course' | 'Side Dish' | 'Dessert' | 'Beverage';

export interface Suggestion {
  id: string;
  course: CourseType;
  title: string;
  description: string;
  type: 'practical' | 'funny' | 'wholesome' | 'rebellious' | 'mindful';
  prepTime: string;
  actionHint?: string;
}

export interface MoodTheme {
  primary: string; // Tailwind color class or hex
  border: string;
  bgLight: string;
  bgDark: string;
  accentText: string;
  badgeBg: string;
  ringColor: string;
  accentHex: string;
}

export interface Mood {
  id: MoodId;
  name: string;
  emoji: string;
  tagline: string;
  funnyTitle: string;
  chefQuote: string;
  flavorProfile: string;
  vibeCategory: 'low-energy' | 'high-energy' | 'comfort-seeking' | 'action-ready';
  theme: MoodTheme;
  suggestions: Suggestion[];
  alternateSuggestions: Suggestion[];
}

export interface FavoriteItem {
  id: string;
  moodId: MoodId;
  moodName: string;
  moodEmoji: string;
  title: string;
  description: string;
  course: CourseType;
  savedAt: number;
}
