import { MessageKind } from "./Types";

export function checkTurn(currentTurn: string, id: number) {
  if (currentTurn === "her") {
    if (id > 6) return false;
    if (id < 1) return true;
  } else if (currentTurn === "him") {
    if (id < 6) return false;
    if (id > 6) return true;
  }
  return undefined; // fallback if no condition matched
}

export function herChocoLevel(n: number) {
  if (!Number.isInteger(n) || n < 1 || n > 12) {
    throw new Error("Input must be an integer between 1 and 12");
  }
  return Math.min(6, (n + 2) >> 1);
}

// quick check
for (let i = 1; i <= 12; i++) {
}

export function himChocoLevel(n: number) {
  if (!Number.isInteger(n) || n < 1 || n > 12) {
    throw new Error("Input must be an integer between 1 and 12");
  }
  return (n + 1) >> 1;
}

// quick check
for (let i = 1; i <= 12; i++) {
}

type PromptRow = {
  id: string;
  content: string;
  subContent_1?: string | null;
  subContent_2?: string | null;
  subContent_3?: string | null;
  subContent_4?: string | null;
  subContent_5?: string | null;
  content_1_time?: number ;
  content_2_time?: number ;
  content_3_time?: number ;
  content_4_time?: number ;
  content_5_time?: number ;
};

type MessageItem = {
  kind: MessageKind;
  body: string;
  group: string;
  durationMs: number | null;
};

export function getPrompt(row: PromptRow, kind: MessageKind): MessageItem[] {
  const subContents = [
    { body: row.subContent_1, durationMs: row.content_1_time },
    { body: row.subContent_2, durationMs: row.content_2_time },
    { body: row.subContent_3, durationMs: row.content_3_time },
    { body: row.subContent_4, durationMs: row.content_4_time },
    { body: row.subContent_5, durationMs: row.content_5_time },
  ].filter(item => item.body); // remove null/undefined

  if (subContents.length > 0) {
    return subContents.map(sc => ({
      kind: kind,
      body: sc.body!,
      group: '',
      durationMs: sc.durationMs ?? 0, // default 0 if null
    }));
  }

  // fallback to full content
  return [
    {
      kind: 'prompt',
      body: row.content,
      group: '',
      durationMs: 2000, // or set a default
    },
  ];
}
