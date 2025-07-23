import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types (based on your company structure)
export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: number;
          business_id: string;
          name: string;
          industry: string | null;
          city: string | null;
          company_type: string | null;
          address: string | null;
          registration_date: string | null;
          revenue: number | null;
          postal_code: string | null;
          website: string | null;
          status: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          business_id: string;
          name: string;
          industry?: string | null;
          city?: string | null;
          company_type?: string | null;
          address?: string | null;
          registration_date?: string | null;
          revenue?: number | null;
          postal_code?: string | null;
          website?: string | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          business_id?: string;
          name?: string;
          industry?: string | null;
          city?: string | null;
          company_type?: string | null;
          address?: string | null;
          registration_date?: string | null;
          revenue?: number | null;
          postal_code?: string | null;
          website?: string | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
    };
  };
}
