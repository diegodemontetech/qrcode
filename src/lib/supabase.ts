import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xmghvsghuwfzjwlvxwra.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtZ2h2c2dodXdmemp3bHZ4d3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0OTYxMTcsImV4cCI6MjA0OTA3MjExN30.fos4IWi6olr38nmdpaL4cR9LWnfbPG-lUSBnE1w5wHY';

export const supabase = createClient(supabaseUrl, supabaseKey);

// No initialization needed - table will be created manually