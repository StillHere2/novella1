import React, { useState, useEffect } from 'react';
import { Paperclip, Mic, Send, Sparkles, ChevronUp } from 'lucide-react';
import { ChoiceOption } from '../types/game';
import { playTapSound, playMessageSend } from '../utils/audio';

interface ChatInputBarProps {
  choices?: ChoiceOption[];
  onSelectChoice: (choice: ChoiceOption) => void;
  onOpenActionPopup?: () => void;
  isTypingOther: boolean;
  activeCharacter: 'girl' | 'boy';
  prefilledText?: string;
  onClearPrefill?: () => void;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  choices = [],
  onSelectChoice,
  onOpenActionPopup,
  isTypingOther,
  activeCharacter,
  prefilledText = '',
  onClearPrefill,
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

  const handleClickInputArea = () => {
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
      {/* Communicator Sub-Bar & Status */}
      <div className="w-full flex items-center gap-2 p-2.5 px-3">
        {/* Attachment button */}
        <button
          id="btn-chat-attachment"
          onClick={() => playTapSound(0.2)}
          className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800 transition-colors"
          title="Прикрепить"
        >
          <Paperclip className="w-4 h-4 text-slate-400" />
        </button>

        {/* Input / Status Display (Clickable when choices are available) */}
        <div
          id="simulated-input-box"
          onClick={handleClickInputArea}
          className={`flex-1 rounded-xl px-3.5 py-2 text-xs text-slate-200 flex items-center justify-between min-h-[40px] transition-all cursor-pointer select-none ${
            hasPendingChoices
              ? 'border border-purple-500/60 bg-gradient-to-r from-purple-950/40 via-[#181a2e] to-purple-950/30 hover:border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.15)] active:scale-[0.99]'
              : 'border border-slate-800/80 bg-[#121622]'
          }`}
        >
          <span className="truncate max-w-[240px] font-sans text-[12px]">
            {typedText ? (
              typedText
            ) : isTypingOther ? (
              <span className="text-amber-400 flex items-center gap-1.5 animate-pulse">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                печатает...
              </span>
            ) : hasPendingChoices ? (
              <span className="text-purple-200 font-semibold flex items-center gap-1.5 font-sans">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Выбрать действие ({choices.length})</span>
              </span>
            ) : (
              <span className="text-slate-500">Сообщение...</span>
            )}
          </span>

          {hasPendingChoices && (
            <div className="p-1 rounded-md bg-purple-900/40 text-purple-300">
              <ChevronUp className="w-3.5 h-3.5 animate-bounce" />
            </div>
          )}
        </div>

        {/* Send / Mic button */}
        {typedText ? (
          <button
            id="btn-chat-send"
            onClick={handleManualSend}
            className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg transition-transform active:scale-95 border border-amber-300 font-bold"
            title="Отправить реплику"
          >
            <Send className="w-4 h-4" />
          </button>
        ) : hasPendingChoices ? (
          <button
            id="btn-open-actions-direct"
            onClick={handleClickInputArea}
            className="p-2 text-purple-200 hover:text-white rounded-xl bg-purple-900/60 hover:bg-purple-800 border border-purple-500/50 shadow-md transition-all active:scale-95"
            title="Открыть варианты действий"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
          </button>
        ) : (
          <button
            id="btn-chat-mic"
            onClick={() => playTapSound(0.2)}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 transition-colors"
            title="Микрофон"
          >
            <Mic className="w-4 h-4 text-slate-400" />
          </button>
        )}
      </div>
    </div>
  );
};

