// src/messages/presets.ts
import type { Message } from '@/constants/Types';

type Ctx = { playerName: string; level: number; consequence?: string };

const mkId = () => Math.random().toString(36).slice(2) + Date.now();

export const Msg = {
  truthSuccess: (ctx: Ctx): Message[] => ([
    { id: mkId(), kind: 'success', body: `${ctx.playerName} answered truthfully.` },
    { id: mkId(), kind: 'info',    body: `Next turn. Level ${ctx.level}.` },
  ]),
  dareSuccess: (ctx: Ctx): Message[] => ([
    { id: mkId(), kind: 'dare',    body: `Dare completed. Nice!` },
    { id: mkId(), kind: 'success', body: `+1 chocolate consumed.` },
  ]),
  dareBail: (ctx: Ctx): Message[] => ([
    { id: mkId(), kind: 'fail',    body: `${ctx.playerName} bailed the dare.` },
    ctx.consequence
      ? { id: mkId(), kind: 'warning', body: `Consequence: ${ctx.consequence}` }
      : { id: mkId(), kind: 'warning', body: `Turn passes.` },
  ]),
  level6Prompt: (): Message[] => ([
    { id: mkId(), kind: 'prompt',  body: `Have you had enough? You can continue to Level 2.` , sticky: true },
  ]),
  level12Prompt: (): Message[] => ([
    { id: mkId(), kind: 'prompt',  body: `12 done! Play the Super (center) or finish?`, sticky: true },
  ]),
  superPlayed: (): Message[] => ([
    { id: mkId(), kind: 'super',   body: `Super played!` },
    { id: mkId(), kind: 'success', body: `Game complete. Check your summary.` },
  ]),
};
