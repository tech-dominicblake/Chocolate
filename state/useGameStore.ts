import { Language, Mode, PlayerId, RelationshipLevel } from '@/constants/Types';
import { create } from 'zustand';

import { getPrompt } from '@/constants/Functions';
import { categoryTypes, genderTypes } from '@/constants/Prompts';
import type { Message } from '@/constants/Types';
import { supabase } from '@/utils/supabase';
import { useSessionStore } from './useSessionStore';

interface GameState {
  // Game configuration
  language: Language;
  playerNames: { her: string; him: string };
  playerAvatar: { her: string; him: string };

  // Game progress
  round: number;
  level: number;
  currentTurn: PlayerId;
  consumedChocolates: { [round: number]: number[] }; // for game B - track per round
  consumedChocolatesEachCount: { her: number; him: number }; // for game A
  selectedChocoIndex: number;
  roundStarted: boolean;
  mode: Mode | null;
  stage: RelationshipLevel | null;

  // Stats
  tasksCompleted: {
    her: {
      round: number;
      completedLevel: number[];
    }[];
    him: {
      round: number;
      completedLevel: number[];
    }[]
  };
  didFinal: boolean;
  failsSuffered: { her: number; him: number }; // Individual fail counts for each player
  timePerRound: number;
  superGamePlayed: boolean;
  hasFailedOnce: boolean; // Track if user has failed once already
  sheFailedTwice: { level: number; state: boolean }; // Track if user has failed twice already
  selectedMessy: boolean; // Track if user has selected messy
  activeTooltip: boolean; // Track if user has selected messy
  showBtns: boolean;
  herChoco: number;
  himChoco: number;
  consumedChocoInB: number[];
  herchoco: number;
  himchoco: number;
  himTimePerLevel: { [level: number]: number }; // Track time per level for him player
  herTimePerLevel: { [level: number]: number }; // Track time per level for her player

  // Actions
  setMode: (mode: Mode) => void;
  setStage: (stageID: number) => void;
  setLanguage: (language: Language) => void;
  setPlayerNames: (names: { her: string; him: string }) => void;
  setRoundLevel: (level: number) => void;
  setCurrentTurn: (level: number) => void;
  switchTurn: () => void;
  consumeChocolate: (id: number, round?: number) => void;
  resetConsumedChocolates: () => void;
  setSelectedChocoIndex: (index: number) => void;
  setFailSurvivedTask: (turn: PlayerId) => void;
  incrementPlayerFailCount: (player: PlayerId) => void; // New action to increment fail count for specific player
  updateRoundTime: (time: number) => void;
  completeSuperGame: () => void;
  resetGame: () => void;
  setTaskCompleted: (player: PlayerId) => void;
  setRound: () => void;
  enqueueGameInfoMessages: () => Promise<void>;
  getMockMessageByKind: (kind: 'prompt' | 'success' | 'survive' | 'fail' | 'dare' | 'superGameCF' | 'superGame') => any;
  setHasFailedOnce: (value: boolean) => void;
  setConsumedChocolatesEachCount: () => void;
  setSheFailedTwice: (value: boolean) => void;
  setSelectedMessy: (value: boolean) => void;
  setActiveTooltip: (value: boolean) => void;
  setRoundStarted: (value: boolean) => void;
  setShowBtns: (value: boolean) => void;
  clearState: () => void;
  clearAllStates: () => void;
  setPlayerAvatar: (player: 'her' | 'him', avatar: string) => void;
  setHerChoco: (value: number) => void;
  setHimChoco: (value: number) => void;
  setDidFinal: (value: boolean) => void;
  setConsumedChocoInB: (value: number) => void;
  setHerchoco: (value: number) => void;
  setHimchoco: (value: number) => void;
  setHimTimePerLevel: (level: number, time: number) => void;
  setHerTimePerLevel: (level: number, time: number) => void;
}

