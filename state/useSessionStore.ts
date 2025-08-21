// state/useSessionStore.ts
import { create } from "zustand";
type Session = { token: string } | null;
type S = { session: Session; setSession: (s: Session) => void; signOut: () => void };
export const useSessionStore = create<S>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  signOut: () => set({ session: null }),
}));
