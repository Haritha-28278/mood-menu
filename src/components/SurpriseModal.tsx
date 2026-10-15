import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Dices, ArrowRight, UtensilsCrossed, Sparkles } from 'lucide-react';
import { Mood } from '../types/mood';
import { sound } from '../utils/sound';
import { fireConfetti } from '../utils/confetti';

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMood: (mood: Mood) => void;
  allMoods: Mood[];
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({
  isOpen,
  onClose,
  onSelectMood,
  allMoods,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  useEffect(() => {
    if (isOpen) {
      spinRoulette();
    }
  }, [isOpen]);

  const spinRoulette = () => {
    setIsSpinning(true);
    sound.playDishRing();

    let counter = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * allMoods.length);
      setSelectedMood(allMoods[randomIdx]);
      sound.playPop();
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        const finalIdx = Math.floor(Math.random() * allMoods.length);
        const finalMood = allMoods[finalIdx];
        setSelectedMood(finalMood);
        setIsSpinning(false);
        sound.playChime();
        fireConfetti(finalMood.theme.accentHex);
      }
    }, 110);
  };

  if (!isOpen) return null;

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
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.22 }}
          className="relative w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-center overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Decorative badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 mb-4">
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-500" />
            <span>CHEF'S SURPRISE CLOCHE</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            The Fate of Your Palate
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto mb-6">
            Let the culinary cosmos determine which emotion demands your attention today.
          </p>

          {/* The Plate / Card Display */}
          <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 mb-6 relative overflow-hidden">
            {selectedMood && (
              <motion.div
                key={selectedMood.id}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col items-center"
              >
                <div className={`text-6xl mb-3 select-none ${isSpinning ? 'animate-spin' : ''}`}>
                  {selectedMood.emoji}
                </div>
                <h4 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white mb-1">
                  {selectedMood.name}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 italic mb-3">
                  "{selectedMood.funnyTitle}"
                </p>
                <div className="text-[11px] text-neutral-400 dark:text-neutral-500 px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
                  {selectedMood.flavorProfile}
                </div>
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={spinRoulette}
              disabled={isSpinning}
              className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer disabled:opacity-50"
            >
              <Dices className={`w-4 h-4 text-amber-500 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>Spin Again</span>
            </button>

            {selectedMood && (
              <button
                onClick={() => {
                  sound.playChime();
                  onSelectMood(selectedMood);
                  onClose();
                }}
                disabled={isSpinning}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <span>Taste This Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
