// lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// TypeScript puede inferir los tipos aquí, pero para ser más explícitos
// podríamos hacerlo así, aunque no es estrictamente necesario.
// El cliente de Supabase ya viene con sus propios tipos.
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)