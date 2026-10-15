import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Copy, MessageCircle, Twitter, Share2 } from 'lucide-react';
import { Mood, Suggestion } from '../types/mood';
import { sound } from '../utils/sound';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  mood: Mood;
  activeSuggestions: Suggestion[];
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  mood,
  activeSuggestions,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const topSuggestion = activeSuggestions[0];
  const shareText = `🍽️ My Mood Menu Prescription: ${mood.emoji} Feeling ${mood.name}!\n\n"${mood.funnyTitle}"\n\nTop Dish: "${topSuggestion?.title}" — ${topSuggestion?.description}\n\nOrder your psychological dish at Mood Menu!`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://moodmenu.app';

  const handleCopy = () => {
    sound.playChime();
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const shareToWhatsApp = () => {
    sound.playPop();
    const encoded = encodeURIComponent(`${shareText}\n${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const shareToTwitter = () => {
    sound.playPop();
    const encoded = encodeURIComponent(`${shareText}\n${shareUrl}`);
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        sound.playPop();
        await navigator.share({
          title: `Mood Menu — ${mood.name}`,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
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
          className="relative w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-7 shadow-2xl z-10 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{mood.emoji}</span>
            <div>
              <h3 className="font-serif text-xl font-bold text-neutral-900 dark:text-white">
                Share this {mood.name} Menu
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Send your emotional order to friends or your social circle
              </p>
            </div>
          </div>

          {/* Preview Box */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800 mb-6 text-left">
            <p className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 font-semibold mb-1">
              Menu Card Preview
            </p>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white mb-1.5">
              "{mood.funnyTitle}"
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed italic line-clamp-3">
              "{topSuggestion?.title}" — {topSuggestion?.description}
            </p>
          </div>

          {/* Sharing Buttons Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={shareToWhatsApp}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={shareToTwitter}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 text-white font-medium text-xs sm:text-sm transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Twitter className="w-4 h-4" />
              <span>X / Twitter</span>
            </button>
          </div>

          {/* Secondary Actions: Native Share and Copy Text */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-neutral-500" />
                  <span>Copy Text & Link</span>
                </>
              )}
            </button>

            {'share' in navigator && (
              <button
                onClick={handleNativeShare}
                className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-all cursor-pointer"
                title="System Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
