/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BIRTHDAY_CONFIG, BirthdayConfig } from './config/birthdayConfig';
import { HeaderNav } from './components/HeaderNav';
import { ScreenOneAccept } from './components/ScreenOneAccept';
import { ScreenTwoPenguins } from './components/ScreenTwoPenguins';
import { ScreenThreeGift } from './components/ScreenThreeGift';
import { ScreenFourScrapbook } from './components/ScreenFourScrapbook';
import { ScreenSixSurprise } from './components/ScreenSixSurprise';
import { fireBirthdayConfetti } from './utils/confetti';

export default function App() {
  const [config, setConfig] = useState<BirthdayConfig>(BIRTHDAY_CONFIG);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [unlockedStep, setUnlockedStep] = useState<number>(1);
  const [sharedPhoto, setSharedPhoto] = useState<string | null>(
    config.birthdayLetter.photoUrl || '/assets/aistudio/WhatsApp_Image_2026-10-23_at_11.02.46_PM_89132f34.jpeg'
  );

  const goToStep = (step: number) => {
    setCurrentStep(step);
    if (step > unlockedStep) {
      setUnlockedStep(step);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextStep = () => {
    goToStep(Math.min(currentStep + 1, 5));
  };

  const handleBackStep = () => {
    goToStep(Math.max(currentStep - 1, 1));
  };

  const handleReplay = () => {
    setCurrentStep(1);
    fireBirthdayConfetti();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] text-stone-800 flex flex-col justify-between selection:bg-pink-200 selection:text-pink-900">
      {/* Top Bar following 3-Zone Contract */}
      <HeaderNav
        currentStep={currentStep}
        onSelectStep={goToStep}
        unlockedStep={unlockedStep}
      />

      {/* Main Interactive Screen Showcase */}
      <main className="flex-1 w-full relative">
        {currentStep === 1 && (
          <ScreenOneAccept
            config={config}
            onAccept={() => goToStep(2)}
          />
        )}

        {currentStep === 2 && (
          <ScreenTwoPenguins
            config={config}
            onNextScreen={() => goToStep(3)}
            onBackScreen={handleBackStep}
          />
        )}

        {currentStep === 3 && (
          <ScreenThreeGift
            config={config}
            onNextScreen={() => goToStep(4)}
            onBackScreen={handleBackStep}
          />
        )}

        {currentStep === 4 && (
          <ScreenFourScrapbook
            config={config}
            onNextScreen={() => goToStep(5)}
            onBackScreen={handleBackStep}
            sharedPhoto={sharedPhoto}
            onUploadPhoto={setSharedPhoto}
          />
        )}

        {currentStep === 5 && (
          <ScreenSixSurprise
            config={config}
            onReplay={handleReplay}
          />
        )}
      </main>
    </div>
  );
}
