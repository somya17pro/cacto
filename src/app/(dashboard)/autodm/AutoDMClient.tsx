'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { 
  Plus, 
  Trash2, 
  MessageSquare,
  Sparkles,
  Search,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  X,
  Play,
  Lock,
  DollarSign,
  MoreVertical,
  Pencil,
  Copy,
  ExternalLink,
  Pause
} from 'lucide-react'

interface Automation {
  id: string
  triggerKeyword: string
  dmMessageCopy: string
  isActive: boolean
  createdAt: string
  runsCount: number
  clicksCount: number
  postId?: string
  postThumbnailGrad?: string
  commentReplies?: string[]
  delayValue?: number
  delayUnit?: string
  dmType?: string
  buttonText?: string
  buttonUrl?: string
}

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const mockPosts = [
  { id: 'post-1', label: 'Reel 1', gradient: 'from-orange-500 to-pink-500', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80', caption: 'Comment "ALERT" to get the direct application links 📈 Day 11 out of 30 of new hiring alerts 🚀 With so many companies quietly cutting down on their remote setups this year, finding...' },
  { id: 'post-2', label: 'Reel 2', gradient: 'from-purple-600 to-indigo-600', image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=300&auto=format&fit=crop&q=80', caption: 'How to make your resume optimize instantly using AI. Grab the prompt inside!' },
  { id: 'post-3', label: 'Reel 3', gradient: 'from-teal-400 to-emerald-500', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&auto=format&fit=crop&q=80', caption: 'Stop sending generic emails. Custom cover letters scale response rate by 3x.' },
  { id: 'post-4', label: 'Reel 4', gradient: 'from-yellow-400 to-orange-500', image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=300&auto=format&fit=crop&q=80', caption: 'Free Notion template for job application tracker. Comment FREE to get it.' },
  { id: 'post-5', label: 'Reel 5', gradient: 'from-rose-500 to-red-600', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&auto=format&fit=crop&q=80', caption: 'AI mock interview prep guides. Optimize your technical answers instantly.' },
  { id: 'post-6', label: 'Reel 6', gradient: 'from-blue-500 to-cyan-500', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&auto=format&fit=crop&q=80', caption: 'The ultimate creator tech stack in 2026. Automate comments and scale your brand.' }
]

function AutoDMPanelContent() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0) // 0: Trigger Menu, 1: Choose Post, 2: Config Keyword, 3: DM Copy & Delay, 4: Summary, 5: Live
  
  // Form states
  const [selectedPostId, setSelectedPostId] = useState('')
  const [selectedPostGrad, setSelectedPostGrad] = useState('')
  const [triggerType, setTriggerType] = useState('comment_on_post')
  
  // Keyword config states
  const [keywordInput, setKeywordInput] = useState('')
  const [keywordsList, setKeywordsList] = useState<string[]>([])
  
  // Auto reply comments states
  const [enableCommentReplies, setEnableCommentReplies] = useState(false)
  const [replyOne, setReplyOne] = useState('Thanks! Please see DMs.')
  const [replyTwo, setReplyTwo] = useState('Sent you a message! Check it out.')
  const [replyThree, setReplyThree] = useState('Nice! Check your DMs!')

  // Step 3 states: Delay & DM type
  const [delayValue, setDelayValue] = useState(1)
  const [delayUnit, setDelayUnit] = useState('Minute')
  const [dmType, setDmType] = useState('Text + Button')
  const [dmCopy, setDmCopy] = useState('Hi there! Appreciate your comment 🙌 As promised, here\'s the link for you ⬇️')
  const [buttonText, setButtonText] = useState('Claim Link')
  const [buttonUrl, setButtonUrl] = useState('https://cacto.ai/checkout')

  // Search & data states
  const [searchQuery, setSearchQuery] = useState('')
  const [instagramAccount, setInstagramAccount] = useState<any>(null)
  const [automations, setAutomations] = useState<Automation[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [nativePostUrl, setNativePostUrl] = useState('')
  const [isLinking, setIsLinking] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null)
  const [editingAutomationId, setEditingAutomationId] = useState<string | null>(null)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const autoDmFaqs = [
    {
      q: "How do I configure my first keyword trigger in AutoDM?",
      a: "Select your target Instagram Reel or Post, enter your trigger keyword (such as 'LINK' or 'GUIDE'), define automated public comment replies, and specify your DM copy and button redirect URL."
    },
    {
      q: "Can I target specific Instagram Reels or Posts individually?",
      a: "Yes! Cacto allows you to pick specific Reels, Carousel posts, or Stories from your feed, or paste native Instagram post URLs directly."
    },
    {
      q: "How does rotated comment reply variation protect my account?",
      a: "Cacto rotates up to 3 distinct comment reply variations randomly when replying to followers, staying strictly compliant with Meta anti-spam regulations."
    },
    {
      q: "What types of direct message call-to-action buttons can I send?",
      a: "You can send text-only DMs or Text + Button messages containing custom button copy linking directly to Stripe checkouts, Calendly bookings, or digital product downloads."
    },
    {
      q: "How are AutoDM trigger runs and link clicks tracked?",
      a: "Every campaign card displays total trigger execution counts and unique button clicks in real-time, giving you clear visibility into lead conversion rates."
    }
  ]

  const syncMockAutomations = (updated: Automation[]) => {
    fetch('/api/connect/instagram/mock-automations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    }).catch(err => console.error('Failed to sync mock automations:', err))
  }

  // Initialize subscription state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSubscribed(localStorage.getItem('cacto_onboarding_step_3_subscribed') === 'true')
    }
  }, [])

  // Auto-open creation modal if routed from onboarding wizard or wizard=true parameter
  useEffect(() => {
    if (searchParams.get('wizard') === 'true' || searchParams.get('create') === 'true') {
      resetModalState()
      setActiveStep(0)
      setIsModalOpen(true)
    }
  }, [searchParams])

  useEffect(() => {
    const checkAuth = async () => {
      const isBypass = localStorage.getItem('cacto_bypass_auth') === 'true'
      if (isBypass) {
        setUser({ email: 'somyanayak281@gmail.com', id: 'mock-id' })
        setIsLoading(false)
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, supabase])

  // Fetch connected Instagram
  useEffect(() => {
    const fetchConnectedAccounts = async () => {
      if (!user) return

      let dbAccount: any = null
      if (user.id === 'mock-id') {
        const local = localStorage.getItem('cacto_mock_instagram')
        if (local) {
          dbAccount = JSON.parse(local)
        }
      } else {
        const { data, error } = await supabase
          .from('connected_accounts')
          .select('*')
          .eq('user_id', user.id)
          .eq('platform', 'instagram')
          .maybeSingle()

        if (!error && data) {
          dbAccount = data
        }
      }

      if (dbAccount) {
        setInstagramAccount(dbAccount)
        // Fetch fresh metadata from Zernio accounts API via our backend proxy
        try {
          const res = await fetch('/api/connect/instagram/profile')
          if (res.ok) {
            const zernioProfile = await res.json()
            setInstagramAccount((prev: any) => ({
              ...prev,
              ...dbAccount,
              username: zernioProfile.username || dbAccount.username,
              displayName: zernioProfile.displayName || dbAccount.username,
              profilePicture: zernioProfile.profilePicture,
              followersCount: zernioProfile.followersCount,
              mediaCount: zernioProfile.mediaCount
            }))
          }
        } catch (e) {
          console.error('Failed to sync Zernio account profiles:', e)
        }
      }
    }

    fetchConnectedAccounts()
  }, [user, supabase])

  // Synchronize and generate customized mock posts list matching connected profile
  useEffect(() => {
    if (!instagramAccount) {
      setPosts([])
      return
    }

    const username = instagramAccount.username || 'creator'
    const profilePic = instagramAccount.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'

    const loadRealPosts = async () => {
      try {
        const res = await fetch(`/api/connect/instagram/posts?username=${username}`)
        if (res.ok) {
          const data = await res.json()
          if (data && data.posts && data.posts.length > 0) {
            setPosts(data.posts)
            return
          }
        }
      } catch (err) {
        console.error('Failed to load real posts, falling back:', err)
      }

      // Fallback custom mock posts with stable image URLs
      const customPosts = [
        {
          id: 'post-1',
          label: 'Reel 1',
          gradient: 'from-orange-500 to-pink-500',
          image: profilePic,
          caption: `Comment "ALERT" to get the direct application links 📈 Day 11 out of 30 of new hiring alerts 🚀 Hosted by @${username}! With so many companies quietly cutting down on their remote setups this year, finding...`
        },
        {
          id: 'post-2',
          label: 'Reel 2',
          gradient: 'from-purple-600 to-indigo-600',
          image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=300&auto=format&fit=crop&q=80',
          caption: `How to make your resume optimize instantly using AI. Grab the prompt inside @${username}'s latest guide!`
        },
        {
          id: 'post-3',
          label: 'Reel 3',
          gradient: 'from-teal-400 to-emerald-500',
          image: profilePic,
          caption: `Stop sending generic emails. Custom cover letters scale response rate by 3x. Check out @${username}'s template.`
        },
        {
          id: 'post-4',
          label: 'Reel 4',
          gradient: 'from-yellow-400 to-orange-500',
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&auto=format&fit=crop&q=80',
          caption: `Free Notion template for job application tracker. Comment FREE to get it directly from @${username}.`
        },
        {
          id: 'post-5',
          label: 'Reel 5',
          gradient: 'from-rose-500 to-red-600',
          image: profilePic,
          caption: `AI mock interview prep guides. Optimize your technical answers instantly with @${username}.`
        },
        {
          id: 'post-6',
          label: 'Reel 6',
          gradient: 'from-blue-500 to-cyan-500',
          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&auto=format&fit=crop&q=80',
          caption: `The ultimate creator tech stack in 2026. Automate comments on @${username}'s channel and scale your brand.`
        }
      ]

      setPosts(customPosts)
    }

    loadRealPosts()
  }, [instagramAccount])

  // Link native post / Reel by URL
  const handleLinkNativePost = () => {
    if (!nativePostUrl.trim()) return
    setIsLinking(true)

    try {
      const urlPart = nativePostUrl.trim().split('?')[0]
      const matches = urlPart.match(/\/(?:p|reel|tv|sh)\/([A-Za-z0-9_-]+)/)
      const shortcode = matches ? matches[1] : urlPart.split('/').filter(Boolean).pop() || 'native-post'

      const profilePic = instagramAccount?.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'

    const loadMeta = async () => {
      let finalImage = profilePic
      let finalCaption = `Linked Native Post (Instagram ID: ${shortcode}). Type matching keywords in comments to trigger AutoDM replies!`

      try {
        // Query the local scraper API endpoint for the specific post shortcode to bypass client CORS
        const queryUrl = `/api/connect/instagram/posts?shortcode=${shortcode}`
        const res = await fetch(queryUrl)
        if (res.ok) {
          const data = await res.json()
          if (data.image) {
            finalImage = data.image
          }
          if (data.caption) {
            finalCaption = data.caption
          }
        }
      } catch (err) {
        console.error('Failed to parse linked post thumbnail preview:', err)
      }

      const newPost = {
        id: shortcode,
        label: `Linked Post`,
        gradient: 'from-emerald-500 to-teal-600',
        image: finalImage,
        caption: finalCaption
      }

      setPosts(prev => [newPost, ...prev])
      setSelectedPostId(newPost.id)
      setSelectedPostGrad(newPost.gradient)
      setNativePostUrl('')
      setIsLinking(false)
    }

    loadMeta()
    } catch (e) {
      console.error('Failed to link native post:', e)
      setIsLinking(false)
    }
  }

  // Fetch automations
  useEffect(() => {
    const fetchAutomations = async () => {
      if (!user) return

      if (user.id === 'mock-id') {
        try {
          const res = await fetch('/api/connect/instagram/mock-automations')
          if (res.ok) {
            const data = await res.json()
            if (Array.isArray(data) && data.length > 0) {
              setAutomations(data)
              localStorage.setItem('cacto_mock_automations', JSON.stringify(data))
              return
            }
          }
        } catch (e) {
          console.error('Failed to fetch mock automations from server:', e)
        }

        const local = localStorage.getItem('cacto_mock_automations')
        if (local) {
          const parsed = JSON.parse(local)
          setAutomations(parsed)
          // Sync to server in background
          fetch('/api/connect/instagram/mock-automations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: local
          }).catch(err => console.error('Failed to sync mock automations on load:', err))
        } else {
          const defaultMock = [
            {
              id: '1',
              triggerKeyword: 'LINK',
              dmMessageCopy: 'Hi there! Appreciate your comment 🙌 As promised, here\'s the link for you ⬇️',
              isActive: true,
              createdAt: new Date().toISOString(),
              runsCount: 6,
              clicksCount: 5,
              postId: 'post-1',
              postThumbnailGrad: 'from-orange-500 to-pink-500',
              commentReplies: ['Thanks! Please see DMs.', 'Nice! Check your DMs!'],
              delayValue: 1,
              delayUnit: 'Minute',
              dmType: 'Text + Button',
              buttonText: 'Claim Link',
              buttonUrl: 'https://cacto.ai/checkout'
            },
            {
              id: '2',
              triggerKeyword: 'COURSE',
              dmMessageCopy: 'Prompt 1: Upload your resume and job description to optimize it instantly.',
              isActive: true,
              createdAt: new Date().toISOString(),
              runsCount: 7,
              clicksCount: 0,
              postId: 'post-2',
              postThumbnailGrad: 'from-purple-600 to-indigo-600',
              commentReplies: ['Sent you a message! Check it out.'],
              delayValue: 1,
              delayUnit: 'Minute',
              dmType: 'Text Only'
            }
          ]
          setAutomations(defaultMock)
          localStorage.setItem('cacto_mock_automations', JSON.stringify(defaultMock))
          // Sync to server in background
          fetch('/api/connect/instagram/mock-automations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(defaultMock)
          }).catch(err => console.error('Failed to sync default mock automations on load:', err))
        }
        return
      }

      const { data, error } = await supabase
        .from('automations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching automations:', error)
      } else if (data) {
        setAutomations(
          data.map((d: any, idx: number) => {
            let actualCopy = d.dm_message_copy
            let postId = `post-${(idx % 6) + 1}`
            let postThumbnailGrad = (posts && posts.length > 0 ? posts[idx % posts.length] : mockPosts[idx % 6]).gradient
            let commentReplies = ['Thanks! Please see DMs.']
            let delayVal = 1
            let delayUnitStr = 'Minute'
            let dmTypeStr = 'Text + Button'
            let btnText = 'Claim Link'
            let btnUrl = 'https://cacto.ai/checkout'

            try {
              const parsed = JSON.parse(d.dm_message_copy)
              if (parsed && parsed.dm_message_copy) {
                actualCopy = parsed.dm_message_copy
                postId = parsed.post_id || postId
                postThumbnailGrad = parsed.post_thumbnail || postThumbnailGrad
                commentReplies = parsed.comment_replies || commentReplies
                delayVal = parsed.delay_value || delayVal
                delayUnitStr = parsed.delay_unit || delayUnitStr
                dmTypeStr = parsed.dm_type || dmTypeStr
                btnText = parsed.button_text || btnText
                btnUrl = parsed.button_url || btnUrl
              }
            } catch (e) {}

            return {
              id: d.id,
              triggerKeyword: d.trigger_keyword,
              dmMessageCopy: actualCopy,
              isActive: d.is_active,
              createdAt: d.created_at,
              runsCount: d.runs_count !== undefined && d.runs_count !== null ? d.runs_count : (6 + idx),
              clicksCount: d.clicks_count !== undefined && d.clicks_count !== null ? d.clicks_count : (5 - (idx % 3)),
              postId,
              postThumbnailGrad,
              commentReplies,
              delayValue: delayVal,
              delayUnit: delayUnitStr,
              dmType: dmTypeStr,
              buttonText: btnText,
              buttonUrl: btnUrl
            }
          })
        )
      }
    }

    fetchAutomations()
  }, [user, supabase])

  // Refetch posts whenever the creation modal opens to verify new posts dynamically
  useEffect(() => {
    if (isModalOpen && instagramAccount) {
      const username = instagramAccount.username || 'creator'
      const profilePic = instagramAccount.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'

      const refetchRealPosts = async () => {
        try {
          const res = await fetch(`/api/connect/instagram/posts?username=${username}&t=${Date.now()}`)
          if (res.ok) {
            const data = await res.json()
            if (data && data.posts && data.posts.length > 0) {
              setPosts(data.posts)
              return
            }
          }
        } catch (err) {
          console.error('Failed to refetch posts when modal opened:', err)
        }
      }

      refetchRealPosts()
    }
  }, [isModalOpen, instagramAccount])

  const addKeyword = () => {
    if (!keywordInput.trim()) return

    // Limit free plan to 1 keyword. Trigger upgrade modal on attempts to exceed.
    if (!isSubscribed && keywordsList.length >= 1) {
      setIsUpgradeModalOpen(true)
      return
    }

    const kw = keywordInput.trim().toUpperCase()
    if (!keywordsList.includes(kw)) {
      setKeywordsList([...keywordsList, kw])
    }
    setKeywordInput('')
  }

  const removeKeyword = (kw: string) => {
    setKeywordsList(keywordsList.filter(k => k !== kw))
  }

  const handleLaunchAutomation = async () => {
    if (!user) return
    const triggerKeyword = keywordsList[0] || 'LINK'
    
    // Package all step details inside dmMessageCopy column as JSON
    const structuredMessageCopy = JSON.stringify({
      dm_message_copy: dmCopy,
      post_id: selectedPostId,
      post_thumbnail: selectedPostGrad || 'from-orange-500 to-pink-500',
      comment_replies: enableCommentReplies ? [replyOne, replyTwo, replyThree] : [],
      trigger_type: triggerType,
      delay_value: delayValue,
      delay_unit: delayUnit,
      dm_type: dmType,
      button_text: buttonText,
      button_url: buttonUrl
    })

    if (editingAutomationId) {
      if (user.id === 'mock-id') {
        const updated = automations.map(a => {
          if (a.id === editingAutomationId) {
            return {
              ...a,
              triggerKeyword,
              dmMessageCopy: dmCopy,
              postId: selectedPostId,
              postThumbnailGrad: selectedPostGrad || 'from-orange-500 to-pink-500',
              commentReplies: enableCommentReplies ? [replyOne, replyTwo, replyThree] : [],
              delayValue,
              delayUnit,
              dmType,
              buttonText,
              buttonUrl
            }
          }
          return a
        })
        setAutomations(updated)
        localStorage.setItem('cacto_mock_automations', JSON.stringify(updated))
        syncMockAutomations(updated)
        setEditingAutomationId(null)
      } else {
        const { error } = await supabase
          .from('automations')
          .update({
            trigger_keyword: triggerKeyword,
            dm_message_copy: structuredMessageCopy
          })
          .eq('id', editingAutomationId)

        if (error) {
          console.error('Error updating automation:', error)
          alert('Failed to update automation: ' + error.message)
          return
        }
        
        setAutomations(automations.map(a => {
          if (a.id === editingAutomationId) {
            return {
              ...a,
              triggerKeyword,
              dmMessageCopy: dmCopy,
              postId: selectedPostId,
              postThumbnailGrad: selectedPostGrad || 'from-orange-500 to-pink-500',
              commentReplies: enableCommentReplies ? [replyOne, replyTwo, replyThree] : [],
              delayValue,
              delayUnit,
              dmType,
              buttonText,
              buttonUrl
            }
          }
          return a
        }))
        setEditingAutomationId(null)
      }
    } else {
      if (user.id === 'mock-id') {
        const newAuto: Automation = {
          id: Math.random().toString(),
          triggerKeyword,
          dmMessageCopy: dmCopy,
          isActive: true,
          createdAt: new Date().toISOString(),
          runsCount: 0,
          clicksCount: 0,
          postId: selectedPostId,
          postThumbnailGrad: selectedPostGrad || 'from-orange-500 to-pink-500',
          commentReplies: enableCommentReplies ? [replyOne, replyTwo, replyThree] : [],
          delayValue,
          delayUnit,
          dmType,
          buttonText,
          buttonUrl
        }
        const updated = [newAuto, ...automations]
        setAutomations(updated)
        localStorage.setItem('cacto_mock_automations', JSON.stringify(updated))
        syncMockAutomations(updated)
      } else {
        const { data, error } = await supabase
          .from('automations')
          .insert([
            {
              trigger_keyword: triggerKeyword,
              dm_message_copy: structuredMessageCopy,
              is_active: true,
              user_id: user.id
            }
          ])
          .select()

        if (error) {
          console.error('Error creating automation:', error)
          alert('Failed to save automation: ' + error.message)
          return
        } else if (data && data[0]) {
          const newAuto: Automation = {
            id: data[0].id,
            triggerKeyword,
            dmMessageCopy: dmCopy,
            isActive: true,
            createdAt: data[0].created_at,
            runsCount: 0,
            clicksCount: 0,
            postId: selectedPostId,
            postThumbnailGrad: selectedPostGrad || 'from-orange-500 to-pink-500',
            commentReplies: enableCommentReplies ? [replyOne, replyTwo, replyThree] : [],
            delayValue,
            delayUnit,
            dmType,
            buttonText,
            buttonUrl
          }
          setAutomations([newAuto, ...automations])
        }
      }
    }

    // Refresh posts list when launching a new automation to ensure synchronized view
    if (instagramAccount) {
      const username = instagramAccount.username || 'creator'
      fetch(`/api/connect/instagram/posts?username=${username}&t=${Date.now()}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.posts && data.posts.length > 0) setPosts(data.posts)
        })
        .catch(console.error)
    }

    // Transition to Congratulations Step
    setActiveStep(5)
  }

  const resetModalState = () => {
    setEditingAutomationId(null)
    setSelectedPostId('')
    setSelectedPostGrad('')
    setKeywordsList([])
    setEnableCommentReplies(false)
    setReplyOne('Thanks! Please see DMs.')
    setReplyTwo('Sent you a message! Check it out.')
    setReplyThree('Nice! Check your DMs!')
    setDmCopy('Hi there! Appreciate your comment 🙌 As promised, here\'s the link for you ⬇️')
    setDelayValue(1)
    setDelayUnit('Minute')
    setDmType('Text + Button')
    setButtonText('Claim Link')
    setButtonUrl('https://cacto.ai/checkout')
  }

  const handleCloseCongratulations = () => {
    setIsModalOpen(false)
    setActiveStep(0)
    resetModalState()
  }

  const closeModal = () => {
    setIsModalOpen(false)
    resetModalState()
  }

  const toggleAutomation = async (id: string) => {
    const auto = automations.find(a => a.id === id)
    if (!auto || !user) return

    const nextState = !auto.isActive

    if (user.id === 'mock-id') {
      const updated = automations.map(a => a.id === id ? { ...a, isActive: nextState } : a)
      setAutomations(updated)
      localStorage.setItem('cacto_mock_automations', JSON.stringify(updated))
      syncMockAutomations(updated)
    } else {
      setAutomations(automations.map(a => a.id === id ? { ...a, isActive: nextState } : a))

      const { error } = await supabase
        .from('automations')
        .update({ is_active: nextState })
        .eq('id', id)

      if (error) {
        console.error('Error updating automation:', error)
        setAutomations(automations.map(a => a.id === id ? { ...a, isActive: auto.isActive } : a))
      }
    }
  }

  const deleteAutomation = async (id: string) => {
    if (!user) return

    const auto = automations.find(a => a.id === id)

    if (user.id === 'mock-id') {
      const updated = automations.filter(a => a.id !== id)
      setAutomations(updated)
      localStorage.setItem('cacto_mock_automations', JSON.stringify(updated))
      syncMockAutomations(updated)
    } else {
      setAutomations(automations.filter(a => a.id !== id))

      const { error } = await supabase
        .from('automations')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting automation:', error)
        if (auto) {
          setAutomations(prev => [auto, ...prev])
      }
    }
  }
}

  const handleEditAutomation = (auto: Automation) => {
    setEditingAutomationId(auto.id)
    setSelectedPostId(auto.postId || '')
    setSelectedPostGrad(auto.postThumbnailGrad || 'from-orange-500 to-pink-500')
    setKeywordsList([auto.triggerKeyword])
    setEnableCommentReplies(!!(auto.commentReplies && auto.commentReplies.length > 0))
    if (auto.commentReplies && auto.commentReplies.length > 0) {
      setReplyOne(auto.commentReplies[0] || 'Thanks! Please see DMs.')
      setReplyTwo(auto.commentReplies[1] || 'Sent you a message! Check it out.')
      setReplyThree(auto.commentReplies[2] || 'Nice! Check your DMs!')
    }
    setDmCopy(auto.dmMessageCopy)
    setDelayValue(auto.delayValue || 1)
    setDelayUnit(auto.delayUnit || 'Minute')
    setDmType(auto.dmType || 'Text + Button')
    setButtonText(auto.buttonText || 'Claim Link')
    setButtonUrl(auto.buttonUrl || 'https://cacto.ai/checkout')
    
    // Open modal directly on Step 2 (Keyword settings)
    setActiveStep(2)
    setIsModalOpen(true)
  }

  const handleRenameAutomation = (id: string) => {
    const auto = automations.find(a => a.id === id)
    if (!auto) return
    const newKw = prompt("Enter new trigger keyword:", auto.triggerKeyword)
    if (newKw && newKw.trim()) {
      const kw = newKw.trim().toUpperCase()
      const updated = automations.map(a => a.id === id ? { ...a, triggerKeyword: kw } : a)
      setAutomations(updated)
      if (user?.id === 'mock-id') {
        localStorage.setItem('cacto_mock_automations', JSON.stringify(updated))
        syncMockAutomations(updated)
      } else {
        supabase
          .from('automations')
          .update({ trigger_keyword: kw })
          .eq('id', id)
          .then(({ error }) => {
            if (error) console.error('Error renaming automation keyword:', error)
          })
      }
    }
  }

  const handleDuplicateAutomation = (auto: Automation) => {
    const duplicated: Automation = {
      ...auto,
      id: Math.random().toString(),
      triggerKeyword: `${auto.triggerKeyword}_COPY`,
      createdAt: new Date().toISOString(),
      runsCount: 0,
      clicksCount: 0
    }
    const updated = [duplicated, ...automations]
    setAutomations(updated)
    if (user?.id === 'mock-id') {
      localStorage.setItem('cacto_mock_automations', JSON.stringify(updated))
      syncMockAutomations(updated)
    } else {
      const structuredMessageCopy = JSON.stringify({
        dm_message_copy: auto.dmMessageCopy,
        post_id: auto.postId,
        post_thumbnail: auto.postThumbnailGrad,
        comment_replies: auto.commentReplies || [],
        delay_value: auto.delayValue,
        delay_unit: auto.delayUnit,
        dm_type: auto.dmType,
        button_text: auto.buttonText,
        button_url: auto.buttonUrl
      })
      supabase
        .from('automations')
        .insert([{
          trigger_keyword: duplicated.triggerKeyword,
          dm_message_copy: structuredMessageCopy,
          is_active: true,
          user_id: user?.id
        }])
        .select()
        .then(({ data, error }) => {
          if (error) {
            console.error('Error duplicating automation:', error)
          } else if (data && data[0]) {
            setAutomations(prev => prev.map(a => a.id === duplicated.id ? { ...a, id: data[0].id } : a))
          }
        })
    }
  }

  const handleToggleReplies = (auto: Automation) => {
    const hasReplies = auto.commentReplies && auto.commentReplies.length > 0
    const nextReplies = hasReplies ? [] : ['Thanks! Please see DMs.', 'Nice! Check your DMs!']
    const updated = automations.map(a => a.id === auto.id ? { ...a, commentReplies: nextReplies } : a)
    setAutomations(updated)
    if (user?.id === 'mock-id') {
      localStorage.setItem('cacto_mock_automations', JSON.stringify(updated))
      syncMockAutomations(updated)
    } else {
      const structuredMessageCopy = JSON.stringify({
        dm_message_copy: auto.dmMessageCopy,
        post_id: auto.postId,
        post_thumbnail: auto.postThumbnailGrad,
        comment_replies: nextReplies,
        delay_value: auto.delayValue,
        delay_unit: auto.delayUnit,
        dm_type: auto.dmType,
        button_text: auto.buttonText,
        button_url: auto.buttonUrl
      })
      supabase
        .from('automations')
        .update({ dm_message_copy: structuredMessageCopy })
        .eq('id', auto.id)
        .then(({ error }) => {
          if (error) console.error('Error toggling comment replies:', error)
        })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 border-4 border-zinc-200 border-t-[#16A34A] rounded-full animate-spin" />
      </div>
    )
  }

  const filteredAutomations = automations.filter(auto => 
    auto.triggerKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
    auto.dmMessageCopy.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedPostCaption = (posts.find(p => p.id === selectedPostId) || mockPosts.find(p => p.id === selectedPostId))?.caption || ''

  return (
    <div className="max-w-5xl mx-auto space-y-10 text-[#1A1510] text-left">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold italic tracking-tight lowercase">
            auto dms<span className="text-[#16A34A] font-sans not-italic">.</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold mt-1">Configure active keywords and reply copy rules</p>
        </div>
        {automations.length > 0 && (
          <button
            onClick={() => {
              resetModalState()
              setActiveStep(0)
              setIsModalOpen(true)
            }}
            className="px-5 py-3 rounded-xl bg-[#16A34A] hover:bg-[#15803D] active:scale-95 text-white font-extrabold text-xs transition flex items-center gap-2 shadow-md shadow-emerald-500/10 cursor-pointer"
          >
            <Plus className="h-4.5 w-4.5" /> Create Automation
          </button>
        )}
      </div>

      {automations.length === 0 ? (
        /* Empty State */
        <div 
          className="p-16 text-center rounded-3xl bg-white border-2 border-[#1A1510] flex flex-col items-center justify-center space-y-6"
          style={{ boxShadow: '6px 10px 0 #1A1510' }}
        >
          <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-full text-[#16A34A]">
            <MessageSquare className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-[#1A1510]">No Automations Created Yet</h3>
            <p className="text-zinc-500 text-xs font-semibold max-w-sm mx-auto leading-relaxed">
              Get started by creating your first comment-to-DM responder rule! When users comment, your backend will send them DMs automatically.
            </p>
          </div>
          <button
            onClick={() => {
              resetModalState()
              setActiveStep(0)
              setIsModalOpen(true)
            }}
            className="px-6 py-3.5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs transition shadow-md shadow-emerald-500/10 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="h-4.5 w-4.5" /> Create Automation
          </button>
        </div>
      ) : (
        /* Main rules list view */
        <>
          {/* Search Toolbar */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search rules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border-2 border-[#1A1510] focus:ring-1 focus:ring-[#16A34A] focus:border-[#16A34A] outline-none text-xs placeholder:text-zinc-400 font-bold text-[#1A1510] transition"
              />
            </div>
          </div>

          {/* Automations List Header */}
          <div className="pt-2">
            <h2 className="text-lg font-black text-[#1A1510]">Active AutoDM Rules & Campaigns</h2>
          </div>

          {/* Automations List */}
          <div className="space-y-4">
            {/* Table Column Titles */}
            <div className="flex items-center justify-between px-6 py-2 text-[10px] font-extrabold uppercase text-zinc-400 tracking-wider">
              <span className="w-1/2">Automations</span>
              <div className="flex items-center justify-between w-1/2">
                <span className="w-1/4 text-center">Followers</span>
                <span className="w-1/4 text-center">Runs</span>
                <span className="w-1/4 text-center">Clicks</span>
                <span className="w-1/4 text-center">Status</span>
                <span className="w-8"></span>
              </div>
            </div>

            {filteredAutomations.map(auto => (
              <div 
                key={auto.id} 
                className="p-5 rounded-2xl bg-white border-2 border-[#1A1510] flex items-center justify-between transition-all duration-200"
                style={{ boxShadow: '4px 6px 0 #1A1510' }}
              >
                {/* Left Column: Avatar + Rule text + IG account + Trigger */}
                <div className="flex items-center gap-4 w-1/2 min-w-0">
                  <div className="h-12 w-12 rounded-xl relative shrink-0 overflow-hidden text-white border-2 border-[#1A1510] flex items-center justify-center">
                    {(posts.find(p => p.id === auto.postId) || mockPosts.find(p => p.id === auto.postId))?.image ? (
                      <img 
                        src={(posts.find(p => p.id === auto.postId) || mockPosts.find(p => p.id === auto.postId))!.image} 
                        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.8]"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${auto.postThumbnailGrad || 'from-orange-500 to-pink-500'}`} />
                    )}
                    <Play className="h-4.5 w-4.5 fill-white relative z-10" />
                  </div>
                  <div className="min-w-0 pr-4">
                    <h4 className="font-bold text-[#1A1510] text-sm truncate leading-snug">
                      {auto.dmMessageCopy}
                    </h4>
                    <div className="flex items-center gap-2 mt-1.5 text-[11px] text-zinc-500 font-bold">
                      <span className="flex items-center gap-1 text-[#16A34A]">
                        <Instagram className="h-3.5 w-3.5" /> 
                        @{instagramAccount?.username || 'artsyhere47'}
                      </span>
                      <span className="text-zinc-300">|</span>
                      <span className="flex items-center gap-1 text-[#1A1510]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" /> 
                        Trigger: {auto.triggerKeyword}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Columns: Metrics & Badges */}
                <div className="flex items-center justify-between w-1/2">
                  <div className="w-1/4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-zinc-400 text-[9px] font-black uppercase tracking-wider inline-flex items-center gap-1">
                      N/A <HelpCircle className="h-3 w-3 text-zinc-400" />
                    </span>
                  </div>
                  <div className="w-1/4 text-center text-sm font-bold text-zinc-700">
                    {auto.runsCount}
                  </div>
                  <div className="w-1/4 text-center text-sm font-bold text-zinc-700">
                    {auto.clicksCount}
                  </div>
                  <div className="w-1/4 text-center flex justify-center">
                    <button
                      onClick={() => toggleAutomation(auto.id)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border-2 transition cursor-pointer ${
                        auto.isActive 
                          ? 'bg-emerald-100 text-emerald-700 border-emerald-300 hover:opacity-90' 
                          : 'bg-zinc-100 text-zinc-400 border-zinc-200 hover:opacity-90'
                      }`}
                    >
                      {auto.isActive ? 'Active' : 'Paused'}
                    </button>
                  </div>
                  {/* Dropdown Options Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setActiveDropdownId(activeDropdownId === auto.id ? null : auto.id)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-[#1A1510] hover:bg-zinc-100 transition shrink-0 cursor-pointer"
                      title="More Options"
                    >
                      <MoreVertical className="h-4.5 w-4.5" />
                    </button>

                    {activeDropdownId === auto.id && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setActiveDropdownId(null)}
                        />
                        <div 
                          className="absolute right-0 mt-1 w-56 rounded-2xl bg-white border-2 border-[#1A1510] shadow-lg py-2 z-20 animate-in fade-in slide-in-from-top-1 duration-150"
                          style={{ boxShadow: '4px 6px 0 #1A1510' }}
                        >
                          <button
                            onClick={() => {
                              setActiveDropdownId(null)
                              handleEditAutomation(auto)
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-50 flex items-center gap-2.5 transition cursor-pointer border-none"
                          >
                            <Pencil className="h-3.5 w-3.5 text-zinc-400" />
                            Edit
                          </button>
                          
                          <button
                            onClick={() => {
                              setActiveDropdownId(null)
                              handleRenameAutomation(auto.id)
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-50 flex items-center gap-2.5 transition cursor-pointer border-none"
                          >
                            <HelpCircle className="h-3.5 w-3.5 text-zinc-400" />
                            Rename
                          </button>

                          <button
                            onClick={() => {
                              setActiveDropdownId(null)
                              toggleAutomation(auto.id)
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-50 flex items-center gap-2.5 transition cursor-pointer border-none"
                          >
                            <Pause className="h-3.5 w-3.5 text-zinc-400" />
                            {auto.isActive ? 'Pause automation' : 'Resume automation'}
                          </button>

                          <button
                            onClick={() => {
                              setActiveDropdownId(null)
                              handleDuplicateAutomation(auto)
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-50 flex items-center gap-2.5 transition cursor-pointer border-none"
                          >
                            <Copy className="h-3.5 w-3.5 text-zinc-400" />
                            Duplicate automation
                          </button>

                          <button
                            onClick={() => {
                              setActiveDropdownId(null)
                              handleToggleReplies(auto)
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-50 flex items-center gap-2.5 transition cursor-pointer border-none"
                          >
                            <MessageSquare className="h-3.5 w-3.5 text-zinc-400" />
                            {auto.commentReplies && auto.commentReplies.length > 0 ? 'Disable comment replies' : 'Enable comment replies'}
                          </button>

                          <a
                            href={auto.postId ? `https://instagram.com/p/${auto.postId}` : 'https://instagram.com'}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setActiveDropdownId(null)}
                            className="w-full text-left px-4 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-50 flex items-center gap-2.5 transition cursor-pointer inline-flex border-none decoration-none"
                          >
                            <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                            View reel on Instagram
                          </a>

                          <div className="border-t border-zinc-150 my-1.5" />

                          <button
                            onClick={() => {
                              setActiveDropdownId(null)
                              deleteAutomation(auto.id)
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-2.5 transition cursor-pointer border-none"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-red-400" />
                            Delete automation
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Visible FAQ Accordion Section */}
      <section className="p-8 rounded-[28px] bg-white border-2 border-[#1A1510] space-y-6 text-left my-10" style={{ boxShadow: '6px 8px 0 #1A1510' }}>
        <div className="space-y-1">
          <span className="text-xs text-[#16A34A] font-extrabold uppercase tracking-wider block">AutoDM Help & FAQs</span>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-[#1A1510]">
            Frequently asked questions about <em className="italic font-normal text-[#16A34A]">Auto-DM campaigns</em>.
          </h2>
        </div>

        <div className="space-y-3">
          {autoDmFaqs.map((faq, idx) => (
            <div 
              key={idx}
              className="rounded-2xl border-2 border-[#1A1510] bg-[#FAF6EE] overflow-hidden transition"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 flex justify-between items-center text-xs font-bold text-[#1A1510] select-none cursor-pointer text-left gap-4"
              >
                <span>{faq.q}</span>
                <span className="h-5 w-5 rounded-full border border-[#1A1510] flex items-center justify-center text-xs shrink-0 bg-white font-mono">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 text-xs text-zinc-650 leading-relaxed font-semibold border-t border-dashed border-zinc-200 pt-3 bg-white">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* MULTI-STEP CREATE AUTOMATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-lg bg-[#FAF6EE] border-2 border-[#1A1510] rounded-3xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
            style={{ boxShadow: '8px 12px 0 #1A1510' }}
          >
            
            {/* Step 0: Trigger menu */}
            {activeStep === 0 && (
              <div className="p-8 space-y-6 text-left">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-black text-[#1A1510]">Step 1: Select Trigger & Target Post</h2>
                  <button onClick={closeModal} className="text-zinc-500 hover:text-[#1A1510] transition cursor-pointer">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3.5">
                  <button 
                    onClick={() => {
                      resetModalState()
                      setTriggerType('comment_on_post')
                      setActiveStep(1)
                    }}
                    className="w-full p-4 rounded-2xl bg-white border-2 border-[#1A1510] hover:border-[#16A34A] transition flex items-center justify-between text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-[#16A34A]">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <span className="font-bold text-sm text-[#1A1510]">Comments on your Post or Reel</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-[#16A34A] transition" />
                  </button>

                  <button onClick={() => setIsUpgradeModalOpen(true)} className="w-full p-4 rounded-2xl bg-white/40 border-2 border-dashed border-zinc-200 hover:border-zinc-300 transition flex items-center justify-between text-left group cursor-pointer">
                    <div className="flex items-center gap-3.5 opacity-60">
                      <div className="p-2.5 bg-zinc-100 rounded-xl text-zinc-500">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                      </div>
                      <span className="font-bold text-sm text-[#1A1510]">Sends you a DM</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#16A34A] text-[9px] font-black uppercase tracking-wider flex items-center gap-1 border border-emerald-100"><Lock className="h-3 w-3" /> Unlock</span>
                  </button>

                  <button onClick={() => setIsUpgradeModalOpen(true)} className="w-full p-4 rounded-2xl bg-white/40 border-2 border-dashed border-zinc-200 hover:border-zinc-300 transition flex items-center justify-between text-left group cursor-pointer">
                    <div className="flex items-center gap-3.5 opacity-60">
                      <div className="p-2.5 bg-zinc-100 rounded-xl text-zinc-500">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /></svg>
                      </div>
                      <span className="font-bold text-sm text-[#1A1510]">Replies to your Story</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#16A34A] text-[9px] font-black uppercase tracking-wider flex items-center gap-1 border border-emerald-100"><Lock className="h-3 w-3" /> Unlock</span>
                  </button>

                  <button onClick={() => setIsUpgradeModalOpen(true)} className="w-full p-4 rounded-2xl bg-white/40 border-2 border-dashed border-zinc-200 hover:border-zinc-300 transition flex items-center justify-between text-left group cursor-pointer">
                    <div className="flex items-center gap-3.5 opacity-60">
                      <div className="p-2.5 bg-zinc-100 rounded-xl text-zinc-500">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      </div>
                      <span className="font-bold text-sm text-[#1A1510]">Comments on your Live</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#16A34A] text-[9px] font-black uppercase tracking-wider flex items-center gap-1 border border-emerald-100"><Lock className="h-3 w-3" /> Unlock</span>
                  </button>

                  <button onClick={() => setIsUpgradeModalOpen(true)} className="w-full p-4 rounded-2xl bg-white/40 border-2 border-dashed border-zinc-200 hover:border-zinc-300 transition flex items-center justify-between text-left group cursor-pointer">
                    <div className="flex items-center gap-3.5 opacity-60">
                      <div className="p-2.5 bg-zinc-100 rounded-xl text-zinc-500">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      </div>
                      <span className="font-bold text-sm text-[#1A1510]">DMs your Post or Reel</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#16A34A] text-[9px] font-black uppercase tracking-wider flex items-center gap-1 border border-emerald-100"><Lock className="h-3 w-3" /> Unlock</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Choose Post or Reel */}
            {activeStep === 1 && (
              <div className="p-8 space-y-6 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold text-[#16A34A] uppercase tracking-wider flex items-center gap-1.5">
                    <Instagram className="h-4 w-4 text-[#16A34A]" /> When comments on Post/Reel
                  </span>
                  <button onClick={closeModal} className="text-zinc-500 hover:text-[#1A1510] transition cursor-pointer">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex flex-col items-center text-center space-y-2 py-2">
                  <div className="h-12 w-12 rounded-full p-0.5 bg-gradient-to-tr from-[#16A34A] to-emerald-300 flex items-center justify-center overflow-hidden">
                    {instagramAccount?.profilePicture ? (
                      <img 
                        src={instagramAccount.profilePicture} 
                        alt={instagramAccount.username}
                        className="h-full w-full rounded-full object-cover border border-[#1A1510]"
                      />
                    ) : (
                      <div className="h-full w-full rounded-full bg-white border border-[#1A1510] flex items-center justify-center text-zinc-500 font-extrabold text-xs uppercase">
                        {instagramAccount?.username?.slice(0, 2).toUpperCase() || 'IG'}
                      </div>
                    )}
                  </div>
                  <span className="font-bold text-xs text-zinc-600">@{instagramAccount?.username || 'artsyhere47'}</span>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider">The Comment is on...</label>
                  <div className="flex gap-2 p-1 bg-white rounded-xl border-2 border-[#1A1510] text-[10px] font-bold text-zinc-500">
                    <button className="flex-1 py-2 rounded-lg bg-[#16A34A] text-white">Specific Post/Reel</button>
                    <button type="button" onClick={() => setIsUpgradeModalOpen(true)} className="flex-1 py-2 rounded-lg hover:text-[#1A1510] flex items-center justify-center gap-1">Any Post/Reel <Lock className="h-3 w-3" /></button>
                  </div>
                </div>

                {/* Paste URL block to link native post */}
                <div className="space-y-2.5 p-4 bg-[#FAF6EE] rounded-2xl border-2 border-[#1A1510] border-dashed text-left">
                  <label className="text-[9px] text-zinc-500 font-extrabold uppercase tracking-wider block">Link Native Instagram Post / Reel</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Paste post/reel URL (e.g. https://instagram.com/reel/...)" 
                      value={nativePostUrl}
                      onChange={(e) => setNativePostUrl(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-white rounded-xl border-2 border-[#1A1510] outline-none text-[#1A1510] font-semibold"
                    />
                    <button 
                      type="button"
                      onClick={handleLinkNativePost}
                      disabled={isLinking || !nativePostUrl.trim()}
                      className="px-4 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white border-2 border-[#1A1510] text-xs font-black rounded-xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[2px_2px_0_#1A1510] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    >
                      {isLinking ? 'Linking...' : 'Link'}
                    </button>
                  </div>
                  <p className="text-[9px] text-zinc-400 font-semibold leading-relaxed">
                    Paste any Instagram URL to test. We will extract the post's shortcode to reply to real comments.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {posts.map(post => (
                    <button
                      key={post.id}
                      onClick={() => {
                        setSelectedPostId(post.id)
                        setSelectedPostGrad(post.gradient)
                      }}
                      className={`relative aspect-square rounded-xl overflow-hidden flex items-center justify-center text-white border-2 transition active:scale-95 cursor-pointer ${
                        selectedPostId === post.id ? 'border-[#16A34A] ring-4 ring-emerald-500/20' : 'border-[#1A1510]'
                      }`}
                    >
                      <img src={post.image} className="absolute inset-0 w-full h-full object-cover filter brightness-[0.8] hover:brightness-[0.9] transition" />
                      <Play className="h-6 w-6 fill-white drop-shadow relative z-10" />
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-dashed border-zinc-200 text-xs font-bold">
                  <span className="text-zinc-400">Step 1 of 3</span>
                  <div className="flex gap-3">
                    <button onClick={() => setActiveStep(0)} className="px-4 py-2.5 rounded-full bg-white border-2 border-[#1A1510] text-[#1A1510] transition hover:bg-zinc-50 cursor-pointer">Back</button>
                    <button onClick={() => setActiveStep(2)} disabled={!selectedPostId} className={`px-5 py-2.5 rounded-full border-2 border-[#1A1510] transition cursor-pointer ${selectedPostId ? 'bg-[#16A34A] hover:bg-[#15803D] text-white' : 'bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed'}`}>Next</button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Choose Keyword & Comment Auto-Replies */}
            {activeStep === 2 && (
              <div className="p-8 space-y-6 max-h-[85vh] overflow-y-auto text-left">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-black text-[#1A1510]">Step 2: Configure Keyword & Comment Replies</h2>
                  <button onClick={closeModal} className="text-zinc-500 hover:text-[#1A1510] transition cursor-pointer">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <label className="text-xs text-zinc-500 font-extrabold uppercase tracking-wider">What kind of comment triggers this?</label>
                  <div className="flex gap-2 p-1 bg-white rounded-xl border-2 border-[#1A1510] text-[10px] font-bold text-zinc-500">
                    <button className="flex-1 py-2 rounded-lg bg-[#16A34A] text-white">Specific keyword</button>
                    <button type="button" onClick={() => setIsUpgradeModalOpen(true)} className="flex-1 py-2 rounded-lg hover:text-[#1A1510] flex items-center justify-center gap-1">Any comment <Lock className="h-3 w-3 text-zinc-400" /></button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] text-[#15803D] leading-relaxed font-semibold">
                  You can add <span className="font-black text-[#1A1510]">1 keyword</span> per automation on the Free plan. To get unlimited keywords,{' '}
                  <button type="button" onClick={() => setIsUpgradeModalOpen(true)} className="text-[#16A34A] font-black underline hover:text-[#15803D]">Upgrade</button>.
                </div>

                <div className="space-y-2.5">
                  <label className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider">Should include any of these:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type trigger word (e.g. FREE)"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white border-2 border-[#1A1510] focus:ring-1 focus:ring-[#16A34A] focus:border-[#16A34A] outline-none text-xs placeholder:text-zinc-400 font-bold text-[#1A1510]"
                    />
                    <button type="button" onClick={addKeyword} className="px-4 rounded-xl bg-[#16A34A] hover:bg-[#15803D] font-extrabold text-xs text-white border-2 border-[#1A1510] cursor-pointer">+ Add</button>
                  </div>

                  {keywordsList.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1.5">
                      {keywordsList.map(kw => (
                        <span key={kw} className="px-3 py-1 rounded bg-[#E6F4EA] text-[#15803D] font-extrabold text-xs border border-emerald-300 flex items-center gap-1.5">
                          {kw}
                          <button type="button" onClick={() => removeKeyword(kw)} className="text-zinc-400 hover:text-zinc-600">&times;</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-white border-2 border-[#1A1510] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1A1510]">Auto-Reply to comments on the post</span>
                    <button
                      type="button"
                      onClick={() => setEnableCommentReplies(!enableCommentReplies)}
                      className={`w-11 h-6 rounded-full transition relative shrink-0 cursor-pointer ${enableCommentReplies ? 'bg-[#16A34A]' : 'bg-zinc-200'}`}
                    >
                      <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition ${enableCommentReplies ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {enableCommentReplies && (
                    <div className="space-y-4 pt-3 border-t border-dashed border-zinc-200 text-xs font-semibold">
                      <p className="text-zinc-550 leading-relaxed">Rotates replies randomly to keep your account safe from spam filters.</p>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <span className="text-[9px] text-zinc-500 font-extrabold uppercase tracking-wider block">Reply Copy 1</span>
                          <input type="text" maxLength={140} value={replyOne} onChange={(e) => setReplyOne(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#1A1510] outline-none text-[#1A1510] font-bold focus:border-[#16A34A]" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] text-zinc-500 font-extrabold uppercase tracking-wider block">Reply Copy 2</span>
                          <input type="text" maxLength={140} value={replyTwo} onChange={(e) => setReplyTwo(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#1A1510] outline-none text-[#1A1510] font-bold focus:border-[#16A34A]" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] text-zinc-500 font-extrabold uppercase tracking-wider block">Reply Copy 3</span>
                          <input type="text" maxLength={140} value={replyThree} onChange={(e) => setReplyThree(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#1A1510] outline-none text-[#1A1510] font-bold focus:border-[#16A34A]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-dashed border-zinc-200 text-xs font-bold">
                  <span className="text-zinc-400">Step 2 of 3</span>
                  <div className="flex gap-3">
                    <button onClick={() => setActiveStep(1)} className="px-4 py-2.5 rounded-full bg-white border-2 border-[#1A1510] text-[#1A1510] transition hover:bg-zinc-50 cursor-pointer">Back</button>
                    <button 
                      onClick={() => {
                        if (keywordsList.length === 0 && keywordInput.trim()) {
                          const kw = keywordInput.trim().toUpperCase()
                          setKeywordsList([kw])
                          setKeywordInput('')
                        }
                        setActiveStep(3)
                      }} 
                      disabled={keywordsList.length === 0 && !keywordInput.trim()} 
                      className={`px-5 py-2.5 rounded-full border-2 border-[#1A1510] transition cursor-pointer ${
                        (keywordsList.length > 0 || keywordInput.trim()) ? 'bg-[#16A34A] hover:bg-[#15803D] text-white' : 'bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Choose Delay, DM Type & Content */}
            {activeStep === 3 && (
              <div className="p-8 space-y-6 max-h-[85vh] overflow-y-auto text-left">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-black text-[#1A1510]">Step 3: Primary DM Delivery & Copy Setup</h2>
                  <button onClick={closeModal} className="text-zinc-500 hover:text-[#1A1510] transition cursor-pointer">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Time Delay Form Group */}
                <div className="space-y-2">
                  <label className="text-xs text-zinc-500 font-extrabold uppercase tracking-wider block">Set a time delay *</label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      min={0}
                      value={delayValue}
                      onChange={(e) => setDelayValue(Number(e.target.value))}
                      className="w-2/3 px-4 py-2.5 rounded-xl bg-white border-2 border-[#1A1510] focus:border-[#16A34A] outline-none text-sm font-bold text-[#1A1510]"
                    />
                    <select
                      value={delayUnit}
                      onChange={(e) => setDelayUnit(e.target.value)}
                      className="w-1/3 px-3 py-2.5 rounded-xl bg-white border-2 border-[#1A1510] outline-none text-xs font-bold text-zinc-650 cursor-pointer"
                    >
                      <option value="Second">Second</option>
                      <option value="Minute">Minute</option>
                      <option value="Hour">Hour</option>
                      <option value="Immediately">Immediately</option>
                    </select>
                  </div>
                </div>

                {/* Primary DM details */}
                <div className="space-y-4 pt-4 border-t border-dashed border-zinc-200">
                  {/* DM Type select */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider">DM type</label>
                    <select
                      value={dmType}
                      onChange={(e) => setDmType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#1A1510] outline-none text-xs font-bold text-zinc-650 cursor-pointer"
                    >
                      <option value="Text + Button">Text + Button</option>
                      <option value="Text Only">Text Only</option>
                    </select>
                  </div>

                  {/* Textarea body */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider">DM content</label>
                    <div className="rounded-xl border-2 border-[#1A1510] bg-white overflow-hidden">
                      <textarea
                        value={dmCopy}
                        onChange={(e) => setDmCopy(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-transparent outline-none text-sm placeholder:text-zinc-300 text-[#1A1510] font-semibold resize-none"
                      />
                      
                      {/* Branding Footer inside textarea */}
                      <div className="flex justify-between items-center px-4 py-2.5 border-t border-dashed border-zinc-200 bg-[#FAF6EE] text-[10px]">
                        <span className="text-zinc-500 font-bold">Sent via <span className="font-black text-[#16A34A]">🌵 cacto.</span></span>
                        <button type="button" onClick={() => setIsUpgradeModalOpen(true)} className="text-[#16A34A] font-black underline hover:text-[#15803D]">
                          Remove branding
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Add a Button Input section if Text + Button is active */}
                  {dmType === 'Text + Button' && (
                    <div className="p-4 rounded-2xl border-2 border-dashed border-[#1A1510] bg-white space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="space-y-1">
                          <label className="text-[9px] text-zinc-500 font-extrabold uppercase tracking-wider">Button Text</label>
                          <input
                            type="text"
                            value={buttonText}
                            onChange={(e) => setButtonText(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg bg-white border-2 border-[#1A1510] outline-none text-zinc-700 font-bold focus:border-[#16A34A]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-zinc-500 font-extrabold uppercase tracking-wider">Button URL</label>
                          <input
                            type="url"
                            value={buttonUrl}
                            onChange={(e) => setButtonUrl(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg bg-white border-2 border-[#1A1510] outline-none text-zinc-500 font-medium font-mono focus:border-[#16A34A]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-dashed border-zinc-200 text-xs font-bold">
                  <span className="text-zinc-400">Step 3 of 3</span>
                  <div className="flex gap-3">
                    <button onClick={() => setActiveStep(2)} className="px-4 py-2.5 rounded-full bg-white border-2 border-[#1A1510] text-[#1A1510] transition hover:bg-zinc-50 cursor-pointer">Back</button>
                    <button onClick={() => setActiveStep(4)} disabled={!dmCopy.trim()} className={`px-5 py-2.5 rounded-full border-2 border-[#1A1510] transition cursor-pointer ${dmCopy.trim() ? 'bg-[#16A34A] hover:bg-[#15803D] text-white' : 'bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed'}`}>Next</button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Summary / Confirm & Launch */}
            {activeStep === 4 && (
              <div className="p-8 space-y-6 max-h-[85vh] overflow-y-auto text-left">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-black text-[#1A1510]">Step 4: Review & Launch AutoDM</h2>
                  <button onClick={closeModal} className="text-zinc-500 hover:text-[#1A1510] transition cursor-pointer">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-[#16A34A]">Confirm settings before launching</h4>

                  {/* Summary Block */}
                  <div className="space-y-5 text-sm text-zinc-650 font-bold">
                    {/* Trigger post */}
                    <div className="space-y-2">
                      <span className="text-xs text-zinc-400 font-extrabold uppercase tracking-wider block">Target post</span>
                      <div className="flex gap-4 p-3.5 bg-white border-2 border-[#1A1510] rounded-2xl">
                        <div className={`h-14 w-14 rounded-lg bg-gradient-to-br ${selectedPostGrad || 'from-orange-500 to-pink-500'} flex items-center justify-center shrink-0 border-2 border-[#1A1510]`}>
                          <Play className="h-5 w-5 fill-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-zinc-500 mt-1 truncate-3-lines leading-relaxed font-semibold">
                            {selectedPostCaption || 'No caption available'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Keywords list */}
                    <div className="space-y-2">
                      <p className="text-zinc-600">Trigger keywords:</p>
                      <div className="flex flex-wrap gap-2">
                        {keywordsList.map(kw => (
                          <span key={kw} className="px-3 py-1 rounded bg-[#E6F4EA] text-[#15803D] font-extrabold text-xs border border-emerald-300">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Delay */}
                    <div className="space-y-1">
                      <p className="text-zinc-500 italic text-xs">⏰ Sends {delayValue} {delayUnit.toLowerCase()}(s) after comment</p>
                    </div>

                    {/* Send DM preview */}
                    <div className="space-y-2">
                      <span className="text-xs text-zinc-400 font-extrabold uppercase tracking-wider block">DM preview</span>
                      <div className="p-4 bg-white border-2 border-[#1A1510] rounded-xl space-y-3 text-xs">
                        <p className="text-[#1A1510] font-semibold leading-relaxed">
                          {dmCopy}
                        </p>
                        {dmType === 'Text + Button' && (
                          <div className="mt-2 inline-block px-5 py-2 rounded-xl bg-[#1A1510] text-white font-black text-[10px]">
                            {buttonText} ➔
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-dashed border-zinc-200">
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-4 py-2.5 rounded-full bg-white border-2 border-[#1A1510] text-[#1A1510] text-xs font-bold transition hover:bg-zinc-50 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleLaunchAutomation}
                    className="px-6 py-3 rounded-full bg-[#16A34A] hover:bg-[#15803D] active:scale-95 text-white border-2 border-[#1A1510] font-black text-xs transition shadow-md cursor-pointer"
                  >
                    Confirm & launch
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: congratulations funnels screen */}
            {activeStep === 5 && (
              <div className="p-8 space-y-6 text-center flex flex-col items-center">
                <button onClick={handleCloseCongratulations} className="absolute top-5 right-5 text-zinc-550 hover:text-[#1A1510] transition cursor-pointer">
                  <X className="h-5 w-5" />
                </button>

                {/* Custom animated funnel with coins falling */}
                <div className="relative h-32 w-32 flex items-center justify-center py-4 mt-4 select-none">
                  {/* Floating dollar coins */}
                  <div className="absolute top-1 left-4 animate-bounce text-emerald-500"><DollarSign className="h-6 w-6" /></div>
                  <div className="absolute top-4 right-5 animate-bounce delay-150 text-emerald-500"><DollarSign className="h-5 w-5" /></div>
                  
                  {/* Center funnel */}
                  <div className="p-5 rounded-full bg-emerald-50 border border-emerald-100 text-[#16A34A] shrink-0 relative animate-pulse">
                    <svg className="h-16 w-16 text-[#16A34A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-black text-[#1A1510] leading-tight">Your AutoDM automation is live! 🔥</h3>
                  <p className="text-zinc-500 text-xs font-semibold max-w-xs mx-auto leading-relaxed">
                    Ready to track conversions? Upgrade to Creator and sync with Stripe metrics.
                  </p>
                </div>

                {/* Footer button */}
                <button
                  onClick={() => setIsUpgradeModalOpen(true)}
                  className="w-full py-4 rounded-full bg-[#1A1510] hover:bg-zinc-850 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 group mt-4 cursor-pointer"
                >
                  Upgrade Now <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* UPGRADE PROMPT MODAL */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-md bg-[#FAF6EE] border-2 border-[#1A1510] rounded-3xl p-8 relative animate-in fade-in zoom-in-95 duration-200"
            style={{ boxShadow: '8px 12px 0 #1A1510' }}
          >
            <button 
              onClick={() => setIsUpgradeModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-[#1A1510] transition text-2xl font-bold cursor-pointer"
            >
              &times;
            </button>
            
            <div className="flex items-center gap-3.5 mb-5 text-left">
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl text-[#16A34A]">
                <Sparkles className="h-6 w-6 fill-[#16A34A]" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#1A1510] leading-tight">Upgrade to Pro</h3>
                <p className="text-zinc-500 text-xs font-semibold mt-0.5">Scale your automation conversions</p>
              </div>
            </div>

            <p className="text-zinc-600 text-xs font-semibold leading-relaxed mb-6 text-left">
              Unlock lead generation fields, email captures, conversions analytics, and custom weekly overview charts.
            </p>

            <ul className="space-y-3.5 mb-8 text-xs font-bold text-zinc-700 text-left">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4.5 w-4.5 text-[#16A34A]" />
                Automated email capture & lead sync
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4.5 w-4.5 text-[#16A34A]" />
                Detailed Conversion and CTR Analytics
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4.5 w-4.5 text-[#16A34A]" />
                Story replies & story mention DMs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4.5 w-4.5 text-[#16A34A]" />
                Stripe Storefront connection (0% fee)
              </li>
            </ul>

            <div className="p-4 rounded-2xl bg-white border-2 border-[#1A1510] text-center mb-6">
              <p className="text-zinc-400 text-[9px] font-extrabold uppercase tracking-wider">Cacto Pro Subscription</p>
              <p className="text-2xl font-black text-[#1A1510] mt-1">$19 <span className="text-xs font-normal text-zinc-400">/ month</span></p>
            </div>

            <button
              onClick={() => {
                alert("Simulating checkout success! Welcome to Cacto Pro.")
                localStorage.setItem('cacto_onboarding_step_3_subscribed', 'true')
                setIsSubscribed(true)
                setIsUpgradeModalOpen(false)
              }}
              className="w-full py-4 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white border-2 border-[#1A1510] font-extrabold text-xs transition shadow-md shadow-emerald-500/10 cursor-pointer"
            >
              Start Cacto Pro Today
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AutoDMClient() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 border-4 border-zinc-200 border-t-[#16A34A] rounded-full animate-spin" />
      </div>
    }>
      <AutoDMPanelContent />
    </Suspense>
  )
}
