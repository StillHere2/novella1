import React, { useState } from 'react';
import { ThoughtBubble, Character, ChoiceOption } from '../types/game';
import {
  X,
  Send,
  Sparkles,
  BookOpen,
  Heart,
  ShieldAlert,
  Key,
  Compass,
  Pin,
  Layers,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { playTapSound, playMessageSend, playPaperRustle } from '../utils/audio';

interface ThoughtsWindowProps {
  isOpen: boolean;
  onClose: () => void;
  allThoughts: ThoughtBubble[];
  activePerspective: Character;
  onSendThought: (thought: ThoughtBubble) => void;
  readThoughtsHistory?: string[];
}

export const ThoughtsWindow: React.FC<ThoughtsWindowProps> = ({
  isOpen,
  onClose,
  allThoughts,
  activePerspective,
  onSendThought,
  readThoughtsHistory = [],
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'actionable' | 'background'>('all');

  if (!isOpen) return null;

  const actionableThoughts = allThoughts.filter((t) => t.isActionable);
  const backgroundThoughts = allThoughts.filter((t) => !t.isActionable);

  const displayedThoughts =
    filterTab === 'actionable'
      ? actionableThoughts
      : filterTab === 'background'
      ? backgroundThoughts
      : allThoughts;

  const handleSend = (thought: ThoughtBubble) => {
    playPaperRustle(0.4);
    playMessageSend();
    onSendThought(thought);
    onClose();
  };

  const getCategoryDetails = (cat?: string) => {
    switch (cat) {
      case 'trauma':
        return { label: 'Травма', icon: ShieldAlert, color: 'text-rose-400 bg-rose-950/60 border-rose-700/50' };
      case 'fear':
        return { label: 'Тревога', icon: ShieldAlert, color: 'text-amber-400 bg-amber-950/60 border-amber-700/50' };
      case 'hope':
        return { label: 'Надежда', icon: Heart, color: 'text-pink-400 bg-pink-950/60 border-pink-700/50' };
      case 'clue':
        return { label: 'Зацепка', icon: Key, color: 'text-purple-400 bg-purple-950/60 border-purple-700/50' };
      case 'memory':
        return { label: 'Память', icon: Compass, color: 'text-sky-400 bg-sky-950/60 border-sky-700/50' };
      default:
        return { label: 'Рефлексия', icon: BookOpen, color: 'text-slate-400 bg-slate-900 border-slate-700/50' };
    }
  };

  return (
    <div
      id="thoughts-window-modal"
      className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-end select-none animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="thoughts-window-sheet"
        onClick={(e) => e.stopPropagation()}
        className="w-full h-[85%] bg-[#10131d] border-t-2 border-purple-500/50 rounded-t-[32px] p-4 flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        {/* Top Handle and Header */}
        <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-3" />

        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-900/40 border border-purple-500/40 text-purple-300">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                Окно «Мысли и Заметки»
              </h3>
              <p className="text-[10px] font-mono text-slate-400">
                {activePerspective === 'girl' ? 'Дневник Алисы' : 'Дневник Марка'} • {allThoughts.length} записей
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 my-3">
          <button
            onClick={() => {
              playTapSound(0.2);
              setFilterTab('all');
            }}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-mono transition-all flex items-center justify-center gap-1 ${
              filterTab === 'all'
                ? 'bg-purple-600/40 text-purple-200 border border-purple-500 font-bold shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>Все ({allThoughts.length})</span>
          </button>

          <button
            onClick={() => {
              playTapSound(0.2);
              setFilterTab('actionable');
            }}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-mono transition-all flex items-center justify-center gap-1 ${
              filterTab === 'actionable'
                ? 'bg-amber-600/40 text-amber-200 border border-amber-500 font-bold shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Flame className="w-3 h-3 text-amber-400" />
            <span>Реплики ({actionableThoughts.length})</span>
          </button>

          <button
            onClick={() => {
              playTapSound(0.2);
              setFilterTab('background');
            }}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-mono transition-all flex items-center justify-center gap-1 ${
              filterTab === 'background'
                ? 'bg-purple-600/40 text-purple-200 border border-purple-500 font-bold shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Раскрытие ({backgroundThoughts.length})</span>
          </button>
        </div>

        {/* Scrollable Sticky Notes List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar pb-4">
          {displayedThoughts.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center text-center p-6 text-slate-500 font-mono text-xs">
              <Pin className="w-6 h-6 mb-2 opacity-40 text-purple-400" />
              <p>В этой категории пока нет сохраненных мыслей.</p>
              <p className="text-[10px] text-slate-600 mt-1">Они появляются по ходу сюжета как бумажные стикеры.</p>
            </div>
          ) : (
            displayedThoughts.map((t, idx) => {
              const isAction = !!t.isActionable;
              const cat = getCategoryDetails(t.category);
              const CatIcon = cat.icon;

              return (
                <div
                  key={t.id || idx}
                  className={`relative p-3.5 rounded-xl border transition-all ${
                    isAction
                      ? 'bg-gradient-to-br from-[#2b2210] via-[#1f190c] to-[#141006] border-amber-500/60 shadow-[0_4px_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/40'
                      : 'bg-gradient-to-br from-[#161a26] via-[#11141e] to-[#0c0e15] border-slate-700/60 shadow-md'
                  }`}
                >
                  {/* Washi Tape Accent */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border flex items-center gap-1 ${cat.color}`}
                      >
                        <CatIcon className="w-2.5 h-2.5" />
                        {cat.label}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {t.character === 'girl' ? 'Алиса' : 'Марк'}
                      </span>
                    </div>

                    {isAction && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[9px] font-mono font-bold animate-pulse flex items-center gap-1">
                        <Flame className="w-2.5 h-2.5 text-amber-400" />
                        ДОСТУПНО ДЛЯ ОТПРАВКИ
                      </span>
                    )}
                  </div>

                  {/* Thought Text */}
                  <p className="text-[12.5px] font-serif italic leading-relaxed text-slate-200 pl-1">
                    «{t.text}»
                  </p>

                  {/* Action Button for Actionable thoughts */}
                  {isAction ? (
                    <div className="mt-3 pt-2 border-t border-amber-500/20 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-amber-300/80">
                        ⚡ Мысль можно сказать собеседнику
                      </span>
                      <button
                        onClick={() => handleSend(t)}
                        className="py-1 px-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-[11px] shadow-sm flex items-center gap-1.5 transition-all transform hover:scale-105"
                      >
                        <Send className="w-3 h-3" />
                        <span>Отправить в чат</span>
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2.5 pt-1.5 border-t border-white/5 flex items-center justify-between text-[9.5px] font-mono text-slate-500">
                      <span>💭 Внутренняя рефлексия (раскрытие персонажа)</span>
                      <span className="text-slate-600">Сохранено</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
