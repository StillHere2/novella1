import React, { useState, useEffect, useRef } from 'react';
import {
  Character,
  GameState,
  ChoiceOption,
  ThoughtBubble,
  EndingType,
  Message,
} from './types/game';
import { STORY_DAYS, getDayData } from './data/storyScript';
import { PhoneBackground } from './components/PhoneBackground';
import { PhoneHardware } from './components/PhoneHardware';
import { MessengerHeader } from './components/MessengerHeader';
import { MessageItem } from './components/MessageItem';
import { ChatInputBar } from './components/ChatInputBar';
import { WaitTimerModal } from './components/WaitTimerModal';
import { EndingView } from './components/EndingView';
import { DevPanel } from './components/DevPanel';
import { PaperStickerOverlay } from './components/PaperStickerOverlay';
import { ThoughtsWindow } from './components/ThoughtsWindow';
import { ActionChoicesModal } from './components/ActionChoicesModal';
import {
  playTapSound,
  playMessageSend,
  playMessageReceive,
  playGlitchStatic,
  toggleAmbientAtmosphere,
} from './utils/audio';
import { sendGameNotification } from './utils/notifications';

const STORAGE_KEY = 'echo_between_us_state_v1';

export default function App() {
  // Main Game State
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}

    const day1 = STORY_DAYS[0];
    return {
      currentDay: 1,
      currentStepId: day1.startingStepId,
      activePerspective: day1.initialPerspective,
      messages: [],
      unreadCount: 0,
      isTyping: false,
      typingSender: null,
      stats: {
        affection: 10,
        courage: 20,
        dependence: 30,
        entityInfluence: 0,
        monsterEvadedCount: 0,
        discoveredMemoriesCount: 0,
      },
      waitingState: null,
      settings: {
        soundEnabled: true,
        ambientSoundEnabled: false,
        soundVolume: 0.5,
        fastForwardMode: false,
        speedMultiplier: 1,
        notificationsEnabled: false,
        themeStyle: 'authentic',
      },
      readThoughtsHistory: [],
      discoveredThoughts: [],
      unlockedEndings: [],
      gameFinishedEnding: null,
      isInitialDarkness: false,
    };
  });

  const [devMenuOpen, setDevMenuOpen] = useState(false);
  const [isThoughtsWindowOpen, setIsThoughtsWindowOpen] = useState(false);
  const [isActionPopupOpen, setIsActionPopupOpen] = useState(false);
  const [activeStickerThought, setActiveStickerThought] = useState<ThoughtBubble | null>(null);
  const [shownStickerIds, setShownStickerIds] = useState<Set<string>>(new Set());
  const [prefilledThoughtText, setPrefilledThoughtText] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch {}
  }, [gameState]);

  // Autoscroll chat
  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  useEffect(() => {
    scrollToBottom();
    const timeout = setTimeout(scrollToBottom, 60);
    return () => clearTimeout(timeout);
  }, [gameState.messages, gameState.isTyping]);

  // Current day data and step
  const currentDayData = getDayData(gameState.currentDay);
  const currentStep = currentDayData.steps[gameState.currentStepId] || currentDayData.steps[currentDayData.startingStepId];

  // Compute available choices after message delivery
  const availableChoices =
    !gameState.isTyping && currentStep?.choices && currentStep.choices.length > 0
      ? currentStep.choices
      : [];

  // Auto-open Action Choices Popup when incoming message has delivered and choices are ready
  useEffect(() => {
    if (
      availableChoices.length > 0 &&
      !gameState.isTyping &&
      !gameState.waitingState?.isWaiting &&
      !gameState.gameFinishedEnding
    ) {
      setIsActionPopupOpen(true);
    } else {
      setIsActionPopupOpen(false);
    }
  }, [
    gameState.currentStepId,
    gameState.isTyping,
    availableChoices.length,
    gameState.waitingState?.isWaiting,
    gameState.gameFinishedEnding,
  ]);

  // Process narrative step & collect thoughts onto the desk & trigger paper sticker popup
  useEffect(() => {
    if (!currentStep || gameState.waitingState?.isWaiting || gameState.gameFinishedEnding) {
      return;
    }

    // 1. Perspective switch trigger
    if (currentStep.triggersPerspectiveSwitch && currentStep.triggersPerspectiveSwitch !== gameState.activePerspective) {
      setGameState((prev) => ({
        ...prev,
        activePerspective: currentStep.triggersPerspectiveSwitch!,
        isInitialDarkness: currentStep.triggersPerspectiveSwitch === 'boy' && prev.currentDay === 1,
      }));
    }

    // 2. Ending trigger
    if (currentStep.triggersEnding) {
      setGameState((prev) => ({
        ...prev,
        isTyping: false,
        gameFinishedEnding: currentStep.triggersEnding!,
        unlockedEndings: Array.from(new Set([...prev.unlockedEndings, currentStep.triggersEnding!])),
      }));
      return;
    }

    // 3. Pause/Wait trigger (e.g. 7h between days or 2h offline)
    if (currentStep.triggersWait) {
      const waitConfig = currentStep.triggersWait;
      const targetTs = Date.now() + waitConfig.durationSeconds * 1000;

      setGameState((prev) => ({
        ...prev,
        isTyping: false,
        waitingState: {
          isWaiting: true,
          reason: waitConfig.description,
          totalSeconds: waitConfig.durationSeconds,
          remainingSeconds: waitConfig.durationSeconds,
          targetTimestamp: targetTs,
          nextDayOrStep: {
            type: waitConfig.type === 'day_end' ? 'next_day' : 'next_step',
            targetId: waitConfig.type === 'day_end' ? prev.currentDay + 1 : currentStep.nextStepId || '',
          },
        },
      }));
      return;
    }

    // 4. Interactive Choice step: Stop auto-progression and present choices to player
    if (currentStep.choices && currentStep.choices.length > 0) {
      if (currentStep.thoughts && currentStep.thoughts.length > 0) {
        const unshownThought = currentStep.thoughts.find((t) => !shownStickerIds.has(t.id));
        if (unshownThought) {
          setActiveStickerThought(unshownThought);
          setShownStickerIds((prev) => new Set([...prev, unshownThought.id]));
        }
      }

      setGameState((prev) => {
        let updatedDiscoveredThoughts = prev.discoveredThoughts || [];
        if (currentStep.thoughts && currentStep.thoughts.length > 0) {
          const existingIds = new Set(updatedDiscoveredThoughts.map((t) => t.id));
          const newThoughts = currentStep.thoughts.filter((t) => !existingIds.has(t.id));
          if (newThoughts.length > 0) {
            updatedDiscoveredThoughts = [...updatedDiscoveredThoughts, ...newThoughts];
          }
        }
        return {
          ...prev,
          isTyping: false,
          typingSender: null,
          discoveredThoughts: updatedDiscoveredThoughts,
        };
      });
      return;
    }

    // 5. Message Step with Text (Incoming or Outgoing)
    if (currentStep.text && currentStep.text.trim().length > 0) {
      const isIncoming = currentStep.sender !== gameState.activePerspective;

      if (isIncoming) {
        // Incoming message from other character or system
        setGameState((prev) => ({
          ...prev,
          isTyping: true,
          typingSender: currentStep.sender === 'girl' ? 'girl' : currentStep.sender === 'boy' ? 'boy' : null,
        }));

        const charCount = currentStep.text.length;
        const baseDelay = currentStep.sender === 'system'
          ? 900
          : Math.max(2000, Math.min(3800, 2000 + charCount * 18));
        const delay = baseDelay / (gameState.settings.speedMultiplier || 1);

        const timer = setTimeout(() => {
          const timeNow = gameState.activePerspective === 'boy' ? '02:17' : '23:47';
          const newMsg: Message = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            sender: currentStep.sender,
            text: currentStep.text,
            timestamp: timeNow,
            isGlitch: currentStep.glitchEffect,
          };

          if (gameState.settings.soundEnabled) {
            if (currentStep.glitchEffect) playGlitchStatic();
            else playMessageReceive();
          }

          // Trigger paper sticker on phone screen AFTER receiving the message
          if (currentStep.thoughts && currentStep.thoughts.length > 0) {
            const unshownThought = currentStep.thoughts.find((t) => !shownStickerIds.has(t.id));
            if (unshownThought) {
              setActiveStickerThought(unshownThought);
              setShownStickerIds((prev) => new Set([...prev, unshownThought.id]));
            }
          }

          setGameState((prev) => {
            let updatedDiscoveredThoughts = prev.discoveredThoughts || [];
            if (currentStep.thoughts && currentStep.thoughts.length > 0) {
              const existingIds = new Set(updatedDiscoveredThoughts.map((t) => t.id));
              const newThoughts = currentStep.thoughts.filter((t) => !existingIds.has(t.id));
              if (newThoughts.length > 0) {
                updatedDiscoveredThoughts = [...updatedDiscoveredThoughts, ...newThoughts];
              }
            }

            return {
              ...prev,
              isTyping: false,
              typingSender: null,
              messages: [...prev.messages, newMsg],
              discoveredThoughts: updatedDiscoveredThoughts,
              currentStepId: currentStep.nextStepId || prev.currentStepId,
            };
          });
        }, delay);

        return () => {
          clearTimeout(timer);
        };
      } else {
        // Outgoing monologue/narrative message from the active character
        const charCount = currentStep.text.length;
        const calculatedDelay = Math.max(1200, Math.min(2200, 1000 + charCount * 12));
        const delay = calculatedDelay / (gameState.settings.speedMultiplier || 1);

        const timer = setTimeout(() => {
          const timeNow = gameState.activePerspective === 'boy' ? '02:17' : '23:47';
          const newMsg: Message = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            sender: currentStep.sender,
            text: currentStep.text,
            timestamp: timeNow,
            status: 'read',
          };

          if (gameState.settings.soundEnabled) {
            playMessageSend();
          }

          if (currentStep.thoughts && currentStep.thoughts.length > 0) {
            const unshownThought = currentStep.thoughts.find((t) => !shownStickerIds.has(t.id));
            if (unshownThought) {
              setActiveStickerThought(unshownThought);
              setShownStickerIds((prev) => new Set([...prev, unshownThought.id]));
            }
          }

          setGameState((prev) => {
            let updatedDiscoveredThoughts = prev.discoveredThoughts || [];
            if (currentStep.thoughts && currentStep.thoughts.length > 0) {
              const existingIds = new Set(updatedDiscoveredThoughts.map((t) => t.id));
              const newThoughts = currentStep.thoughts.filter((t) => !existingIds.has(t.id));
              if (newThoughts.length > 0) {
                updatedDiscoveredThoughts = [...updatedDiscoveredThoughts, ...newThoughts];
              }
            }

            return {
              ...prev,
              isTyping: false,
              typingSender: null,
              messages: [...prev.messages, newMsg],
              discoveredThoughts: updatedDiscoveredThoughts,
              currentStepId: currentStep.nextStepId || prev.currentStepId,
            };
          });
        }, delay);

        return () => {
          clearTimeout(timer);
        };
      }
    }

    // 6. Transition step with no text and no choices (advance immediately)
    if (currentStep.nextStepId && currentStep.nextStepId !== gameState.currentStepId) {
      if (currentStep.thoughts && currentStep.thoughts.length > 0) {
        const unshownThought = currentStep.thoughts.find((t) => !shownStickerIds.has(t.id));
        if (unshownThought) {
          setActiveStickerThought(unshownThought);
          setShownStickerIds((prev) => new Set([...prev, unshownThought.id]));
        }
      }

      setGameState((prev) => ({
        ...prev,
        isTyping: false,
        currentStepId: currentStep.nextStepId!,
      }));
    }
  }, [gameState.currentStepId, gameState.currentDay, gameState.activePerspective]);

  // Timer Tick Interval for pauses/waiting
  useEffect(() => {
    if (!gameState.waitingState?.isWaiting) return;

    const interval = setInterval(() => {
      setGameState((prev) => {
        if (!prev.waitingState || !prev.waitingState.isWaiting) return prev;

        const delta = 1 * prev.settings.speedMultiplier;
        const newRemaining = prev.waitingState.remainingSeconds - delta;

        if (newRemaining <= 0) {
          // Timer finished!
          const nextInfo = prev.waitingState.nextDayOrStep;
          let nextDay = prev.currentDay;
          let nextStep = prev.currentStepId;

          if (nextInfo?.type === 'next_day') {
            nextDay = Math.min(33, Number(nextInfo.targetId));
            const newDayData = getDayData(nextDay);
            nextStep = newDayData.startingStepId;
          } else if (nextInfo?.type === 'next_step') {
            nextStep = String(nextInfo.targetId);
          }

          if (prev.settings.notificationsEnabled) {
            sendGameNotification('Эхо Между Нами', 'Новое сообщение на канале Null_Echo...', prev.settings.soundEnabled);
          }

          return {
            ...prev,
            currentDay: nextDay,
            currentStepId: nextStep,
            waitingState: null,
          };
        }

        return {
          ...prev,
          waitingState: {
            ...prev.waitingState,
            remainingSeconds: newRemaining,
          },
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.waitingState?.isWaiting, gameState.settings.speedMultiplier]);

  // Handle Player Selecting Dialogue Choice
  const handleSelectChoice = (choice: ChoiceOption) => {
    setIsActionPopupOpen(false);
    if (gameState.settings.soundEnabled) {
      playMessageSend();
    }

    const timeNow = gameState.activePerspective === 'boy' ? '02:17' : '23:47';
    const playerMsg: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      sender: gameState.activePerspective,
      text: choice.messageText,
      timestamp: timeNow,
      status: 'read',
    };

    // Apply stat impacts
    const statsUpdate = { ...gameState.stats };
    if (choice.statImpact) {
      if (choice.statImpact.affection) statsUpdate.affection = Math.min(100, Math.max(0, statsUpdate.affection + choice.statImpact.affection));
      if (choice.statImpact.courage) statsUpdate.courage = Math.min(100, Math.max(0, statsUpdate.courage + choice.statImpact.courage));
      if (choice.statImpact.dependence) statsUpdate.dependence = Math.min(100, Math.max(0, statsUpdate.dependence + choice.statImpact.dependence));
      if (choice.statImpact.entityInfluence) statsUpdate.entityInfluence = Math.min(100, Math.max(0, statsUpdate.entityInfluence + choice.statImpact.entityInfluence));
    }

    setGameState((prev) => ({
      ...prev,
      messages: [...prev.messages, playerMsg],
      currentStepId: choice.nextStepId,
      stats: statsUpdate,
    }));
  };

  // Skip wait immediately
  const handleSkipWait = () => {
    setGameState((prev) => {
      if (!prev.waitingState) return prev;
      const nextInfo = prev.waitingState.nextDayOrStep;
      let nextDay = prev.currentDay;
      let nextStep = prev.currentStepId;

      if (nextInfo?.type === 'next_day') {
        nextDay = Math.min(33, Number(nextInfo.targetId));
        const newDayData = getDayData(nextDay);
        nextStep = newDayData.startingStepId;
      } else if (nextInfo?.type === 'next_step') {
        nextStep = String(nextInfo.targetId);
      }

      return {
        ...prev,
        currentDay: nextDay,
        currentStepId: nextStep,
        waitingState: null,
      };
    });
  };

  // Jump to specific day
  const handleJumpToDay = (dayNumber: number) => {
    const targetDay = getDayData(dayNumber);
    setGameState((prev) => ({
      ...prev,
      currentDay: dayNumber,
      currentStepId: targetDay.startingStepId,
      activePerspective: targetDay.initialPerspective,
      waitingState: null,
      gameFinishedEnding: null,
      isInitialDarkness: false,
    }));
    setDevMenuOpen(false);
  };

  // Restart game
  const handleRestart = () => {
    const day1 = STORY_DAYS[0];
    setGameState((prev) => ({
      ...prev,
      currentDay: 1,
      currentStepId: day1.startingStepId,
      activePerspective: day1.initialPerspective,
      messages: [],
      waitingState: null,
      gameFinishedEnding: null,
      isInitialDarkness: false,
      stats: {
        affection: 10,
        courage: 20,
        dependence: 30,
        entityInfluence: 0,
        monsterEvadedCount: 0,
        discoveredMemoriesCount: 0,
      },
    }));
  };

  const timeString = gameState.activePerspective === 'boy' ? '02:17' : '23:47';

  const isGirl = gameState.activePerspective === 'girl';

  // Actionable/read handler for thoughts (All thoughts live on desk outside phone and can be sent as messages)
  const handleThoughtAction = (thought: ThoughtBubble) => {
    playTapSound(0.25);

    // Mark as read
    setGameState((prev) => ({
      ...prev,
      readThoughtsHistory: Array.from(new Set([...prev.readThoughtsHistory, thought.id])),
    }));

    // Check if thought matches a choice in currentStep
    const choices = currentStep?.choices || [];
    const matchedChoice = choices.find(
      (c) =>
        c.label.toLowerCase().includes(thought.text.toLowerCase().slice(0, 10)) ||
        c.messageText.toLowerCase().includes(thought.text.toLowerCase().slice(0, 10)) ||
        thought.text.toLowerCase().includes(c.label.toLowerCase().slice(0, 10)) ||
        (thought.actionChoiceId && c.id === thought.actionChoiceId)
    );

    if (matchedChoice) {
      handleSelectChoice(matchedChoice);
      return;
    }

    // If choices exist on current step, send the thought as Alice's reply and execute the step
    if (choices.length > 0) {
      const firstChoice = choices[0];
      const timeNow = gameState.activePerspective === 'boy' ? '02:17' : '23:47';
      const playerMsg: Message = {
        id: `msg_thought_${Date.now()}`,
        sender: gameState.activePerspective,
        text: thought.text,
        timestamp: timeNow,
      };

      if (gameState.settings.soundEnabled) playMessageSend();

      setGameState((prev) => ({
        ...prev,
        messages: [...prev.messages, playerMsg],
        stats: {
          ...prev.stats,
          affection: Math.min(100, prev.stats.affection + (firstChoice.statImpact?.affection || 5)),
          courage: Math.min(100, prev.stats.courage + (firstChoice.statImpact?.courage || 5)),
        },
        currentStepId: firstChoice.nextStepId,
      }));
      return;
    }

    // If waiting on linear step with nextStepId:
    if (currentStep?.nextStepId && currentStep.sender === gameState.activePerspective) {
      const timeNow = gameState.activePerspective === 'boy' ? '02:17' : '23:47';
      const playerMsg: Message = {
        id: `msg_thought_${Date.now()}`,
        sender: gameState.activePerspective,
        text: thought.text,
        timestamp: timeNow,
      };

      if (gameState.settings.soundEnabled) playMessageSend();

      setGameState((prev) => ({
        ...prev,
        messages: [...prev.messages, playerMsg],
        currentStepId: currentStep.nextStepId!,
      }));
      return;
    }

    // Otherwise prefill into chat input bar for editing/sending
    setPrefilledThoughtText(thought.text);
  };

  const handleThoughtRead = (thought: ThoughtBubble) => {
    setGameState((prev) => ({
      ...prev,
      readThoughtsHistory: Array.from(new Set([...prev.readThoughtsHistory, thought.id])),
    }));
  };

  return (
    <PhoneBackground character={gameState.activePerspective}>
      {/* Main Smartphone Shell */}
      <PhoneHardware
        character={gameState.activePerspective}
        timeStr={timeString}
        isInitialDarkness={gameState.isInitialDarkness}
        onWakeFromDarkness={() => {
          playTapSound();
          setGameState((prev) => ({ ...prev, isInitialDarkness: false }));
        }}
      >
        {/* Messenger Header Bar */}
        <MessengerHeader
          activePerspective={gameState.activePerspective}
          currentDay={gameState.currentDay}
          isTyping={gameState.isTyping}
          onOpenDevMenu={() => setDevMenuOpen(true)}
          onOpenThoughts={() => setIsThoughtsWindowOpen(true)}
          thoughtsCount={(gameState.discoveredThoughts || []).length}
          hasActionableThoughts={
            (currentStep?.choices && currentStep.choices.length > 0) ||
            (gameState.discoveredThoughts || []).some((t) => t.isActionable)
          }
          affectionStat={gameState.stats.affection}
          courageStat={gameState.stats.courage}
          dependenceStat={gameState.stats.dependence}
        />

        {/* Chat Stream View - Strictly sent and received messages */}
        <div
          id="messenger-messages-viewport"
          className="flex-1 overflow-y-auto p-2 pt-3 flex flex-col scroll-smooth space-y-1 relative"
        >
          {gameState.messages.length === 0 && (
            <div className="my-auto text-center p-6 text-slate-500 text-xs">
              <p className="font-mono mb-1 text-cyan-400 font-bold">[КАНАЛ СВЯЗИ NULL_ECHO ОТКРЫТ]</p>
              <p>Ожидание установления контакта между мирами...</p>
            </div>
          )}

          {gameState.messages.map((msg, index) => (
            <MessageItem
              key={msg.id}
              message={msg}
              activePerspective={gameState.activePerspective}
              isNewest={index === gameState.messages.length - 1}
            />
          ))}

          {/* Typing indicator bubble */}
          {gameState.isTyping && (
            <div className="w-full flex justify-start mb-2 px-2 animate-fadeIn">
              <div className="bg-[#151a28] border border-cyan-500/30 rounded-2xl rounded-tl-xs px-3.5 py-2 flex items-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                <span className="text-[11px] font-sans text-cyan-300 font-medium">
                  {gameState.activePerspective === 'girl' ? 'Марк' : 'Алиса'} печатает
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Paper Sticker Overlay on top of Phone Screen (persists until clicked or held to ignite & send) */}
        {activeStickerThought && (
          <PaperStickerOverlay
            thought={activeStickerThought}
            activePerspective={gameState.activePerspective}
            onClose={() => setActiveStickerThought(null)}
            onSendThought={(thought) => {
              handleThoughtAction(thought);
              setActiveStickerThought(null);
            }}
          />
        )}

        {/* Action Choices Popup Window Modal (Floating overlay that disappears immediately on select) */}
        <ActionChoicesModal
          isOpen={isActionPopupOpen}
          choices={availableChoices}
          onSelectChoice={handleSelectChoice}
          onClose={() => setIsActionPopupOpen(false)}
          activeCharacter={gameState.activePerspective}
        />

        {/* Thoughts and Character Notes Window Modal */}
        <ThoughtsWindow
          isOpen={isThoughtsWindowOpen}
          onClose={() => setIsThoughtsWindowOpen(false)}
          allThoughts={gameState.discoveredThoughts || []}
          activePerspective={gameState.activePerspective}
          onSendThought={(thought) => {
            handleThoughtAction(thought);
            setIsThoughtsWindowOpen(false);
          }}
          readThoughtsHistory={gameState.readThoughtsHistory}
        />

        {/* Bottom Dialogue Input Bar */}
        <ChatInputBar
          choices={availableChoices}
          onSelectChoice={handleSelectChoice}
          onOpenActionPopup={() => setIsActionPopupOpen(true)}
          isTypingOther={gameState.isTyping}
          activeCharacter={gameState.activePerspective}
          prefilledText={prefilledThoughtText}
          onClearPrefill={() => setPrefilledThoughtText('')}
        />

        {/* Offline / Day Break Pause Overlay */}
        {gameState.waitingState?.isWaiting && (
          <WaitTimerModal
            reason={gameState.waitingState.reason}
            remainingSeconds={gameState.waitingState.remainingSeconds}
            totalSeconds={gameState.waitingState.totalSeconds}
            onSkipWait={handleSkipWait}
            onSpeedUp={(mult) => {
              setGameState((prev) => ({
                ...prev,
                settings: { ...prev.settings, speedMultiplier: mult },
              }));
            }}
            notificationsEnabled={gameState.settings.notificationsEnabled}
            onToggleNotifications={() => {
              setGameState((prev) => ({
                ...prev,
                settings: {
                  ...prev.settings,
                  notificationsEnabled: !prev.settings.notificationsEnabled,
                },
              }));
            }}
          />
        )}

        {/* Game Finished Ending Screen */}
        {gameState.gameFinishedEnding && (
          <EndingView
            ending={gameState.gameFinishedEnding}
            stats={gameState.stats}
            onRestart={handleRestart}
            onJumpToDay={handleJumpToDay}
          />
        )}
      </PhoneHardware>

      {/* Developer Control Modal */}
      <DevPanel
        isOpen={devMenuOpen}
        onClose={() => setDevMenuOpen(false)}
        activePerspective={gameState.activePerspective}
        onTogglePerspective={() => {
          setGameState((prev) => ({
            ...prev,
            activePerspective: prev.activePerspective === 'girl' ? 'boy' : 'girl',
          }));
        }}
        currentDay={gameState.currentDay}
        onJumpToDay={handleJumpToDay}
        speedMultiplier={gameState.settings.speedMultiplier}
        onSetSpeedMultiplier={(sp) => {
          setGameState((prev) => ({
            ...prev,
            settings: { ...prev.settings, speedMultiplier: sp },
          }));
        }}
        onTriggerEnding={(ending) => {
          setGameState((prev) => ({
            ...prev,
            gameFinishedEnding: ending,
            unlockedEndings: Array.from(new Set([...prev.unlockedEndings, ending])),
          }));
          setDevMenuOpen(false);
        }}
        soundEnabled={gameState.settings.soundEnabled}
        onToggleSound={() => {
          setGameState((prev) => ({
            ...prev,
            settings: {
              ...prev.settings,
              soundEnabled: !prev.settings.soundEnabled,
            },
          }));
        }}
        ambientSoundEnabled={gameState.settings.ambientSoundEnabled}
        onToggleAmbient={() => {
          const next = !gameState.settings.ambientSoundEnabled;
          toggleAmbientAtmosphere(next, gameState.activePerspective);
          setGameState((prev) => ({
            ...prev,
            settings: {
              ...prev.settings,
              ambientSoundEnabled: next,
            },
          }));
        }}
        stats={gameState.stats}
        onUpdateStat={(key, delta) => {
          setGameState((prev) => ({
            ...prev,
            stats: {
              ...prev.stats,
              [key]: Math.min(100, Math.max(0, prev.stats[key] + delta)),
            },
          }));
        }}
      />
    </PhoneBackground>
  );
}
