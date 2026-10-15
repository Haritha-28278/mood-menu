import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Bookmark, ExternalLink, Copy, Check, Sparkles } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { sound } from '../utils/sound';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMood: (moodId: string) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  onSelectMood,
}) => {
  const { favorites, removeFavorite, clearAllFavorites } = useFavorites();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    sound.playPop();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs"
          onClick={onClose}
        />

        {/* Slide-over panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-screen max-w-md bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Bookmark className="w-4 h-4 fill-amber-500" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white">
                    Your Doggy Bag
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {favorites.length} saved emotional remedy
                    {favorites.length === 1 ? '' : 'ies'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {favorites.length > 0 && (
                  <button
                    onClick={clearAllFavorites}
                    className="p-2 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    title="Clear all saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => {
                    sound.playPop();
                    onClose();
                  }}
                  className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {favorites.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500 dark:text-neutral-400">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4 text-2xl">
                    🥡
                  </div>
                  <h4 className="font-serif font-bold text-base text-neutral-800 dark:text-neutral-200 mb-1">
                    Your Doggy Bag is Empty
                  </h4>
                  <p className="text-xs max-w-xs leading-relaxed text-neutral-500 dark:text-neutral-400 mb-4">
                    Whenever you see a funny or practical suggestion you want to keep in your pocket, click the bookmark icon to save it here.
                  </p>
                </div>
              ) : (
                favorites.map((fav) => (
                  <div
                    key={fav.id}
                    className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/50 hover:border-amber-400/40 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <button
                        onClick={() => {
                          onSelectMood(fav.moodId);
                          onClose();
                        }}
                        className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                      >
                        <span>{fav.moodEmoji}</span>
                        <span>{fav.moodName}</span>
                        <span className="text-neutral-300 dark:text-neutral-700">·</span>
                        <span className="font-mono text-amber-600 dark:text-amber-400 uppercase text-[10px]">
                          {fav.course}
                        </span>
                        <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopy(fav.id, `"${fav.title}" — ${fav.description}`)}
                          className="p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                          title="Copy text"
                        >
                          {copiedId === fav.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => removeFavorite(fav.id)}
                          className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h5 className="font-serif text-sm font-bold text-neutral-900 dark:text-white mb-1">
                      {fav.title}
                    </h5>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {fav.description}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {favorites.length > 0 && (
              <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-center">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Saved locally in your browser storage
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
