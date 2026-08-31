import React, { useState } from 'react';
import { ThoughtBubble } from '../types/game';
import { MessageSquarePlus, Brain, Eye } from 'lucide-react';
import { playTapSound } from '../utils/audio';
import { VoiceWaveformIcon } from './VoiceWaveformIcon';

interface ThoughtCloudProps {
  thoughts: ThoughtBubble[];
  onSelectActionThought?: (thought: ThoughtBubble) => void;
  onThoughtRead?: (thought: ThoughtBubble) => void;
}

export const ThoughtCloud: React.FC<ThoughtCloudProps> = ({
  thoughts,
  onSelectActionThought,
  onThoughtRead,
}) => {
  const [expandedThoughtId, setExpandedThoughtId] = useState<string | null>(null);

  if (!thoughts || thoughts.length === 0) return null;

  return (
    <div
      id="lifeline-thoughts-stream"
      className="w-full px-3 py-1.5 flex flex-col gap-1.5 z-20 transition-all duration-300 animate-fadeIn"
    >
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-400 px-0.5 select-none">
        <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
          <Brain className="w-3 h-3 text-purple-400 animate-pulse" />
          [ВНУТРЕННИЕ МЫСЛИ / ЭХО РАЗУМА]:
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {thoughts.map((thought) => {
          const isAction = thought.isActionable;

          return (
            <button
              key={thought.id}
              id={`thought-card-${thought.id}`}
              onClick={() => {
                playTapSound(0.25);
                if (isAction && onSelectActionThought) {
                  onSelectActionThought(thought);
                } else {
                  if (onThoughtRead) onThoughtRead(thought);
                }
              }}
              className={`group text-left relative transition-all duration-200 rounded-xl p-2.5 text-xs border backdrop-blur-md shadow-md ${
                isAction
                  ? 'bg-[#1e1b30]/90 border-purple-500/50 hover:border-purple-300 hover:bg-[#282442] text-purple-100 ring-1 ring-purple-500/20'
                  : 'bg-[#0f1422]/90 border-slate-700/60 hover:border-slate-500 text-slate-200'
              }`}
            >
              <div className="flex items-start gap-2">
                {isAction ? (
                  <MessageSquarePlus className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                ) : (
                  <div className="flex-shrink-0 mt-1">
                    <VoiceWaveformIcon size="xs" barCount={3} />
                  </div>
                )}

                <div className="flex-1">
                  <p className="leading-snug italic font-serif text-[12px] sm:text-[13px] text-slate-200">
                    «{thought.text}»
                  </p>

                  {isAction && (
                    <span className="inline-block mt-1 text-[9px] text-purple-300 font-mono tracking-wider uppercase font-bold">
                      [КЛИКНИТЕ, ЧТОБЫ ВЫБРАТЬ ЭТУ МЫСЛЬ В КАЧЕСТВЕ ОТВЕТА]
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
