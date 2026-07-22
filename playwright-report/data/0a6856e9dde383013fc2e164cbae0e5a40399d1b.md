# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: waitlist-api.spec.ts >> Waitlist Flow >> should submit successfully with a valid email
- Location: tests\waitlist-api.spec.ts:28:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/You have been successfully added/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/You have been successfully added/i)

```

```yaml
- banner:
  - link "🌵 cacto":
    - /url: /
  - navigation:
    - link "Features":
      - /url: /#features
    - link "How it works":
      - /url: /#how-it-works
    - link "Comparison":
      - /url: /#comparison
    - link "Blog":
      - /url: /blog
    - link "Free Tools":
      - /url: /tools
  - button "Join Waitlist"
- heading "Turn Instagram comments into automated DMs & sales." [level=1]
- text: 💬 Follower comments keyword ➔ ⚡ Cacto auto-sends DM link
- button "Join Waitlist →"
- text: Active Rule JO John Cart Recovery · Digital Guides "Auto follow-up on digital guides. Here's your direct link to download the PDF guide!" recovery rate ↑ 18% CA Carla Inbound Sales · Course Checkout "Direct course checkout link is ready. Tap below to join our next masterclass cohort!" conversions ↑ 31% YU Yuki Booking Links · Calendly "Here's my Calendly calendar invite link! Pick a 1:1 strategy call time that works for you." show rate ↑ 92%
- heading "Why is Cacto built for speed, safety & sales?" [level=2]
- paragraph: Everything you need to automate Instagram DMs.
- heading "Instant Auto-DMs" [level=3]
- paragraph: Auto-sends DMs in 30 seconds when followers comment keywords on your Reels & Posts.
- heading "Direct Store Links" [level=3]
- paragraph: Sends Stripe, Stan Store & Shopify checkout links straight to follower inboxes.
- heading "Meta Anti-Spam Safety" [level=3]
- paragraph: Rotates 3 comment reply variations with natural delays to keep your account 100% safe.
- heading "Instant Lead Capture" [level=3]
- paragraph: Collects follower emails inside DMs before delivering free guides or downloads.
- heading "How do you launch Instagram DM automation in under 5 minutes?" [level=2]
- text: STEP 01
- heading "Pick your posts" [level=3]
- paragraph: Select specific Reels, Posts, or Stories directly from your Instagram feed inside your Cacto dashboard.
- text: STEP 02
- heading "Set your keywords & replies" [level=3]
- paragraph: Set trigger phrases (e.g. "GUIDE") and 3 rotated comment replies to stay 100% Meta anti-spam compliant.
- text: STEP 03
- heading "Connect stores & Stripe" [level=3]
- paragraph: Attach direct DM checkout buttons for Stripe, Stan Store, or custom URLs to deliver instant download links.
- heading "Why do creators choose Cacto for Instagram DM automation?" [level=2]
- paragraph: Built for instant DM responses, zero setup bloat, and 100% Meta API compliance.
- table:
  - rowgroup:
    - row "Capabilities Manual Comment DMs Complex Chat Builders 🌵 Cacto AutoDM":
      - columnheader "Capabilities"
      - columnheader "Manual Comment DMs"
      - columnheader "Complex Chat Builders"
      - columnheader "🌵 Cacto AutoDM"
  - rowgroup:
    - row "Response Speed Slow (hours later) Sub-30 seconds ✓ Sub-30 Seconds":
      - cell "Response Speed"
      - cell "Slow (hours later)"
      - cell "Sub-30 seconds"
      - cell "✓ Sub-30 Seconds"
    - row "Setup Time Never ending Complex flowcharts ✓ Under 5 Minutes":
      - cell "Setup Time"
      - cell "Never ending"
      - cell "Complex flowcharts"
      - cell "✓ Under 5 Minutes"
    - row "Anti-Spam Comment Rotator Manual typing ✕ Hard setup ✓ 3 Rotated Variations":
      - cell "Anti-Spam Comment Rotator"
      - cell "Manual typing"
      - cell "✕ Hard setup"
      - cell "✓ 3 Rotated Variations"
    - row "Direct Checkout Links Manual copy-paste Supported ✓ Stripe, Store & Custom":
      - cell "Direct Checkout Links"
      - cell "Manual copy-paste"
      - cell "Supported"
      - cell "✓ Stripe, Store & Custom"
    - row "0% Contact Taxes Free but slow ✕ Contact Tier Tax ✓ 0% Extra Taxes":
      - cell "0% Contact Taxes"
      - cell "Free but slow"
      - cell "✕ Contact Tier Tax"
      - cell "✓ 0% Extra Taxes"
