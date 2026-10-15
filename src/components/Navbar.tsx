import React, { useState } from 'react';
import { UtensilsCrossed, Sparkles, Bookmark, Sun, Moon, Volume2, VolumeX, Shuffle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import { sound } from '../utils/sound';

interface NavbarProps {
  onGoHome: () => void;
  onSurpriseMe: () => void;
  onOpenFavorites: () => void;
  onOpenChefsSpecial: () => void;
  activeMoodName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onGoHome,
  onSurpriseMe,
  onOpenFavorites,
  onOpenChefsSpecial,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { favoritesCount } = useFavorites();
  const [isMuted, setIsMuted] = useState(() => sound.getMuted());

  const handleSoundToggle = () => {
    const nextState = sound.toggleMute();
    setIsMuted(nextState);
    if (!nextState) {
      sound.playPop();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-neutral-900/85 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            sound.playPop();
            onGoHome();
          }}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center text-amber-600 dark:text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white whitespace-nowrap">
            Mood Menu
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          <button
            onClick={() => {
              sound.playPop();
              onGoHome();
            }}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            All Moods
          </button>

          <button
            onClick={() => {
              sound.playDishRing();
              onSurpriseMe();
            }}
            className="flex items-center gap-1.5 hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Surprise Me</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onOpenFavorites();
            }}
            className="flex items-center gap-1.5 hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Doggy Bag</span>
            {favoritesCount > 0 && (
              <span className="text-xs px-1.5 py-0.2 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 font-mono font-semibold">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={handleSoundToggle}
            className="flex items-center gap-1.5 hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-amber-500" />}
            <span className="text-xs">{isMuted ? 'Sound Off' : 'Sound On'}</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              toggleTheme();
            }}
            className="flex items-center gap-1.5 hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-600" />}
            <span className="text-xs capitalize">{theme}</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Mobile Quick Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile quick icons */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={handleSoundToggle}
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              aria-label="Toggle sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-500" />}
            </button>
            <button
              onClick={() => {
                sound.playPop();
                toggleTheme();
              }}
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                sound.playPop();
                onOpenFavorites();
              }}
              className="p-2 relative text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              aria-label="Open saved favorites"
            >
              <Bookmark className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" />
              )}
            </button>
          </div>

          <button
            onClick={() => {
              sound.playChime();
              onOpenChefsSpecial();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-900 bg-amber-400 hover:bg-amber-300 dark:bg-amber-400 dark:hover:bg-amber-300 rounded-xl transition-all shadow-sm hover:shadow cursor-pointer whitespace-nowrap shrink-0 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chef's Special</span>
          </button>
        </div>
      </div>
    </header>
  );
};
