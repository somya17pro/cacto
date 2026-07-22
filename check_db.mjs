import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envContent = fs.readFileSync('.env.local', 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim();
});

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = envVars['SUPABASE_SERVICE_ROLE_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("Connecting to Supabase at", supabaseUrl, "...");
  
  // Try inserting an email
  const testEmail = `test_insert_${Date.now()}@example.com`;
  console.log(`Attempting to insert: ${testEmail}`);
  
  const { data, error } = await supabase.from('waitlist').insert([{ email: testEmail }]).select();
  
  if (error) {
    console.error("ERROR inserting into waitlist table:", error);
    process.exit(1);
  } else {
    console.log("SUCCESS! Insert worked.");
    console.log("Data returned:", data);
  }
}

check();
