import React from 'react';
import { Wifi, Signal, Battery, Sparkles, Radio } from 'lucide-react';
import { Character } from '../types/game';

interface PhoneHardwareProps {
  character: Character;
  timeStr: string;
  isInitialDarkness?: boolean;
  onWakeFromDarkness?: () => void;
  children: React.ReactNode;
}

export const PhoneHardware: React.FC<PhoneHardwareProps> = ({
  character,
  timeStr,
  isInitialDarkness = false,
  onWakeFromDarkness,
  children
}) => {
  const isGirl = character === 'girl';

  return (
    <div
      id="smartphone-hardware-frame"
      className="relative w-full max-w-[390px] h-[810px] sm:h-[844px] bg-[#0c0d12] rounded-[48px] p-[11px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.08),0_0_40px_rgba(0,0,0,0.8)] border-4 border-[#1c1f2a] flex flex-col justify-between overflow-hidden transition-all duration-700"
    >
      {/* Side volume / power buttons simulation */}
      <div className="absolute -left-[7px] top-28 w-[3px] h-10 bg-[#2b2e3b] rounded-l" />
      <div className="absolute -left-[7px] top-44 w-[3px] h-12 bg-[#2b2e3b] rounded-l" />
      <div className="absolute -right-[7px] top-36 w-[3px] h-16 bg-[#2b2e3b] rounded-r" />

      {/* Screen Bezel Container */}
      <div className="relative w-full h-full bg-[#07090e] rounded-[38px] overflow-hidden flex flex-col border border-white/[0.04]">
        {/* Subtle Lifeline scanlines layer */}
        <div className="absolute inset-0 lifeline-scanlines opacity-25 pointer-events-none z-30" />

        {/* Dynamic Island / Hardware Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-40 flex items-center justify-between px-2.5 border border-white/5 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-[#121624] border border-cyan-900/40 relative">
            <div className="absolute inset-0.5 rounded-full bg-cyan-400/20 animate-pulse" />
          </div>
          <div className="w-2 h-2 rounded-full bg-[#111] border border-white/10" />
        </div>

        {/* Top Status Bar */}
        <div className="w-full h-11 pt-2 px-6 flex items-center justify-between z-30 text-xs font-medium tracking-tight select-none text-slate-300">
          {/* Status Bar Clock */}
          <span className="font-semibold text-[13px] font-mono tracking-normal drop-shadow">
            {timeStr}
          </span>

          {/* Status Bar Icons */}
          <div className="flex items-center gap-1.5 opacity-90 font-mono text-[10px]">
            <Signal className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] text-cyan-300">4G+</span>
            <Battery className="w-3.5 h-3.5 text-slate-300" />
          </div>
        </div>

        {/* Screen Content or Darkness Prologue */}
        {isInitialDarkness ? (
          <div
            id="darkness-prologue-screen"
            className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-opacity duration-1000"
            onClick={onWakeFromDarkness}
          >
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-cyan-500/30 flex items-center justify-center mb-4 animate-pulse shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Radio className="w-7 h-7 text-cyan-400 opacity-80 animate-spin" />
            </div>
            <p className="text-cyan-400 text-sm font-mono tracking-widest mb-2 animate-pulse font-bold">
              [ПОИСК СИГНАЛА СВЯЗИ]
            </p>
            <p className="text-slate-400 text-xs font-mono max-w-[240px] leading-relaxed">
              Нажмите на экран терминала, чтобы установить контакт...
            </p>
          </div>
        ) : (
          <div className="relative flex-1 flex flex-col overflow-hidden">
            {children}
          </div>
        )}

        {/* Bottom Home Indicator Bar */}
        <div className="w-full h-5 flex items-center justify-center z-30 pointer-events-none pb-1">
          <div className="w-32 h-1 bg-slate-500/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};
