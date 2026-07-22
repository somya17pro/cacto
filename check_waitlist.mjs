import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envContent = fs.readFileSync('.env.local', 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim();
});

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = envVars['SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const STATE_FILE = '.waitlist_state.json';
  let lastCheckedDate = new Date(0).toISOString();
  
  if (fs.existsSync(STATE_FILE)) {
    lastCheckedDate = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')).lastCheckedDate;
  }

  const { data, error } = await supabase
    .from('waitlist')
    .select('*')
    .gt('created_at', lastCheckedDate)
    .order('created_at', { ascending: true });

  if (error) {
    console.error("Error fetching waitlist:", error.message);
    process.exit(1);
  }

  if (data && data.length > 0) {
    console.log(`NEW_SIGNUPS_FOUND: ${data.length}`);
    data.forEach(user => {
      console.log(`- ${user.email} (joined at ${user.created_at})`);
    });
    
    // Update state to the latest date
    const latestDate = data[data.length - 1].created_at;
    fs.writeFileSync(STATE_FILE, JSON.stringify({ lastCheckedDate: latestDate }));
  } else {
    console.log("No new signups.");
  }
}

check();
