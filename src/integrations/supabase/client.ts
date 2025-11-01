import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://botiybwcqbybnrzpavsy.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvdGl5YndjcWJ5Ym5yenBhdnN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MDExNjMsImV4cCI6MjA3NjA3NzE2M30.lhZaya1iPIGfrcCQC369s_v0NcT7P1GtmQvzQteUyo8';

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});