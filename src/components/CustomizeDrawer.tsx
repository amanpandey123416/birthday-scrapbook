import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BirthdayConfig } from '../config/birthdayConfig';
import { X, Check, Copy, SlidersHorizontal, Sparkles, Heart } from 'lucide-react';

interface CustomizeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  onUpdateConfig: (newConfig: BirthdayConfig) => void;
}

export const CustomizeDrawer: React.FC<CustomizeDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}) => {
  const [formData, setFormData] = useState({
    herName: config.herName,
    herNickname: config.herNickname,
    myName: config.myName,
    herBirthday: config.herBirthday,
    birthdayMessage: config.birthdayLetter.messageBody,
    insideJoke: config.penguins.chaos.roastOrCompliment || '',
    finalClosingLine: config.finalSurprise.closingLine,
  });

  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: BirthdayConfig = {
      ...config,
      herName: formData.herName,
      herNickname: formData.herNickname,
      myName: formData.myName,
      herBirthday: formData.herBirthday,
      birthdayLetter: {
        ...config.birthdayLetter,
        messageBody: formData.birthdayMessage,
      },
      penguins: {
        ...config.penguins,
        chaos: {
          ...config.penguins.chaos,
          roastOrCompliment: formData.insideJoke,
        },
      },
      finalSurprise: {
        ...config.finalSurprise,
        closingLine: formData.finalClosingLine,
      },
    };
    onUpdateConfig(updated);
    onClose();
  };

  const handleCopyConfig = () => {
    const codeSnippet = `// In /src/config/birthdayConfig.ts:
herName: "${formData.herName}",
herNickname: "${formData.herNickname}",
myName: "${formData.myName}",
herBirthday: "${formData.herBirthday}",
birthdayLetter: {
  messageBody: \`${formData.birthdayMessage}\`,
},
finalSurprise: {
  closingLine: "${formData.finalClosingLine}",
}`;
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/40 backdrop-blur-xs">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-md bg-[#FFFDF9] h-full shadow-2xl border-l border-pink-200 flex flex-col justify-between overflow-y-auto paper-card"
          >
            {/* Header */}
            <div className="p-5 border-b border-pink-100 flex items-center justify-between bg-pink-50/60 sticky top-0 z-10 backdrop-blur-xs">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-pink-600" />
                <h3 className="font-bold text-stone-800 font-handwriting text-xl">
                  Personalize Details ✨
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white hover:bg-pink-100 text-stone-600 flex items-center justify-center transition-colors cursor-pointer border border-pink-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleApply} className="p-5 space-y-4 flex-1">
              <div className="p-3 bg-pink-50/70 rounded-2xl border border-pink-200 text-xs text-pink-900">
                💡 <strong>Tip:</strong> You can edit here for live instant preview, or edit{' '}
                <code className="bg-white px-1.5 py-0.5 rounded text-[11px] font-mono border border-pink-200">
                  /src/config/birthdayConfig.ts
                </code>{' '}
                for permanent customization!
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Her Name
                </label>
                <input
                  type="text"
                  name="herName"
                  value={formData.herName}
                  onChange={handleChange}
                  placeholder="e.g. Emma"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Her Nickname
                </label>
                <input
                  type="text"
                  name="herNickname"
                  value={formData.herNickname}
                  onChange={handleChange}
                  placeholder="e.g. Emmy / Bubbles"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="myName"
                  value={formData.myName}
                  onChange={handleChange}
                  placeholder="e.g. Alex"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Her Birthday
                </label>
                <input
                  type="text"
                  name="herBirthday"
                  value={formData.herBirthday}
                  onChange={handleChange}
                  placeholder="e.g. October 28th"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Our Inside Joke / Chaos Roast
                </label>
                <input
                  type="text"
                  name="insideJoke"
                  value={formData.insideJoke}
                  onChange={handleChange}
                  placeholder="e.g. Remember that 2am pizza disaster?"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Personal Birthday Letter Message
                </label>
                <textarea
                  name="birthdayMessage"
                  rows={4}
                  value={formData.birthdayMessage}
                  onChange={handleChange}
                  placeholder="Your heartfelt birthday letter message..."
                  className="w-full px-3 py-2 bg-white rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 font-body leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Final Screen Closing Line
                </label>
                <textarea
                  name="finalClosingLine"
                  rows={2}
                  value={formData.finalClosingLine}
                  onChange={handleChange}
                  placeholder="Closing humorous affectionate note..."
                  className="w-full px-3 py-2 bg-white rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 font-body"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Apply & Live Preview</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyConfig}
                  className="py-2.5 px-3 bg-white hover:bg-pink-50 text-stone-700 rounded-xl text-xs border border-pink-200 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Copy snippet"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
