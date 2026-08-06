import { test, expect } from '@playwright/test'

test.describe('Waitlist Database & Persistence Suite', () => {
  test('POST /api/waitlist saves email and GET /api/waitlist returns it', async ({ request }) => {
    const testEmail = `qa_test_${Date.now()}@example.com`

    // 1. Submit waitlist POST
    const postRes = await request.post('/api/waitlist', {
      data: {
        email: testEmail,
        source: 'QA-Audit-Test'
      }
    })

    expect(postRes.status()).toBe(200)
    const postJson = await postRes.json()
    expect(postJson.success).toBe(true)
    expect(postJson.email).toBe(testEmail)

    // 2. Fetch waitlist GET
    const getRes = await request.get('/api/waitlist')
    expect(getRes.status()).toBe(200)
    const getJson = await getRes.json()
    expect(getJson.success).toBe(true)
    expect(getJson.count).toBeGreaterThan(0)
    expect(getJson.waitlist.some((item: any) => item.email === testEmail)).toBe(true)
  })
})
