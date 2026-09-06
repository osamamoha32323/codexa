import { createClient } from '@supabase/supabase-js';

		const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cqimnarvixlmpgmvouvd.supabase.co';
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_A2PpPf8deqvXTd8xcoyQWg_-sRfmwIO';
        
        export const supabase = createClient(supabaseUrl, supabaseKey);
