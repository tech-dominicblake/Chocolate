// Mock Supabase client for now
export const supabase = {
  auth: {
    signIn: async () => ({ data: null, error: null }),
    signOut: async () => ({ error: null }),
  },
  from: (table: string) => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: null, error: null }),
    update: () => ({ data: null, error: null }),
    delete: () => ({ data: null, error: null }),
  }),
};