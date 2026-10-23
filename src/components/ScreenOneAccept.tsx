import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KawaiiPenguin } from './KawaiiPenguin';
import { BirthdayConfig } from '../config/birthdayConfig';
import { fireBirthdayConfetti, fireHeartBurst } from '../utils/confetti';
import { musicBox } from '../utils/audioSynth';
import { Sparkles, Heart } from 'lucide-react';

interface ScreenOneAcceptProps {
  config: BirthdayConfig;
  onAccept: () => void;
}

export const ScreenOneAccept: React.FC<ScreenOneAcceptProps> = ({ config, onAccept }) => {
  const [isJumping, setIsJumping] = useState(false);
  const [nopeClickCount, setNopeClickCount] = useState(0);
  const [reactionToast, setReactionToast] = useState<string | null>(null);

  const handleNoClick = () => {
    const responses = config.screenOne.noButtonResponses;
    const nextIndex = nopeClickCount % responses.length;
    setReactionToast(responses[nextIndex]);
    setNopeClickCount((prev) => prev + 1);
    musicBox.playChime(392.0, 0.2); // Play a cute high note
    fireHeartBurst();
  };

  const handleYesClick = () => {
    setIsJumping(true);
    fireBirthdayConfetti();
    musicBox.playChime(523.25, 0.4); // C5 celebratory chime

    // If music isn't playing yet, initiate the soothing music box melody!
    if (!musicBox.getIsPlaying() && config.audio.useBuiltInMusicBox) {
      musicBox.startMelody();
    }

    setTimeout(() => {
      onAccept();
    }, 1200);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative Floating Hearts & Stars in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <motion.div
          className="absolute top-12 left-10 text-pink-300/60 text-2xl"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        >
          🌸
        </motion.div>
        <motion.div
          className="absolute top-24 right-12 text-pink-400/50 text-xl"
          animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-16 text-pink-300/60 text-3xl"
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        >
          💖
        </motion.div>
        <motion.div
          className="absolute bottom-24 right-16 text-pink-300/60 text-2xl"
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
        >
          🌷
        </motion.div>
      </div>

      {/* Main Kawaii Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-pink-100 relative text-center z-10 paper-card"
      >
        {/* Scrapbook Washi Tape Header */}
        <div className="w-28 h-6 mx-auto -mt-10 mb-6 washi-tape washi-tape-pink rounded-xs rotate-[-1deg]" />

        {/* Title Badge / Headline */}
        <div className="mb-2">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            className="inline-flex items-center gap-2 text-pink-600 font-bold font-handwriting text-2xl sm:text-3xl"
          >
            <span>{config.screenOne.heading}</span>
          </motion.div>
          <p className="text-stone-500 text-sm mt-1 font-body">
            {config.screenOne.subheading}
          </p>
        </div>

        {/* Penguin Showcase with Floating Hearts */}
        <div className="my-6 relative flex flex-col items-center justify-center">
          <div className="relative">
            <KawaiiPenguin
              mood={isJumping ? 'jumping' : 'holding-gift'}
              size={190}
              interactive={true}
              onClick={() => {
                fireHeartBurst();
                musicBox.playChime(440, 0.2);
              }}
            />

            {/* Floating Sparkle Emojis around penguin */}
            <motion.span
              className="absolute -top-1 -right-2 text-xl select-none"
              animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              ✨
            </motion.span>
            <motion.span
              className="absolute top-12 -left-3 text-lg select-none"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.4 }}
            >
              💕
            </motion.span>
          </div>
          <span className="text-[11px] text-pink-400 font-handwriting mt-1 tracking-wide">
            (tap the little penguin for boops!)
          </span>
        </div>

        {/* Interactive Reaction Toast if she clicked Nope */}
        <AnimatePresence>
          {reactionToast && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs sm:text-sm font-medium shadow-xs"
            >
              {reactionToast}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* Primary YES Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleYesClick}
            disabled={isJumping}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-linear-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-sm sm:text-base shadow-md shadow-pink-200 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-3 focus-visible:ring-pink-300"
          >
            <Sparkles className="w-4 h-4" />
            <span>{config.screenOne.yesButtonText}</span>
          </motion.button>

          {/* Sassy NOPE Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNoClick}
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-stone-100 hover:bg-pink-50 text-stone-600 hover:text-pink-700 font-medium text-xs sm:text-sm border border-stone-200 hover:border-pink-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
          >
            <span>{config.screenOne.noButtonText}</span>
            <span className="text-pink-400">🙈</span>
          </motion.button>
        </div>

        {/* Bottom Sweet Note */}
        <p className="text-[11px] text-stone-400 mt-6 font-handwriting">
          Specially made with lots of love for {config.herName} • By {config.myName} 🎀
        </p>
      </motion.div>
    </div>
  );
};
