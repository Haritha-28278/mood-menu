import React from 'react';
import { Sparkles, Dices, Search, Flame, Coffee, HeartHandshake, Zap } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeroSectionProps {
  onSurpriseMe: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSurpriseMe,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = [
    { id: 'all', label: 'All Moods', icon: Sparkles },
    { id: 'low-energy', label: 'Low Energy', icon: Coffee },
    { id: 'high-energy', label: 'High Energy', icon: Flame },
    { id: 'comfort-seeking', label: 'Comfort Seeking', icon: HeartHandshake },
    { id: 'action-ready', label: 'Action Ready', icon: Zap },
  ];

  return (
    <section className="relative pt-8 pb-10 sm:pt-14 sm:pb-12 text-center max-w-4xl mx-auto px-4">
      {/* Decorative emotional culinary subtitle */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 mb-5">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Table for One · Fresh Psychological Courses Served Daily</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.15] mb-4">
        What's your mood <span className="italic font-normal underline decoration-amber-400 decoration-wavy decoration-2">right now</span>?
      </h1>

      {/* Sub-copy */}
      <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
        Select what your heart (or blood sugar) is currently experiencing. We will serve you 5 customized, hilarious, and genuinely practical recipes to fix or savor it.
      </p>

      {/* Primary Hero Controls: Surprise Me & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto mb-8">
        <button
          onClick={() => {
            sound.playDishRing();
            onSurpriseMe();
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer shrink-0"
        >
          <Dices className="w-4 h-4 text-amber-400 dark:text-amber-600" />
          <span>Surprise Me (Spin the Cloche)</span>
        </button>

        {/* Search Input */}
        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search moods or feelings..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Segmented Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                sound.playPop();
                onSelectCategory(cat.id);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-800/70 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
