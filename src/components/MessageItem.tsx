import React, { useState, useEffect } from 'react';
import { Message, Character } from '../types/game';
import { AlertTriangle, CheckCheck, Terminal } from 'lucide-react';
import { playTeletypeClick, playTapSound } from '../utils/audio';

interface MessageItemProps {
  message: Message;
  activePerspective: Character;
  isNewest?: boolean;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  activePerspective,
}) => {
  const isSenderActive = message.sender === activePerspective;
  const isSystem = message.sender === 'system';
  const isEntity = message.sender === 'entity';
  const isBoy = message.sender === 'boy';

  // SYSTEM LOG ENTRY
  if (isSystem) {
    return (
      <div className="w-full my-3 px-2 flex flex-col items-center justify-center animate-fadeIn">
        <div className="bg-[#0b0e17]/90 border border-slate-700/60 rounded-lg px-3 py-1.5 text-[11px] text-slate-300 font-mono text-center shadow-md max-w-[92%] flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-purple-400 animate-pulse flex-shrink-0" />
          <span className="leading-snug">{message.text}</span>
        </div>
      </div>
    );
  }

  // CORRUPTED / ENTITY LOG
  if (isEntity) {
    return (
      <div className="w-full my-3 px-2 flex flex-col items-center justify-center animate-fadeIn">
        <div className="bg-rose-950/80 border border-rose-500/70 rounded-xl p-3 text-xs text-rose-100 font-serif text-center shadow-lg max-w-[94%] ring-1 ring-rose-500/40">
          <div className="flex items-center justify-center gap-1.5 text-rose-400 font-mono text-[10px] font-bold tracking-wider mb-1 uppercase">
            <AlertTriangle className="w-3.5 h-3.5 animate-bounce text-rose-400" />
            <span>[ВНЕШНЕЕ ВМЕШАТЕЛЬСТВО]</span>
          </div>
          <p className="italic leading-relaxed">{message.text}</p>
        </div>
      </div>
    );
  }

  const isOutgoing = isSenderActive;
  const senderLabel = isBoy ? 'Марк' : 'Алиса';

  return (
    <div
      id={`message-${message.id}`}
      className={`w-full flex flex-col mb-3 px-2 sm:px-3 animate-fadeIn ${
        isOutgoing ? 'items-end' : 'items-start'
      }`}
    >
      {/* Sender Tag */}
      <div
        className={`flex items-center gap-1 mb-1 text-[11px] font-medium select-none ${
          isOutgoing ? 'text-purple-300/80 flex-row-reverse' : 'text-cyan-300/80'
        }`}
      >
        <span>{senderLabel}</span>
      </div>

      {/* Main Message Bubble */}
      <div
        className={`relative max-w-[88%] sm:max-w-[84%] rounded-xl sm:rounded-2xl p-3 text-xs sm:text-[13px] leading-relaxed backdrop-blur-md transition-all shadow-md ${
          isOutgoing
            ? 'bg-[#2a2c42]/90 text-[#f1f3fa] rounded-tr-xs border border-purple-400/30'
            : 'bg-[#111624]/95 text-[#e2e8f0] rounded-tl-xs border border-slate-700/60 shadow-cyan-950/20'
        } ${
          message.isGlitch
            ? 'border-red-500/70 bg-red-950/30 font-mono text-red-200 ring-1 ring-red-500/30'
            : ''
        }`}
      >
        {/* Message Text */}
        <div className="break-words select-text font-normal">
          {message.text}
        </div>

        {/* Status for outgoing messages only */}
        {isOutgoing && (
          <div className="mt-1 flex items-center justify-end text-[9px] font-mono text-purple-300/70 select-none">
            <CheckCheck className="w-3 h-3 inline" />
          </div>
        )}
      </div>
    </div>
  );
};
