import { createClient } from '@supabase/supabase-js';
const URL = 'https://gcivpnyickmapazrazmn.supabase.co';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjaXZwbnlpY2ttYXBhenJhem1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1OTk0MDMsImV4cCI6MTk5NzE3NTQwM30.ky8NS7xUXXj7sBS-FsjZ9A3_DfDg-Kk3aJCQoapdOSw';

export const supabase = createClient(URL, API_KEY)