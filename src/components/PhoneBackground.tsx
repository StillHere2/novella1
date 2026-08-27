import React from 'react';
import { Character } from '../types/game';

interface PhoneBackgroundProps {
  character: Character;
  children: React.ReactNode;
}

export const PhoneBackground: React.FC<PhoneBackgroundProps> = ({
  character,
  children,
}) => {
  const isGirl = character === 'girl';

  return (
    <div
      id="game-environment-wrapper"
      className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden overflow-y-auto select-none p-0 sm:p-3 md:p-6 transition-colors duration-1000"
      style={{
        backgroundColor: isGirl ? '#090c14' : '#030407',
        backgroundImage: isGirl
          ? `radial-gradient(circle at 50% 30%, rgba(30, 36, 56, 0.45) 0%, transparent 70%), radial-gradient(circle at 20% 80%, rgba(18, 14, 28, 0.6) 0%, transparent 70%)`
          : `radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.4) 0%, transparent 80%)`,
      }}
    >
      {/* Background Ambience Atmosphere */}
      {isGirl ? (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-500/[0.03] blur-3xl pointer-events-none" />
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-indigo-950/[0.1] blur-3xl pointer-events-none" />
        </div>
      ) : (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(20,26,40,0.3)_0%,_rgba(2,3,6,0.95)_75%)]" />
          <div className="absolute -bottom-20 left-0 right-0 h-96 bg-gradient-to-t from-slate-900/30 to-transparent blur-2xl" />
        </div>
      )}

      {/* Pure Smartphone Center Display - Nothing outside */}
      <div
        id="desk-center-phone"
        className="relative z-10 w-full max-w-[400px] flex flex-col items-center justify-center flex-shrink-0"
      >
        {children}
      </div>
    </div>
  );
};
