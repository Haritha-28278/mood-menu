# 🍽️ Mood Menu

> **A playful, beautiful, and comforting emotional bistro serving witty and practical recipes for whatever emotion you are experiencing right now.**

---

## 🌟 Concept

**Mood Menu** reimagines emotional self-care through the lens of a whimsical fine-dining restaurant. Instead of generic wellness advice, users order structured "courses" tailored specifically to what their brain, body, or blood sugar is dealing with right now:

- **Appetizer / Snack**: Quick 30-second to 2-minute emergency intervention
- **Main Course**: Practical action or grounding technique with tangible relief
- **Side Dish**: A weirdly effective, fun, or wholesome micro-hack
- **Dessert**: Laugh-out-loud humor, perspective shift, or feel-good release
- **Beverage**: Sensory palate cleanser and hydration ritual

---

## ✨ Features

### 1. 🎭 10 Hand-Crafted Mood Cards
Big, responsive, interactive cards with micro-animations and taste notes:
1. **🥱 Bored** — *Existential Ceiling Inspection Protocol*
2. **🤯 Stressed** — *De-escalating the Brain Hamster*
3. **🥳 Happy** — *The Golden Hour of Human Existence*
4. **🥺 Sad** — *The Cozy Low-Battery Hibernation Protocol*
5. **🤤 Hungry** — *Emergency Caloric Diplomacy*
6. **🦥 Lazy** — *Horizontal Mastery: The Art of Strategic Sloth*
7. **🤬 Angry** — *Rage Dissipation: Cooling the Nuclear Core*
8. **🥺 Lonely** — *Solitude Sanctuary: Reconnecting with the Tribe*
9. **🔥 Motivated** — *High Voltage: Channeling Productive Lightning*
10. **🌀 Confused** — *Cognitive Fog: Navigating the Hall of Mirrors*

### 2. 📖 Personalized Mood Tasting Menu
- **Hilarious & Relatable Titles** and **Chef's Tasting Notes**
- **4–6 Distinct Courses** with preparation times and action hints
- **"Another Suggestion"**: Dynamically rotates fresh dishes from our reserve kitchen
- **Interactive Checklist**: Mark recipes as "Tried" with celebratory audio & confetti when finishing all courses
- **Quick Switcher Carousel**: Jump smoothly to adjacent moods

### 3. 🎲 "Surprise Me" (The Emotional Cloche Roulette)
Not sure what you are feeling? Spin the restaurant cloche to let the culinary cosmos serve you an emotion at random with audio feedback and confetti fanfare.

### 4. 🥡 "Doggy Bag" (Saved Favorites via localStorage)
Save your favorite emotional recipes with one click. Access them anytime in a dedicated slide-over drawer to revisit your tried-and-true remedies.

### 5. 👨‍🍳 The Chef's Special (Custom Moods)
Got an emotion not on the standard menu (e.g., *"Sunday Scaries after binge-watching true crime"* or *"3 PM coffee crash in a 40-person Zoom"* )? Type it in to cook up a bespoke 3-course humorous prescription.

### 6. 📲 Social Sharing
Share your mood directly via:
- **WhatsApp** (one-click pre-formatted message)
- **X / Twitter** (pre-formatted tweet)
- **Clipboard & Native Web Share API**

### 7. 🎨 Premium UI / UX
- **Dark & Light Mode** with smooth transition and saved preference
- **Web Audio API Synthesizer**: Subtle pops, bells, chimes, and swooshes without external audio assets (toggleable anytime)
- **Canvas Confetti**: Celebratory bursts for joyful moods, completions, and roulette spins
- **Responsive & Accessible**: Seamlessly calibrated from mobile screens to 1440px desktop displays

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with modern semantic tokens
- **Animations**: Motion (Framer Motion v12)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Audio**: Native Web Audio API Sound Synthesizer
- **Persistence**: `localStorage` (theme, sound toggle, and saved favorites)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Development

```bash
# 1. Install dependencies
npm install

# 2. Start the development server on port 3000
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view your Mood Menu.

### Build for Production

```bash
npm run build
```

---

## 📄 License
Apache-2.0
