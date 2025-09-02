export type RelationshipLevel = 'just_met' | 'comfortably_dating' | 'long_term';
export type PlayerId = 'her' | 'him';
export type CandyTag = '#spicy'|'#emotional'|'#wildcard'|'#savage'|'#relationship'|'#nostalgia';

export type Mode = 'A' | 'B'; // add a pre-game mode

export interface Player { id: PlayerId; name: string; }

export interface Question {
  id: string;
  text: string;
  categoryTag?: CandyTag;
  genderTarget?: PlayerId;
  relationshipLevel: RelationshipLevel;
  type: 'truth'|'dare'|'super';
}

export interface Dare {
  id: string;
  text: string;
  categoryTag?: CandyTag;
  relationshipLevel: RelationshipLevel;
  type: 'task'|'surrender'|'forced';
  checklist?: string[];
  timerSec?: number;
}

export interface Chocolate {
  index: number;               // 1..13
  side: 'left'|'right'|'center';
  categoryTag?: CandyTag;
  consumed: boolean;
  failed?: boolean;
}

export interface ProgressEntry {
  chocolateIndex: number;
  player: PlayerId;
  outcome: 'truth'|'dare'|'task'|'skipped'|'failed'|'super';
  durationMs?: number;
}

export interface GameState {
  mode: Mode;                                      // 'none' until started
  relationship: RelationshipLevel | null;          // null until chosen
  players: Record<PlayerId, Player>;               // prefilled empty names ok
  chocolates: Chocolate[];
  currentIndex: number | null;
  currentLevel: 1|2|3;
  activePlayer: PlayerId;
  status: 'setup'|'round'|'promptNextLevel'|'superGame'|'summary';
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

export type MessageKind = 'success' | 'fail' | 'info' | 'warning' | 'dare' | 'prompt' | 'super' | 'userchoice' | 'separator';

export interface Message {
  id?: string;                // unique, optional since useMessages auto-generates
  kind: MessageKind;          // controls colors/icons
  body: string;               // what to show
  title?: string;             // optional header
  sticky?: boolean;           // if true, user must dismiss
  durationMs?: number;        // auto-dismiss timing (if not sticky)
  group?: 'turn'|'level'|'dare'|'system'|'game_info'|'question'|'user_action'|'game_result'|'separator'; // for optional dedupe
  meta?: Record<string, any>; // anything else (playerName, level, etc.)
}