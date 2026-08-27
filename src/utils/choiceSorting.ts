import { ChoiceOption } from '../types/game';

export interface EnrichedChoice extends ChoiceOption {
  toneType: 'distrust' | 'neutral' | 'trust' | 'action';
  toneLabel: string;
  toneBadgeColor: string;
  distrustScore: number;
}

/**
 * Calculates a distrust / skepticism / caution score for a dialogue choice.
 * Higher score = more distrustful, suspicious, guarded, or cold.
 */
export function calculateDistrustScore(choice: ChoiceOption): number {
  let score = 0;
  const text = (
    (choice.label || '') +
    ' ' +
    (choice.messageText || '') +
    ' ' +
    (choice.id || '')
  ).toLowerCase();

  // Strong distrust / accusation / suspicion keywords (+25)
  const strongDistrustKeywords = [
    'поиздеваться', 'блокирую', 'удаляю', 'розыгрыш', 'пранк', 'обман', 'врешь', 'вранье',
    'не верю', 'подозрительно', 'докажи', 'чушь', 'бред', 'шпион', 'следишь', 'кто ты такой',
    'откуда мой номер', 'не доверяю', 'мошенник', 'вирус', 'взлом', 'не пиши', 'оставь меня',
    'сомнева', 'не верь', 'опасн', 'ловушк', 'подстава', 'не знаю кто ты', 'не верю тебе'
  ];

  for (const word of strongDistrustKeywords) {
    if (text.includes(word)) {
      score += 25;
    }
  }

  // Moderate distrust / cautious / boundary-setting keywords (+12)
  const moderateDistrustKeywords = [
    'почему я', 'зачем', 'странно', 'проверь', 'не уверен', 'сомнения', 'точно ли',
    'не спеши', 'опасайся', 'стой', 'погоди', 'не надо', 'ложь', 'скрываешь', 'правда ли',
    'дистанци', 'холодно', 'скепти', 'угроза', 'чужой', 'зачем мне', 'не понимаю'
  ];

  for (const word of moderateDistrustKeywords) {
    if (text.includes(word)) {
      score += 12;
    }
  }

  // Questioning & checking
  if (text.includes('?') && (text.includes('кто') || text.includes('как') || text.includes('где'))) {
    score += 5;
  }

  // Stat impact adjustments:
  // High affection or high dependence indicates warmth/trust -> lower distrust score
  if (choice.statImpact?.affection) {
    score -= choice.statImpact.affection * 2.5;
  }
  if (choice.statImpact?.dependence) {
    score -= choice.statImpact.dependence * 2.5;
  }
  // Courage often associates with standing one's ground or confronting someone
  if (choice.statImpact?.courage) {
    score += choice.statImpact.courage * 0.8;
  }

  return score;
}

/**
 * Sorts an array of dialogue choices so that the MOST DISTRUSTFUL / CAUTIOUS
 * option is ALWAYS FIRST (at index 0).
 */
export function sortChoicesWithDistrustFirst(choices: ChoiceOption[]): EnrichedChoice[] {
  if (!choices || choices.length === 0) return [];

  // 1. Calculate distrust scores
  const scored = choices.map((c) => ({
    ...c,
    distrustScore: calculateDistrustScore(c),
  }));

  // 2. Sort descending by distrust score (highest distrust first)
  scored.sort((a, b) => b.distrustScore - a.distrustScore);

  // 3. Assign tone classification based on position and stats
  return scored.map((item, index) => {
    let toneType: 'distrust' | 'neutral' | 'trust' | 'action' = 'neutral';
    let toneLabel = 'Внимательный ответ';
    let toneBadgeColor = 'text-sky-300 bg-sky-950/70 border-sky-600/50';

    if (index === 0) {
      toneType = 'distrust';
      toneLabel = '🛡️ Осторожность & Недоверие';
      toneBadgeColor = 'text-amber-300 bg-amber-950/80 border-amber-500/60 ring-1 ring-amber-400/30';
    } else if (item.statImpact?.affection && item.statImpact.affection >= 5) {
      toneType = 'trust';
      toneLabel = '💖 Доверие & Поддержка';
      toneBadgeColor = 'text-pink-300 bg-pink-950/70 border-pink-600/50';
    } else if (item.statImpact?.courage && item.statImpact.courage >= 5) {
      toneType = 'action';
      toneLabel = '⚡ Решительность & Действие';
      toneBadgeColor = 'text-emerald-300 bg-emerald-950/70 border-emerald-600/50';
    } else {
      toneType = 'neutral';
      toneLabel = '💬 Практичный вопрос';
      toneBadgeColor = 'text-purple-300 bg-purple-950/70 border-purple-600/50';
    }

    return {
      ...item,
      toneType,
      toneLabel,
      toneBadgeColor,
    };
  });
}
