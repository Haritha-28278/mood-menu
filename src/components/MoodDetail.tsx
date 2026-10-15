import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Share2,
  RefreshCw,
  Bookmark,
  CheckCircle2,
  Circle,
  Copy,
  Clock,
  Check,
  Utensils,
  PartyPopper,
  Sparkles,
} from 'lucide-react';
import { Mood, Suggestion } from '../types/mood';
import { useFavorites } from '../context/FavoritesContext';
import { ShareModal } from './ShareModal';
import { sound } from '../utils/sound';
import { fireConfetti } from '../utils/confetti';

interface MoodDetailProps {
  mood: Mood;
  onBack: () => void;
  onSelectOtherMood: (moodId: string) => void;
  allMoods: Mood[];
}

export const MoodDetail: React.FC<MoodDetailProps> = ({
  mood,
  onBack,
  onSelectOtherMood,
  allMoods,
}) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [activeSuggestions, setActiveSuggestions] = useState<Suggestion[]>(() => mood.suggestions);
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [altIndex, setAltIndex] = useState(0);

  // Sync suggestions when mood changes
  useEffect(() => {
    setActiveSuggestions(mood.suggestions);
    setCompletedMap({});
    setAltIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // If happy or motivated, shoot light confetti!
    if (mood.id === 'happy' || mood.id === 'motivated') {
      setTimeout(() => fireConfetti(mood.theme.accentHex), 300);
    }
  }, [mood]);

  // "Another suggestion": swaps or cycles an alternate dish into the active menu
  const handleAnotherSuggestion = () => {
    sound.playDishRing();
    const alternates = mood.alternateSuggestions;
    if (!alternates || alternates.length === 0) {
      // Just shuffle current
      setActiveSuggestions((prev) => [...prev].sort(() => Math.random() - 0.5));
      return;
    }

    const nextAlt = alternates[altIndex % alternates.length];
    setAltIndex((prev) => prev + 1);

    setActiveSuggestions((prev) => {
      // Replace the item with matching course or replace item at index 1 (Main Course)
      const existingIdx = prev.findIndex((s) => s.course === nextAlt.course);
      if (existingIdx !== -1) {
        const copy = [...prev];
        copy[existingIdx] = nextAlt;
        return copy;
      }
      return [prev[0], nextAlt, ...prev.slice(2)];
    });
  };

  const handleToggleComplete = (id: string) => {
    const nextState = !completedMap[id];
    setCompletedMap((prev) => ({ ...prev, [id]: nextState }));
    if (nextState) {
      sound.playChime();
      // Check if all are now completed
      const allDone = activeSuggestions.every((s) => (s.id === id ? true : completedMap[s.id]));
      if (allDone) {
        fireConfetti(mood.theme.accentHex);
      }
    } else {
      sound.playPop();
    }
  };

  const handleCopySuggestion = (suggestion: Suggestion) => {
    sound.playPop();
    const text = `🍽️ Mood Menu (${mood.name}): "${suggestion.title}" — ${suggestion.description}`;
    navigator.clipboard.writeText(text);
    setCopiedId(suggestion.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const completedCount = Object.values(completedMap).filter(Boolean).length;

  return (
    <div className="min-h-screen pb-20">
      {/* Mood Header Hero Banner */}
      <section className="relative pt-6 pb-10 sm:pt-10 sm:pb-14 border-b border-neutral-200 dark:border-neutral-800">
        <div
          className={`absolute inset-0 ${mood.theme.bgLight} ${mood.theme.bgDark} opacity-60 pointer-events-none`}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Navigation & Action Bar */}
          <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8">
            <button
              onClick={() => {
                sound.playPop();
                onBack();
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 dark:bg-neutral-900/80 hover:bg-white dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-200 text-xs sm:text-sm font-medium border border-neutral-200/80 dark:border-neutral-800 transition-all shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Moods</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAnotherSuggestion}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 dark:bg-neutral-900/80 hover:bg-white dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-200 text-xs sm:text-sm font-medium border border-neutral-200/80 dark:border-neutral-800 transition-all shadow-sm cursor-pointer"
                title="Swap in a fresh recipe"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Another Suggestion</span>
                <span className="sm:hidden">Shuffle</span>
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  setIsShareOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share this Mood</span>
              </button>
            </div>
          </div>

          {/* Mood Intro Card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block text-5xl sm:text-6xl mb-3 animate-bounce select-none">
              {mood.emoji}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-2">
              <span>{mood.name.toUpperCase()} PAIRED TASTING</span>
              <span>·</span>
              <span>{activeSuggestions.length} COURSES</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-white tracking-tight mb-4 text-balance">
              {mood.funnyTitle}
            </h1>

            {/* Chef's Note callout */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800/80 backdrop-blur-sm text-sm text-neutral-700 dark:text-neutral-300 italic max-w-2xl mx-auto mb-3 shadow-xs">
              <span className="font-semibold not-italic text-amber-600 dark:text-amber-400">
                Chef's Tasting Note:{' '}
              </span>
              "{mood.chefQuote}"
            </div>

            {/* Progress tracker */}
            {completedCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {completedCount} of {activeSuggestions.length} dishes digested!
                </span>
                {completedCount === activeSuggestions.length && (
                  <PartyPopper className="w-3.5 h-3.5" />
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Course Menu Suggestions Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-amber-500" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
              The Prescribed Courses
            </h2>
          </div>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Click checkbox when completed · Bookmark to save
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {activeSuggestions.map((suggestion, index) => {
              const isSaved = isFavorite(suggestion.id);
              const isDone = Boolean(completedMap[suggestion.id]);

              return (
                <motion.div
                  key={suggestion.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                  className={`relative p-5 sm:p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                    isDone
                      ? 'bg-neutral-50/70 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 opacity-70'
                      : 'bg-white dark:bg-neutral-900 border-neutral-200/90 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-amber-400/40'
                  }`}
                >
                  <div>
                    {/* Course header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold tracking-wide uppercase text-amber-600 dark:text-amber-400">
                          {suggestion.course}
                        </span>
                        <span className="text-neutral-300 dark:text-neutral-700">·</span>
                        <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                          <Clock className="w-3 h-3" />
                          <span>{suggestion.prepTime}</span>
                        </div>
                      </div>

                      {/* Card actions: Bookmark & Copy */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopySuggestion(suggestion)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          title="Copy text"
                        >
                          {copiedId === suggestion.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleFavorite(suggestion, mood)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isSaved
                              ? 'text-amber-500 hover:text-amber-600'
                              : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }`}
                          title={isSaved ? 'Remove from saved' : 'Save to Doggy Bag'}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-serif text-lg sm:text-xl font-bold tracking-tight mb-2 ${
                        isDone
                          ? 'line-through text-neutral-500 dark:text-neutral-400'
                          : 'text-neutral-900 dark:text-white'
                      }`}
                    >
                      {suggestion.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-sm leading-relaxed mb-4 ${
                        isDone
                          ? 'text-neutral-400 dark:text-neutral-500'
                          : 'text-neutral-600 dark:text-neutral-300'
                      }`}
                    >
                      {suggestion.description}
                    </p>
                  </div>

                  {/* Footer checklist trigger */}
                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleToggleComplete(suggestion.id)}
                      className={`inline-flex items-center gap-2 py-1 px-2.5 rounded-lg font-medium transition-colors cursor-pointer ${
                        isDone
                          ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                          : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                      <span>{isDone ? 'Completed / Tried!' : 'Mark as Tried'}</span>
                    </button>

                    {suggestion.actionHint && (
                      <span className="text-neutral-400 dark:text-neutral-500 italic text-right truncate max-w-[160px]">
                        {suggestion.actionHint}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Quick Mood Carousel / Switcher */}
        <div className="mt-14 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-serif text-base font-bold text-neutral-900 dark:text-white">
              Feeling something else?
            </h4>
            <button
              onClick={onBack}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
            >
              Browse Full Menu →
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
            {allMoods
              .filter((m) => m.id !== mood.id)
              .map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    sound.playChime();
                    onSelectOtherMood(m.id);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-amber-400/50 text-neutral-700 dark:text-neutral-300 text-xs font-medium whitespace-nowrap shadow-xs hover:shadow transition-all shrink-0 cursor-pointer"
                >
                  <span className="text-base">{m.emoji}</span>
                  <span>{m.name}</span>
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        mood={mood}
        activeSuggestions={activeSuggestions}
      />
    </div>
  );
};
