import React, { useState } from 'react';
import { ThoughtBubble, ChoiceOption } from '../types/game';
import { sortChoicesWithDistrustFirst, EnrichedChoice } from '../utils/choiceSorting';
import {
  Sparkles,
  MessageSquarePlus,
  Pin,
  Camera,
  Heart,
  AlertCircle,
  Bookmark,
  Layers,
  Send,
  Radio,
  Flame,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import { playTapSound, playChoiceBeep, playMessageSend } from '../utils/audio';

interface DeskPolaroidThoughtsProps {
  currentChoices?: ChoiceOption[];
  currentThoughts?: ThoughtBubble[];
  allDiscoveredThoughts?: ThoughtBubble[];
  readThoughtsHistory?: string[];
  onSelectChoice?: (choice: ChoiceOption) => void;
  onSelectActionThought?: (thought: ThoughtBubble) => void;
  onThoughtRead?: (thought: ThoughtBubble) => void;
}

export const DeskPolaroidThoughts: React.FC<DeskPolaroidThoughtsProps> = ({
  currentChoices = [],
  currentThoughts = [],
  allDiscoveredThoughts = [],
  readThoughtsHistory = [],
  onSelectChoice,
  onSelectActionThought,
  onThoughtRead,
}) => {
  const [activeTab, setActiveTab] = useState<'current' | 'all'>('current');

  // Fallback starter thoughts if none yet discovered
  const fallbackThoughts: ThoughtBubble[] = [
    {
      id: 't_d1_init_1',
      text: 'Что за странная иконка на экране?.. Черный круг с разорванной чертой. Я точно ничего не скачивала.',
      character: 'girl',
      category: 'clue',
    },
    {
      id: 't_d1_init_2',
      text: 'Почти полночь. Опять бессонница и мысли о завтрашнем дне сдавливают виски...',
      character: 'girl',
      category: 'trauma',
    },
  ];

  const effectiveHistoryThoughts =
    allDiscoveredThoughts.length > 0 ? allDiscoveredThoughts : fallbackThoughts;

  const sortedChoices = sortChoicesWithDistrustFirst(currentChoices);
  const hasPendingChoices = sortedChoices.length > 0;
  const actionableCount =
    sortedChoices.length + currentThoughts.filter((t) => t.isActionable).length;

  const handleChoiceClick = (choice: ChoiceOption) => {
    playChoiceBeep(0.4);
    playMessageSend();
    if (onSelectChoice) {
      onSelectChoice(choice);
    }
  };

  const getToneIcon = (toneType: string) => {
    switch (toneType) {
      case 'distrust':
        return <ShieldAlert className="w-3 h-3 text-amber-400" />;
      case 'trust':
        return <Heart className="w-3 h-3 text-pink-400" />;
      case 'action':
        return <Zap className="w-3 h-3 text-emerald-400" />;
      default:
        return <Sparkles className="w-3 h-3 text-purple-400" />;
    }
  };

  return (
    <div
      id="desk-thoughts-container"
      className="flex flex-col gap-3.5 select-none w-full max-w-sm lg:max-w-[340px] xl:max-w-[360px] transition-all duration-500 animate-fadeIn"
    >
      {/* Desk Board Header */}
      <div className="bg-gradient-to-r from-[#181d2c]/95 via-[#141926]/95 to-[#0f131e]/95 p-3 rounded-xl border border-slate-700/80 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Pin className="w-4 h-4 text-purple-400 -rotate-12 drop-shadow" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            </div>
            <div>
              <h3 className="text-[12px] font-mono font-bold tracking-wider text-purple-200 uppercase drop-shadow-sm flex items-center gap-1.5">
                Заметки на столе Алисы
              </h3>
              <p className="text-[9.5px] font-sans text-slate-400">
                Мысли и реплики вне экрана • Нажмите на стикер
              </p>
            </div>
          </div>

          {/* Action indicator */}
          {hasPendingChoices ? (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/60 text-[10px] font-mono font-bold text-amber-300 animate-pulse flex items-center gap-1">
              <Radio className="w-2.5 h-2.5 text-amber-400" />
              {sortedChoices.length} ВАРИАНТА
            </span>
          ) : (
            actionableCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/50 text-[10px] font-mono font-bold text-purple-300">
                {actionableCount} реплик
              </span>
            )
          )}
        </div>

        {/* Tab switchers between current options/thoughts and collected history */}
        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-1.5">
          <button
            id="tab-current-thoughts"
            onClick={() => {
              playTapSound(0.2);
              setActiveTab('current');
            }}
            className={`flex-1 py-1 px-2 rounded-md text-[10.5px] font-mono font-medium transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'current'
                ? 'bg-purple-600/30 text-purple-200 border border-purple-500/50 shadow-sm font-bold'
                : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <Flame className="w-3 h-3 text-amber-400" />
            <span>Текущие ({sortedChoices.length + currentThoughts.length})</span>
          </button>

          <button
            id="tab-all-thoughts"
            onClick={() => {
              playTapSound(0.2);
              setActiveTab('all');
            }}
            className={`flex-1 py-1 px-2 rounded-md text-[10.5px] font-mono font-medium transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-purple-600/30 text-purple-200 border border-purple-500/50 shadow-sm font-bold'
                : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>Все заметки ({effectiveHistoryThoughts.length})</span>
          </button>
        </div>
      </div>

      {/* Main List of Sticky Notes on Desk */}
      <div className="flex flex-col gap-3.5 max-h-[72vh] overflow-y-auto pr-1 custom-scrollbar">
        {/* 1. ACTIVE DIALOGUE CHOICES AS STICKY NOTES */}
        {activeTab === 'current' && sortedChoices.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-1 px-1 text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold">
              <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
              [ВЫБОР РЕПЛИКИ ДЛЯ ОТПРАВКИ В ЧАТ]:
            </div>

            {sortedChoices.map((choice, index) => {
              const rotations = ['rotate-[-1.5deg]', 'rotate-[2deg]', 'rotate-[-2.5deg]', 'rotate-[1deg]'];
              const rotationClass = rotations[index % rotations.length];
              const isDistrust = choice.toneType === 'distrust';

              return (
                <div
                  key={choice.id || index}
                  id={`desk-choice-${choice.id || index}`}
                  onClick={() => handleChoiceClick(choice)}
                  className={`group relative cursor-pointer transition-all duration-300 transform ${rotationClass} hover:rotate-0 hover:scale-[1.03] hover:z-30 rounded-xl p-3.5 shadow-2xl backdrop-blur-md select-none ${
                    isDistrust
                      ? 'bg-gradient-to-br from-[#302213]/95 via-[#23180c]/95 to-[#160f06]/95 border-2 border-amber-400/90 text-amber-100 shadow-[0_10px_35px_-5px_rgba(245,158,11,0.4)] ring-2 ring-amber-500/40'
                      : 'bg-gradient-to-br from-[#2a1c47]/95 via-[#1d1433]/95 to-[#120d22]/95 border-2 border-purple-400/90 text-purple-100 shadow-[0_10px_35px_-5px_rgba(168,85,247,0.4)] ring-2 ring-purple-500/40'
                  } active:scale-[0.98]`}
                >
                  {/* Top Washi Tape Banner */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-10">
                    <div className="px-2.5 py-0.5 font-mono font-black text-[8.5px] uppercase tracking-wider rounded-sm shadow-md border -rotate-1 flex items-center gap-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white border-purple-300">
                      <Send className="w-2.5 h-2.5" />
                      <span>ВАРИАНТ {index + 1}</span>
                    </div>
                  </div>

                  {/* Top Pin Glow */}
                  <div className="absolute top-2 right-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isDistrust ? 'bg-amber-400 shadow-[0_0_10px_#f59e0b]' : 'bg-purple-400 shadow-[0_0_10px_#a855f7]'
                      }`}
                    />
                  </div>

                  <div className="flex items-start gap-2.5 mt-1.5">
                    {/* Number Badge */}
                    <div
                      className={`p-2 rounded-lg flex-shrink-0 group-hover:scale-110 transition-all font-mono font-bold text-xs border shadow-inner flex items-center justify-center min-w-[28px] ${
                        isDistrust
                          ? 'bg-amber-500/30 text-amber-200 group-hover:bg-amber-500 group-hover:text-slate-950 border-amber-400/50'
                          : 'bg-purple-500/30 text-purple-200 group-hover:bg-purple-500 group-hover:text-purple-950 border-purple-400/40'
                      }`}
                    >
                      0{index + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Choice Label */}
                      <p className="font-semibold text-[13px] text-white leading-snug group-hover:text-amber-100 transition-colors drop-shadow-sm">
                        {choice.label}
                      </p>

                      {/* Preview of full message */}
                      {choice.messageText && choice.messageText !== choice.label && (
                        <p className="mt-1 font-serif italic text-[11.5px] text-slate-300 leading-tight">
                          «{choice.messageText}»
                        </p>
                      )}

                      {/* Bottom action trigger bar */}
                      <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-1.5 text-[9.5px] font-mono">
                        <span className="text-slate-400 flex items-center gap-1">
                          ⚡ Нажмите на карточку
                        </span>
                        <span
                          className={`font-bold tracking-tight px-2 py-0.5 rounded border transition-colors flex items-center gap-1 shadow-sm ${
                            isDistrust
                              ? 'bg-amber-500/25 text-amber-300 border-amber-400/50 group-hover:bg-amber-400 group-hover:text-slate-950'
                              : 'bg-purple-500/25 text-purple-300 border-purple-400/50 group-hover:bg-purple-400 group-hover:text-purple-950'
                          }`}
                        >
                          ОТПРАВИТЬ ↵
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. THOUGHT STICKY NOTES */}
        {((activeTab === 'current' ? currentThoughts : effectiveHistoryThoughts) || []).map(
          (thought, index) => {
            const isAction = !!thought.isActionable;
            const isRead = readThoughtsHistory.includes(thought.id);

            const rotations = ['rotate-[-1deg]', 'rotate-[1.5deg]', 'rotate-[-2deg]', 'rotate-[0.5deg]'];
            const rotationClass = rotations[index % rotations.length];

            return (
              <div
                key={thought.id}
                id={`desk-thought-${thought.id}`}
                onClick={() => {
                  if (onThoughtRead) onThoughtRead(thought);
                  if (isAction && onSelectActionThought) {
                    onSelectActionThought(thought);
                  } else {
                    playTapSound(0.2);
                  }
                }}
                className={`group relative cursor-pointer transition-all duration-300 transform ${rotationClass} hover:rotate-0 hover:scale-[1.02] hover:z-20 rounded-xl p-3.5 shadow-xl backdrop-blur-md select-none ${
                  isAction
                    ? 'bg-gradient-to-br from-[#2b2416]/95 via-[#1f1a10]/95 to-[#120f09]/95 border-2 border-amber-400/80 text-amber-100 shadow-[0_10px_30px_-5px_rgba(245,158,11,0.3)] ring-1 ring-amber-500/30'
                    : 'bg-gradient-to-br from-[#1b2230]/95 via-[#131824]/95 to-[#0b0e17]/95 border border-slate-700/80 text-slate-200'
                }`}
              >
                {/* Washi Tape */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                  <div
                    className={`px-3 py-0.5 font-mono text-[8px] uppercase tracking-widest rounded-[2px] shadow-sm border ${
                      isAction
                        ? 'bg-amber-400 text-amber-950 border-amber-200 font-bold -rotate-1'
                        : 'bg-slate-700 text-slate-300 border-slate-600 rotate-1'
                    }`}
                  >
                    {isAction ? '⚡ МЫСЛЬ-РЕПЛИКА ⚡' : '📌 ЗАМЕТКА ПАМЯТИ'}
                  </div>
                </div>

                <div className="flex items-start gap-2.5 mt-1">
                  <div
                    className={`p-2 rounded-lg flex-shrink-0 font-mono text-xs border ${
                      isAction
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    <MessageSquarePlus className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-serif italic text-xs leading-relaxed text-slate-100 group-hover:text-white transition-colors">
                      «{thought.text}»
                    </p>

                    <div className="mt-2.5 flex items-center justify-between border-t border-white/5 pt-1.5 text-[9px] font-mono text-slate-400">
                      <span>{thought.character === 'girl' ? 'Алиса' : 'Марк'}</span>
                      {isAction ? (
                        <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:underline">
                          Зажечь и отправить ➔
                        </span>
                      ) : (
                        <span className="text-slate-500">Внутренний голос</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};
