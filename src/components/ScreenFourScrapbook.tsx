import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BirthdayConfig } from '../config/birthdayConfig';
import { KawaiiPenguin } from './KawaiiPenguin';
import { fireHeartBurst } from '../utils/confetti';
import { musicBox } from '../utils/audioSynth';
import { Camera, ArrowLeft, ArrowRight, Sparkles, Heart, Star, Smile, BookOpen, Quote } from 'lucide-react';

interface ScreenFourScrapbookProps {
  config: BirthdayConfig;
  onNextScreen: () => void;
  onBackScreen: () => void;
  sharedPhoto: string | null;
  onUploadPhoto: (url: string) => void;
}

export const ScreenFourScrapbook: React.FC<ScreenFourScrapbookProps> = ({
  config,
  onNextScreen,
  onBackScreen,
  sharedPhoto,
  onUploadPhoto,
}) => {
  const [stampCount, setStampCount] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUploadPhoto(url);
      fireHeartBurst();
      musicBox.playChime(523.25, 0.3);
    }
  };

  const handleStamp = (emoji: string) => {
    setStampCount((prev) => prev + 1);
    fireHeartBurst();
    musicBox.playChime(659.25, 0.2);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Screen 4 of 5: Birthday Message & Photo</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-handwriting text-stone-800 mb-2">
          A SPECIAL MESSAGE FOR YOU 💌✨
        </h1>
        <p className="text-stone-600 text-sm sm:text-base font-body">
          A personal note and photograph dedicated to {config.herName} ({config.herNickname})
        </p>
      </div>

      {/* Main Scrapbook Board */}
      <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-10 border-2 border-pink-200 shadow-xl relative bg-scrapbook-grid overflow-hidden paper-card">
        {/* Decorative Scrapbook Corner Stickers */}
        <div className="absolute top-4 right-6 text-2xl select-none rotate-12 pointer-events-none">⭐</div>
        <div className="absolute top-24 left-4 text-2xl select-none -rotate-12 pointer-events-none">🌸</div>
        <div className="absolute bottom-6 right-6 text-2xl select-none rotate-6 pointer-events-none">🎀</div>

        {/* 2-Column Responsive Layout: The Single Photo on Left, The Big Note on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: The Single Featured Polaroid Card of Her */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-[280px]">
              {/* Top Washi Tape */}
              <div className="w-28 h-5 mx-auto -mt-6 mb-2 washi-tape washi-tape-pink rounded-xs rotate-[-2deg]" />

              <div className="polaroid-card bg-white rounded-xl text-center rotate-[-1.5deg] shadow-lg">
                <div className="w-full h-64 sm:h-72 bg-linear-to-b from-pink-50 to-pink-100/70 rounded-md overflow-hidden relative flex flex-col items-center justify-center border border-pink-200 group">
                  {sharedPhoto ? (
                    <img
                      src={sharedPhoto}
                      alt={config.herName}
                      className="w-full h-full object-cover object-center rounded-xs"
                    />
                  ) : (
                    <div className="p-5 text-center flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-pink-200/90 mx-auto mb-3 flex items-center justify-center text-3xl shadow-inner text-pink-600">
                        👑
                      </div>
                      <p className="text-base font-bold text-pink-800 font-handwriting">
                        {config.herName}
                      </p>
                      <p className="text-xs text-pink-500 font-body mt-0.5">
                        {config.herNickname ? `aka ${config.herNickname}` : 'The Birthday Star'}
                      </p>
                      <span className="inline-block mt-3 px-3 py-1 bg-white/90 rounded-full text-[11px] font-semibold text-pink-700 shadow-xs border border-pink-200">
                        Tap here to add her photo 📷
                      </span>
                    </div>
                  )}

                  {/* Photo Upload Overlay */}
                  <label className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs cursor-pointer p-4 text-center">
                    <Camera className="w-6 h-6 mb-1 text-pink-200" />
                    <span className="font-semibold">
                      {sharedPhoto ? 'Change Photo' : 'Upload Her Photo'}
                    </span>
                    <span className="text-[10px] text-pink-100 mt-1">
                      (Just 1 photo needed — syncs everywhere!)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>

                <div className="pt-3 pb-1">
                  <p className="font-handwriting text-xl text-stone-800 font-bold">
                    {config.herName} {config.herNickname && <span className="text-pink-600">(aka {config.herNickname})</span>} 💖
                  </p>
                  <p className="text-xs text-stone-500 font-body mt-0.5 font-medium">
                    Forever iconic • {config.herBirthday}
                  </p>
                </div>
              </div>
            </div>

            {/* Mascot Penguin & Speech Bubble */}
            <div className="mt-6 flex items-center gap-3 w-full max-w-[280px]">
              <KawaiiPenguin mood="wholesome" size={90} />
              <div className="bg-white p-3 rounded-2xl border border-pink-200 shadow-xs text-xs font-handwriting text-base text-stone-700 leading-snug">
                "Great friends and partners in crime!" 🐧✨
              </div>
            </div>
          </div>

          {/* RIGHT: THE BIG BEAUTIFUL NOTE WITH GORGEOUS STYLING */}
          <div className="lg:col-span-7">
            <div className="relative bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border-2 border-pink-200/90 shadow-lg bg-notebook-ruled">
              {/* Decorative Header Washi Tapes */}
              <div className="flex items-center justify-between -mt-9 mb-4 px-4">
                <div className="w-20 h-5 washi-tape washi-tape-yellow rounded-xs rotate-[-3deg]" />
                <div className="w-24 h-5 washi-tape washi-tape-lavender rounded-xs rotate-[2deg]" />
              </div>

              {/* Note Title */}
              <div className="border-b border-dashed border-pink-200 pb-3 mb-5 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-600 font-sans">
                    Birthday Message & Wishes
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-handwriting text-pink-900">
                  Happy Birthday, {config.herName}! 💌✨
                </h3>
                <p className="text-xs text-stone-500 font-body mt-0.5">
                  From {config.myName} 🌸
                </p>
              </div>

              {/* Note Content: Heartfelt Message Letter */}
              <div className="font-handwriting text-lg sm:text-xl text-stone-800 leading-relaxed space-y-4 tracking-wide font-medium bg-pink-50/60 p-6 rounded-2xl border border-pink-200/90 shadow-xs text-left">
                <p className="text-xl sm:text-2xl font-bold text-pink-700">
                  Dear Vanshika, 🎂🌷
                </p>

                <p>
                  Happiest Birthday to youuu! 🥳💗 Aaj ka din tera naam hai, so enjoy it to the fullest! I hope tu apni life mein hamesha khushiyan, success, good memories aur bahut saara reasons aaya to smile.
                </p>

                <p>
                  May this new year of your life bring you closer to all your dreams. Hamesha khush rehna, apna khayal rakhna, aur kabhi bhi apni smile mat khona. You deserve a day as amazing as you are! ✨
                </p>

                <p>
                  Aur sun, birthday girl banne ke baad mujhe bhool mat jaana! 😂 Aur hamara momos aur burger wala business bhi ek din kholna hai—ye plan cancel nahi hua hai! 🍔🥟
                </p>

                <p>
                  Once again, <strong className="font-bold text-pink-700">Happy Birthday, Vanshika!</strong> I hope aaj ka din tera lia bahut saari happiness aur beautiful memories lekar aaye. Enjoy your special day! 🎀
                </p>

                <div className="pt-3 border-t border-dashed border-pink-200 text-right">
                  <p className="text-base font-bold text-pink-700">
                    From,
                  </p>
                  <p className="text-xl font-bold text-stone-800">
                    Aman 🐧💌
                  </p>
                </div>
              </div>

              {/* Bottom Interactive Stamp Station */}
              <div className="mt-6 pt-4 border-t border-dashed border-pink-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500 font-handwriting text-base">
                    Leave a birthday stamp:
                  </span>
                  <button
                    onClick={() => handleStamp('💖')}
                    className="p-1.5 bg-pink-100 hover:bg-pink-200 rounded-full transition-transform hover:scale-110 cursor-pointer"
                    title="Stamp Heart"
                  >
                    💖
                  </button>
                  <button
                    onClick={() => handleStamp('⭐')}
                    className="p-1.5 bg-amber-100 hover:bg-amber-200 rounded-full transition-transform hover:scale-110 cursor-pointer"
                    title="Stamp Star"
                  >
                    ⭐
                  </button>
                  <button
                    onClick={() => handleStamp('🌸')}
                    className="p-1.5 bg-rose-100 hover:bg-rose-200 rounded-full transition-transform hover:scale-110 cursor-pointer"
                    title="Stamp Flower"
                  >
                    🌸
                  </button>
                </div>

                <span className="text-xs font-handwriting text-pink-600 font-bold">
                  {stampCount > 0 ? `✨ ${stampCount} Sweet Stamps Given!` : 'Signed with Love • Aman ✍️'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Screen Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-pink-100 mt-8">
        <button
          onClick={onBackScreen}
          className="px-4 py-2 text-stone-600 hover:text-pink-600 text-xs sm:text-sm font-medium flex items-center gap-1.5 cursor-pointer rounded-full hover:bg-pink-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Gift Box</span>
        </button>

        <button
          onClick={onNextScreen}
          className="px-6 py-2.5 bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs sm:text-sm rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>ONE LAST SURPRISE 👀💗</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
