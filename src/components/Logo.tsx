import React from 'react'

export default function Logo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2v20M8 12c0-3.5 1-4.5 4-4.5M16 14c0-3.5-1-4.5-4-4.5M8 12v4M16 14v4M12 2C9.5 2 8 3.5 8 6"/>
      <rect x="10" y="2" width="4" height="20" rx="2" fill="#16A34A" stroke="none"/>
      <rect x="5" y="10" width="3" height="6" rx="1.5" fill="#16A34A" stroke="none"/>
      <rect x="16" y="12" width="3" height="6" rx="1.5" fill="#16A34A" stroke="none"/>
      <path d="M8 13c0 2 2 2 2 2h2v-4H8v2z" fill="#16A34A" stroke="none"/>
      <path d="M16 15c0 2-2 2-2 2h-2v-4h4v2z" fill="#16A34A" stroke="none"/>
    </svg>
  )
}
