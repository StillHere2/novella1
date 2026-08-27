import React from 'react';
import { Character, EndingType } from '../types/game';
import { Users, FastForward, Play, Volume2, VolumeX, Sparkles, Sliders, X } from 'lucide-react';
import { playTapSound } from '../utils/audio';

interface DevPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activePerspective: Character;
  onTogglePerspective: () => void;
  currentDay: number;
  onJumpToDay: (day: number) => void;
  speedMultiplier: number;
  onSetSpeedMultiplier: (multiplier: number) => void;
  onTriggerEnding: (ending: EndingType) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  ambientSoundEnabled: boolean;
  onToggleAmbient: () => void;
  stats: {
    affection: number;
    courage: number;
    dependence: number;
    entityInfluence: number;
  };
  onUpdateStat: (key: 'affection' | 'courage' | 'dependence' | 'entityInfluence', delta: number) => void;
}

export const DevPanel: React.FC<DevPanelProps> = ({
  isOpen,
  onClose,
  activePerspective,
  onTogglePerspective,
  currentDay,
  onJumpToDay,
  speedMultiplier,
  onSetSpeedMultiplier,
  onTriggerEnding,
  soundEnabled,
  onToggleSound,
  ambientSoundEnabled,
  onToggleAmbient,
  stats,
  onUpdateStat,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="dev-control-panel-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn"
    >
      <div className="w-full max-w-md bg-[#121622] border border-purple-500/30 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-sm sm:text-base text-white">
              Панель разработчика и тестирования
            </h3>
          </div>
          <button
            id="btn-close-dev-panel"
            onClick={() => {
              playTapSound();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Character Switcher */}
        <div className="mb-4 bg-slate-900/80 p-3 rounded-2xl border border-white/5">
          <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-cyan-400" />
              Текущая перспектива (Глазами):
            </span>
            <span className="font-mono text-xs text-purple-400 font-bold uppercase">
              {activePerspective === 'girl' ? 'Алиса (Девушка)' : 'Марк (Призрак)'}
            </span>
          </div>
          <button
            id="btn-dev-toggle-perspective"
            onClick={() => {
              playTapSound();
              onTogglePerspective();
            }}
            className="w-full py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-purple-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span>Переключить на {activePerspective === 'girl' ? 'Марка (Призрак)' : 'Алису (Девушка)'}</span>
          </button>
        </div>

        {/* 2. Jump to Day (1 - 33) */}
        <div className="mb-4 bg-slate-900/80 p-3 rounded-2xl border border-white/5">
          <div className="text-xs font-semibold text-slate-300 mb-2">
            Быстрый переход по дням (33 дня):
          </div>
          <div className="grid grid-cols-6 gap-1.5 max-h-32 overflow-y-auto pr-1">
            {Array.from({ length: 33 }, (_, i) => i + 1).map((d) => (
              <button
                key={d}
                id={`btn-dev-day-${d}`}
                onClick={() => {
                  playTapSound();
                  onJumpToDay(d);
                }}
                className={`py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  currentDay === d
                    ? 'bg-purple-600 text-white font-bold'
                    : [1, 2, 3, 8, 14, 19, 25, 32, 33].includes(d)
                    ? 'bg-slate-800 text-purple-300 border border-purple-500/30 hover:bg-slate-700 font-semibold'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700'
                }`}
                title={`День ${d}`}
              >
                Д-{d}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 mt-2">
            *Выделены ключевые дни: 1, 2, 3, 8 (монстр), 14 (буллинг), 19 (рюкзак), 25 (голоса/паразит), 32, 33 (финал).
          </p>
        </div>

        {/* 3. Speed & Timers */}
        <div className="mb-4 bg-slate-900/80 p-3 rounded-2xl border border-white/5">
          <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <FastForward className="w-4 h-4 text-amber-400" />
            Скорость времени пауз (7ч между днями / 2ч пары):
          </div>
          <div className="flex gap-2">
            {[
              { label: '1x (Реал)', val: 1 },
              { label: '10x', val: 10 },
              { label: '60x', val: 60 },
              { label: 'Мгновенно', val: 9999 },
            ].map((sp) => (
              <button
                key={sp.val}
                id={`btn-dev-speed-${sp.val}`}
                onClick={() => {
                  playTapSound();
                  onSetSpeedMultiplier(sp.val);
                }}
                className={`flex-1 py-1.5 rounded-xl text-xs font-mono border transition-colors ${
                  speedMultiplier === sp.val
                    ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Quick Endings Preview */}
        <div className="mb-4 bg-slate-900/80 p-3 rounded-2xl border border-white/5">
          <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-rose-400" />
            Быстрый тест концовок:
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              id="btn-dev-end-1"
              onClick={() => onTriggerEnding('ending_1_overcoming')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-amber-900/40 border border-slate-700 text-slate-200 hover:text-amber-200 text-[11px] text-left leading-tight"
            >
              <b>1.</b> Преодоление и жизнь
            </button>
            <button
              id="btn-dev-end-2"
              onClick={() => onTriggerEnding('ending_2_eternal_limbo')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-purple-900/40 border border-slate-700 text-slate-200 hover:text-purple-200 text-[11px] text-left leading-tight"
            >
              <b>2.</b> Изоляция и паразит
            </button>
            <button
              id="btn-dev-end-3a"
              onClick={() => onTriggerEnding('ending_3a_saved')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-200 hover:text-rose-200 text-[11px] text-left leading-tight"
            >
              <b>3А.</b> Воскрешение: Спасена
            </button>
            <button
              id="btn-dev-end-3b"
              onClick={() => onTriggerEnding('ending_3b_too_late')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[11px] text-left leading-tight"
            >
              <b>3Б.</b> Воскрешение: Опоздал
            </button>
            <button
              id="btn-dev-end-3c"
              onClick={() => onTriggerEnding('ending_3c_open_finale')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-900/40 border border-slate-700 text-slate-200 text-[11px] text-left leading-tight col-span-2"
            >
              <b>3В.</b> Открытый финал под дождем
            </button>
          </div>
        </div>

        {/* 5. Sound & Atmosphere Toggles */}
        <div className="bg-slate-900/80 p-3 rounded-2xl border border-white/5 flex items-center justify-between text-xs text-slate-300">
          <div className="flex gap-2">
            <button
              id="btn-dev-toggle-sfx"
              onClick={onToggleSound}
              className={`p-2 rounded-xl border flex items-center gap-1.5 ${
                soundEnabled
                  ? 'bg-purple-900/30 border-purple-500/50 text-purple-200'
                  : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>Звуки</span>
            </button>
            <button
              id="btn-dev-toggle-ambient"
              onClick={onToggleAmbient}
              className={`p-2 rounded-xl border flex items-center gap-1.5 ${
                ambientSoundEnabled
                  ? 'bg-cyan-900/30 border-cyan-500/50 text-cyan-200'
                  : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Эмбиент</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
