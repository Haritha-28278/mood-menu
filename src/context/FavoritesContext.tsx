import React, { createContext, useContext, useEffect, useState } from 'react';
import { FavoriteItem, Suggestion, Mood } from '../types/mood';
import { sound } from '../utils/sound';

interface FavoritesContextType {
  favorites: FavoriteItem[];
  toggleFavorite: (suggestion: Suggestion, mood: Mood) => boolean;
  isFavorite: (suggestionId: string) => boolean;
  removeFavorite: (suggestionId: string) => void;
  clearAllFavorites: () => void;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'moodmenu_saved_favorites_v1';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
      } catch {
        // Fallback to empty
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Storage error
    }
  }, [favorites]);

  const isFavorite = (suggestionId: string): boolean => {
    return favorites.some((item) => item.id === suggestionId);
  };

  const toggleFavorite = (suggestion: Suggestion, mood: Mood): boolean => {
    const exists = isFavorite(suggestion.id);
    if (exists) {
      setFavorites((prev) => prev.filter((item) => item.id !== suggestion.id));
      sound.playPop();
      return false;
    } else {
      const newItem: FavoriteItem = {
        id: suggestion.id,
        moodId: mood.id,
        moodName: mood.name,
        moodEmoji: mood.emoji,
        title: suggestion.title,
        description: suggestion.description,
        course: suggestion.course,
        savedAt: Date.now(),
      };
      setFavorites((prev) => [newItem, ...prev]);
      sound.playChime();
      return true;
    }
  };

  const removeFavorite = (suggestionId: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== suggestionId));
    sound.playPop();
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    sound.playSwoosh();
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        removeFavorite,
        clearAllFavorites,
        favoritesCount: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
