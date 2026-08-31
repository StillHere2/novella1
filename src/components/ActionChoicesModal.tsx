import React, { useState, useEffect, useRef } from 'react';
import { ChoiceOption } from '../types/game';
import { sortChoicesWithDistrustFirst, EnrichedChoice } from '../utils/choiceSorting';
import { X, Send, ChevronLeft, ChevronRight, ShieldAlert, Heart, Flame } from 'lucide-react';
import { playChoiceBeep, playMessageSend, playTapSound } from '../utils/audio';
import { VoiceWaveformIcon } from './VoiceWaveformIcon';

interface ActionChoicesModalProps {
  isOpen: boolean;
  choices: ChoiceOption[];
  onSelectChoice: (choice: ChoiceOption) => void;
  onClose: () => void;
  activeCharacter: 'girl' | 'boy';
}

export const ActionChoicesModal: React.FC<ActionChoicesModalProps> = ({
  isOpen,
  choices,
  onSelectChoice,
  onClose,
  activeCharacter,
}) => {
  const [enrichedChoices, setEnrichedChoices] = useState<EnrichedChoice[]>([]);
  const [isClosing, setIsClosing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (choices && choices.length > 0) {
      const sorted = sortChoicesWithDistrustFirst(choices);
      setEnrichedChoices(sorted);
      setCurrentIndex(0);
    } else {
      setEnrichedChoices([]);
    }
  }, [choices]);

  if (!isOpen || !enrichedChoices || enrichedChoices.length === 0) return null;

  const handlePickChoice = (choice: ChoiceOption) => {
    setIsClosing(true);
    playChoiceBeep(0.3);
    playMessageSend();

    setTimeout(() => {
      onSelectChoice(choice);
      setIsClosing(false);
      onClose();
    }, 150);
  };

  const handleDismiss = () => {
    playTapSound(0.2);
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 180);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const itemWidth = container.clientWidth;
    if (itemWidth > 0) {
      const idx = Math.round(container.scrollLeft / itemWidth);
      setCurrentIndex(Math.min(Math.max(0, idx), enrichedChoices.length - 1));
    }
  };

  const scrollToChoice = (index: number) => {
    if (!scrollContainerRef.current) return;
    playTapSound(0.15);
    const container = scrollContainerRef.current;
    const targetScroll = index * container.clientWidth;
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  return (
    <div
      id="action-choices-popup-overlay"
      className="absolute inset-0 z-40 flex flex-col justify-end bg-black/65 backdrop-blur-[4px] transition-opacity duration-200 animate-fadeIn select-none"
      onClick={handleDismiss}
    >
      {/* Popup Window Container */}
      <div
        id="action-choices-popup-window"
        onClick={(e) => e.stopPropagation()}
        className={`w-full bg-[#0c101a] border-t border-purple-500/50 rounded-t-3xl shadow-[0_-16px_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden transition-all duration-200 ${
          isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100 animate-slideUp'
        }`}
      >
        {/* Top Handle / Header */}
        <div className="w-full pt-3.5 pb-2.5 px-4 flex items-center justify-between border-b border-white/[0.08] bg-[#111625]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0e1726] border border-cyan-500/50 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <VoiceWaveformIcon size="sm" barCount={4} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-100 font-sans tracking-wide">
                Сообщение для отправки
              </h3>
              <span className="text-[10px] text-cyan-300/80 font-sans">
                Вариант {currentIndex + 1} из {enrichedChoices.length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Scroll navigation arrows if more than 1 choice */}
            {enrichedChoices.length > 1 && (
              <div className="flex items-center gap-1 mr-1 bg-slate-900/80 border border-slate-700/60 rounded-xl p-0.5">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => scrollToChoice(currentIndex - 1)}
                  className="p-1 rounded-lg text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors"
                  title="Предыдущий вариант"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={currentIndex === enrichedChoices.length - 1}
                  onClick={() => scrollToChoice(currentIndex + 1)}
                  className="p-1 rounded-lg text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors"
                  title="Следующий вариант"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              id="btn-close-action-popup"
              onClick={handleDismiss}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors"
              title="Свернуть, чтобы прочитать сообщения"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Container configured so EXACTLY 1 ACTION is visible at a time with horizontal snap */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="w-full overflow-x-auto snap-x snap-mandatory flex flex-row no-scrollbar p-3"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {enrichedChoices.map((choice, index) => {
            const hasAffection = (choice.statImpact?.affection || 0) !== 0;
            const hasCourage = (choice.statImpact?.courage || 0) !== 0;
            const hasDependence = (choice.statImpact?.dependence || 0) !== 0;
            const textToSend = choice.messageText || choice.label;

            return (
              <div
                key={choice.id || index}
                id={`action-choice-option-${index}`}
                onClick={() => handlePickChoice(choice)}
                className="snap-center shrink-0 w-full min-w-full h-[126px] rounded-2xl p-3.5 border border-purple-500/40 hover:border-purple-400 bg-gradient-to-br from-[#181d2e] via-[#141826] to-[#1d162e] hover:from-[#1e243a] hover:to-[#281e40] shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between active:scale-[0.99]"
              >
                {/* Main Message Text to send (Directly as message preview, without redundant description) */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 pr-1 overflow-hidden">
                    <p className="text-[13px] sm:text-[13.5px] font-normal leading-relaxed text-slate-100 font-sans group-hover:text-amber-100 line-clamp-3">
                      «{textToSend}»
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-purple-600 hover:bg-purple-500 border border-purple-400/60 shadow-[0_0_12px_rgba(168,85,247,0.3)] flex items-center justify-center text-white flex-shrink-0">
                    <Send className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Row: Impacts & Swipe Hint */}
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    {hasAffection && (
                      <span className="flex items-center gap-1 text-pink-400 font-semibold">
                        <Heart className="w-3 h-3" />
                        {choice.statImpact!.affection! > 0 ? `+${choice.statImpact!.affection}` : choice.statImpact!.affection}
                      </span>
                    )}
                    {hasCourage && (
                      <span className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Flame className="w-3 h-3" />
                        {choice.statImpact!.courage! > 0 ? `+${choice.statImpact!.courage}` : choice.statImpact!.courage}
                      </span>
                    )}
                    {hasDependence && (
                      <span className="flex items-center gap-1 text-purple-400 font-semibold">
                        <ShieldAlert className="w-3 h-3" />
                        {choice.statImpact!.dependence! > 0 ? `+${choice.statImpact!.dependence}` : choice.statImpact!.dependence}
                      </span>
                    )}
                    {!hasAffection && !hasCourage && !hasDependence && (
                      <span className="text-slate-500 font-sans text-[10px]">Нажмите для отправки</span>
                    )}
                  </div>

                  {enrichedChoices.length > 1 && (
                    <span className="text-[9.5px] text-purple-300/60 font-sans">
                      {index + 1} / {enrichedChoices.length}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots pagination bar if multiple choices */}
        {enrichedChoices.length > 1 && (
          <div className="w-full py-2 flex items-center justify-center gap-1.5 bg-[#0a0d16]/90 border-t border-white/[0.04]">
            {enrichedChoices.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToChoice(i)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  currentIndex === i
                    ? 'w-5 bg-purple-400'
                    : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Перейти к варианту ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

