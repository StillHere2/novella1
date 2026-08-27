import React, { useState, useEffect, useRef } from 'react';
import { ChoiceOption } from '../types/game';
import { sortChoicesWithDistrustFirst, EnrichedChoice } from '../utils/choiceSorting';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { playTapSound, playMessageSend, playChoiceBeep } from '../utils/audio';

interface InScreenActionCarouselProps {
  choices: ChoiceOption[];
  onSelectChoice: (choice: ChoiceOption) => void;
  activeCharacter: 'girl' | 'boy';
}

export const InScreenActionCarousel: React.FC<InScreenActionCarouselProps> = ({
  choices,
  onSelectChoice,
  activeCharacter,
}) => {
  const [enrichedChoices, setEnrichedChoices] = useState<EnrichedChoice[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Re-sort choices whenever the choices prop changes, resetting to index 0 (the most distrustful option)
  useEffect(() => {
    if (choices && choices.length > 0) {
      const sorted = sortChoicesWithDistrustFirst(choices);
      setEnrichedChoices(sorted);
      setActiveIndex(0);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    } else {
      setEnrichedChoices([]);
      setActiveIndex(0);
    }
  }, [choices]);

  if (!enrichedChoices || enrichedChoices.length === 0) return null;

  const scrollToIndex = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(enrichedChoices.length - 1, index));
    setActiveIndex(clampedIndex);
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({
        left: clampedIndex * width,
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    playTapSound(0.2);
    scrollToIndex(activeIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    playTapSound(0.2);
    scrollToIndex(activeIndex + 1);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const width = container.clientWidth;
    if (width > 0) {
      const newIndex = Math.round(container.scrollLeft / width);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < enrichedChoices.length) {
        setActiveIndex(newIndex);
        playTapSound(0.15);
      }
    }
  };

  const handleSendChoice = (choice: ChoiceOption) => {
    playChoiceBeep(0.3);
    playMessageSend();
    onSelectChoice(choice);
  };

  return (
    <div
      id="in-screen-action-carousel-wrapper"
      className="w-full flex flex-col bg-gradient-to-b from-[#111522] to-[#0a0d16] border-t border-purple-500/30 p-2.5 select-none shadow-[0_-10px_25px_rgba(0,0,0,0.6)] animate-fadeIn relative z-20"
    >
      {/* Header Controls: Step counter and Arrows */}
      <div className="flex items-center justify-between gap-1 mb-2 px-1">
        {/* Left: Action Counter & Dots */}
        <div className="flex items-center gap-2">
          <span className="text-[10.5px] font-mono font-bold text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-700/60">
            {activeIndex + 1} / {enrichedChoices.length}
          </span>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1">
            {enrichedChoices.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeIndex
                    ? 'w-3.5 h-1.5 bg-amber-400 shadow-sm'
                    : 'w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Вариант ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Navigation Arrows */}
        <div className="flex items-center gap-1">
          <button
            id="btn-prev-action-choice"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`p-1 rounded-lg border transition-all ${
              activeIndex === 0
                ? 'opacity-25 border-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200 active:scale-95 shadow-sm'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            id="btn-next-action-choice"
            onClick={handleNext}
            disabled={activeIndex === enrichedChoices.length - 1}
            className={`p-1 rounded-lg border transition-all ${
              activeIndex === enrichedChoices.length - 1
                ? 'opacity-25 border-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200 active:scale-95 shadow-sm'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Container - EXACTLY 1 CARD VISIBLE AT A TIME */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar touch-pan-x"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {enrichedChoices.map((choice, index) => {
          return (
            <div
              key={choice.id || index}
              className="w-full min-w-full flex-shrink-0 snap-center snap-always px-0.5"
            >
              {/* Single Action Card */}
              <div
                id={`action-card-choice-${index}`}
                onClick={() => handleSendChoice(choice)}
                className="relative w-full rounded-xl p-3 border border-purple-500/40 bg-gradient-to-br from-[#161c2c]/95 via-[#111624]/95 to-[#0b0e17]/95 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-amber-400 active:scale-[0.99] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Primary Choice Label / Text */}
                <div className="my-1">
                  <p className="text-xs sm:text-[13.5px] font-medium leading-snug text-slate-100 font-sans">
                    {choice.label}
                  </p>

                  {/* Message preview if different from label */}
                  {choice.messageText && choice.messageText !== choice.label && (
                    <p className="text-[11px] font-serif italic text-slate-400 mt-1 line-clamp-2">
                      «{choice.messageText}»
                    </p>
                  )}
                </div>

                {/* Send Button */}
                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-end">
                  <button
                    id={`btn-send-choice-${index}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSendChoice(choice);
                    }}
                    className="py-1.5 px-3 rounded-lg font-bold text-xs shadow-md border border-purple-400/50 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center gap-1.5 transition-all transform active:scale-95"
                  >
                    <span>ОТПРАВИТЬ</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
