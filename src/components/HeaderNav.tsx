import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { musicBox } from '../utils/audioSynth';

interface HeaderNavProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  onOpenCustomizer?: () => void;
  unlockedStep: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentStep,
  onSelectStep,
  onOpenCustomizer,
  unlockedStep,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  useEffect(() => {
    // Sync music box state
    setIsPlayingMusic(musicBox.getIsPlaying());
  }, []);

  const handleToggleMusic = () => {
    const nextState = musicBox.toggleMelody();
    setIsPlayingMusic(nextState);
  };

  const steps = [
    { num: 1, label: 'Gift Entry' },
    { num: 2, label: 'Penguins' },
    { num: 3, label: 'Open Gift' },
    { num: 4, label: 'Message' },
    { num: 5, label: 'Surprise' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-pink-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => onSelectStep(1)}
          className="text-lg font-bold font-handwriting text-pink-600 hover:text-pink-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded-md"
        >
          <span>🐧 Birthday Scrapbook</span>
          <Heart className="w-4 h-4 fill-pink-500 text-pink-500 inline animate-heart-pulse" />
        </button>

        {/* Zone 2: Navigation Steps with accessibility and unlocked progress */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-medium text-pink-950/70 overflow-x-auto py-1">
          {steps.map((s, idx) => {
            const isCurrent = currentStep === s.num;
            const isUnlocked = s.num <= unlockedStep;

            return (
              <React.Fragment key={s.num}>
                <button
                  onClick={() => isUnlocked && onSelectStep(s.num)}
                  disabled={!isUnlocked}
                  className={`px-2.5 py-1 rounded-full transition-all whitespace-nowrap shrink-0 flex items-center gap-1 ${
                    isCurrent
                      ? 'bg-pink-100 text-pink-800 font-semibold shadow-xs'
                      : isUnlocked
                      ? 'hover:bg-pink-50 text-pink-700/80 cursor-pointer'
                      : 'opacity-40 cursor-not-allowed'
                  }`}
                  title={isUnlocked ? `Go to step ${s.num}` : 'Complete prior steps to unlock'}
                >
                  <span className="w-4 h-4 rounded-full bg-white/80 inline-flex items-center justify-center text-[10px] font-bold text-pink-600 border border-pink-200">
                    {s.num}
                  </span>
                  <span>{s.label}</span>
                </button>
                {idx < steps.length - 1 && (
                  <span className="text-pink-200 select-none" aria-hidden="true">
                    ·
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Audio Chime toggle + Live Customize Drawer) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleToggleMusic}
            aria-label={isPlayingMusic ? 'Mute birthday chime music' : 'Play cute birthday music box chime'}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              isPlayingMusic
                ? 'bg-pink-100 text-pink-800 border-pink-300 shadow-xs'
                : 'bg-white text-stone-600 border-stone-200 hover:border-pink-200 hover:text-pink-700'
            }`}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-pink-600 animate-pulse" />
                <span className="hidden sm:inline">Music: On 🎵</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                <span className="hidden sm:inline">Music Box 🎶</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