const initialState = {
  mode: null,
  stage: null,
  language: 'english' as Language,
  playerNames: { her: '', him: '' },
  round: 1,
  level: 1,
  currentTurn: 'her' as PlayerId,
  consumedChocolates: { 1: [], 2: [] },
  selectedChocoIndex: 0,
  tasksCompleted: { her: [{ round: 0, completedLevel: [] }], him: [{ round: 0, completedLevel: [] }] },
  failsSuffered: { her: 0, him: 0 }, // Initialize individual fail counts
  timePerRound: 0,
  superGamePlayed: false,
  hasFailedOnce: false,
  consumedChocolatesEachCount: { her: 0, him: 0 },
  sheFailedTwice: { level: 0, state: false },
  selectedMessy: false,
  activeTooltip: true,
  roundStarted: false,
  showBtns: true,
  playerAvatar: { her: '', him: '' },
  herChoco: 1,
  himChoco: 7,
  didFinal: false,
  consumedChocoInB: [],
  herchoco: 1,
  himchoco: 13,
  himTimePerLevel: {},
  herTimePerLevel: {},
};

// Mock messages data structure
const mockMessagesData = {
  prompt: [
    {
      title: "Lap Confessions 💋🍫",
      body: "Sit her on your lap. Confess the following to each other whilst eating the chocolate together",
      kind: 'prompt' as const,
      group: 'question' as const,
      durationMs: 2000,
    },],
  survive: [{
    title: "Too Hot to Handle 🔥💋",
    body: "Slowly and seductively lick the chocolate piece... Whisper your partner's three sexiest features 😍🔥",
    kind: 'prompt' as const,
    group: 'question' as const,
    durationMs: 1000,
  }
  ],
  success: [
    {
      body: "No flinching. No excuses. Just pure, delicious chaos. You're built for this 😮‍💨",
      kind: 'success' as const,
      group: 'game_result' as const,
      durationMs: 1000,
    }
  ],
  dare: [
    {
      body: "You backed out? 😮‍💨 Fine. Here's your punishment 😈",
      kind: 'dare' as const,
      group: 'game_result' as const,
      durationMs: 1000,
    }
  ],
  fail: [
    {
      title: "Oof. You took  the Fail like a champ 😈",
      body: "Now let’s see if your partner’s got more guts than you 💅",
      kind: 'fail' as const,
      group: 'game_result' as const,
      durationMs: 1000,
    }
  ],
  superGameCF: [
    {
      body: "Ready for Super Game?",
      kind: 'prompt' as const,
      group: 'game_result' as const,
      durationMs: 1000,
    },
  ],
  superGame: [
    {
      body: " Final round, final piece. We’re ready. Let it ruin us beautifully.",
      kind: 'prompt' as const,
      group: 'game_result' as const,
      durationMs: 1000,
    }
  ]
};

