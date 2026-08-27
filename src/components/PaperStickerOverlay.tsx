import React, { useEffect, useState, useRef } from 'react';
import { ThoughtBubble, Character } from '../types/game';
import { playPaperRustle } from '../utils/audio';

interface PaperStickerOverlayProps {
  thought: ThoughtBubble | null;
  activePerspective: Character;
  onClose: () => void;
  onSendThought: (thought: ThoughtBubble) => void;
}

export const PaperStickerOverlay: React.FC<PaperStickerOverlayProps> = ({
  thought,
  activePerspective,
  onClose,
  onSendThought,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (!thought) return;
    setIsExiting(false);
    setIsPressed(false);
    // Subtle paper rustle when the paper sticker appears
    playPaperRustle(0.3);
  }, [thought?.id]);

  if (!thought) return null;

  const authorName = thought.character === 'girl' ? 'Алиса' : 'Марк';

  const handleClickPaper = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (isExiting) return;

    // Authentic paper rustle on click
    playPaperRustle(0.45);
    setIsPressed(true);

    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (thought.isActionable) {
          onSendThought(thought);
        } else {
          onClose();
        }
        setIsExiting(false);
      }, 250);
    }, 120);
  };

  const handleDismissOverlay = () => {
    if (isExiting) return;
    playPaperRustle(0.3);
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setIsExiting(false);
    }, 220);
  };

  return (
    <div
      id="paper-sticker-overlay-container"
      className="absolute inset-0 z-50 flex flex-col items-center justify-center p-4 pointer-events-auto bg-black/55 backdrop-blur-[2px] transition-all duration-300 animate-fadeIn select-none"
      onClick={handleDismissOverlay}
    >
      {/* Real Paper Sticky Note */}
      <div
        id="paper-sticker-note"
        onClick={handleClickPaper}
        onMouseDown={() => {
          setIsPressed(true);
          playPaperRustle(0.4);
        }}
        onMouseUp={() => setIsPressed(false)}
        onTouchStart={() => {
          setIsPressed(true);
          playPaperRustle(0.4);
        }}
        onTouchEnd={() => setIsPressed(false)}
        className={`relative w-full max-w-[290px] p-5 pt-6 rounded-sm select-none transition-all duration-200 cursor-pointer overflow-hidden ${
          isExiting
            ? 'scale-75 translate-y-10 opacity-0 rotate-6 duration-300'
            : isPressed
            ? 'scale-[0.98] rotate-0 shadow-[0_8px_16px_rgba(0,0,0,0.6)]'
            : 'scale-100 translate-y-0 opacity-100 -rotate-1 hover:rotate-0 shadow-[0_18px_35px_rgba(0,0,0,0.65),0_3px_8px_rgba(0,0,0,0.3)]'
        }`}
        style={{
          backgroundColor: '#faf6e9',
          backgroundImage: `
            linear-gradient(to bottom, rgba(245, 238, 220, 0.95), rgba(255, 252, 245, 0.98)),
            repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(180, 160, 130, 0.12) 24px)
          `,
          boxShadow: isPressed
            ? '0 6px 14px rgba(0,0,0,0.5), inset 0 0 15px rgba(160, 130, 90, 0.15)'
            : '0 16px 32px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.35), inset 0 0 20px rgba(180, 150, 110, 0.12)',
        }}
      >
        {/* Top Washi Tape */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-20 h-5 bg-amber-100/70 border-t border-b border-amber-300/40 backdrop-blur-[1px] shadow-xs rotate-[-1.5deg] pointer-events-none opacity-85 flex items-center justify-center">
          <div className="w-full h-full border-dashed border-amber-900/15 border-t border-b" />
        </div>

        {/* Paper subtle vertical crease */}
        <div className="absolute inset-y-0 left-1/3 w-[1px] bg-gradient-to-b from-transparent via-amber-900/[0.04] to-transparent pointer-events-none" />

        {/* Author / Character Tag */}
        <div className="flex items-center justify-between text-[11px] font-mono font-bold tracking-wider text-[#8a6b47] mb-2.5 pointer-events-none uppercase">
          <span>{authorName}</span>
          <span className="text-[9px] text-[#a88a68] lowercase font-sans">нажмите на листок</span>
        </div>

        {/* Thought Body Text */}
        <div className="pointer-events-none my-1">
          <p className="font-serif text-[14.5px] leading-relaxed italic text-[#26190c] tracking-wide">
            «{thought.text}»
          </p>
        </div>

        {/* Realistic Dog-Ear / Folded Corner */}
        <div className="absolute bottom-0 right-0 w-5 h-5 overflow-hidden pointer-events-none">
          <div
            className="w-7 h-7 bg-[#ede4ce] -rotate-45 transform origin-top-left shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.15)] border-t border-l border-amber-900/20"
          />
        </div>
      </div>
    </div>
  );
};
