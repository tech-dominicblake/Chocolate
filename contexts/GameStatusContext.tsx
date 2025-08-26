import React, { createContext, ReactNode, useContext, useReducer } from 'react';

// Types
export type GameMode = 'gameA' | 'gameB';
export type LevelStatus = 'locked' | 'active' | 'done';

export interface Player {
  name: string;
}

export interface Round {
  id: string;
  task: string;
  type: 'wild' | 'task';
  completed: boolean;
}

export interface Level {
  id: string;
  name: string;
  status: LevelStatus;
  rounds: Round[];
}

export type LastAction = 'CONTINUE' | 'FAIL' | null;

export interface GameState {
  mode: GameMode;
  player: Player;
  currentLevelIndex: number;
  currentRoundIndex: number;
  levels: Level[];
  lastAction: LastAction;
}

// Actions
export type GameAction =
  | { type: 'INIT'; payload: { mode: GameMode; player: Player } }
  | { type: 'CONTINUE' }
  | { type: 'FAIL' }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET_GAME' };

// Initial State
const initialState: GameState = {
  mode: 'gameA',
  player: { name: 'Player' },
  currentLevelIndex: 0,
  currentRoundIndex: 0,
  levels: [
    {
      id: 'level1',
      name: 'Recently Met (<3 months)',
      status: 'active',
      rounds: Array.from({ length: 14 }, (_, i) => ({
        id: `level1-round-${i + 1}`,
        task: `Mock task ${i + 1}`,
        type: i < 2 ? 'wild' : 'task',
        completed: false,
      })),
    },
    {
      id: 'level2',
      name: 'Getting Serious (3-12 months)',
      status: 'locked',
      rounds: Array.from({ length: 14 }, (_, i) => ({
        id: `level2-round-${i + 1}`,
        task: `Mock task ${i + 1}`,
        type: i < 2 ? 'wild' : 'task',
        completed: false,
      })),
    },
    {
      id: 'level3',
      name: 'We Already Hate Each Other (1+ year)',
      status: 'locked',
      rounds: Array.from({ length: 14 }, (_, i) => ({
        id: `level3-round-${i + 1}`,
        task: `Mock task ${i + 1}`,
        type: i < 2 ? 'wild' : 'task',
        completed: false,
      })),
    },
  ],
  lastAction: null,
};

// Reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        mode: action.payload.mode,
        player: action.payload.player,
      };

    case 'CONTINUE':
      return {
        ...state,
        lastAction: 'CONTINUE',
      };

    case 'FAIL':
      return {
        ...state,
        lastAction: 'FAIL',
      };

    case 'NEXT_ROUND':
      const currentLevel = state.levels[state.currentLevelIndex];
      const isLastRound = state.currentRoundIndex === currentLevel.rounds.length - 1;

      if (isLastRound) {
        // Mark current level as done
        const updatedLevels = state.levels.map((level, index) => {
          if (index === state.currentLevelIndex) {
            return { ...level, status: 'done' as LevelStatus };
          }
          if (index === state.currentLevelIndex + 1) {
            return { ...level, status: 'active' as LevelStatus };
          }
          return level;
        });

        // Move to next level if available
        if (state.currentLevelIndex < state.levels.length - 1) {
          return {
            ...state,
            levels: updatedLevels,
            currentLevelIndex: state.currentLevelIndex + 1,
            currentRoundIndex: 0,
            lastAction: null,
          };
        } else {
          // Game completed - all levels done
          return {
            ...state,
            levels: updatedLevels,
            lastAction: null,
          };
        }
      } else {
        // Move to next round in current level
        return {
          ...state,
          currentRoundIndex: state.currentRoundIndex + 1,
          lastAction: null,
        };
      }

    case 'RESET_GAME':
      return initialState;

    default:
      return state;
  }
}

// Context
interface GameStatusContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameStatusContext = createContext<GameStatusContextType | undefined>(undefined);

// Provider
export function GameStatusProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameStatusContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStatusContext.Provider>
  );
}

// Hook
export function useGameStatus() {
  const context = useContext(GameStatusContext);
  if (context === undefined) {
    throw new Error('useGameStatus must be used within a GameStatusProvider');
  }
  return context;
}
