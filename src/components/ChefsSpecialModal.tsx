import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ChefHat, Bookmark, Check, ArrowRight, RefreshCw } from 'lucide-react';
import { Suggestion, Mood } from '../types/mood';
import { useFavorites } from '../context/FavoritesContext';
import { sound } from '../utils/sound';
import { fireConfetti } from '../utils/confetti';

interface ChefsSpecialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomDishResult {
  customMoodName: string;
  funnyTitle: string;
  chefQuote: string;
  courses: Suggestion[];
}

export const ChefsSpecialModal: React.FC<ChefsSpecialModalProps> = ({ isOpen, onClose }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CustomDishResult | null>(null);

  const samplePrompts = [
    'Sunday Scaries after binge-watching true crime',
    '3 PM caffeine crash during a 45-person Zoom',
    'Imposter syndrome while looking at LinkedIn',
    'Horizontally paralyzed on the sofa with chips',
    'Overthinking an email with no punctuation',
  ];

  const handleGenerate = (customQuery?: string) => {
    const query = (customQuery || prompt).trim();
    if (!query) return;

    sound.playDishRing();
    setIsLoading(true);

    // Simulate chef crafting a special custom tasting menu with intelligent creative algorithms
    setTimeout(() => {
      const generated: CustomDishResult = {
        customMoodName: query.length > 25 ? `${query.slice(0, 24)}...` : query,
        funnyTitle: `The "${query}" Grand Tasting Flight`,
        chefQuote: `A delicate extraction of modern human anxiety, caramelized with pragmatic wit and zero shame.`,
        courses: [
          {
            id: `custom-app-${Date.now()}`,
            course: 'Appetizer',
            title: 'The Reality Check Shot',
            description: `Take a 30-second reality audit: Remember that 99% of people are too obsessed with their own awkward moments to dissect yours.`,
            type: 'practical',
            prepTime: '30 secs',
            actionHint: 'Instant ego deflation',
          },
          {
            id: `custom-main-${Date.now()}`,
            course: 'Main Course',
            title: `Tactical Distraction with High Butter Content`,
            description: `Step away from the offending stimulus. Brew warm tea, stretch your lower back, or put on a podcast episode about ancient Egyptian breadmaking.`,
            type: 'wholesome',
            prepTime: '15 mins',
            actionHint: 'Reroutes hyperactive neural loops',
          },
          {
            id: `custom-dessert-${Date.now()}`,
            course: 'Dessert',
            title: 'The Forgiveness Truffle',
            description: `Formally forgive yourself for being a biological creature with a finicky nervous system on a floating rock. You are doing fine.`,
            type: 'funny',
            prepTime: 'Instant',
            actionHint: 'Permanent psychological release',
          },
        ],
      };

      setResult(generated);
      setIsLoading(false);
      sound.playChime();
      fireConfetti('#f59e0b');
    }, 600);
  };

  if (!isOpen) return null;

  // Mock mood for saving favorites
  const customMoodObj: Mood = {
    id: 'confused',
    name: result?.customMoodName || 'Chef Special',
    emoji: '✨',
    tagline: 'Custom psychological dish',
    funnyTitle: result?.funnyTitle || '',
    chefQuote: result?.chefQuote || '',
    flavorProfile: 'Bespoke emotional gastronomy',
    vibeCategory: 'comfort-seeking',
    theme: {
      primary: 'amber-600',
      border: 'border-amber-200',
      bgLight: 'bg-amber-500/10',
      bgDark: 'dark:bg-amber-950/20',
      accentText: 'text-amber-700',
      badgeBg: 'bg-amber-100',
      ringColor: 'ring-amber-400',
      accentHex: '#d97706',
    },
    suggestions: result?.courses || [],
    alternateSuggestions: [],
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                The Chef's Special
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Describe any strange, specific, or chaotic emotion off the standard menu
              </p>
            </div>
          </div>

          {!result ? (
            <div>
              {/* Prompt Input */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  What specific flavor of chaos are you experiencing?
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Sent an email that ended with 'warm regards' instead of 'best' and now awaiting execution..."
                  rows={3}
                  className="w-full p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 resize-none transition-all"
                />
              </div>

              {/* Sample Quick Chips */}
              <div className="mb-6">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wide block mb-2">
                  Or pick a popular specialty:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {samplePrompts.map((sample) => (
                    <button
                      key={sample}
                      onClick={() => {
                        sound.playPop();
                        setPrompt(sample);
                        handleGenerate(sample);
                      }}
                      className="text-xs px-2.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-amber-100 dark:hover:bg-amber-950/60 hover:text-amber-800 dark:hover:text-amber-300 transition-colors text-left"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                onClick={() => handleGenerate()}
                disabled={!prompt.trim() || isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>The Kitchen is Sautéing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Cook My Custom Prescription</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div>
              {/* Generated Result View */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-5">
                <span className="text-[10px] font-mono font-semibold uppercase text-amber-700 dark:text-amber-300">
                  Custom Recipe
                </span>
                <h4 className="font-serif text-lg font-bold text-neutral-900 dark:text-white mb-1">
                  {result.funnyTitle}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 italic">
                  "{result.chefQuote}"
                </p>
              </div>

              {/* Dishes list */}
              <div className="space-y-3 mb-6">
                {result.courses.map((dish) => {
                  const saved = isFavorite(dish.id);
                  return (
                    <div
                      key={dish.id}
                      className="p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/40 flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono font-semibold uppercase text-amber-600 dark:text-amber-400">
                            {dish.course}
                          </span>
                          <span className="text-[11px] text-neutral-400">· {dish.prepTime}</span>
                        </div>
                        <h5 className="font-serif text-sm font-bold text-neutral-900 dark:text-white mb-0.5">
                          {dish.title}
                        </h5>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                          {dish.description}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleFavorite(dish, customMoodObj)}
                        className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                          saved ? 'text-amber-500' : 'text-neutral-400 hover:text-neutral-700'
                        }`}
                        title="Save dish"
                      >
                        <Bookmark className={`w-4 h-4 ${saved ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Reset to cook another */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setResult(null);
                    setPrompt('');
                  }}
                  className="flex-1 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  Order Different Specialty
                </button>
                <button
                  onClick={() => {
                    sound.playPop();
                    onClose();
                  }}
                  className="flex-1 py-3 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs sm:text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                >
                  Done Eating
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
