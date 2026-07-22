async function testLocalWaitlist() {
  const email = `local_${Date.now()}@example.com`;
  console.log(`Testing local email: ${email}`);
  
  try {
    const res = await fetch('http://localhost:3000/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

testLocalWaitlist();
