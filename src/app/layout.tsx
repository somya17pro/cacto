import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ExitIntentModal from "@/components/ExitIntentModal";
import ClientReferrerTracker from "@/components/ClientReferrerTracker";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cacto.cc'),
  title: 'Cacto | Turn Instagram Comments into Automatic Sales & Auto-DMs',
  description: 'Automate Instagram DMs, lead magnet dispatches, and Stripe checkouts when followers comment on your Reels, Posts, and Stories.',
  keywords: ['Instagram DM automation', 'comment to DM', 'Instagram sales funnel', 'Stripe checkout Instagram', 'lead magnet automation', 'Instagram growth tools'],
  alternates: {
    canonical: 'https://cacto.cc',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Cacto | Turn Instagram Comments into Automatic Sales & Auto-DMs',
    description: 'Automate Instagram DMs, lead magnet dispatches, and Stripe checkouts when followers comment on your Reels, Posts, and Stories.',
    url: 'https://cacto.cc',
    siteName: 'Cacto',
    images: [
      {
        url: 'https://cacto.cc/cacto_hero_mockup.jpg',
        width: 1200,
        height: 630,
        alt: 'Cacto Instagram DM Automation Engine',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cacto | Turn Instagram Comments into Automatic Sales & Auto-DMs',
    description: 'Automate Instagram DMs, lead magnet dispatches, and Stripe checkouts when followers comment on your Reels, Posts, and Stories.',
    images: ['https://cacto.cc/cacto_hero_mockup.jpg'],
  },
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ExitIntentModal />
        <ClientReferrerTracker />
        
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZW7620LS6R" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZW7620LS6R');
          `}
        </Script>
      </body>
    </html>
  );
}

