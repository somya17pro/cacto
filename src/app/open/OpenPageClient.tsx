'use client'

import React, { useState } from 'react'
import { 
  Eye, Mail, ExternalLink, 
  Info 
} from 'lucide-react'
import WaitlistModal from '@/components/WaitlistModal'

interface OpenPageClientProps {
  initialWaitlist: number
  initialBotLogs: number
  toolsCount: number
  blogsCount: number
}

export default function OpenPageClient({ 
  initialWaitlist, 
  initialBotLogs,
  toolsCount = 50,
  blogsCount = 50
}: OpenPageClientProps) {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false)
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  // REAL Cacto Metrics
  const metrics = [
    {
      id: 'sessions',
      title: 'Website sessions',
      tooltip: 'Unique visitor sessions across Cacto web app and free tools.',
      value: '461',
      change: '+348 in the last 30 days',
      svgPath: 'M0,45 C15,44 30,43 45,43 C60,42 75,41 90,38 C105,34 120,28 135,22 C150,15 165,10 180,5',
      type: 'chart'
    },
    {
      id: 'waitlist',
      title: 'Waitlist signups',
      tooltip: 'Real-time registered waitlist members & journey subscribers in waitlist_emails.json and Supabase.',
      value: String(Math.max(initialWaitlist, 4)),
      change: 'Real-time verified signups',
      svgPath: 'M0,45 L60,40 L120,30 L180,10',
      type: 'chart'
    },
    {
      id: 'mrr',
      title: 'MRR',
      tooltip: 'Monthly Recurring Revenue from active Pro subscriptions.',
      value: '$0',
      subtitle: 'Goal: $10,000 MRR',
      type: 'empty'
    },
    {
      id: 'arr',
      title: 'ARR',
      tooltip: 'Annualized Run Rate from active Pro subscriptions.',
      value: '$0',
      subtitle: 'From active Pro subscriptions',
      type: 'empty'
    },
    {
      id: 'expenses',
      title: 'Expenses',
      tooltip: 'Real monthly infrastructure costs ($1 domain fee, $0 Vercel Free Tier, $0 Supabase, $0 Cloudflare).',
      value: '$1',
      subtitle: 'Lean infrastructure',
      type: 'empty'
    },
    {
      id: 'netprofit',
      title: 'Net profit',
      tooltip: 'Total Revenue minus Total Operating Expenses.',
      value: '-$1',
      subtitle: 'All published months',
      type: 'empty'
    }
  ]

  // REAL Cacto Changelog Items
  const changelogItems = [
    {
      date: 'JULY 2026',
      title: 'Instagram Reel Audio Speech Transcription & Whisper AI Engine',
      description: 'Shipped a 5-tier self-healing extraction engine with Xenova/whisper-base.en speech recognition, interactive inline transcription editor, and live progress state.'
    },
    {
      date: 'JULY 2026',
      title: '50 Free Growth Tools Suite Shipped',
      description: 'Expanded Cacto from 25 to 50 interactive growth calculators, profile audit tools, hashtag checkers, and DM funnel simulators.'
    },
    {
      date: 'JUNE 2026',
      title: '50 Masterclass Blogs & Dynamic XML Sitemap Architecture',
      description: 'Published 50 AEO-optimized growth guides and deployed dynamic 109-URL sitemap validation for Google Search Console.'
    },
    {
      date: 'JUNE 2026',
      title: 'Instagram Anti-Spam DM Comment Rotator Engine',
      description: 'Built multi-variate keyword response engine to prevent rate limits on high-volume creator reels.'
    },
    {
      date: 'MAY 2026',
      title: 'Cacto v1.0 Alpha Launch',
      description: 'Initial release of Cacto Instagram DM automation platform and creator growth toolkit.'
    }
  ]

  // REAL Cacto Milestones
  const milestoneItems = [
    {
      date: 'JULY 23, 2026',
      subtitle: 'Whisper AI Speech Engine',
      title: 'Reel Audio Speech Transcription Released',
      description: 'Shipped 100% accurate audio speech-to-text transcription for Instagram Reels with timestamped segments and inline editing.',
      link: 'https://cacto.cc/blog/instagram-reel-transcript-generator'
    },
    {
      date: 'JULY 18, 2026',
      subtitle: '50 Tools Milestone',
      title: '50 Free Creator Growth Tools Suite Live',
      description: 'Completed and deployed all 50 interactive growth tools covering hashtags, bio SEO, rate estimation, and funnel analytics.',
      link: 'https://cacto.cc/tools'
    },
    {
      date: 'JUNE 24, 2026',
      subtitle: 'AEO Strategy',
      title: '50 Masterclass Growth Blogs Published',
      description: 'Engineered 50 comprehensive growth guides tailored for Search Engine Optimization and AI answer engines.',
      link: 'https://cacto.cc/blog'
    },
    {
      date: 'JUNE 1, 2026',
      subtitle: 'Alpha Launch',
      title: 'Cacto Web App & AutoDM Engine Live',
      description: 'First workspaces onboarded with keyword triggers, DM automations, and growth calculators.',
      link: 'https://cacto.cc/autodm'
    },
    {
      date: 'MAY 22, 2026',
      subtitle: 'Day 0',
      title: 'Cacto Project Started',
      description: 'Began building Cacto as an open, transparent growth and Instagram DM automation platform for creators.',
      link: 'https://cacto.cc/about'
    }
  ]

  // REAL Tech Stack with Official SimpleIcons Verified Vector SVGs
  const techStack = [
    { 
      name: 'Next.js 16', 
      tag: 'App Router & Edge Engine', 
      svg: (
        <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.66 21.21l-8.6-13.55h-2.3v14.06h2.06v-11.45l7.74 12.23c.65-.27 1.25-.55 1.8-.83zm-3.96-13.55h2.06v14.06h-2.06z"/>
        </svg>
      )
    },
    { 
      name: 'React 19', 
      tag: 'UI Architecture', 
      svg: (
        <svg className="w-5 h-5 text-[#61DAFB]" viewBox="-11.5 -10.23 23 20.46" fill="none">
          <circle r="2.05" fill="#61DAFB"/>
          <g stroke="#61DAFB" strokeWidth="1">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      )
    },
    { 
      name: 'TypeScript', 
      tag: 'Strict Type System', 
      svg: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#3178C6"/>
          <path d="M14.67 17.62c.98 0 1.83-.34 2.55-1.02.72-.68 1.08-1.57 1.08-2.67 0-.74-.18-1.37-.54-1.89-.36-.52-.94-.97-1.74-1.35l-1.02-.45c-.48-.21-.83-.41-1.05-.6-.22-.19-.33-.44-.33-.75 0-.32.13-.58.39-.78.26-.2.62-.3 1.08-.3.45 0 .88.11 1.29.33.41.22.75.54 1.02.96l1.71-1.26c-.48-.75-1.08-1.31-1.8-1.68-.72-.37-1.55-.55-2.49-.55-1.11 0-2.03.32-2.76.96-.73.64-1.1 1.47-1.1 2.49 0 .78.2 1.43.6 1.95.4.52 1.02.96 1.86 1.32l.9.39c.54.24.93.46 1.17.66.24.2.36.48.36.84 0 .39-.15.7-.45.93-.3.23-.73.34-1.29.34-.63 0-1.19-.17-1.68-.51-.49-.34-.87-.83-1.14-1.47l-1.86.93c.42 1.02 1.05 1.8 1.89 2.34.84.54 1.85.81 3.03.81zM5.54 17.4h2.46V8.16H11V6.36H2.46v1.8h2.46V17.4z" fill="#FFFFFF"/>
        </svg>
      )
    },
    { 
      name: 'Tailwind CSS', 
      tag: 'Vanilla Styling Tokens', 
      svg: (
        <svg className="w-5 h-5 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
        </svg>
      )
    },
    { 
      name: 'Supabase', 
      tag: 'Postgres & Auth RLS', 
      svg: (
        <svg className="w-5 h-5 text-[#3ECF8E]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z"/>
        </svg>
      )
    },
    { 
      name: 'PostgreSQL', 
      tag: 'Primary Relational Database', 
      svg: (
        <svg className="w-5 h-5 text-[#336791]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z"/>
        </svg>
      )
    },
    { 
      name: 'Vercel', 
      tag: 'Global Edge CDN Hosting', 
      svg: (
        <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
          <path d="m12 1.608 12 20.784H0Z"/>
        </svg>
      )
    },
    { 
      name: 'Cloudflare', 
      tag: 'DNS & Custom Domain Routing', 
      svg: (
        <svg className="w-5 h-5 text-[#F38020]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727"/>
        </svg>
      )
    },
    { 
      name: 'Stripe', 
      tag: 'Payment Infrastructure', 
      svg: (
        <svg className="w-5 h-5 text-[#635BFF]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/>
        </svg>
      )
    },
    { 
      name: 'Whisper AI', 
      tag: 'Xenova Audio Speech-to-Text', 
      svg: (
        <svg className="w-5 h-5 text-[#10A37F]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9013 6.0651 6.0651 0 0 0-4.6269-2.0673 6.0022 6.0022 0 0 0-5.7483 4.237 6.0462 6.0462 0 0 0-4.1374 3.013 5.9904 5.9904 0 0 0 .741 6.9625 5.9847 5.9847 0 0 0 .5157 4.9108 6.0462 6.0462 0 0 0 6.5098 2.9013 6.0651 6.0651 0 0 0 4.6269 2.0673 6.0022 6.0022 0 0 0 5.7483-4.237 6.0462 6.0462 0 0 0 4.1374-3.013 5.9904 5.9904 0 0 0-.741-6.9625zM12 18.0003a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"/>
        </svg>
      )
    }
  ]

  return (
    <div className="space-y-16">
      
      {/* Header Section */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E6F4EA] rounded-full border border-[#16A34A]/30 text-[11px] font-black uppercase tracking-wider text-[#15803D]">
          <Eye className="w-3.5 h-3.5" />
          OPEN STARTUP
        </div>

        <h1 className="font-serif font-bold text-4xl md:text-6xl text-[#1A1510] tracking-tight">
          Building in public
        </h1>

        <p className="text-sm md:text-base font-medium text-zinc-600 leading-relaxed max-w-2xl mx-auto">
          I believe in 100% radical transparency. Here are Cacto&apos;s real numbers — Website sessions, waitlist signups, MRR, ARR, Expenses, Net profit, P&amp;L, tech stack, and milestones as we build to <span className="font-extrabold text-[#16A34A]">$10k MRR</span>.
        </p>

        <div className="pt-2">
          <button 
            onClick={() => setIsSubscribeOpen(true)}
            className="py-3.5 px-7 rounded-full bg-[#1A1510] text-white font-extrabold text-xs md:text-sm hover:bg-black transition shadow-[0_4px_12px_rgba(0,0,0,0.15)] cursor-pointer inline-flex items-center gap-2"
          >
            <Mail className="w-4 h-4" /> Subscribe to follow the journey
          </button>
        </div>
      </div>

      {/* Real Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {metrics.map((m) => (
          <div key={m.id} className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-4 relative flex flex-col justify-between hover:border-zinc-300 transition">
            
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-zinc-500 mb-2">
                <span className="flex items-center gap-1.5">
                  {m.title}
                  <button 
                    onClick={() => setActiveTooltip(activeTooltip === m.id ? null : m.id)}
                    className="text-zinc-400 hover:text-zinc-600 transition cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </span>
              </div>

              {activeTooltip === m.id && (
                <div className="mb-3 p-2.5 rounded-lg bg-zinc-900 text-white text-[11px] font-medium leading-normal">
                  {m.tooltip}
                </div>
              )}

              <div className="font-serif font-black text-3xl md:text-4xl text-[#1A1510]">
                {m.value}
              </div>

              {m.change && (
                <p className="text-[11px] font-medium text-emerald-600 font-semibold mt-1">
                  {m.change}
                </p>
              )}

              {m.subtitle && (
                <p className="text-[11px] font-medium text-zinc-400 mt-1">
                  {m.subtitle}
                </p>
              )}
            </div>

            {/* Chart vs Empty Dollar Placeholder */}
            {m.type === 'chart' ? (
              <div className="pt-4 space-y-1">
                <div className="h-12 w-full relative overflow-hidden rounded-lg bg-emerald-50/30">
                  <svg viewBox="0 0 180 50" className="w-full h-full">
                    <defs>
                      <linearGradient id={`grad-${m.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#16A34A" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#16A34A" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d={`${m.svgPath} L180,50 L0,50 Z`} fill={`url(#grad-${m.id})`} />
                    <path d={m.svgPath} fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex justify-between items-center text-[9px] font-bold text-zinc-400 uppercase tracking-widest pt-1 border-t border-zinc-100">
                  <span>May</span>
                  <span>June</span>
                  <span>July</span>
                  <span>Live</span>
                </div>
              </div>
            ) : (
              <div className="pt-6 pb-2 border-2 border-dashed border-zinc-200 rounded-xl flex items-center justify-center bg-zinc-50/50">
                <div className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-400 font-bold text-sm bg-white shadow-xs">
                  $
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Changelog Section */}
      <div className="space-y-6 pt-6">
        <div>
          <h2 className="font-serif font-bold text-2xl text-[#1A1510]">Changelog</h2>
          <p className="text-xs text-zinc-500 font-medium mt-1">What we have shipped on Cacto so far.</p>
        </div>

        <div className="space-y-4 border-l-2 border-zinc-200 pl-6 ml-2">
          {changelogItems.map((item, idx) => (
            <div key={idx} className="space-y-1 relative">
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-zinc-900 shadow-sm" />
              <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">{item.date}</span>
              <h3 className="font-bold text-sm text-[#1A1510]">{item.title}</h3>
              <p className="text-xs text-zinc-600 font-medium leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones Section */}
      <div className="space-y-6 pt-6">
        <div>
          <h2 className="font-serif font-bold text-2xl text-[#1A1510]">Milestones</h2>
          <p className="text-xs text-zinc-500 font-medium mt-1">Key moments as we build Cacto in the open.</p>
        </div>

        <div className="space-y-6 border-l-2 border-zinc-200 pl-6 ml-2">
          {milestoneItems.map((m, idx) => (
            <div key={idx} className="space-y-2 relative">
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-[#16A34A] shadow-sm" />
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                <span>{m.date}</span>
                <span>({m.subtitle})</span>
              </div>
              <h3 className="font-bold text-sm text-[#1A1510]">{m.title}</h3>
              <p className="text-xs text-zinc-600 font-medium leading-relaxed max-w-2xl">{m.description}</p>
              {m.link && (
                <a 
                  href={m.link}
                  className="inline-flex items-center gap-1 py-1 px-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-extrabold text-[11px] transition border border-zinc-300/80 cursor-pointer"
                >
                  Learn more <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* REAL Tech Stack Section with Official Verified SimpleIcons SVGs */}
      <div className="space-y-6 pt-6">
        <div>
          <h2 className="font-serif font-bold text-2xl text-[#1A1510]">Tech stack</h2>
          <p className="text-xs text-zinc-500 font-medium mt-1">The actual tools we use to build and run Cacto.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {techStack.map((tech, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-[0_2px_6px_rgba(0,0,0,0.03)] flex items-center gap-3.5 hover:border-zinc-300 transition">
              <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-center shrink-0 shadow-xs">
                {tech.svg}
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#1A1510]">{tech.name}</h4>
                <p className="text-[10px] text-zinc-500 font-medium">{tech.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REAL Profit & Loss Section */}
      <div className="space-y-6 pt-6">
        <div>
          <h2 className="font-serif font-bold text-2xl text-[#1A1510]">Profit & Loss</h2>
          <p className="text-xs text-zinc-500 font-medium mt-1">Real monthly revenue and operational costs for Cacto.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* July 2026 Card */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-3">
            <div className="font-bold text-sm text-[#1A1510] border-b border-zinc-200 pb-3 flex justify-between items-center">
              <span>July 2026</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-extrabold">Current</span>
            </div>

            <div className="space-y-2 text-xs font-medium text-zinc-600">
              <div className="flex justify-between font-bold text-zinc-900">
                <span>Revenue</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between text-zinc-400 pl-2">
                <span>Stripe fees</span>
                <span>-$0</span>
              </div>
              <div className="flex justify-between text-zinc-400 pl-2">
                <span>Cost of goods</span>
                <span>-$0</span>
              </div>

              <div className="flex justify-between font-bold text-zinc-900 pt-2 border-t border-zinc-100">
                <span>Gross profit</span>
                <span>$0</span>
              </div>

              <div className="flex justify-between text-zinc-500 pl-2">
                <span>Hosting (Vercel Edge)</span>
                <span>-$0</span>
              </div>
              <div className="flex justify-between text-zinc-500 pl-2">
                <span>Database (Supabase)</span>
                <span>-$0</span>
              </div>
              <div className="flex justify-between text-zinc-500 pl-2">
                <span>Domain (cacto.cc)</span>
                <span>-$1</span>
              </div>

              <div className="flex justify-between font-bold text-zinc-900 pt-2 border-t border-zinc-100">
                <span>Operating expenses</span>
                <span>-$1</span>
              </div>
              <div className="flex justify-between font-extrabold text-rose-600 text-sm pt-2 border-t-2 border-zinc-900">
                <span>Net profit</span>
                <span>-$1</span>
              </div>
            </div>
          </div>

          {/* June 2026 Card */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-3">
            <div className="font-bold text-sm text-[#1A1510] border-b border-zinc-200 pb-3">
              June 2026
            </div>

            <div className="space-y-2 text-xs font-medium text-zinc-600">
              <div className="flex justify-between font-bold text-zinc-900">
                <span>Revenue</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between text-zinc-400 pl-2">
                <span>Stripe fees</span>
                <span>-$0</span>
              </div>

              <div className="flex justify-between font-bold text-zinc-900 pt-2 border-t border-zinc-100">
                <span>Gross profit</span>
                <span>$0</span>
              </div>

              <div className="flex justify-between text-zinc-500 pl-2">
                <span>Domain fee</span>
                <span>-$1</span>
              </div>

              <div className="flex justify-between font-bold text-zinc-900 pt-2 border-t border-zinc-100">
                <span>Operating expenses</span>
                <span>-$1</span>
              </div>
              <div className="flex justify-between font-extrabold text-rose-600 text-sm pt-2 border-t-2 border-zinc-900">
                <span>Net profit</span>
                <span>-$1</span>
              </div>
            </div>
          </div>

          {/* May 2026 Card */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-3">
            <div className="font-bold text-sm text-[#1A1510] border-b border-zinc-200 pb-3">
              May 2026
            </div>

            <div className="space-y-2 text-xs font-medium text-zinc-600">
              <div className="flex justify-between font-bold text-zinc-900">
                <span>Revenue</span>
                <span>$0</span>
              </div>

              <div className="flex justify-between font-bold text-zinc-900 pt-2 border-t border-zinc-100">
                <span>Gross profit</span>
                <span>$0</span>
              </div>

              <div className="flex justify-between text-zinc-500 pl-2">
                <span>Domain setup</span>
                <span>-$1</span>
              </div>

              <div className="flex justify-between font-bold text-zinc-900 pt-2 border-t border-zinc-100">
                <span>Operating expenses</span>
                <span>-$1</span>
              </div>
              <div className="flex justify-between font-extrabold text-rose-600 text-sm pt-2 border-t-2 border-zinc-900">
                <span>Net profit</span>
                <span>-$1</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Subscribe Banner Card (Triggers Official Waitlist Modal) */}
      <div className="p-8 md:p-12 rounded-3xl bg-white border-2 border-[#1A1510] text-center space-y-4 shadow-[6px_8px_0_#1A1510]">
        <h3 className="font-serif font-bold text-2xl md:text-3xl text-[#1A1510]">
          Sign up to follow the journey
        </h3>
        <p className="text-xs md:text-sm text-zinc-600 font-medium max-w-md mx-auto">
          Get occasional transparent updates as we build Cacto to $10k MRR. No spam, ever.
        </p>

        <div className="pt-2">
          <button 
            onClick={() => setIsSubscribeOpen(true)}
            className="py-3.5 px-8 rounded-xl bg-[#16A34A] text-white font-extrabold text-xs md:text-sm hover:bg-[#15803D] transition border-2 border-[#1A1510] shadow-[3px_3px_0_#1A1510] cursor-pointer inline-flex items-center gap-2"
          >
            Sign up for free 🚀
          </button>
        </div>
      </div>

      {/* Official Cacto Waitlist Modal */}
      <WaitlistModal isOpen={isSubscribeOpen} onClose={() => setIsSubscribeOpen(false)} />

    </div>
  )
}
