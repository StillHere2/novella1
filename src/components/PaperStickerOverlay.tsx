import React, { useEffect, useState } from 'react';
import { ThoughtBubble, Character } from '../types/game';
import { playPaperRustle } from '../utils/audio';

interface PaperStickerOverlayProps {
  thought: ThoughtBubble | null;
  activePerspective: Character;
  onClose: () => void;
  isBoyNameKnown?: boolean;
}

export const PaperStickerOverlay: React.FC<PaperStickerOverlayProps> = ({
  thought,
  activePerspective,
  onClose,
  isBoyNameKnown = false,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (!thought) return;
    setIsExiting(false);
    setIsPressed(false);
    // Subtle paper rustle when the paper sticker appears at top of chat
    playPaperRustle(0.35);
  }, [thought?.id]);

  if (!thought) return null;

  const authorName =
    thought.character === 'girl'
      ? 'Мысль Алисы'
      : 'Мысль: ....';

  const handleClickPaper = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (isExiting) return;

    // Authentic paper rustle on click
    playPaperRustle(0.45);
    setIsPressed(true);

    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onClose();
        setIsExiting(false);
      }, 220);
    }, 80);
  };

  return (
    <div
      id="paper-sticker-top-container"
      className="absolute top-[102px] left-0 right-0 z-50 flex justify-center px-4 pt-1 pointer-events-none select-none transition-all duration-300 animate-fadeIn"
    >
      {/* Real Paper Sticky Note pinned at top of chat dialog */}
      <div
        id="paper-sticker-note"
        onClick={handleClickPaper}
        onMouseDown={() => {
          setIsPressed(true);
          playPaperRustle(0.35);
        }}
        onMouseUp={() => setIsPressed(false)}
        onTouchStart={() => {
          setIsPressed(true);
          playPaperRustle(0.35);
        }}
        onTouchEnd={() => setIsPressed(false)}
        className={`pointer-events-auto relative w-full max-w-[320px] p-4 pt-5 rounded-sm select-none transition-all duration-200 cursor-pointer overflow-hidden ${
          isExiting
            ? 'scale-75 -translate-y-8 opacity-0 rotate-3 duration-250'
            : isPressed
            ? 'scale-[0.98] rotate-0 shadow-[0_6px_16px_rgba(0,0,0,0.5)]'
            : 'scale-100 translate-y-0 opacity-100 -rotate-0.5 hover:rotate-0 shadow-[0_12px_28px_rgba(0,0,0,0.6),0_2px_8px_rgba(0,0,0,0.3)]'
        }`}
        style={{
          backgroundColor: '#faf6ea',
          backgroundImage: `
            linear-gradient(to bottom, rgba(246, 239, 222, 0.96), rgba(255, 252, 246, 0.98)),
            repeating-linear-gradient(0deg, transparent, transparent 21px, rgba(180, 160, 130, 0.12) 22px)
          `,
          boxShadow: isPressed
            ? '0 6px 14px rgba(0,0,0,0.5), inset 0 0 15px rgba(160, 130, 90, 0.15)'
            : '0 14px 28px rgba(0,0,0,0.55), 0 3px 6px rgba(0,0,0,0.3), inset 0 0 18px rgba(180, 150, 110, 0.12)',
        }}
      >
        {/* Top Washi Tape fastening the note to the chat dialog */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-amber-200/80 border-t border-b border-amber-400/40 backdrop-blur-[1px] shadow-xs rotate-[-1deg] pointer-events-none opacity-90 flex items-center justify-center">
          <div className="w-full h-full border-dashed border-amber-900/20 border-t border-b" />
        </div>

        {/* Paper subtle vertical crease */}
        <div className="absolute inset-y-0 left-1/3 w-[1px] bg-gradient-to-b from-transparent via-amber-900/[0.04] to-transparent pointer-events-none" />

        {/* Author / Character Header */}
        <div className="flex items-center justify-between text-[11px] font-mono font-bold tracking-wider text-[#8a653d] mb-1.5 pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            <span className="uppercase text-[10.5px]">{authorName}</span>
          </div>
          <span className="text-[9px] text-[#a37e54] font-sans">нажмите, чтобы убрать</span>
        </div>

        {/* Thought Body Text */}
        <div className="pointer-events-none my-0.5">
          <p className="font-serif text-[13.5px] sm:text-[14px] leading-relaxed italic text-[#26190c] tracking-wide">
            «{thought.text}»
          </p>
        </div>

        {/* Realistic Dog-Ear / Folded Corner */}
        <div className="absolute bottom-0 right-0 w-4.5 h-4.5 overflow-hidden pointer-events-none">
          <div
            className="w-6 h-6 bg-[#eee5ce] -rotate-45 transform origin-top-left shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.15)] border-t border-l border-amber-900/20"
          />
        </div>
      </div>
    </div>
  );
};