- heading "What are the most frequently asked questions about Cacto?" [level=2]
- paragraph: Clear answers about Instagram DM automation and Meta API compliance.
- button "Is Cacto compliant with Meta and Instagram platform rules? +"
- button "How does Cacto compare as a ManyChat alternative? +"
- button "How fast are DM responses sent when a follower comments? +"
- button "Can I connect direct payment links and store URLs? +"
- button "What platforms and stores can I connect to Cacto DMs? +"
- button "Will automated DMs get my Instagram account flagged or banned? +"
- button "How does instant lead capture work inside Instagram DMs? +"
- button "Will my followers know they are receiving automated DMs? +"
- button "How long does it take to set up Cacto for Instagram? +"
- button "Can I join the early access waitlist? +"
- contentinfo:
  - text: 🌵 cacto
  - paragraph: Made with 💚
- button
- heading "🌵 Join our waitlist." [level=3]
- paragraph: Join our waitlist and make sure you are in for our launch.
- text: You are on the waitlist! We will notify you when spots open up.
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Waitlist Flow', () => {
  4  |   test('should display server error message on failure', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     
  7  |     // Mock the API response to return an error
  8  |     await page.route('**/api/waitlist', async route => {
  9  |       const json = { error: 'Server validation error' };
  10 |       await route.fulfill({ status: 400, json });
  11 |     });
  12 | 
  13 |     // Open Modal
  14 |     await page.getByRole('button', { name: /Join Waitlist/i }).first().click();
  15 | 
  16 |     // Use a valid email so it bypasses HTML5 validation and hits the mocked server
  17 |     const emailInput = page.getByPlaceholder(/Enter your email address/i).first();
  18 |     await emailInput.fill('test-error@example.com');
  19 |     
  20 |     // Submit form
  21 |     const submitBtn = page.locator('form').getByRole('button', { name: /Join Waitlist/i });
  22 |     await submitBtn.click();
  23 |     
  24 |     // Expect error message returned from our mock
  25 |     await expect(page.getByText(/Server validation error/i)).toBeVisible();
  26 |   });
  27 | 
  28 |   test('should submit successfully with a valid email', async ({ page }) => {
  29 |     await page.goto('/');
  30 |     
  31 |     // Mock the API response
  32 |     await page.route('**/api/waitlist', async route => {
  33 |       const json = { success: true, message: 'You have been successfully added to our waitlist!' };
  34 |       await route.fulfill({ json });
  35 |     });
  36 | 
  37 |     // Open Modal
  38 |     await page.getByRole('button', { name: /Join Waitlist/i }).first().click();
  39 | 
  40 |     const emailInput = page.getByPlaceholder(/Enter your email address/i).first();
  41 |     await emailInput.fill(`test-user-${Date.now()}@example.com`);
  42 |     
  43 |     const submitBtn = page.locator('form').getByRole('button', { name: /Join Waitlist/i });
  44 |     await submitBtn.click();
  45 |     
  46 |     // Expect success UI state
> 47 |     await expect(page.getByText(/You have been successfully added/i)).toBeVisible();
     |                                                                       ^ Error: expect(locator).toBeVisible() failed
  48 |   });
  49 | });
  50 | 
```