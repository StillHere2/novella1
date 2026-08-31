export type Character = 'girl' | 'boy';

export interface ThoughtBubble {
  id: string;
  text: string;
  isActionable?: boolean; // If true, clicking this types/sends it or unlocks choice
  actionChoiceId?: string; // Links to a choice
  character: Character; // Whose thought this is
  category?: 'reflection' | 'trauma' | 'fear' | 'hope' | 'memory' | 'clue';
}

export interface ChoiceOption {
  id: string;
  label: string; // The short option label
  messageText: string; // What actually gets sent to the chat
  statImpact?: {
    affection?: number; // 0-100 (emotional bond)
    courage?: number; // 0-100 (Alisa's self-worth/ability to stand up)
    dependence?: number; // 0-100 (unhealthy attachment vs reality / isolation)
    entityInfluence?: number; // 0-100 (dark entity parasitic attachment)
  };
  unlocksThought?: string;
  nextStepId: string;
  minigameTrigger?: 'stealth_monster' | 'backpack_search' | 'glitch_call';
}

export interface Message {
  id: string;
  sender: 'girl' | 'boy' | 'system' | 'entity';
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  isGlitch?: boolean;
  isDeleted?: boolean;
  attachment?: {
    type: 'image' | 'voice' | 'location' | 'static';
    url?: string;
    caption?: string;
    duration?: number;
  };
}

export interface DialogueStep {
  id: string;
  sender: 'girl' | 'boy' | 'system' | 'entity';
  text: string;
  activePerspective: Character; // Who is currently holding the phone
  glitchEffect?: boolean;
  delayMs?: number; // Typing delay
  thoughts?: ThoughtBubble[]; // Thoughts appearing in character's head
  choices?: ChoiceOption[]; // Player choices if it's the active character's turn
  nextStepId?: string; // Linear continuation if no choices
  triggersWait?: {
    type: 'offline_activity' | 'day_end';
    durationSeconds: number; // 7200s (2h) or 25200s (7h)
    description: string; // e.g. "Алиса в университете на парах", "Ночная тишина до утра"
  };
  triggersPerspectiveSwitch?: Character;
  triggersEnding?: EndingType;
}

export interface DayStory {
  dayNumber: number;
  title: string;
  subtitle: string;
  initialPerspective: Character;
  startingStepId: string;
  steps: Record<string, DialogueStep>;
}

export type EndingType = 
  | 'ending_1_overcoming' // Alisa overcomes bullying, socializes and lives, Mark's soul finds peace
  | 'ending_2_eternal_fog' // Alisa stays socially dysfunctional, isolated in room chatting with the ghost (which is actually a dark entity attached to her)
  | 'ending_3a_saved' // Mark breaks through reality and saves Alisa in the nick of time
  | 'ending_3b_too_late' // Mark resurrects but arrives too late
  | 'ending_3c_open_finale'; // Mark arrives in rain, open ambiguous ending

export interface GameState {
  currentDay: number;
  currentStepId: string;
  activePerspective: Character;
  messages: Message[];
  unreadCount: number;
  isTyping: boolean;
  typingSender: 'girl' | 'boy' | null;
  
  // Emotional & Branching Stats
  stats: {
    affection: number; // 0-100
    courage: number; // 0-100
    dependence: number; // 0-100
    entityInfluence: number; // 0-100 (parasitic entity attachment)
    monsterEvadedCount: number;
    discoveredMemoriesCount: number;
  };
  
  // Real-time / Pause status
  waitingState: {
    isWaiting: boolean;
    reason: string;
    totalSeconds: number;
    remainingSeconds: number;
    targetTimestamp: number;
    nextDayOrStep: {
      type: 'next_day' | 'next_step';
      targetId: string | number;
    } | null;
  } | null;

  // Settings & Dev tools
  settings: {
    soundEnabled: boolean;
    ambientSoundEnabled: boolean;
    soundVolume: number;
    fastForwardMode: boolean; // Speed up timers
    speedMultiplier: number; // 1x, 10x, 60x, 999x (Instant)
    notificationsEnabled: boolean;
    themeStyle: 'authentic' | 'compact';
  };

  readThoughtsHistory: string[];
  discoveredThoughts: ThoughtBubble[];
  unlockedEndings: EndingType[];
  gameFinishedEnding: EndingType | null;
  isInitialDarkness: boolean; // Ghost boy start from pitch darkness
  isBoyNameKnown?: boolean; // True once Mark has remembered/introduced his name
}
