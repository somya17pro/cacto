const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const envPath = '.env.local';
let envContent = '';
try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (err) {
  console.error('Could not find .env.local file at:', envPath);
  process.exit(1);
}

const env = {};
envContent.split('\n').forEach(line => {
  const clean = line.trim();
  if (clean && !clean.startsWith('#')) {
    const idx = clean.indexOf('=');
    if (idx !== -1) {
      env[clean.substring(0, idx).trim()] = clean.substring(idx + 1).trim();
    }
  }
});

const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['SUPABASE_SERVICE_ROLE_KEY']);

async function run() {
  console.log('Retrieving your connected account...');
  const { data: accounts, error: acctErr } = await supabase.from('connected_accounts').select('*').eq('platform', 'instagram').limit(1);
  if (acctErr) {
    console.error('Error fetching accounts:', acctErr.message);
    return;
  }
  if (!accounts || accounts.length === 0) {
    console.error('No connected Instagram account found in your database. Please link your account in the dashboard first.');
    return;
  }
  const account = accounts[0];
  console.log(`Found account: ${account.username} (ID/page_id: ${account.page_id})`);

  console.log('Retrieving active automation...');
  const { data: autos, error: autoErr } = await supabase.from('automations').select('*').eq('user_id', account.user_id).eq('is_active', true).limit(1);
  if (autoErr) {
    console.error('Error fetching automations:', autoErr.message);
    return;
  }
  if (!autos || autos.length === 0) {
    console.error('No active automation found for your account. Please create one in the dashboard.');
    return;
  }
  const auto = autos[0];
  console.log(`Found active automation with keyword: "${auto.trigger_keyword}"`);

  const payload = {
    type: 'comment.received',
    accountId: account.page_id,
    postId: 'mock-post-1',
    commentText: `Triggering auto response with keyword ${auto.trigger_keyword}`,
    commenterUsername: 'somya_tester'
  };

  console.log('Sending webhook POST payload to your local server http://localhost:3000/api/webhooks/zernio...');
  try {
    const res = await fetch('http://localhost:3000/api/webhooks/zernio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('Response Status:', res.status);
    console.log('Response Body:', await res.text());
    console.log('\nCheck "webhook_logs.log" in your workspace to see the processing steps.');
  } catch (err) {
    console.error('Failed to contact local server. Make sure "npm run dev" is running!', err.message);
  }
}

run();
