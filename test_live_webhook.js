async function testLiveWaitlist() {
  const email = `test_${Date.now()}@example.com`;
  console.log(`Testing email: ${email}`);
  
  try {
    const res = await fetch('https://cacto.cc/api/waitlist', {
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

testLiveWaitlist();
