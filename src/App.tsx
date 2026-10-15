/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MOODS } from './data/moods';
import { Mood, MoodId } from './types/mood';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MoodCard } from './components/MoodCard';
import { MoodDetail } from './components/MoodDetail';
import { SurpriseModal } from './components/SurpriseModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { ChefsSpecialModal } from './components/ChefsSpecialModal';
import { Footer } from './components/Footer';
import { sound } from './utils/sound';
import { Sparkles, Utensils, Smile } from 'lucide-react';

function MoodMenuApp() {
  const [selectedMoodId, setSelectedMoodId] = useState<MoodId | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modals state
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isChefsSpecialOpen, setIsChefsSpecialOpen] = useState(false);

  // Active selected mood object
  const currentMood = useMemo(() => {
    return MOODS.find((m) => m.id === selectedMoodId) || null;
  }, [selectedMoodId]);

  // Filtered moods based on category and search
  const filteredMoods = useMemo(() => {
    return MOODS.filter((mood) => {
      // Category check
      if (selectedCategory !== 'all' && mood.vibeCategory !== selectedCategory) {
        return false;
      }
      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = mood.name.toLowerCase().includes(query);
        const matchesTagline = mood.tagline.toLowerCase().includes(query);
        const matchesTitle = mood.funnyTitle.toLowerCase().includes(query);
        const matchesSuggestions = mood.suggestions.some(
          (s) =>
            s.title.toLowerCase().includes(query) || s.description.toLowerCase().includes(query)
        );
        return matchesName || matchesTagline || matchesTitle || matchesSuggestions;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleSelectMood = (mood: Mood) => {
    setSelectedMoodId(mood.id);
  };

  const handleSelectOtherMood = (moodId: string) => {
    setSelectedMoodId(moodId as MoodId);
  };

  const handleGoHome = () => {
    setSelectedMoodId(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      {/* Top Bar Navbar */}
      <Navbar
        onGoHome={handleGoHome}
        onSurpriseMe={() => setIsSurpriseOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenChefsSpecial={() => setIsChefsSpecialOpen(true)}
        activeMoodName={currentMood?.name}
      />

      {/* Main Content Area with View Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentMood ? (
            <motion.div
              key={currentMood.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
            >
              <MoodDetail
                mood={currentMood}
                onBack={handleGoHome}
                onSelectOtherMood={handleSelectOtherMood}
                allMoods={MOODS}
              />
            </motion.div>
          ) : (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Landing Page Hero */}
              <HeroSection
                onSurpriseMe={() => setIsSurpriseOpen(true)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />

              {/* Mood Cards Grid Section */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-amber-500" />
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                      Today's Emotional Menu
                    </h2>
                  </div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                    {filteredMoods.length} of {MOODS.length} Moods Available
                  </span>
                </div>

                {filteredMoods.length === 0 ? (
                  <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40">
                    <div className="text-4xl mb-3">🔍</div>
                    <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white mb-1">
                      No matching dish found for "{searchQuery}"
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto mb-4">
                      The kitchen is vast, but that specific recipe hasn't been plated yet. Try searching another emotion or try the Chef's Special.
                    </p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-semibold"
                    >
                      Reset Filter
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {filteredMoods.map((mood, index) => (
                      <MoodCard
                        key={mood.id}
                        mood={mood}
                        onSelect={handleSelectMood}
                        index={index}
                      />
                    ))}
                  </div>
                )}

                {/* Editorial Callout Strip */}
                <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-start gap-4 text-left">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/20 dark:bg-amber-400/10 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white mb-1">
                        Have a mood not on the blackboard?
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed">
                        Whether you are having Sunday Scaries or feeling oddly smug about an email you sent, open our Chef's Special generator for an instant 3-course humorous prescription.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sound.playChime();
                      setIsChefsSpecialOpen(true);
                    }}
                    className="w-full md:w-auto px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm whitespace-nowrap shadow-sm hover:shadow transition-all shrink-0 cursor-pointer"
                  >
                    Try Chef's Special
                  </button>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Modals & Drawers */}
      <SurpriseModal
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
        onSelectMood={handleSelectMood}
        allMoods={MOODS}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        onSelectMood={handleSelectOtherMood}
      />

      <ChefsSpecialModal
        isOpen={isChefsSpecialOpen}
        onClose={() => setIsChefsSpecialOpen(false)}
      />

      {/* Footer */}
      <Footer
        onGoHome={handleGoHome}
        onSurpriseMe={() => setIsSurpriseOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenChefsSpecial={() => setIsChefsSpecialOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <MoodMenuApp />
      </FavoritesProvider>
    </ThemeProvider>
  );
}
