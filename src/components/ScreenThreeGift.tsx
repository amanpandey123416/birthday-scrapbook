import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BirthdayConfig } from '../config/birthdayConfig';
import { fireBirthdayConfetti, fireHeartBurst } from '../utils/confetti';
import { musicBox } from '../utils/audioSynth';
import { Sparkles, Gift, ArrowLeft, ArrowRight, Award, Check, Heart, Ticket } from 'lucide-react';

interface ScreenThreeGiftProps {
  config: BirthdayConfig;
  onNextScreen: () => void;
  onBackScreen: () => void;
}

export const ScreenThreeGift: React.FC<ScreenThreeGiftProps> = ({
  config,
  onNextScreen,
  onBackScreen,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isUntying, setIsUntying] = useState(false);
  const [claimedCoupons, setClaimedCoupons] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'bouquet' | 'certificate' | 'coupons'>('bouquet');
  const [redeemedCouponModal, setRedeemedCouponModal] = useState<(typeof config.giftReveal.friendshipCoupons)[0] | null>(null);

  const handleOpenGift = () => {
    if (isOpened || isUntying) return;
    setIsUntying(true);
    musicBox.playChime(440, 0.2);

    setTimeout(() => {
      setIsOpened(true);
      setIsUntying(false);
      fireBirthdayConfetti();
      musicBox.playChime(523.25, 0.5);
    }, 800);
  };

  const handleClaimCoupon = (coupon: (typeof config.giftReveal.friendshipCoupons)[0]) => {
    setClaimedCoupons((prev) => new Set(prev).add(coupon.code));
    setRedeemedCouponModal(coupon);
    fireHeartBurst();
    musicBox.playChime(659.25, 0.25);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Step Indicator Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold mb-3">
          <Gift className="w-3.5 h-3.5" />
          <span>Screen 3 of 5: Unwrapping the Surprise</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-handwriting text-stone-800 mb-2">
          {config.giftReveal.title}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base font-body">
          {isOpened
            ? "Tada! Look at everything packed with love inside for you 🌸"
            : config.giftReveal.subtitle}
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex flex-col items-center justify-center my-6">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            /* Closed Gift Box Stage */
            <motion.div
              key="closed-box"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              onClick={handleOpenGift}
              className="relative cursor-pointer group flex flex-col items-center select-none"
            >
              {/* Click Me Teaser Pill */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="mb-4 px-4 py-1.5 bg-pink-500 text-white font-bold text-xs rounded-full shadow-md flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>TAP TO UNWRAP THE BOX 🎁</span>
              </motion.div>

              {/* Vector 3D-styled Gift Box */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                <svg
                  viewBox="0 0 300 300"
                  className="w-full h-full filter drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                >
                  {/* Ground Shadow */}
                  <ellipse cx="150" cy="280" rx="90" ry="16" fill="#FCE7F3" />

                  {/* Main Box Base */}
                  <rect
                    x="50"
                    y="110"
                    width="200"
                    height="160"
                    rx="18"
                    fill="url(#giftGradient)"
                    stroke="#F472B6"
                    strokeWidth="3"
                  />

                  {/* Box Shading Gradient */}
                  <defs>
                    <linearGradient id="giftGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFF1F2" />
                      <stop offset="50%" stopColor="#FCE7F3" />
                      <stop offset="100%" stopColor="#FBCFE8" />
                    </linearGradient>
                    <linearGradient id="goldRibbon" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#FDE047" />
                      <stop offset="50%" stopColor="#FACC15" />
                      <stop offset="100%" stopColor="#EAB308" />
                    </linearGradient>
                  </defs>

                  {/* Vertical Ribbon */}
                  <rect x="135" y="110" width="30" height="160" fill="url(#goldRibbon)" />

                  {/* Horizontal Ribbon */}
                  <rect x="50" y="175" width="200" height="30" fill="url(#goldRibbon)" />

                  {/* Gift Box Lid (animates when untying) */}
                  <motion.g
                    animate={
                      isUntying
                        ? { y: -50, rotate: -8, opacity: 0.8 }
                        : { y: [0, -3, 0] }
                    }
                    transition={
                      isUntying
                        ? { duration: 0.6 }
                        : { repeat: Infinity, duration: 2.5 }
                    }
                  >
                    <rect
                      x="40"
                      y="85"
                      width="220"
                      height="35"
                      rx="10"
                      fill="#FDA4AF"
                      stroke="#F43F5E"
                      strokeWidth="3"
                    />
                    <rect x="135" y="85" width="30" height="35" fill="url(#goldRibbon)" />

                    {/* Ribbon Big Bow */}
                    <path
                      d="M150 85 C120 40 80 50 110 75 C130 90 148 85 150 85 Z"
                      fill="url(#goldRibbon)"
                      stroke="#CA8A04"
                      strokeWidth="2"
                    />
                    <path
                      d="M150 85 C180 40 220 50 190 75 C170 90 152 85 150 85 Z"
                      fill="url(#goldRibbon)"
                      stroke="#CA8A04"
                      strokeWidth="2"
                    />
                    {/* Bow Knot */}
                    <circle cx="150" cy="85" r="10" fill="#EAB308" />
                  </motion.g>
                </svg>
              </div>

              <span className="text-xs text-pink-600 font-handwriting mt-3 text-base">
                *Wrapped specially for {config.herName}*
              </span>
            </motion.div>
          ) : (
            /* Opened Gift Reveal Stage */
            <motion.div
              key="opened-box"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-pink-200 paper-card relative"
            >
              {/* Scrapbook Tape Decor */}
              <div className="w-28 h-5 mx-auto -mt-9 mb-6 washi-tape washi-tape-pink rounded-xs" />

              {/* Gift Navigation Tabs */}
              <div className="flex items-center justify-center gap-2 mb-6 border-b border-pink-100 pb-4">
                <button
                  onClick={() => setActiveTab('bouquet')}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'bouquet'
                      ? 'bg-pink-500 text-white shadow-xs'
                      : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
                  }`}
                >
                  <span>💐 Flower Bouquet</span>
                </button>

                <button
                  onClick={() => setActiveTab('certificate')}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'certificate'
                      ? 'bg-pink-500 text-white shadow-xs'
                      : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Friendship Certificate</span>
                </button>

                <button
                  onClick={() => setActiveTab('coupons')}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'coupons'
                      ? 'bg-pink-500 text-white shadow-xs'
                      : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
                  }`}
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Friendship Vouchers</span>
                </button>
              </div>

              {/* Tab 1: Virtual Flower Bouquet */}
              {activeTab === 'bouquet' && (
                <div className="text-center py-4">
                  {/* Charming Illustrated Bouquet Graphic */}
                  <div className="relative w-48 h-48 mx-auto mb-4 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-md">
                      {/* Kraft Paper Wrap */}
                      <path d="M60 110 L100 190 L140 110 Z" fill="#FDE68A" />
                      <path d="M52 110 C52 100 80 120 100 120 C120 120 148 100 148 110 L100 190 Z" fill="#FCD34D" />
                      
                      {/* Satin Ribbon */}
                      <rect x="85" y="140" width="30" height="12" rx="4" fill="#F472B6" />
                      <path d="M85 146 C75 160 70 175 75 180" stroke="#F472B6" strokeWidth="3" fill="none" />
                      <path d="M115 146 C125 160 130 175 125 180" stroke="#F472B6" strokeWidth="3" fill="none" />

                      {/* Leaves */}
                      <ellipse cx="65" cy="85" rx="14" ry="7" transform="rotate(-30 65 85)" fill="#86EFAC" />
                      <ellipse cx="135" cy="85" rx="14" ry="7" transform="rotate(30 135 85)" fill="#86EFAC" />
                      <ellipse cx="100" cy="55" rx="16" ry="7" transform="rotate(90 100 55)" fill="#86EFAC" />

                      {/* Tulip Left */}
                      <g transform="translate(50, 45)">
                        <path d="M20 30 C10 10 30 10 20 30 Z" fill="#FDA4AF" />
                        <ellipse cx="20" cy="20" rx="12" ry="16" fill="#FB7185" />
                        <ellipse cx="20" cy="18" rx="8" ry="12" fill="#FDA4AF" />
                      </g>

                      {/* Peony Center */}
                      <g transform="translate(80, 25)">
                        <circle cx="20" cy="20" r="18" fill="#F472B6" />
                        <circle cx="20" cy="20" r="14" fill="#FBCFE8" />
                        <circle cx="20" cy="20" r="9" fill="#FDF2F8" />
                        <circle cx="20" cy="20" r="4" fill="#FEF08A" />
                      </g>

                      {/* Daisy Right */}
                      <g transform="translate(115, 45)">
                        <circle cx="20" cy="20" r="16" fill="#E0F2FE" />
                        <circle cx="20" cy="20" r="8" fill="#FEF08A" />
                      </g>

                      {/* Floating Sparkles */}
                      <circle cx="45" cy="30" r="2.5" fill="#FACC15" />
                      <circle cx="155" cy="35" r="3" fill="#FACC15" />
                      <circle cx="100" cy="10" r="2.5" fill="#F472B6" />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold font-handwriting text-pink-700 mb-2">
                    {config.giftReveal.flowerBouquetName}
                  </h3>
                  <p className="max-w-md mx-auto text-stone-600 text-sm font-body leading-relaxed bg-pink-50/70 p-4 rounded-2xl border border-pink-100">
                    {config.giftReveal.flowerBouquetNote}
                  </p>
                </div>
              )}

              {/* Tab 2: Best Friend Certificate */}
              {activeTab === 'certificate' && (
                <div className="p-4 sm:p-6 bg-[#FFFDF8] rounded-2xl border-2 border-dashed border-amber-300 relative text-center">
                  <div className="inline-block p-2 bg-amber-100 text-amber-800 rounded-full mb-2">
                    <Award className="w-8 h-8 text-amber-600" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold font-handwriting text-amber-900 mb-1">
                    {config.giftReveal.certificateTitle}
                  </h4>
                  <p className="text-xs uppercase tracking-widest text-amber-700 font-semibold mb-3">
                    Awarded To:
                  </p>
                  <div className="text-2xl sm:text-3xl font-extrabold font-handwriting text-pink-600 underline decoration-wavy decoration-pink-300 mb-3">
                    {config.herName} ({config.herNickname})
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto font-body italic mb-6">
                    "{config.giftReveal.certificateReason}"
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-amber-200 text-xs text-stone-500 font-handwriting text-sm">
                    <span>Signed: {config.myName} ✍️</span>
                    <span className="text-amber-700 font-bold">✨ Officially Non-Refundable ✨</span>
                    <span>Date: {config.herBirthday}</span>
                  </div>
                </div>
              )}

              {/* Tab 3: Bestie Coupons */}
              {activeTab === 'coupons' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
                  {config.giftReveal.friendshipCoupons.map((coupon) => {
                    const isClaimed = claimedCoupons.has(coupon.code);

                    return (
                      <div
                        key={coupon.code}
                        className={`p-4 rounded-2xl border transition-all text-left relative flex flex-col justify-between ${
                          isClaimed
                            ? 'bg-emerald-50/80 border-emerald-300'
                            : 'bg-pink-50/60 border-pink-200 hover:border-pink-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{coupon.icon}</span>
                            <span className="text-[10px] font-mono text-stone-400 bg-white px-2 py-0.5 rounded-md border border-stone-200">
                              {coupon.code}
                            </span>
                          </div>
                          <h5 className="font-bold text-sm text-stone-800 font-handwriting text-base">
                            {coupon.title}
                          </h5>
                          <p className="text-xs text-stone-600 mt-1 leading-snug font-body">
                            {coupon.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-dashed border-pink-200">
                          {isClaimed ? (
                            <button
                              onClick={() => {
                                setRedeemedCouponModal(coupon);
                                fireHeartBurst();
                              }}
                              className="w-full py-1.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Claimed! View Pass ✨</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleClaimCoupon(coupon)}
                              className="w-full py-1.5 px-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                            >
                              Redeem Coupon 🎟️
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Prompt to Go to Next Scrapbook Screen */}
              <div className="mt-8 pt-6 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-stone-500 font-handwriting text-base">
                  Ready for the trip down memory lane? 📸✨
                </span>
                <button
                  onClick={onNextScreen}
                  className="px-6 py-3 bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-full text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>SEE OUR SCRAPBOOK 📸</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Screen navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-pink-100">
        <button
          onClick={onBackScreen}
          className="px-4 py-2 text-stone-600 hover:text-pink-600 text-xs sm:text-sm font-medium flex items-center gap-1.5 cursor-pointer rounded-full hover:bg-pink-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Penguins</span>
        </button>

        <button
          onClick={onNextScreen}
          className="px-5 py-2.5 bg-pink-500 hover:bg-pink-600 text-white text-xs sm:text-sm font-semibold rounded-full shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>Continue to Scrapbook 📸</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Cute Coupon Popup Modal */}
      <AnimatePresence>
        {redeemedCouponModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border-2 border-pink-200 relative paper-card text-center"
            >
              {/* Scrapbook Tape at top */}
              <div className="w-24 h-5 mx-auto -mt-9 mb-4 washi-tape washi-tape-pink rounded-xs rotate-[-1deg]" />

              {/* Close Button */}
              <button
                onClick={() => setRedeemedCouponModal(null)}
                className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                title="Close coupon"
              >
                ✕
              </button>

              {/* Subtle Celebratory Animation (Gentle pulse and floating badge) */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 4, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-2xl bg-pink-50 text-3xl mx-auto mb-3 flex items-center justify-center border border-pink-200 shadow-inner"
              >
                {redeemedCouponModal.icon}
              </motion.div>

              <div className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200 mb-2">
                <span>Pass Code: {redeemedCouponModal.code}</span>
              </div>

              <h4 className="text-xl font-bold font-handwriting text-stone-800 mb-1">
                {redeemedCouponModal.title}
              </h4>

              <div className="bg-notebook-ruled p-4 rounded-2xl border border-dashed border-pink-200 text-left my-3 shadow-inner">
                <p className="text-xs sm:text-sm text-stone-700 font-body leading-relaxed">
                  "{redeemedCouponModal.description}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-pink-100 flex flex-col items-center gap-2.5">
                <span className="text-[11px] text-pink-500 font-handwriting text-sm">
                  ✨ Officially Redeemed • Valid Anytime with {config.myName}
                </span>
                <button
                  onClick={() => setRedeemedCouponModal(null)}
                  className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Close Pass ✨
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
