import React, { useState, useEffect } from 'react';
import { Paperclip, ChevronUp, ChevronDown, Send } from 'lucide-react';
import { ChoiceOption } from '../types/game';
import { playTapSound, playMessageSend } from '../utils/audio';
import { VoiceWaveformIcon } from './VoiceWaveformIcon';

interface ChatInputBarProps {
  choices?: ChoiceOption[];
  onSelectChoice: (choice: ChoiceOption) => void;
  onOpenActionPopup?: () => void;
  isActionPopupOpen?: boolean;
  isTypingOther: boolean;
  activeCharacter: 'girl' | 'boy';
  prefilledText?: string;
  onClearPrefill?: () => void;
  isBoyNameKnown?: boolean;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  choices = [],
  onSelectChoice,
  onOpenActionPopup,
  isActionPopupOpen = false,
  isTypingOther,
  activeCharacter,
  prefilledText = '',
  onClearPrefill,
  isBoyNameKnown = false,
}) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (prefilledText) {
      setTypedText(prefilledText);
    }
  }, [prefilledText]);

  const handleManualSend = () => {
    if (typedText && choices.length > 0) {
      playMessageSend();
      const matched = choices.find(
        (c) =>
          c.label.toLowerCase().includes(typedText.toLowerCase().slice(0, 10)) ||
          c.messageText.toLowerCase().includes(typedText.toLowerCase().slice(0, 10))
      );
      onSelectChoice(matched || choices[0]);
      setTypedText('');
      if (onClearPrefill) onClearPrefill();
    } else if (typedText) {
      setTypedText('');
      if (onClearPrefill) onClearPrefill();
    }
  };

  const hasPendingChoices = !isTypingOther && choices && choices.length > 0;

  const handleClickAction = () => {
    playTapSound(0.2);
    if (hasPendingChoices && onOpenActionPopup) {
      onOpenActionPopup();
    }
  };

  return (
    <div
      id="chat-bottom-panel-container"
      className="w-full flex flex-col bg-[#0a0d16]/95 backdrop-blur-lg border-t border-white/[0.08] z-20"
    >
      {/* Communicator Action Bar */}
      <div className="w-full flex items-center gap-2.5 p-2.5 px-3">
        {/* Attachment button */}
        <button
          id="btn-chat-attachment"
          onClick={() => playTapSound(0.2)}
          className="p-2.5 text-slate-400 hover:text-white rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 transition-colors flex-shrink-0 cursor-pointer"
          title="Прикрепить"
        >
          <Paperclip className="w-4 h-4 text-slate-400" />
        </button>

        {/* Action button / Status bar */}
        {hasPendingChoices ? (
          <button
            id="btn-open-action-choices"
            onClick={handleClickAction}
            className={`flex-1 rounded-xl px-4 py-2.5 text-xs text-slate-200 flex items-center justify-between min-h-[44px] transition-all select-none cursor-pointer border ${
              isActionPopupOpen
                ? 'border-cyan-400 bg-gradient-to-r from-cyan-950/70 via-[#101b2e] to-purple-950/60 shadow-[0_0_16px_rgba(6,182,212,0.35)] text-white'
                : 'border-cyan-500/70 bg-gradient-to-r from-cyan-950/50 via-[#10192a] to-purple-950/40 hover:border-cyan-400 animate-soft-pulse active:scale-[0.99] text-cyan-100'
            }`}
            title={isActionPopupOpen ? 'Свернуть варианты' : 'Выбрать ответ'}
          >
            <div className="flex items-center gap-2.5 font-sans font-semibold text-[13px] tracking-wide">
              <VoiceWaveformIcon size="sm" barCount={4} />
              <span>Выбрать ответ</span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded-lg bg-cyan-900/40 border border-cyan-400/40 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                {isActionPopupOpen ? (
                  <ChevronDown className="w-4 h-4 text-cyan-300" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-cyan-300 animate-bounce" />
                )}
              </div>
            </div>
          </button>
        ) : typedText ? (
          <div className="flex-1 flex items-center gap-2">
            <div className="flex-1 rounded-xl px-3.5 py-2 text-xs text-slate-100 min-h-[42px] border border-slate-800/80 bg-[#121622] flex items-center">
              <span className="truncate max-w-[240px] font-sans text-[12px]">{typedText}</span>
            </div>
            <button
              id="btn-chat-send"
              onClick={handleManualSend}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg transition-transform active:scale-95 border border-amber-300 font-bold flex-shrink-0"
              title="Отправить"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            id="simulated-input-box"
            className="flex-1 rounded-xl px-3.5 py-2 text-xs text-slate-400 flex items-center justify-between min-h-[42px] border border-slate-800/80 bg-[#121622] select-none"
          >
            {isTypingOther ? (
              <span className="text-amber-400 flex items-center gap-1.5 animate-pulse font-sans text-[12px]">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                {activeCharacter === 'girl'
                  ? '.... печатает...'
                  : 'Алиса печатает...'}
              </span>
            ) : (
              <span className="text-slate-500 font-sans text-[12px]">Сообщение...</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


