import { Mode, PlayerId, RelationshipLevel } from '@/constants/Types';
import { create } from 'zustand';

import type { Message } from '@/constants/Types';

interface GameState {
  // Game configuration
  mode: Mode | null;
  stage: RelationshipLevel | null;
  playerNames: { her: string; him: string };

  // Game progress
  round: number;
  level: number;
  currentTurn: PlayerId;
  consumedChocolates: number[];
  consumedChocolatesEachCount: { her: number; him: number };
  selectedChocoIndex: number;

  // Stats
  tasksCompleted: { her: number[]; him: number[] };
  failsSuffered: { her: number; him: number }; // Individual fail counts for each player
  timePerRound: number;
  superGamePlayed: boolean;
  hasFailedOnce: boolean; // Track if user has failed once already
  sheFailedTwice: { level: number; state: boolean }; // Track if user has failed twice already
  selectedMessy: boolean; // Track if user has selected messy

  // Actions
  setMode: (mode: Mode) => void;
  setStage: (stageID: number) => void;
  setPlayerNames: (names: { her: string; him: string }) => void;
  setRoundLevel: (level: number) => void;
  setCurrentTurn: (level: number) => void;
  switchTurn: () => void;
  consumeChocolate: (id: number) => void;
  setSelectedChocoIndex: (index: number) => void;
  failTask: () => void;
  incrementPlayerFailCount: (player: PlayerId) => void; // New action to increment fail count for specific player
  updateRoundTime: (time: number) => void;
  completeSuperGame: () => void;
  resetGame: () => void;
  setTaskCompleted: (player: PlayerId) => void;
  setRound: () => void;
  enqueueGameInfoMessages: () => void;
  getMockMessageByKind: (kind: 'prompt' | 'success' | 'fail' | 'dare') => any;
  setHasFailedOnce: (value: boolean) => void;
  setConsumedChocolatesEachCount: () => void;
  setSheFailedTwice: (value: boolean) => void;
  setSelectedMessy: (value: boolean) => void;
}

const initialState = {
  mode: null,
  stage: null,
  playerNames: { her: '', him: '' },
  round: 1,
  level: 1,
  currentTurn: 'her' as PlayerId,
  consumedChocolates: [],
  selectedChocoIndex: 0,
  tasksCompleted: { her: [], him: [] },
  failsSuffered: { her: 0, him: 0 }, // Initialize individual fail counts
  timePerRound: 0,
  superGamePlayed: false,
  hasFailedOnce: false,
  consumedChocolatesEachCount: { her: 0, him: 0 },
  sheFailedTwice: { level: 0, state: false },
  selectedMessy: false,
};

// Mock messages data structure
const mockMessagesData = {
  prompt: [
    {
      title: "Lap Confessions 💋🍫",
      body: "Sit her on your lap. Confess the following to each other whilst eating the chocolate together",
      kind: 'prompt' as const,
      group: 'question' as const,
    },
    {
      title: "Too Hot to Handle 🔥💋",
      body: "Slowly and seductively lick the chocolate piece... Whisper your partner's three sexiest features 😍🔥",
      kind: 'prompt' as const,
      group: 'question' as const,
    }
  ],
  success: [
    {
      body: "No flinching. No excuses. Just pure, delicious chaos. You’re built for this 😮‍💨",
      kind: 'success' as const,
      group: 'game_result' as const,
    }
  ],
  dare: [
    {
      body: "You backed out? 😮‍💨 Fine. Here's your punishment 😈",
      kind: 'dare' as const,
      group: 'game_result' as const,
    }
  ],
  fail: [
    {
      title: "Oof. You took  the Fail like a champ 😈",
      body: "Now let’s see if your partner’s got more guts than you 💅",
      kind: 'fail' as const,
      group: 'game_result' as const,
    }
  ]
};

export const useGameStore = create<GameState>((set) => ({
  ...initialState,

  setMode: (mode) => set({ mode }),
  setStage: (stageID) => set({ stage: stageID === 1 ? 'just_met' : stageID === 2 ? 'comfortably_dating' : 'long_term' }),
  setPlayerNames: (names) => set({ playerNames: names }),

  setCurrentTurn: (level: number) => {
    const newTurn = level % 2 === 1 ? 'her' : 'him' as PlayerId;
    set({ currentTurn: newTurn });
  },

  setRoundLevel: (currentlevel: number) => set((state) => {
    console.log('setRoundLevel called with level:', state.level);
    return {
      round: currentlevel === 12 ? state.round + 1 : state.round,
      level: currentlevel === 12 ? 1 : currentlevel + 1,
    };
  }),

  switchTurn: () => set((state) => ({
    currentTurn: state.currentTurn === 'her' ? 'him' : 'her',
  })),

  consumeChocolate: (id: number) => set((state) => ({
    consumedChocolates: [...state.consumedChocolates, id],
  })),

  setSelectedChocoIndex: (index) => set({ selectedChocoIndex: index }),


  failTask: () => set((state) => ({
    failsSuffered: {
      her: state.failsSuffered.her + 1,
      him: state.failsSuffered.him + 1
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

  setTaskCompleted: (player) => set((state) => ({
    tasksCompleted: { ...state.tasksCompleted, [player]: [...state.tasksCompleted[player], state.level] },
  })),

  setRound: () => set((state) => {
    state.round = state.round + 1;
    return state;
  }),

  enqueueGameInfoMessages: () => {
    const state = useGameStore.getState();

    // Use default values if mode/stage are null
    const currentMode = state.mode || 'A';
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
        group: 'game_info' as const,
      },
      {
        kind: 'info' as const,
        body: gameTypeMap[currentMode],
        group: 'game_info' as const,
      },
      {
        kind: 'info' as const,
        body: `Round ${state.round}`,
        group: 'game_info' as const,
      },
      {
        kind: 'info' as const,
        body: `Level ${Math.ceil(Math.ceil(state.level / 2))} - for ${turnMap[state.currentTurn]}`,
        group: 'game_info' as const,
      }
    ];

    // Get the first prompt message from mock data
    const firstPrompt = mockMessagesData.prompt[0];

    // Enqueue the preset messages + first prompt
    const { enqueue } = useMessages.getState();
    enqueue([...presetMessages, firstPrompt]);
  },

  getMockMessageByKind: (kind: 'prompt' | 'success' | 'fail' | 'dare') => {
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

}));

// Message queue
const mkId = () => Math.random().toString(36).slice(2) + Date.now();

interface MessageState {
  queue: Message[];
  enqueue: (msg: Message | Message[]) => void;
  dequeue: (id?: string) => void;   // if no id, pop head
  clear: () => void;
}

export const useMessages = create<MessageState>((set, get) => ({
  queue: [],
  enqueue: (msg) =>
    set(s => {
      const list = Array.isArray(msg) ? msg : [msg];
      const withIds = list.map((m): Message => ({
        ...m,
        id: m.id ?? mkId(),
        durationMs: m.durationMs ?? 2000,
      }));
      return { queue: [...s.queue, ...withIds] };
    }),
  dequeue: (id) =>
    set(s => id ? ({ queue: s.queue.filter(m => m.id !== id) })
      : ({ queue: s.queue.slice(1) })),
  clear: () => set({ queue: [] }),
}));