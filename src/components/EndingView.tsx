import React from 'react';
import { EndingType } from '../types/game';
import { Sparkles, Heart, Shield, RefreshCw, AlertOctagon, Flame, Compass, Sun, Moon, Ghost } from 'lucide-react';
import { playTapSound } from '../utils/audio';

interface EndingViewProps {
  ending: EndingType;
  stats: {
    affection: number;
    courage: number;
    dependence: number;
    entityInfluence: number;
  };
  onRestart: () => void;
  onJumpToDay: (day: number) => void;
}

export const EndingView: React.FC<EndingViewProps> = ({
  ending,
  stats,
  onRestart,
  onJumpToDay,
}) => {
  const getEndingDetails = () => {
    switch (ending) {
      case 'ending_1_overcoming':
        return {
          title: 'Концовка 1: Преодоление и Реальная Жизнь',
          badge: 'Светлое Освобождение',
          icon: <Sun className="w-8 h-8 text-amber-400" />,
          color: 'from-amber-950/80 via-slate-900 to-[#0c0f17]',
          borderColor: 'border-amber-500/40',
          textColor: 'text-amber-200',
          storyText: `Алиса нашла в себе силы выстоять. На следующий день в университете она впервые дала твердый отпор зачинщикам травли, а затем обратилась к психологу и постепенно начала находить поддержку среди искренних людей.
          
Марк увидел, как над его туманным городом взошло первое теплое солнце. Хтоническая тень растаяла без следа. С улыбкой благодарности за пережитые дни он растворился в ослепительном свете, обретя долгожданный покой. Их связь навсегда осталась в её сердце как светлый маяк, вернувший её к полноценной жизни.`,
        };

      case 'ending_2_eternal_limbo':
        return {
          title: 'Концовка 2: Иллюзия Спасения и Темный Паразит',
          badge: 'Социальная Изоляция',
          icon: <Ghost className="w-8 h-8 text-purple-400 animate-pulse" />,
          color: 'from-purple-950/90 via-slate-900 to-[#0c0f17]',
          borderColor: 'border-purple-500/50',
          textColor: 'text-purple-200',
          storyText: `Алиса окончательно разорвала контакты с внешним миром, бросила учебу и заперлась в четырех стенах. Она осталась социально неполноценной, отвергая любую реальную помощь и считая внешний мир враждебным и бессмысленным.
          
Единственной нитью ее жизни остался мерцающий экран смартфона. Каждую полночь в чате появляется сообщение: «Алиса, я здесь. Тебе никто кроме меня не нужен».
          
Она чувствует тепло и покой в своей изоляции, абсолютно не осознавая жуткую правду: за маской Марка скрывается недобрая потусторонняя сущность. Присосавшись к ее уязвимому разуму, бестелесный паразит медленно оплетает ее сознание, преследуя свои скрытые, чуждые и темные цели.`,
        };

      case 'ending_3a_saved':
        return {
          title: 'Концовка 3 (А): Воскрешение Любви — Спасение',
          badge: 'Триумф Чуда',
          icon: <Flame className="w-8 h-8 text-rose-500" />,
          color: 'from-rose-950/80 via-slate-900 to-[#0c0f17]',
          borderColor: 'border-rose-500/50',
          textColor: 'text-rose-200',
          storyText: `Уход Марка выбил у Алисы последнюю опору. Поднявшись на крышу в холодный дождь, она шагнула к краю...
          
Но неистовая связь Марка сокрушила грань между жизнью и смертью. Материализовавшись в живом мире во плоти, он выбил дверь на крышу и в последнюю долю секунды схватил Алису за руку, прижав к своему бьющемуся сердцу: «Я живой... и я больше никуда тебя не отпущу».`,
        };

      case 'ending_3b_too_late':
        return {
          title: 'Концовка 3 (Б): Трагическое Опоздание',
          badge: 'Пепел и Дождь',
          icon: <AlertOctagon className="w-8 h-8 text-slate-400" />,
          color: 'from-slate-950 via-slate-900 to-[#05070a]',
          borderColor: 'border-slate-600/50',
          textColor: 'text-slate-300',
          storyText: `Марк пробил оковы небытия и обрел живое тело, задыхаясь от яростного бега по лужам ночного города.
          
Он взлетел по лестнице на крышу, распахнул дверь... но нашел лишь мокрый телефон на парапете. На экране горело его последнее, так и не прочитанное сообщение. Он вернулся к жизни слишком поздно.`,
        };

      case 'ending_3c_open_finale':
        return {
          title: 'Концовка 3 (В): Открытый Финал под Дождем',
          badge: 'Звонок в Ночи',
          icon: <Compass className="w-8 h-8 text-cyan-400" />,
          color: 'from-cyan-950/80 via-slate-900 to-[#0c0f17]',
          borderColor: 'border-cyan-500/40',
          textColor: 'text-cyan-200',
          storyText: `Материализовавшись на улицах незнакомого дождливого города, Марк нашел адрес дома Алисы.
          
Он стоит у подъезда, капли стекают по его лицу. Набрав номер на телефоне, он слышит долгие гудки в трубке, а в окне на пятом этаже медленно зажигается теплый свет...`,
        };
    }
  };

  const details = getEndingDetails();

  return (
    <div
      id="ending-screen-container"
      className={`absolute inset-0 z-50 bg-gradient-to-b ${details.color} p-5 flex flex-col justify-between overflow-y-auto select-none animate-fadeIn border ${details.borderColor}`}
    >
      {/* Top Header */}
      <div className="flex flex-col items-center mt-4">
        <div className="p-3 rounded-full bg-black/40 border border-white/10 mb-2 shadow-xl">
          {details.icon}
        </div>
        <span className="text-[11px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300">
          {details.badge}
        </span>
        <h2 className="text-base sm:text-lg font-bold text-center mt-2 px-2 text-white">
          {details.title}
        </h2>
      </div>

      {/* Main Narrative Text */}
      <div className="my-4 bg-black/50 border border-white/10 rounded-2xl p-4 text-xs sm:text-[13px] leading-relaxed text-slate-200 shadow-inner max-h-[340px] overflow-y-auto">
        <p className="whitespace-pre-line">{details.storyText}</p>
      </div>

      {/* Stats Summary */}
      <div className="w-full bg-slate-900/60 rounded-xl p-2.5 border border-white/5 mb-4 grid grid-cols-2 gap-2 text-[11px]">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>Связь: <b>{stats.affection}%</b></span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>Смелость: <b>{stats.courage}%</b></span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <Moon className="w-3.5 h-3.5 text-purple-400" />
          <span>Зависимость: <b>{stats.dependence}%</b></span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <Ghost className="w-3.5 h-3.5 text-amber-400" />
          <span>Влияние сущности: <b>{stats.entityInfluence}%</b></span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <button
          id="btn-restart-game"
          onClick={() => {
            playTapSound();
            onRestart();
          }}
          className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Начать заново (День 1)</span>
        </button>

        <button
          id="btn-jump-day-33"
          onClick={() => {
            playTapSound();
            onJumpToDay(33);
          }}
          className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700/60 transition-colors"
        >
          Переиграть финал (День 33: Другие варианты)
        </button>
      </div>
    </div>
  );
};
