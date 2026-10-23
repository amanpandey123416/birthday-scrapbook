/**
 * 🎀 BEST FRIEND BIRTHDAY CONFIGURATION 🎀
 * 
 * Edit this file to completely customize your best friend's birthday website!
 * Replace placeholders like "[HER NAME]", "[HER NICKNAME]", and "[INSERT MY PERSONAL BIRTHDAY MESSAGE HERE]"
 * with your own words, photos, and inside jokes.
 */

export interface ScrapbookMemory {
  id: string;
  category: string;
  title: string;
  dateOrPlace?: string;
  quote?: string;
  description: string;
  emoji: string;
  sticker: 'star' | 'heart' | 'flower' | 'sparkle' | 'bow';
  tapeColor?: 'pink' | 'yellow' | 'mint' | 'lavender';
  imagePlaceholderText: string;
  customImageUrl?: string;
}

export interface PenguinConfig {
  id: 'chaos' | 'wholesome' | 'secret';
  name: string;
  tagline: string;
  badge: string;
  themeColor: string;
  boxColor: string;
  cardTitle: string;
  message: string;
  roastOrCompliment?: string;
  bonusSurpriseNote?: string;
  buttonActionText: string;
}

export interface BirthdayConfig {
  // --- Personal Names & Dates ---
  herName: string;
  herNickname: string;
  myName: string;
  herBirthday: string; // e.g. "October 28th" or "Today!"

  // --- Theme & Style ---
  theme: {
    primaryPastel: string;
    secondaryPastel: string;
    accentColor: string;
    paperTint: string;
    fontStyle: 'kawaii-handwritten' | 'playful-modern';
  };

  // --- Screen 1: Acceptance Screen ---
  screenOne: {
    heading: string;
    subheading: string;
    yesButtonText: string;
    noButtonText: string;
    noButtonResponses: string[];
  };

  // --- Screen 2: Choose Your Penguin ---
  penguins: {
    chaos: PenguinConfig;
    wholesome: PenguinConfig;
    secret: PenguinConfig;
  };

  // --- Screen 3: Interactive Gift Box ---
  giftReveal: {
    title: string;
    subtitle: string;
    flowerBouquetName: string;
    flowerBouquetNote: string;
    certificateTitle: string;
    certificateRecipient: string;
    certificateReason: string;
    friendshipCoupons: Array<{
      title: string;
      code: string;
      description: string;
      icon: string;
    }>;
  };

  // --- Screen 4: Scrapbook Memories & Photos ---
  scrapbookMemories: ScrapbookMemory[];

  // --- Screen 5: The Main Birthday Letter ---
  birthdayLetter: {
    title: string;
    photoPlaceholderLabel?: string;
    photoUrl?: string; // Optional custom URL or local path
    messageBody: string; // The exact placeholder requested
    closingLine: string;
    signature: string;
  };

  // --- Screen 6: Final Surprise ---
  finalSurprise: {
    teaserText: string;
    revealTitle: string;
    closingLine: string;
    friendshipStats: Array<{
      label: string;
      value: string;
      sub: string;
    }>;
    replayButtonText: string;
  };

