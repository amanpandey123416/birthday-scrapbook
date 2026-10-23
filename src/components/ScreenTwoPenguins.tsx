import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KawaiiPenguin, PenguinMood } from './KawaiiPenguin';
import { BirthdayConfig, PenguinConfig } from '../config/birthdayConfig';
import { fireBirthdayConfetti, fireHeartBurst } from '../utils/confetti';
import { musicBox } from '../utils/audioSynth';
import { Sparkles, ArrowLeft, ArrowRight, CheckCircle2, Gift, Flame, Heart, Flower2 } from 'lucide-react';

interface ScreenTwoPenguinsProps {
  config: BirthdayConfig;
  onNextScreen: () => void;
  onBackScreen: () => void;
}

export const ScreenTwoPenguins: React.FC<ScreenTwoPenguinsProps> = ({
  config,
  onNextScreen,
  onBackScreen,
}) => {
  const [openedPenguins, setOpenedPenguins] = useState<Set<string>>(new Set());
  const [activePenguinId, setActivePenguinId] = useState<string | null>(null);

  const penguinList: Array<{
    config: PenguinConfig;
    mood: PenguinMood;
    icon: React.ReactNode;
    washi: string;
    bgAccent: string;
  }> = [
    {
      config: config.penguins.chaos,
      mood: 'chaos',
      icon: <Flame className="w-4 h-4 text-rose-500" />,
      washi: 'washi-tape-pink',
      bgAccent: 'from-rose-50 to-pink-50',
    },
    {
      config: config.penguins.wholesome,
      mood: 'wholesome',
      icon: <Heart className="w-4 h-4 text-pink-500" />,
      washi: 'washi-tape-yellow',
      bgAccent: 'from-amber-50 to-pink-50',
    },
    {
      config: config.penguins.secret,
      mood: 'secret',
      icon: <Sparkles className="w-4 h-4 text-indigo-500" />,
      washi: 'washi-tape-lavender',
      bgAccent: 'from-indigo-50 to-purple-50',
    },
  ];

  const handleOpenPenguin = (id: string) => {
    setActivePenguinId(id);
    setOpenedPenguins((prev) => new Set(prev).add(id));
    fireHeartBurst();
    musicBox.playChime(id === 'chaos' ? 440 : id === 'wholesome' ? 523.25 : 349.23, 0.3);
  };

  const handleCloseActivePenguin = () => {
    setActivePenguinId(null);
  };

  const allOpened = openedPenguins.size >= 3;
  const activePenguinItem = penguinList.find((p) => p.config.id === activePenguinId);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Top Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Screen 2 of 5: Penguin Parlor</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-handwriting text-stone-800 mb-2">
          Choose a penguin 🐧
        </h1>
        <p className="text-stone-600 text-sm sm:text-base font-body">
          Each one has something special to say ✨{' '}
          <span className="text-pink-600 font-semibold">
            ({openedPenguins.size}/3 Discovered)
          </span>
        </p>
      </div>

      {/* 3 Penguin Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
        {penguinList.map((item) => {
          const isOpened = openedPenguins.has(item.config.id);

          return (
            <motion.div
              key={item.config.id}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenPenguin(item.config.id)}
              className={`relative bg-white rounded-3xl p-6 border transition-all cursor-pointer paper-card flex flex-col items-center text-center ${
                isOpened ? 'border-pink-300 ring-2 ring-pink-100' : 'border-pink-100 hover:border-pink-300'
              }`}
            >
              {/* Cute Washi Tape at Top */}
              <div
                className={`w-24 h-5 -mt-8 mb-4 washi-tape ${item.washi} rounded-xs rotate-[-1deg]`}
              />

              {/* Status Badge */}
              <div className="self-end mb-2">
                {isOpened ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Opened</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200 animate-pulse">
                    <Gift className="w-3 h-3 text-pink-500" />
                    <span>Click to Open</span>
                  </span>
                )}
              </div>

              {/* Penguin Graphic */}
              <div className="my-2">
                <KawaiiPenguin mood={item.mood} size={150} />
              </div>

              {/* Title & Tagline */}
              <h2 className="text-xl font-bold font-handwriting text-stone-800 mt-2 flex items-center gap-1.5 justify-center">
                <span>{item.config.name}</span>
              </h2>
              <p className="text-xs text-pink-600 font-medium mt-1">
                {item.config.tagline}
              </p>

              {/* Teaser pill */}
              <div className="mt-4 pt-4 border-t border-dashed border-pink-100 w-full flex items-center justify-center gap-1 text-xs text-stone-500">
                {item.icon}
                <span className="font-handwriting text-sm">{item.config.badge}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bonus / Next Section Reveal when all 3 are opened */}
      <AnimatePresence>
        {allOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="p-6 sm:p-8 bg-linear-to-r from-pink-100 via-rose-50 to-amber-100 rounded-3xl border border-pink-200 shadow-md text-center my-8 relative overflow-hidden"
          >
            <div className="relative z-10 max-w-lg mx-auto">
              <span className="text-3xl inline-block mb-2 animate-bounce">🎁🎉</span>
              <h3 className="text-2xl font-bold font-handwriting text-pink-800 mb-1">
                You Unlocked All 3 Penguins!
              </h3>
              <p className="text-stone-700 text-sm mb-5 font-body">
                The penguin council has officially approved the release of your physical & digital birthday gift box!
              </p>
              <button
                onClick={() => {
                  fireBirthdayConfetti();
                  onNextScreen();
                }}
                className="px-8 py-3.5 bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-full text-base shadow-lg shadow-pink-300 transition-all cursor-pointer flex items-center gap-2 mx-auto"
              >
                <span>OPEN YOUR GIFT NOW 🎁</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-pink-100">
        <button
          onClick={onBackScreen}
          className="px-4 py-2 text-stone-600 hover:text-pink-600 text-xs sm:text-sm font-medium flex items-center gap-1.5 cursor-pointer rounded-full hover:bg-pink-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Gift Welcome</span>
        </button>

        {openedPenguins.size > 0 && !allOpened && (
          <p className="text-xs text-stone-500 font-handwriting text-center hidden sm:block">
            Tip: Open all 3 penguins to unlock the secret gift box!
          </p>
        )}

        <button
          onClick={onNextScreen}
          className="px-5 py-2.5 bg-pink-500 hover:bg-pink-600 text-white text-xs sm:text-sm font-semibold rounded-full shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>Skip to Gift 🎁</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Detail Modal for Selected Penguin */}
      <AnimatePresence>
        {activePenguinItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-pink-200 relative overflow-hidden paper-card max-h-[90vh] overflow-y-auto"
            >
              {/* Top Washi Tape */}
              <div
                className={`w-32 h-6 mx-auto -mt-10 mb-6 washi-tape ${activePenguinItem.washi} rounded-xs`}
              />

              {/* Close / Back button */}
              <button
                onClick={handleCloseActivePenguin}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
                title="Back to all penguins"
              >
                ✕
              </button>

              {/* Header */}
              <div className="text-center mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                  {activePenguinItem.config.tagline}
                </span>
                <h3 className="text-2xl font-bold font-handwriting text-stone-800 mt-2">
                  {activePenguinItem.config.cardTitle}
                </h3>
              </div>

              {/* Penguin Art in Modal */}
              <div className="flex justify-center my-3">
                <KawaiiPenguin mood={activePenguinItem.mood} size={140} />
              </div>

              {/* Main Penguin Message Card */}
              <div className="bg-[#FFFDF8] border border-dashed border-pink-200 rounded-2xl p-5 mb-5 text-left relative bg-notebook-ruled">
                <p className="text-stone-800 text-base sm:text-xl leading-relaxed font-handwriting tracking-wide font-medium relative pl-5 pr-2 before:content-['“'] before:absolute before:left-0 before:-top-1 before:text-3xl before:font-serif before:text-pink-400 after:content-['”'] after:text-2xl after:font-serif after:text-pink-400 after:ml-1">
                  {activePenguinItem.config.message}
                </p>

                {activePenguinItem.config.roastOrCompliment && (
                  <div className="mt-4 pt-3 border-t border-pink-100 flex items-start gap-2.5 bg-pink-50/70 p-3 rounded-xl border border-pink-200">
                    <span className="text-pink-500 font-bold text-base shrink-0 select-none">💡</span>
                    <p className="text-xs sm:text-sm text-pink-950 font-medium font-body leading-relaxed">
                      {activePenguinItem.config.roastOrCompliment.includes(':') ? (
                        <>
                          <strong className="font-bold text-pink-900 block sm:inline font-sans not-italic">
                            {activePenguinItem.config.roastOrCompliment.split(':')[0]}:
                          </strong>{' '}
                          <span className="italic">
                            {activePenguinItem.config.roastOrCompliment.split(':').slice(1).join(':')}
                          </span>
                        </>
                      ) : (
                        <span className="italic">{activePenguinItem.config.roastOrCompliment}</span>
                      )}
                    </p>
                  </div>
                )}

                {/* Animated blooming flower for Secret Penguin */}
                {activePenguinItem.config.id === 'secret' && (
                  <div className="mt-4 p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                      className="text-2xl"
                    >
                      🌸
                    </motion.div>
                    <p className="text-xs text-indigo-900 font-handwriting text-base">
                      *A magical enchanted birthday flower bloomed just for you!*
                    </p>
                  </div>
                )}
              </div>

              {/* Bonus Tag */}
              {activePenguinItem.config.bonusSurpriseNote && (
                <div className="text-center mb-6">
                  <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-semibold font-handwriting text-sm">
                    ✨ {activePenguinItem.config.bonusSurpriseNote}
                  </span>
                </div>
              )}

              {/* Dismiss button */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    fireHeartBurst();
                    handleCloseActivePenguin();
                  }}
                  className="px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-sm font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  {activePenguinItem.config.buttonActionText}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
