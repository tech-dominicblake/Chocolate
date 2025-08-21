import { create } from 'zustand';

export type GameMode = 'A' | 'B';
export type RelationshipStage = 'recentlyMet' | 'gettingSerious' | 'weHateEachOther';
export type PlayerTurn = 'HER' | 'HIM';

interface GameState {
  // Game configuration
  mode: GameMode | null;
  stage: RelationshipStage | null;
  playerNames: {
    her: string;
    him: string;
  } | null;
  
  // Game progress
  round: number;
  level: number;
  currentTurn: PlayerTurn;
  consumedChocolates: number[];
  
  // Stats
  tasksCompleted: number;
  failsSuffered: number;
  timePerRound: number;
  superGamePlayed: boolean;
  
  // Actions
  setMode: (mode: GameMode) => void;
  setStage: (stage: RelationshipStage) => void;
  setPlayerNames: (names: { her: string; him: string }) => void;
  setRoundLevel: (round: number, level: number) => void;
  switchTurn: () => void;
  consumeChocolate: (id: number) => void;
  completeTask: () => void;
  failTask: () => void;
  updateRoundTime: (time: number) => void;
  completeSuperGame: () => void;
  resetGame: () => void;
}

const initialState = {
  mode: null,
  stage: null,
  playerNames: null,
  round: 1,
  level: 1,
  currentTurn: 'HER' as PlayerTurn,
  consumedChocolates: [],
  tasksCompleted: 0,
  failsSuffered: 0,
  timePerRound: 0,
  superGamePlayed: false,
};

export const useGameStore = create<GameState>((set) => ({
  ...initialState,
  
  setMode: (mode) => set({ mode }),
  setStage: (stage) => set({ stage }),
  setPlayerNames: (names) => set({ playerNames: names }),
  
  setRoundLevel: (round, level) => set({ round, level }),
  
  switchTurn: () => set((state) => ({
    currentTurn: state.currentTurn === 'HER' ? 'HIM' : 'HER',
  })),
  
  consumeChocolate: (id) => set((state) => ({
    consumedChocolates: [...state.consumedChocolates, id],
  })),
  
  completeTask: () => set((state) => ({
    tasksCompleted: state.tasksCompleted + 1,
  })),
  
  failTask: () => set((state) => ({
    failsSuffered: state.failsSuffered + 1,
  })),
  
  updateRoundTime: (time) => set({ timePerRound: time }),
  
  completeSuperGame: () => set({ superGamePlayed: true }),
  
  resetGame: () => set(initialState),
}));