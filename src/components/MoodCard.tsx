import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Mood } from '../types/mood';
import { sound } from '../utils/sound';

interface MoodCardProps {
  mood: Mood;
  onSelect: (mood: Mood) => void;
  index: number;
}

export const MoodCard: React.FC<MoodCardProps> = ({ mood, onSelect, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.3) }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      whileTap={{ scale: 0.98 }}
      className="group relative cursor-pointer"
      onClick={() => {
        sound.playChime();
        onSelect(mood);
      }}
      onMouseEnter={() => {
        sound.playPop();
      }}
    >
      <div
        className={`h-full flex flex-col justify-between p-6 sm:p-7 rounded-3xl border ${mood.theme.border} bg-white dark:bg-neutral-900/90 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
      >
        {/* Subtle background glow with mood theme color */}
        <div
          className={`absolute -top-12 -right-12 w-32 h-32 rounded-full ${mood.theme.bgLight} ${mood.theme.bgDark} blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500`}
        />

        <div>
          {/* Header row: Big expressive emoji and course count */}
          <div className="flex items-start justify-between mb-4 relative z-10">
            <span className="text-4xl sm:text-5xl select-none group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200">
              {mood.emoji}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>5 Courses</span>
            </div>
          </div>

          {/* Mood Name */}
          <h2 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {mood.name}
          </h2>

          {/* Tagline / Subtitle */}
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
            {mood.tagline}
          </p>
        </div>

        {/* Footer row: Flavor Profile note + Arrow CTA */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 relative z-10">
          <span className="truncate max-w-[190px] italic">
            "{mood.flavorProfile.slice(0, 32)}..."
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-neutral-800 dark:text-neutral-200 group-hover:translate-x-1 transition-transform">
            <span>View Menu</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};
