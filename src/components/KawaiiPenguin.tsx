import React from 'react';
import { motion } from 'motion/react';

export type PenguinMood = 'default' | 'holding-gift' | 'chaos' | 'wholesome' | 'secret' | 'jumping';

interface KawaiiPenguinProps {
  mood?: PenguinMood;
  size?: number;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const KawaiiPenguin: React.FC<KawaiiPenguinProps> = ({
  mood = 'default',
  size = 180,
  className = '',
  onClick,
  interactive = false,
}) => {
  const isJumping = mood === 'jumping';
  const isChaos = mood === 'chaos';
  const isWholesome = mood === 'wholesome';
  const isSecret = mood === 'secret';
  const isGift = mood === 'holding-gift';

  return (
    <motion.div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${
        interactive ? 'cursor-pointer' : ''
      } ${className}`}
      style={{ width: size, height: size * 1.1 }}
      animate={
        isJumping
          ? {
              y: [0, -28, 0, -18, 0],
              scaleY: [1, 1.08, 0.94, 1.04, 1],
              scaleX: [1, 0.94, 1.06, 0.96, 1],
            }
          : {
              y: [0, -6, 0],
            }
      }
      transition={
        isJumping
          ? { repeat: Infinity, duration: 1.1, ease: 'easeInOut' }
          : { repeat: Infinity, duration: 2.8, ease: 'easeInOut' }
      }
      whileHover={interactive ? { scale: 1.06, rotate: [-1, 2, -1] } : undefined}
      whileTap={interactive ? { scale: 0.96 } : undefined}
    >
      <svg
        viewBox="0 0 200 220"
        width={size}
        height={size * 1.1}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-md"
      >
        {/* Soft Shadow on ground */}
        <ellipse cx="100" cy="208" rx="55" ry="10" fill="#E2D5DF" fillOpacity="0.6" />

        {/* Penguin Little Feet */}
        <motion.path
          d="M65 195 C60 195 50 200 52 208 C54 214 74 214 80 206 C84 200 80 195 65 195 Z"
          fill="#FB923C"
          animate={isJumping ? { y: [0, -4, 0] } : undefined}
          transition={{ repeat: Infinity, duration: 1.1 }}
        />
        <motion.path
          d="M135 195 C140 195 150 200 148 208 C146 214 126 214 120 206 C116 200 120 195 135 195 Z"
          fill="#FB923C"
          animate={isJumping ? { y: [0, -4, 0] } : undefined}
          transition={{ repeat: Infinity, duration: 1.1, delay: 0.1 }}
        />

        {/* Left Flipper */}
        <motion.path
          d="M50 120 C32 125 18 145 26 162 C32 174 48 165 52 148 C54 138 52 126 50 120 Z"
          fill="#332940"
          animate={
            isJumping || isChaos
              ? { rotate: [-15, 25, -15], originX: '50px', originY: '125px' }
              : { rotate: [-4, 6, -4], originX: '50px', originY: '125px' }
          }
          transition={{ repeat: Infinity, duration: isJumping || isChaos ? 0.6 : 2.5 }}
        />

        {/* Right Flipper */}
        <motion.path
          d="M150 120 C168 125 182 145 174 162 C168 174 152 165 148 148 C146 138 148 126 150 120 Z"
          fill="#332940"
          animate={
            isJumping || isChaos
              ? { rotate: [15, -25, 15], originX: '150px', originY: '125px' }
              : { rotate: [4, -6, 4], originX: '150px', originY: '125px' }
          }
          transition={{ repeat: Infinity, duration: isJumping || isChaos ? 0.6 : 2.5 }}
        />

        {/* Chubby Penguin Body */}
        <rect x="42" y="55" width="116" height="142" rx="58" fill="#332940" />

        {/* Soft White Tummy */}
        <ellipse cx="100" cy="138" rx="44" ry="58" fill="#FFFDFD" />

        {/* Rosy Pastel Cheeks */}
        <ellipse cx="68" cy="116" rx="10" ry="7" fill="#F472B6" fillOpacity={isWholesome ? '0.85' : '0.65'} />
        <ellipse cx="132" cy="116" rx="10" ry="7" fill="#F472B6" fillOpacity={isWholesome ? '0.85' : '0.65'} />

        {/* Kawaii Eyes */}
        {isSecret ? (
          // Winking eyes for secret penguin
          <>
            <ellipse cx="78" cy="104" rx="6" ry="8" fill="#2E1C2B" />
            <circle cx="76" cy="101" r="2.5" fill="#FFFFFF" />
            <path d="M124 105 Q132 96 140 105" stroke="#2E1C2B" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : isChaos ? (
          // Playful starry / squinty excited eyes
          <>
            <path d="M70 103 Q78 95 86 103" stroke="#2E1C2B" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M114 103 Q122 95 130 103" stroke="#2E1C2B" strokeWidth="3.5" strokeLinecap="round" />
          </>
        ) : (
          // Classic big shiny anime eyes
          <>
            <ellipse cx="78" cy="104" rx="6.5" ry="8.5" fill="#2E1C2B" />
            <circle cx="76" cy="101" r="2.8" fill="#FFFFFF" />
            <circle cx="80" cy="108" r="1.2" fill="#FFFFFF" />

            <ellipse cx="122" cy="104" rx="6.5" ry="8.5" fill="#2E1C2B" />
            <circle cx="120" cy="101" r="2.8" fill="#FFFFFF" />
            <circle cx="124" cy="108" r="1.2" fill="#FFFFFF" />
          </>
        )}

        {/* Cute Beak */}
        <path
          d="M93 110 C93 110 100 105 107 110 C107 110 104 122 100 123 C96 122 93 110 93 110 Z"
          fill="#FB923C"
        />

        {/* Party Hat (for celebratory or default mood) */}
        {(isJumping || mood === 'default') && (
          <g transform="translate(82, 14)">
            <path d="M18 0 L36 46 L0 46 Z" fill="#F472B6" />
            <path d="M8 24 L28 24 L24 34 L12 34 Z" fill="#FDE047" />
            <circle cx="18" cy="0" r="5" fill="#FDE047" />
            {/* Tiny stars on party hat */}
            <circle cx="18" cy="38" r="2.5" fill="#FFFFFF" />
          </g>
        )}

        {/* Flower Crown for Wholesome Penguin */}
        {isWholesome && (
          <g transform="translate(62, 42)">
            <circle cx="16" cy="12" r="7" fill="#F472B6" />
            <circle cx="16" cy="12" r="3" fill="#FEF08A" />

            <circle cx="38" cy="8" r="8" fill="#BAE6FD" />
            <circle cx="38" cy="8" r="3" fill="#FEF08A" />

            <circle cx="60" cy="12" r="7" fill="#FBCFE8" />
            <circle cx="60" cy="12" r="3" fill="#FEF08A" />
          </g>
        )}

        {/* Cool Sunglasses for Chaos Penguin */}
        {isChaos && (
          <g transform="translate(60, 94)">
            <rect x="0" y="0" width="34" height="20" rx="6" fill="#F43F5E" />
            <rect x="46" y="0" width="34" height="20" rx="6" fill="#F43F5E" />
            <line x1="34" y1="8" x2="46" y2="8" stroke="#F43F5E" strokeWidth="4" />
            {/* Reflection gleams */}
            <line x1="6" y1="4" x2="20" y2="16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="52" y1="4" x2="66" y2="16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* Detective Bowler / Sleuth Hat for Secret Penguin */}
        {isSecret && (
          <g transform="translate(74, 25)">
            <ellipse cx="26" cy="30" rx="34" ry="7" fill="#6366F1" />
            <path d="M6 30 C6 12 18 10 26 10 C34 10 46 12 46 30 Z" fill="#4F46E5" />
            <rect x="8" y="24" width="36" height="5" fill="#A5B4FC" />
            {/* Sparkle icon on hat */}
            <path d="M26 14 L28 19 L33 21 L28 23 L26 28 L24 23 L19 21 L24 19 Z" fill="#FDE047" />
          </g>
        )}

        {/* Gift Box Held in Flippers */}
        {(isGift || isWholesome || isSecret || isChaos) && (
          <g transform="translate(68, 140)">
            <rect
              x="0"
              y="10"
              width="64"
              height="44"
              rx="6"
              fill={isChaos ? '#FB7185' : isWholesome ? '#F472B6' : '#818CF8'}
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            {/* Gift Lid */}
            <rect
              x="-4"
              y="4"
              width="72"
              height="12"
              rx="4"
              fill={isChaos ? '#FDA4AF' : isWholesome ? '#FBCFE8' : '#A5B4FC'}
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            {/* Vertical Ribbon */}
            <rect x="27" y="4" width="10" height="50" fill="#FDE047" />
            {/* Ribbon Bow */}
            <path
              d="M32 4 C24 -4 14 0 22 6 C28 8 32 5 32 4 Z"
              fill="#FDE047"
            />
            <path
              d="M32 4 C40 -4 50 0 42 6 C36 8 32 5 32 4 Z"
              fill="#FDE047"
            />
            <circle cx="32" cy="4" r="3" fill="#EAB308" />
          </g>
        )}
      </svg>
    </motion.div>
  );
};
