export type RootStackParamList = {
  '(auth)': undefined;
  '(tabs)': undefined;
  '(game)': undefined;
  '(modals)': undefined;
};

export type AuthStackParamList = {
  'sign-in': undefined;
  'sign-up': undefined;
};

export type TabsParamList = {
  'home': undefined;
  'play': undefined;
  'menu': undefined;
};

export type GameStackParamList = {
  'index': undefined;
  'a': undefined;
  'b': undefined;
  'a/board': undefined;
  'a/super': undefined;
  'a/stats': undefined;
  'a/round/[round]/level/[level]': {
    round: string;
    level: string;
  };
};