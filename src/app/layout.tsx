import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://shaminder.sg'),
  title: {
    default: 'Shaminder Singh | Digital Marketing & Web Design for Singapore SMEs',
    template: '%s | Shaminder Singh',
  },
  description:
    'We help Singapore SMEs get more customers online. Website design, marketing, and lead generation — all handled for you. Book a free call today.',
  keywords:
    'digital marketing singapore, web design singapore, sme marketing, website design, lead generation, SEO singapore',
  openGraph: {
    title: 'Get More Customers Online | Shaminder Singh',
    description: 'Website. Marketing. Leads. All handled for you.',
    url: 'https://shaminder.sg',
    siteName: 'shaminder.sg',
    locale: 'en_SG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: 'https://shaminder.sg',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/android-chrome-192x192.png" />
      </head>
      <body className="antialiased">
        {children}
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W67DT0DWHT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W67DT0DWHT');
          `}
        </Script>
      </body>
    </html>
  )
}
