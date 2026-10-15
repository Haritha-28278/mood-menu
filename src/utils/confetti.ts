import confetti from 'canvas-confetti';

export function fireConfetti(accentColor?: string) {
  try {
    const colors = accentColor
      ? [accentColor, '#f59e0b', '#10b981', '#ec4899', '#6366f1']
      : ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'];

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.65 },
      colors,
      disableForReducedMotion: true,
    });
  } catch {
    // Graceful fallback if canvas is unavailable
  }
}

export function fireSuperConfetti() {
  try {
    const end = Date.now() + 1.2 * 1000;
    const colors = ['#f59e0b', '#10b981', '#ec4899', '#3b82f6'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch {
    // Ignore
  }
}