  // --- Audio / Music ---
  audio: {
    title: string;
    customMusicUrl?: string; // Optional MP3 file path/URL
    useBuiltInMusicBox: boolean; // Plays soothing interactive Web Audio music box melody
  };
}

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  herName: "Vanshika",
  herNickname: "Champa Don",
  myName: "Aman",
  herBirthday: "24/10/2026",

  theme: {
    primaryPastel: "#FFD1DC",
    secondaryPastel: "#FFF0F5",
    accentColor: "#FF69B4",
    paperTint: "#FFFDF9",
    fontStyle: "kawaii-handwritten",
  },

  screenOne: {
    heading: "PLS ACCEPT THE GIFT 🥺💗",
    subheading: "A top-secret, highly classified, cute birthday package has arrived for you!",
    yesButtonText: "YESSS, GIVE ME MY GIFT 🎁",
    noButtonText: "NOPE, I'M TOO CUTE FOR THIS",
    noButtonResponses: [
      "Wait, wait! That button is not permitted by friendship law! 🚫😆",
      "Error 404: Refusal rejected! You cannot escape your birthday love! 🐧✨",
      "Too cute? That's EXACTLY why this gift belongs to you! 🎀",
      "Hehe nice try friend! Now click the pink button! 🥺💕",
      "I bribed the penguin with fish, you HAVE to accept now! 🐟❤️"
    ],
  },

  penguins: {
    chaos: {
      id: "chaos",
      name: "Pebbles the Chaos Penguin",
      tagline: "The Unhinged Partner-in-Crime",
      badge: "Warning: High Sarcasm & 100% Love",
      themeColor: "#FFE4E6",
      boxColor: "#FDA4AF",
      cardTitle: "A Special Birthday Note 💌✨",
      message: "Happy Birthdayyy! 💗🎂 I’m so glad to have you in my life. Thank you for all the laughs, crazy moments, and memories. I hope your day is as amazing as you are and this year brings you lots of happiness. Stay the same wonderful person you are! 🫶🏻✨",
      roastOrCompliment: "Hamara Future Business 😂🍔🥟: Yaad hai, humne saath mein momos aur burger ki stall kholne ka plan banaya tha? 😂😭 Sapne toh karodpati banne ke the, bas shuruaat momos bechne se honi thi! 🤝🤣",
      bonusSurpriseNote: "Certified: 10/10 Partner in Crime",
      buttonActionText: "Accept Hugs from Pebbles 🐧"
    },
    wholesome: {
      id: "wholesome",
      name: "Barnaby the Wholesome Penguin",
      tagline: "The Emotional Support Friend",
      badge: "Pure Warmth & Cozy Hugs",
      themeColor: "#FEF3C7",
      boxColor: "#FDE68A",
      cardTitle: "A Heartfelt Friend Appreciation 💌✨",
      message: "I am so deeply grateful to have you in my life. You have the kindest heart, the warmest laugh, and a superpower for turning even the most mundane days into cherished memories. Thank you for always listening, always understanding, and being the truest friend anyone could wish for.",
      roastOrCompliment: "Wishing you a year filled with sweet victories, gentle mornings, and endless happiness.",
      bonusSurpriseNote: "You make this world so much brighter just by being you 🌷",
      buttonActionText: "Collect Wholesome Hugs 🌸"
    },
    secret: {
      id: "secret",
      name: "Pip the Secret Agent Penguin",
      tagline: "The Mystery Box Keeper",
      badge: "Classified Birthday Magic",
      themeColor: "#E0E7FF",
      boxColor: "#C7D2FE",
      cardTitle: "A Hidden Birthday Wish & Magic Flower 🌷🔮",
      message: "Psst! Pip was guarding a magical birthday wish just for you! Every petal on this animated blossom represents a wish for health, boundless joy, dream achievements, and zero bad hair days.",
      roastOrCompliment: "Secret prophecy: This year is going to be your most iconic chapter yet!",
      bonusSurpriseNote: "Special secret unlocked: You are loved more than you know! 💫",
      buttonActionText: "Unlock Secret Sparkles ✨"
    }
  },

  giftReveal: {
    title: "YOU HAVE UNLOCKED YOUR BIRTHDAY GIFT!",
    subtitle: "Untie the golden bow to see what's packed inside just for you...",
    flowerBouquetName: "The Eternal Bloom Bouquet",
    flowerBouquetNote: "Hand-picked pastel blooms that will never wilt — filled with tulips for affection, daisies for laughter, and sunflowers for your warmth! 💐",
    certificateTitle: "OFFICIAL CERTIFICATE OF FRIENDSHIP",
    certificateRecipient: "Vanshika",
    certificateReason: "For outstanding patience with my bad jokes, unmatched advice during life emergencies, and being the sweetest human alive.",
    friendshipCoupons: [
      {
        title: "Truth or Dare Partner",
        code: "TRUTH-DARE-01",
        description: "Kabhi bhi Truth or Dare khelne ka mann ho, bas mujhe bula lena. I'm always ready for a fun game!",
        icon: "🎲"
      },
      {
        title: "Someone Who Always Listens",
        code: "ALWAYS-HERE-24/7",
        description: "Kabhi kuch pareshan kare ya bas baat karne ka mann ho, you can always talk to me. I'll listen and support you without judging.",
        icon: "☕"
      },
      {
        title: "Unlimited Fun Pass",
        code: "FUN-TIMES-03",
        description: "Random conversations, silly jokes, sharing stories, and making unforgettable memories. Good times are guaranteed!",
        icon: "🍿"
      }
    ]
  },

  scrapbookMemories: [
    {
      id: "mem-1",
      category: "Our Funniest Memory",
      title: "The Great Uncontrollable Laughing Fit",
      dateOrPlace: "That one evening we still talk about",
      description: "When we were supposed to be serious, looked at each other for half a second, and completely lost our minds laughing until our stomachs hurt. [INSERT SPECIFIC DETAILS HERE]",
      emoji: "😂",
      sticker: "heart",
      tapeColor: "pink",
      imagePlaceholderText: "Photo of us laughing until crying",
    },
    {
      id: "mem-2",
      category: "Our Favorite Inside Joke",
      title: "The Joke No One Else Understands",
      dateOrPlace: "Always relevant",
      description: "'[INSERT OUR FAVORITE INSIDE JOKE HERE]' — Literally nobody else in the universe gets why this is funny, and that is what makes it elite.",
      emoji: "🤫",
      sticker: "sparkle",
      tapeColor: "yellow",
      imagePlaceholderText: "Funny candid snapshot / meme",
    },
    {
      id: "mem-3",
      category: "A Moment That Made Me Smile",
      title: "Spontaneous Adventures & Good Talks",
      dateOrPlace: "A favorite coffee shop or road trip",
      description: "Those unplanned hours where we talked about everything from our deepest dreams to total nonsense. Those moments are pure gold. [INSERT DETAILS HERE]",
      emoji: "✨",
      sticker: "star",
      tapeColor: "mint",
      imagePlaceholderText: "Cozy cafe or travel selfie",
    },
    {
      id: "mem-4",
      category: "Something I Appreciate About Her",
      title: "Your Genuine, Golden Heart",
      dateOrPlace: "Every single day",
      description: "How you always know how to cheer me up, how deeply you care for people, and the effortless way you bring light into any room you walk into.",
      emoji: "💖",
      sticker: "flower",
      tapeColor: "lavender",
      imagePlaceholderText: "Photo showing your beautiful smile",
    },
    {
      id: "mem-5",
      category: "A Memory I Never Want To Forget",
      title: "Always There For Each Other",
      dateOrPlace: "A milestone day together",
      description: "Knowing that no matter how chaotic life gets or how busy our schedules become, we always pick right back up like zero days have passed.",
      emoji: "🌷",
      sticker: "bow",
      tapeColor: "pink",
      imagePlaceholderText: "A favorite polaroid of us together",
    }
  ],

  birthdayLetter: {
    title: "HAPPY BIRTHDAY, Vanshika!",
    photoUrl: "/assets/aistudio/WhatsApp_Image_2026-10-23_at_11.02.46_PM_89132f34.jpeg",
    messageBody: `Dear Vanshika, 🎂🌷

Happiest Birthday to youuu! 🥳💗 Aaj ka din tera naam hai, so enjoy it to the fullest! I hope tu apni life mein hamesha khushiyan, success, good memories aur bahut saara reasons aaya to smile.

May this new year of your life bring you closer to all your dreams. Hamesha khush rehna, apna khayal rakhna, aur kabhi bhi apni smile mat khona. You deserve a day as amazing as you are! ✨

Aur sun, birthday girl banne ke baad mujhe bhool mat jaana! 😂 Aur hamara momos aur burger wala business bhi ek din kholna hai—ye plan cancel nahi hua hai! 🍔🥟

Once again, Happy Birthday, Vanshika! I hope aaj ka din tera lia bahut saari happiness aur beautiful memories lekar aaye. Enjoy your special day! 🎀`,
    closingLine: "YOU DESERVE ALL THE HAPPINESS IN THE WORLD 🌷",
    signature: "From, Aman 🐧💌"
  },

  finalSurprise: {
    teaserText: "WAITTT... THERE'S ONE MORE THING 👀💗",
    revealTitle: "Sealed With Love & Friendship Law 📜✨",
    closingLine: "Congratulations! You are officially stuck with me for another year of nonsense. Happy birthday! 🐧💗",
    friendshipStats: [
      { label: "Hours of Laughter", value: "9,999+", sub: "and counting" },
      { label: "Inside Jokes", value: "∞", sub: "classified info" },
      { label: "Friendship Tier", value: "LEGENDARY", sub: "always there" }
    ],
    replayButtonText: "REPLAY OUR LITTLE ADVENTURE ↺"
  },

  audio: {
    title: "Gentle Music Box Birthday Chime",
    useBuiltInMusicBox: true,
  }
};
