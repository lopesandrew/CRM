// Configuração global de modo de dados.
// Altere DATA_MODE para "supabase" para usar o Supabase em vez de IndexedDB.
export const DATA_MODE: 'indexeddb' | 'supabase' = 'indexeddb';

// Leitura das variáveis de ambiente definidas via Vite.
export const SUPABASE_URL: string = import.meta.env.VITE_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';
