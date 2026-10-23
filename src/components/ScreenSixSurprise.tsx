import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BirthdayConfig } from '../config/birthdayConfig';
import { KawaiiPenguin } from './KawaiiPenguin';
import { fireBirthdayConfetti, fireHeartBurst } from '../utils/confetti';
import { musicBox } from '../utils/audioSynth';
import { Sparkles, RotateCcw, Heart, Mail, CheckCircle2, Share2, Printer } from 'lucide-react';

interface ScreenSixSurpriseProps {
  config: BirthdayConfig;
  onReplay: () => void;
  onOpenCustomizer?: () => void;
}

export const ScreenSixSurprise: React.FC<ScreenSixSurpriseProps> = ({
  config,
  onReplay,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    fireBirthdayConfetti();
    musicBox.playChime(523.25, 0.4);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Step Indicator Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Screen 5 of 5: The Grand Finale</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-handwriting text-stone-800 mb-2">
          {config.finalSurprise.teaserText}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base font-body">
          {isOpen
            ? "A little reminder that you can never get rid of me! 🐧💖"
            : "A final top-secret envelope has arrived with your official friendship contract renewal."}
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex flex-col items-center justify-center my-6">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Sealed Envelope Stage */
            <motion.div
              key="sealed-envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              onClick={handleOpenEnvelope}
              className="cursor-pointer group flex flex-col items-center select-none"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-4 px-4 py-1.5 bg-rose-500 text-white font-bold text-xs rounded-full shadow-md flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>CLICK TO UNSEAL ENVELOPE 💌</span>
              </motion.div>

              {/* Kawaii Illustrated Sealed Envelope */}
              <div className="relative w-72 h-52 sm:w-80 sm:h-56 filter drop-shadow-xl transition-transform duration-300 group-hover:scale-105">
                <svg viewBox="0 0 320 220" className="w-full h-full">
                  {/* Shadow */}
                  <ellipse cx="160" cy="210" rx="100" ry="10" fill="#FCE7F3" />

                  {/* Envelope Base */}
                  <rect x="20" y="30" width="280" height="170" rx="16" fill="#FFFDF8" stroke="#F472B6" strokeWidth="3" />

                  {/* Envelope Bottom Folds */}
                  <path d="M20 200 L160 110 L300 200 Z" fill="#FCE7F3" />
                  <path d="M20 30 L160 125 L20 200 Z" fill="#FFF0F5" opacity="0.7" />
                  <path d="M300 30 L160 125 L300 200 Z" fill="#FFF0F5" opacity="0.7" />

                  {/* Envelope Flap (Closed) */}
                  <path d="M20 30 L160 125 L300 30 Z" fill="#FDA4AF" stroke="#F43F5E" strokeWidth="2" />

                  {/* Red Wax Seal */}
                  <circle cx="160" cy="125" r="22" fill="#E11D48" filter="drop-shadow(0 2px 4px rgba(225, 29, 72, 0.4))" />
                  <circle cx="160" cy="125" r="18" fill="#F43F5E" />
                  <path
                    d="M160 133 C154 127 151 123 151 119 C151 116 153 114 156 114 C158 114 160 116 160 116 C160 116 162 114 164 114 C167 114 169 116 169 119 C169 123 166 127 160 133 Z"
                    fill="#FFFFFF"
                  />
                </svg>
              </div>

              <span className="text-xs text-pink-600 font-handwriting mt-4 text-base">
                *From {config.myName} with infinite hugs*
              </span>
            </motion.div>
          ) : (
            /* Revealed Surprise Stage */
            <motion.div
              key="opened-surprise"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-pink-200 paper-card relative text-center"
            >
              {/* Scrapbook Tape Header */}
              <div className="w-36 h-6 mx-auto -mt-12 mb-6 washi-tape washi-tape-pink rounded-xs rotate-[-1deg]" />

              {/* Jumping Mascot Penguin */}
              <div className="flex justify-center mb-4">
                <KawaiiPenguin mood="jumping" size={140} />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-handwriting text-pink-800 mb-2">
                {config.finalSurprise.revealTitle}
              </h2>

              {/* The Iconic Closing Line */}
              <div className="p-6 bg-linear-to-r from-pink-50 via-rose-50 to-pink-50 rounded-2xl border border-pink-200 shadow-inner my-6 max-w-xl mx-auto">
                <p className="text-lg sm:text-xl font-bold font-handwriting text-pink-700 leading-relaxed">
                  "{config.finalSurprise.closingLine}"
                </p>
              </div>

              {/* Friendship Vital Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto my-6">
                {config.finalSurprise.friendshipStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-pink-50/50 rounded-2xl border border-pink-100 flex flex-col items-center"
                  >
                    <span className="text-xs text-stone-500 font-medium">
                      {stat.label}
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-pink-600 font-mono tabular-nums my-0.5">
                      {stat.value}
                    </span>
                    <span className="text-[10px] text-pink-400 font-handwriting text-xs">
                      {stat.sub}
                    </span>
                  </div>
                ))}
              </div>

              {/* Interactive Celebration Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-6 border-t border-pink-100">
                {/* Replay Adventure Button */}
                <button
                  onClick={() => {
                    fireHeartBurst();
                    onReplay();
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-full text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{config.finalSurprise.replayButtonText}</span>
                </button>

                {/* Print/Save Keepsake */}
                <button
                  onClick={handlePrint}
                  className="w-full sm:w-auto px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-full text-xs sm:text-sm border border-stone-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-stone-500" />
                  <span>Print / Save Scrapbook 🖨️</span>
                </button>

                {/* More Confetti Blast */}
                <button
                  onClick={() => {
                    fireBirthdayConfetti();
                    musicBox.playChime(659.25, 0.3);
                  }}
                  className="w-full sm:w-auto px-5 py-3 bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold rounded-full text-xs sm:text-sm border border-pink-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  <span>More Confetti! 🎉</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer message */}
      <footer className="text-center mt-12 pt-6 border-t border-pink-100">
        <p className="text-xs text-stone-500 font-handwriting text-base">
          Crafted with love for {config.herName} • Forever & Always 🌷
        </p>
      </footer>
    </div>
  );
};