export const useGameStore = create<GameState>((set) => ({
  ...initialState,

  setMode: (mode) => set({ mode }),
  setStage: (stageID) => set({ stage: stageID === 1 ? 'just_met' : stageID === 2 ? 'comfortably_dating' : 'long_term' }),
  setLanguage: (language) => set({ language }),
  setPlayerNames: (names) => set({ playerNames: names }),

  setCurrentTurn: (level: number) => {
    const newTurn = level % 2 === 1 ? 'her' : 'him' as PlayerId;
    set({ currentTurn: newTurn });
  },

  setRoundLevel: (currentlevel: number) => set((state) => {
    return {
      round: currentlevel === 12 ? state.round + 1 : state.round,
      level: currentlevel === 12 ? 1 : currentlevel + 1,
    };
  }),

  switchTurn: () => set((state) => ({
    currentTurn: state.currentTurn === 'her' ? 'him' : 'her',
  })),

  consumeChocolate: (id: number, round?: number) => set((state) => {
    const currentRound = round || state.round;
    return {
      consumedChocolates: {
        ...state.consumedChocolates,
        [currentRound]: [...(state.consumedChocolates[currentRound] || []), id]
      }
    };
  }),

  setSelectedChocoIndex: (index) => set({ selectedChocoIndex: index }),


  setFailSurvivedTask: (turn) => set((state) => ({
    failsSuffered: {
      ...state.failsSuffered,
      [turn]: state.failsSuffered[turn] + 1
    },
  })),

  incrementPlayerFailCount: (player: PlayerId) => set((state) => {

    const newState = {
      failsSuffered: {
        ...state.failsSuffered,
        [player]: state.failsSuffered[player] + 1
      },
    };

    return newState;
  }),

  updateRoundTime: (time) => set({ timePerRound: time }),

  completeSuperGame: () => set({ superGamePlayed: true }),

  resetGame: () => set(initialState),

  setTaskCompleted: (player) => set((state) => {
    const currentRoundData = state.tasksCompleted[player].find(r => r.round === state.round);
    if (currentRoundData) {
      // Add to existing round
      currentRoundData.completedLevel.push(state.level);
    } else {
      // Create new round entry
      state.tasksCompleted[player].push({ round: state.round, completedLevel: [state.level] });
    }
    return { tasksCompleted: state.tasksCompleted };
  }),

  setRound: () => set((state) => {
    state.round = state.round + 1;
    return state;
  }),

  enqueueGameInfoMessages: async () => {
    try {
      const state = useGameStore.getState();

      // Use default values if mode/stage are null
      const currentMode = state.mode || 'A'; // Default to B for game B
      const currentStage = state.stage || 'just_met';

      // Convert stage to readable category
      const categoryMap = {
        'just_met': 'Recently Met',
        'comfortably_dating': 'Comfortably Dating',
        'long_term': 'Long Term'
      };

      // Convert mode to readable game type
      const gameTypeMap = {
        'A': 'Game A',
        'B': 'Game B'
      };

      // Convert currentTurn to readable format
      const turnMap = {
        'her': 'HER',
        'him': 'HIM'
      };

      const presetMessages = [
        {
          kind: 'info' as const,
          body: `Category: ${categoryMap[currentStage]}`,
          durationMs: 1000,
        },
        {
          kind: 'info' as const,
          body: gameTypeMap[currentMode],
          durationMs: 1000,
        },
        {
          kind: 'info' as const,
          body: `Round ${state.round}`,
          durationMs: 1000,
        },
        {
          kind: 'info' as const,
          body: `Challenge ${Math.round(state.level / 2)} - for ${turnMap[state.currentTurn]}`,
          durationMs: 1000,
        }
      ];

      // Get the first prompt message from mock data

      const { data: prompt, error } = await supabase
        .from('content_items')
        .select(`id,
          content,
          subContent_1,
          subContent_2,
          subContent_3,
          subContent_4,
          subContent_5,
          content_1_time,
          content_2_time,
          content_3_time,
          content_4_time,
          content_5_time,
          challenges!inner (id,name)`)
        .ilike('category', `%${categoryTypes.promptA}%`)
        .eq('metadata->>round', state.round === 1 ? 'Round One' : 'Round Two')
        .eq('metadata->>gameType', `Game ${state.mode}`)
        .eq('challenges.name', `${genderTypes[state.currentTurn]}${Math.round(state.level / 2)}`)
        .order('subContent_1', { ascending: true });
        // .limit(1);


      console.warn("filtered prompt", prompt);
      const { enqueue, queue } = useMessages.getState();
      // If queue is not empty, add a separator message at the beginning
      if (queue.length > 0) {
        const separatorMessage = {
          kind: 'separator' as const,
          body: '',
          group: 'separator' as const,
        };
        enqueue(separatorMessage);
      }

      // Enqueue each message individually with await to ensure sequential processing
      for (const message of presetMessages) {
        await enqueue(message);
      }
      if (prompt?.[0]) {
      const promptMessage = getPrompt(prompt?.[0], 'prompt' as const);
        if (promptMessage) {
          for (const message of promptMessage) {
            await enqueue(message as Message);
          }
        }
      }
    } catch (error) {
      console.error('Error in enqueueGameInfoMessages:', error);
    }
  },

  getMockMessageByKind: (kind: 'prompt' | 'success' | 'survive' | 'fail' | 'dare' | 'superGameCF' | 'superGame') => {
    if (mockMessagesData[kind as keyof typeof mockMessagesData]) {
      return mockMessagesData[kind as keyof typeof mockMessagesData][0];
    }
    return null;
  },

  setHasFailedOnce: (value) => set({ hasFailedOnce: value }),
  setConsumedChocolatesEachCount: () => set((state) => ({
    consumedChocolatesEachCount: {
      her: state.currentTurn === 'her' ? state.consumedChocolatesEachCount.her + 1 : state.consumedChocolatesEachCount.her,
      him: state.currentTurn === 'him' ? state.consumedChocolatesEachCount.him + 1 : state.consumedChocolatesEachCount.him,
    },
  })),

  setSheFailedTwice: (value: boolean) => set((state) => ({ sheFailedTwice: { level: state.level, state: value } })),

  setSelectedMessy: (value: boolean) => set({ selectedMessy: value }),

  setActiveTooltip: (value: boolean) => set({ activeTooltip: value }),

  setRoundStarted: (value: boolean) => set({ roundStarted: value }),

  setShowBtns: (value: boolean) => set({ showBtns: value }),

  setPlayerAvatar: (player: 'her' | 'him', avatar: string) => set((state) => ({
    playerAvatar: {
      ...state.playerAvatar,
      [player]: avatar
    }
  })),

  clearState: () => set((state) => ({
    ...initialState,
    language: state.language, // Preserve current language
  })),

  // Complete state reset function that clears ALL global states
  clearAllStates: () => {
    // Clear game state
    set(initialState);

    // Clear message queue
    useMessages.getState().clear();

    // Clear session state
    const { signOut } = useSessionStore.getState();
    signOut();

    // Note: Settings store is preserved as it contains user preferences
  },

  resetConsumedChocolates: () => set({ consumedChocolates: { 1: [], 2: [] } }),
  setHerChoco: (value: number) => set({ herChoco: value }),
  setHimChoco: (value: number) => set({ himChoco: value }),
  setDidFinal: (value: boolean) => set({ didFinal: value }),
  setConsumedChocoInB: (value: number) => set((state) => ({ consumedChocoInB: [...state.consumedChocoInB, value] })),
  setHerchoco: (value: number) => set({ herchoco: value }),
  setHimchoco: (value: number) => set({ himchoco: value }),
  setHimTimePerLevel: (level: number, time: number) => set((state) => ({
    himTimePerLevel: { ...state.himTimePerLevel, [level]: time }
  })),
  setHerTimePerLevel: (level: number, time: number) => set((state) => ({
    herTimePerLevel: { ...state.herTimePerLevel, [level]: time }
  })),
}));

