import React from 'react';
import { UtensilsCrossed, Heart, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface FooterProps {
  onGoHome: () => void;
  onSurpriseMe: () => void;
  onOpenFavorites: () => void;
  onOpenChefsSpecial: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onGoHome,
  onSurpriseMe,
  onOpenFavorites,
  onOpenChefsSpecial,
}) => {
  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xs py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-100 dark:border-neutral-800/80">
          {/* Brand & Concept */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <button
              onClick={() => {
                sound.playPop();
                onGoHome();
              }}
              className="flex items-center gap-2 group cursor-pointer mb-2"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Mood Menu
              </span>
            </button>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm">
              The world's only bistro where human moods are served as savory, funny, and surprisingly helpful courses.
            </p>
          </div>

          {/* Quick Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-neutral-600 dark:text-neutral-400">
            <button
              onClick={() => {
                sound.playPop();
                onGoHome();
              }}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              The Full Menu
            </button>
            <button
              onClick={() => {
                sound.playDishRing();
                onSurpriseMe();
              }}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              Surprise Me
            </button>
            <button
              onClick={() => {
                sound.playPop();
                onOpenFavorites();
              }}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              Saved Doggy Bag
            </button>
            <button
              onClick={() => {
                sound.playChime();
                onOpenChefsSpecial();
              }}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              Chef's Special
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 dark:text-neutral-500">
          <p className="flex items-center gap-1.5">
            <span>Prepared with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for human minds everywhere.</span>
          </p>
          <p className="font-mono text-[11px]">
            No reservations required · Hydration recommended
          </p>
        </div>
      </div>
    </footer>
  );
};
