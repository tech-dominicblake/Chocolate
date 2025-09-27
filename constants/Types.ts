export type RelationshipLevel = 'just_met' | 'comfortably_dating' | 'long_term';
export type PlayerId = 'her' | 'him';
export type CandyTag = '#spicy' | '#emotional' | '#wildcard' | '#savage' | '#relationship' | '#nostalgia';

export type Mode = 'A' | 'B'; // add a pre-game mode

export interface Player { id: PlayerId; name: string; }

export interface Question {
  id: string;
  text: string;
  categoryTag?: CandyTag;
  genderTarget?: PlayerId;
  relationshipLevel: RelationshipLevel;
  type: 'truth' | 'dare' | 'super';
}

export type Language = 'english' | 'russian' | 'bahasa_indonesia';

export interface Dare {
  id: string;
  text: string;
  categoryTag?: CandyTag;
  relationshipLevel: RelationshipLevel;
  type: 'task' | 'surrender' | 'forced';
  checklist?: string[];
  timerSec?: number;
}

export interface Chocolate {
  index: number;               // 1..13
  side: 'left' | 'right' | 'center';
  categoryTag?: CandyTag;
  consumed: boolean;
  failed?: boolean;
}
export interface ProgressEntry {
  chocolateIndex: number;
  player: PlayerId;
  outcome: 'truth' | 'dare' | 'task' | 'skipped' | 'failed' | 'super';
  durationMs?: number;
}
export interface GameState {
  mode: Mode;                                      // 'none' until started
  relationship: RelationshipLevel | null;          // null until chosen
  players: Record<PlayerId, Player>;               // prefilled empty names ok
  chocolates: Chocolate[];
  currentIndex: number | null;
  currentLevel: 1 | 2 | 3;
  activePlayer: PlayerId;
  status: 'setup' | 'round' | 'promptNextLevel' | 'superGame' | 'summary';
  questionBank: Question[];
  dareBank: Dare[];
  progress: ProgressEntry[];
  timerStart?: number;
}
export interface Actions {
  startGameA(rel: RelationshipLevel, players: Record<PlayerId, Player>): void;
  startGameB(rel: RelationshipLevel, players: Record<PlayerId, Player>): void;
  selectChocolate(i: number): void;
  answerTruth(payload: { suspectedLie?: boolean }): void;
  confirmDare(): void;
  bailDare(): void;
  next(): void;
  continueLevel(): void;
  endGame(): void;
  enterSuper(): void;
  skipSuper(): void;
}

export type MessageKind = 'success' | 'survive' | 'fail' | 'info' | 'warning' | 'dare' | 'prompt' | 'super' | 'userchoice' | 'separator';
export interface Message {
  id?: string;                // unique, optional since useMessages auto-generates
  kind: MessageKind;          // controls colors/icons
  body: string;               // what to show
  title?: string;             // optional header
  sticky?: boolean;           // if true, user must dismiss
  durationMs?: number;        // auto-dismiss timing (if not sticky)
  group?: 'turn' | 'level' | 'dare' | 'system' | 'game_info' | 'question' | 'user_action' | 'game_result' | 'separator'; // for optional dedupe
  meta?: Record<string, any>; // anything else (playerName, level, etc.)
}
export interface UserState {
  success: boolean;
  firstFail: boolean;
  secondFail: boolean;
  // gamePaused: boolean;
  survived: boolean;
}
export interface ProcessingState {
  gameSucceeded: boolean;
  gameFailed: boolean;
  gameSurvived: boolean;
  gamePaused: boolean;
  gameStarted: boolean;
  gameEnded: boolean;
  gameNewLevelStarted: boolean;
}

export interface Prompt {
  id: string;
  content: string;
  subContent_1: string;
  subContent_2: string;
  subContent_3: string;
  subContent_4: string;
  subContent_5: string;
  content_1_time: number;
  content_2_time: number;
  content_3_time: number;
  content_4_time: number;
  content_5_time: number;
  challenges: {
    id: string;
    name: string;
  };
}