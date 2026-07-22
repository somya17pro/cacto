const fs = require('fs');

async function run() {
  let triggerKeyword = 'LINK';
  try {
    const mockFilePath = 'C:\\Users\\Somya\\Desktop\\Cacto\\mock_automations.json';
    if (fs.existsSync(mockFilePath)) {
      const data = fs.readFileSync(mockFilePath, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        triggerKeyword = parsed[0].triggerKeyword || 'LINK';
      }
    }
  } catch (e) {
    console.log('Using default trigger keyword LINK');
  }

  const payload = {
    type: 'comment.received',
    accountId: '6a58da333d50078defa0bb5f', // Use a valid Zernio Account hex ID format to pass validations
    postId: 'post-1',
    commentId: 'comment-12345',
    commentText: `Triggering auto response with keyword ${triggerKeyword}`,
    commenterUsername: 'somya_tester'
  };

  console.log(`Sending direct webhook POST payload to local Next.js server at http://localhost:3000/api/webhooks/zernio for keyword ${triggerKeyword}...`);
  try {
    const res = await fetch('http://localhost:3000/api/webhooks/zernio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('Response Status:', res.status);
    console.log('Response Body:', await res.text());
    console.log('\nProcessing completed! Please check "webhook_logs.log" in your workspace to see the full trace.');
  } catch (err) {
    console.error('Failed to contact local server. Make sure Next.js is running (npm run dev)!', err.message);
  }
}

run();