// Message queue
const mkId = () => Math.random().toString(36).slice(2) + Date.now();

interface MessageState {
  queue: Message[];
  isProcessing: boolean; // Add lock to prevent concurrent enqueuing
  enqueue: (msg: Message) => Promise<void>;
  dequeue: (id?: string) => void;   // if no id, pop head
  clear: () => void;
}

export const useMessages = create<MessageState>((set, get) => ({
  queue: [],
  isProcessing: false,
  enqueue: async (msg) => {
    try {
      // Check if queue is currently processing a message with duration
      const state = get();
      if (state.isProcessing) {
        // Wait for current processing to complete
        while (state.isProcessing) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          const currentState = get();
          if (!currentState.isProcessing) break;
        }
      }

      const withId: Message = {
        ...msg,
        id: msg.id ?? mkId(),
        durationMs: msg.durationMs ?? 0,
      };

      // Add message to queue immediately
      set(s => ({ queue: [...s.queue, withId] }));

      // If message has duration, lock the queue and wait
      if (msg.durationMs && msg.durationMs > 0) {
        set(s => ({ isProcessing: true }));
        await new Promise(resolve => setTimeout(resolve, msg.durationMs));
        set(s => ({ isProcessing: false }));
      }
    } catch (error) {
      console.error('Error in message enqueue:', error);
      set(s => ({ isProcessing: false }));
    }
  },
  dequeue: (id) =>
    set(s => id ? ({ queue: s.queue.filter(m => m.id !== id) })
      : ({ queue: s.queue.slice(1) })),
  clear: () => set({ queue: [], isProcessing: false }),
}));