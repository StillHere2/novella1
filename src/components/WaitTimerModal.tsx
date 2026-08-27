import React from 'react';
import { FastForward, Bell, BellRing, Radio, Moon, BookOpen, Activity, Compass } from 'lucide-react';
import { playTapSound, playSignalConnect } from '../utils/audio';
import { requestNotificationPermission } from '../utils/notifications';

interface WaitTimerModalProps {
  reason: string;
  remainingSeconds: number;
  totalSeconds: number;
  onSkipWait: () => void;
  onSpeedUp: (multiplier: number) => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
}

export const WaitTimerModal: React.FC<WaitTimerModalProps> = ({
  reason,
  remainingSeconds,
  totalSeconds,
  onSkipWait,
  onSpeedUp,
  notificationsEnabled,
  onToggleNotifications,
}) => {
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.max(0, Math.min(100, ((totalSeconds - remainingSeconds) / totalSeconds) * 100));

  const handleEnableNotifs = async () => {
    playTapSound();
    const granted = await requestNotificationPermission();
    if (granted) {
      onToggleNotifications();
    }
  };

  return (
    <div
      id="lifeline-wait-overlay"
      className="absolute inset-0 z-40 bg-[#06080e]/96 backdrop-blur-xl flex flex-col items-center justify-between p-5 text-center select-none animate-fadeIn"
    >
      {/* Top Tag */}
      <div className="w-full flex items-center justify-center text-[10px] font-mono text-slate-500 border-b border-white/[0.06] pb-2 pt-1">
        <span className="flex items-center gap-1.5 text-cyan-400">
          <Radio className="w-3 h-3 animate-pulse" />
          ОЖИДАНИЕ
        </span>
      </div>

      {/* Center Lifeline Radar & Status */}
      <div className="w-full max-w-[300px] flex flex-col items-center my-auto">
        {/* Radar Pulse Visual (Lifeline trademark style) */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-5">
          {/* Outer radar rings */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/20" />
          <div className="absolute inset-3 rounded-full border border-purple-500/30" />
          <div className="absolute inset-7 rounded-full border border-cyan-500/40" />

          {/* Rotating sweep line */}
          <div className="absolute inset-0 rounded-full overflow-hidden animate-radar pointer-events-none">
            <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/30 to-transparent origin-bottom-right" />
          </div>

          {/* Center core */}
          <div className="w-12 h-12 rounded-full bg-[#0c101d] border border-cyan-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] z-10">
            {reason.includes('университет') || reason.includes('пар') ? (
              <BookOpen className="w-5 h-5 text-purple-300 animate-pulse" />
            ) : (
              <Moon className="w-5 h-5 text-cyan-300 animate-pulse" />
            )}
          </div>
        </div>

        {/* Lifeline Status Header */}
        <div className="text-[11px] uppercase font-mono tracking-widest text-cyan-300 mb-1 font-bold">
          [ СВЯЗЬ ВРЕМЕННО ПРИОСТАНОВЛЕНА ]
        </div>

        {/* Narrative description */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4 italic px-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
          «{reason}»
        </p>

        {/* Big Countdown Timer */}
        <div className="font-mono text-3xl font-bold tracking-widest text-slate-100 mb-2 drop-shadow-md">
          {formatTime(remainingSeconds)}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-900 border border-slate-800 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full max-w-[320px] flex flex-col gap-2 mb-2">
        {/* Lifeline Fast-Forward Button */}
        <button
          id="btn-skip-timer"
          onClick={() => {
            playTapSound();
            playSignalConnect();
            onSkipWait();
          }}
          className="w-full py-3 px-4 rounded-xl bg-[#1d1b33] hover:bg-[#282547] border border-purple-500/60 text-purple-200 font-mono text-xs flex items-center justify-center gap-2 shadow-lg lifeline-choice-glow transition-all active:scale-98"
        >
          <FastForward className="w-4 h-4 text-cyan-400" />
          <span className="font-bold tracking-wide">Ускорить передачу (Мгновенно)</span>
        </button>

        {/* Speed multiplier shortcuts */}
        <div className="flex gap-2">
          <button
            id="btn-speed-10x"
            onClick={() => {
              playTapSound();
              onSpeedUp(10);
            }}
            className="flex-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] font-mono border border-slate-800"
          >
            Скорость x10
          </button>
          <button
            id="btn-speed-60x"
            onClick={() => {
              playTapSound();
              onSpeedUp(60);
            }}
            className="flex-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] font-mono border border-slate-800"
          >
            Скорость x60
          </button>
        </div>

        {/* Notification toggle */}
        <button
          id="btn-toggle-notifs"
          onClick={handleEnableNotifs}
          className="w-full py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-slate-400 text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors"
        >
          {notificationsEnabled ? (
            <>
              <BellRing className="w-3 h-3 text-cyan-400" />
              <span className="text-cyan-300">Уведомления включены</span>
            </>
          ) : (
            <>
              <Bell className="w-3 h-3 text-slate-500" />
              <span>Включить пуш-уведомления</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
