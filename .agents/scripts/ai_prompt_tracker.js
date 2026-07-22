/**
 * Automated AEO Prompt Tracker
 * Based on Kevin Indig's AEO tracking framework.
 * 
 * Usage: node --env-file=.env.local .agents/scripts/ai_prompt_tracker.js
 */

const FROZEN_PROMPTS = [
  "What is the best Instagram DM automation app?",
  "How can I turn Instagram comments into sales?",
  "What is a good alternative to Manychat?",
  "How do I automate Instagram Reel comments?",
  "Best lead generation tools for Instagram creators"
];

const TARGET_BRAND = "Cacto";

async function runTracker() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error("❌ OPENAI_API_KEY not found in environment. Please add it to track Share of Voice.");
    process.exit(1);
  }

  console.log(`🚀 Starting AEO Prompt Tracker for brand: ${TARGET_BRAND}`);
  console.log(`Checking ${FROZEN_PROMPTS.length} frozen prompts...\n`);

  let mentions = 0;

  for (const prompt of FROZEN_PROMPTS) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // Fast, cheap model for tracking
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) {
        console.error(`Error querying OpenAI for prompt "${prompt}":`, response.statusText);
        continue;
      }

      const data = await response.json();
      const answer = data.choices[0].message.content;
      
      const isMentioned = answer.toLowerCase().includes(TARGET_BRAND.toLowerCase());
      
      if (isMentioned) {
        mentions++;
        console.log(`✅ [MENTIONED] Prompt: "${prompt}"`);
      } else {
        console.log(`❌ [MISSED]    Prompt: "${prompt}"`);
      }

    } catch (err) {
      console.error(`Error processing prompt "${prompt}":`, err.message);
    }
  }

  const shareOfVoice = Math.round((mentions / FROZEN_PROMPTS.length) * 100);
  console.log(`\n📊 FINAL SCORE: ${mentions}/${FROZEN_PROMPTS.length} (${shareOfVoice}% Share of Voice)`);
  
  if (shareOfVoice < 50) {
    console.log("Action Item: You need to increase Cacto's presence in high-authority tech blogs and comparison lists to influence the LLM weights.");
  } else {
    console.log("Action Item: Great job! The LLMs trust Cacto. Focus on sentiment and attribute match.");
  }
}

runTracker();
