import confetti from 'canvas-confetti';

/**
 * Fires lovely pastel birthday confetti with stars and hearts
 */
export const fireBirthdayConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#FFB6C1', '#FF69B4', '#FFF0F5', '#FDE047', '#C4B5FD', '#A7F3D0']
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

/**
 * Gentle floating heart burst
 */
export const fireHeartBurst = () => {
  confetti({
    particleCount: 40,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#FF69B4', '#FFB6C1', '#F43F5E', '#FDA4AF'],
    shapes: ['circle'],
    scalar: 1.2,
  });
};
