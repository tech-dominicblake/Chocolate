export enum GameMode {
  A = 'A',
  B = 'B',
}

export enum RelationshipStage {
  RecentlyMet = 'recentlyMet',
  GettingSerious = 'gettingSerious',
  WeHateEachOther = 'weHateEachOther',
}

export enum PlayerTurn {
  Her = 'HER',
  Him = 'HIM',
}

export interface GameState {
  mode: GameMode | null;
  stage: RelationshipStage | null;
  round: number;
  level: number;
  currentTurn: PlayerTurn;
  consumedChocolates: number[];
  tasksCompleted: number;
  failsSuffered: number;
  timePerRound: number;
  superGamePlayed: boolean;
}

export interface Prompt {
  id: number;
  text: string;
  type: 'task' | 'truth' | 'dare';
  stage: RelationshipStage;
  failPrompt?: string;
  completionMessage?: string;
}

export interface GameStats {
  tasksCompleted: number;
  failsSuffered: number;
  timePerRound: number;
  superGamePlayed: boolean;
}