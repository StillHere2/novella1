import React from 'react';
import { Sliders, Settings } from 'lucide-react';
import { Character } from '../types/game';

interface MessengerHeaderProps {
  activePerspective: Character;
  currentDay: number;
  isTyping: boolean;
  isBoyNameKnown?: boolean;
  onCallGhost?: () => void;
  onOpenDevMenu?: () => void;
  onOpenThoughts?: () => void;
  thoughtsCount?: number;
  hasActionableThoughts?: boolean;
  affectionStat?: number;
  courageStat?: number;
  dependenceStat?: number;
}

export const MessengerHeader: React.FC<MessengerHeaderProps> = ({
  activePerspective,
  isTyping,
  onOpenDevMenu,
}) => {
  const isGirl = activePerspective === 'girl';
  const contactName = isGirl ? '....' : 'Алиса';
  const avatarLetter = isGirl ? '?' : 'А';

  return (
    <div
      id="communicator-header"
      className="w-full border-b border-white/[0.08] bg-[#090c14]/95 backdrop-blur-md flex flex-col z-20 select-none shadow-md"
    >
      {/* Main Communicator Bar */}
      <div className="w-full px-3.5 py-2.5 flex items-center justify-between">
        {/* Contact Info & Avatar */}
        <div className="flex items-center gap-2.5">
          {/* Avatar with subtle indicator */}
          <div className="relative">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center border font-sans font-bold text-xs ${
                isGirl
                  ? 'bg-[#111827] border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                  : 'bg-[#1f142b] border-purple-500/40 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.15)]'
              }`}
            >
              {avatarLetter}
            </div>

            {/* Active status indicator */}
            <div
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#090c14] ${
                isTyping ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
              }`}
            />
          </div>

          {/* Name & Status */}
          <div className="flex flex-col">
            <span className="font-bold text-sm text-slate-100 tracking-wide font-sans">
              {contactName}
            </span>

            <span className="text-[11px] font-sans text-slate-400 flex items-center gap-1">
              {isTyping ? (
                <span className="text-amber-400 font-medium flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  печатает...
                </span>
              ) : (
                <span className="text-slate-400">в сети</span>
              )}
            </span>
          </div>
        </div>

        {/* Right Header Actions: Developer & Testing Button */}
        <div className="flex items-center gap-2">
          {/* Dedicated Dev & Testing Button */}
          <button
            id="btn-dev-testing-menu"
            onClick={onOpenDevMenu}
            className="px-2.5 py-1.5 rounded-xl bg-purple-950/70 hover:bg-purple-900/90 border border-purple-500/50 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            title="Панель разработчика (переход по дням 1-33, скорость, концовки, статы)"
          >
            <Sliders className="w-3.5 h-3.5 text-purple-300" />
            <span className="text-[11px] font-sans">Dev</span>
          </button>
        </div>
      </div>
    </div>
  );
};
