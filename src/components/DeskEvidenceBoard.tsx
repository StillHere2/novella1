import React from 'react';
import { Compass, Clock, MapPin, Coffee, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';
import { GameState } from '../types/game';

interface DeskEvidenceBoardProps {
  gameState: GameState;
}

export const DeskEvidenceBoard: React.FC<DeskEvidenceBoardProps> = ({ gameState }) => {
  const isGirl = gameState.activePerspective === 'girl';

  if (!isGirl) {
    return (
      <div className="hidden lg:flex flex-col gap-3 w-72 select-none opacity-40 pointer-events-none">
        {/* Limbo Fog Echo for Boy */}
        <div className="bg-[#0b0f19]/80 border border-cyan-900/30 p-3 rounded-lg backdrop-blur-sm">
          <div className="text-[11px] font-mono text-cyan-400/70 mb-1 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 animate-spin text-cyan-400" style={{ animationDuration: '12s' }} />
            Лимбо: Пространственный сдвиг
          </div>
          <p className="text-[11px] text-slate-400 italic">
            «Проспект кажется бесконечным. Панельные дома повторяются каждые триста метров...»
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="desk-evidence-board"
      className="hidden lg:flex flex-col gap-3.5 w-72 xl:w-80 select-none transition-all duration-500 animate-fadeIn"
    >
      {/* Student Notebook & Clue Log */}
      <div className="bg-gradient-to-br from-[#121624]/90 to-[#0c101a]/95 border border-slate-700/60 p-4 rounded-xl shadow-2xl backdrop-blur-md rotate-[1.5deg] hover:rotate-0 transition-transform">
        {/* Notebook Wire / Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-400/80" />
            <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase">
              Блокнот Алисы
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            День {gameState.currentDay} / 33
          </span>
        </div>

        {/* Clues Discovered */}
        <div className="space-y-2.5 text-[12px] text-slate-300 font-sans">
          {/* Clue 1: Cliff Fall & Carabiner */}
          <div className="p-2 bg-slate-900/60 rounded-lg border border-slate-700/50 flex items-start gap-2">
            <div className="p-1 rounded bg-blue-500/20 text-blue-300 mt-0.5">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="font-semibold text-slate-200 text-[11.5px]">
                Поход в горы & Падение
              </div>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                Марк увлекался соло-треккингом. Сорвался со скалы в тумане из-за обрушения сланца.
              </p>
            </div>
          </div>

          {/* Clue 2: Stopped Watch 02:17 */}
          <div className="p-2 bg-slate-900/60 rounded-lg border border-slate-700/50 flex items-start gap-2">
            <div className="p-1 rounded bg-amber-500/20 text-amber-300 mt-0.5">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="font-semibold text-slate-200 text-[11.5px]">
                Застывшее время: 02:17
              </div>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                Механические часы разбиты на 02:17. В Лимбо стрелки замерли на той же минуте.
              </p>
            </div>
          </div>

          {/* Clue 3: Map Fragment & Equipment */}
          <div className="p-2 bg-slate-900/60 rounded-lg border border-slate-700/50 flex items-start gap-2">
            <div className="p-1 rounded bg-purple-500/20 text-purple-300 mt-0.5">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="font-semibold text-slate-200 text-[11.5px]">
                Снаряжение в карманах
              </div>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                Синий дюралевый карабин, топокарта ущелья, порванная штормовка.
              </p>
            </div>
          </div>
        </div>

        {/* Ambient Desk Note Footnote */}
        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <Coffee className="w-3 h-3 text-amber-400/80" /> Мятный чай
          </span>
          <span className="text-slate-500">Дождь за стеклом</span>
        </div>
      </div>

      {/* Bond & Resonance Stats Miniature */}
      <div className="bg-[#0f1422]/80 border border-slate-800 p-3 rounded-lg backdrop-blur-sm shadow-lg text-[11px] font-mono">
        <div className="text-slate-400 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1 text-slate-300">
            <HeartHandshake className="w-3 h-3 text-purple-400" /> Связь между мирами
          </span>
          <span className="text-purple-300">{gameState.stats.affection}%</span>
        </div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, gameState.stats.affection)}%` }}
          />
        </div>

        <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5">
          <span>Мужество: {gameState.stats.courage}%</span>
          <span>Зависимость: {gameState.stats.dependence}%</span>
        </div>
      </div>
    </div>
  );
};
