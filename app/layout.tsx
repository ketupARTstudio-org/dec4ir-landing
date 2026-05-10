import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LocaleProvider } from '@/components/providers/LocaleProvider'
import Navbar from '@/components/layout/Navbar'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DEC4IR 2026 — Drone Edu Challenge IR 4.0',
  description:
    "Malaysia's premier online drone education competition for primary and secondary school students. Register now for DEC4IR 2026.",
  keywords: ['DEC4IR', 'drone education', 'Malaysia', 'STEM', 'quiz competition', 'school'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-base text-primary min-h-screen antialiased">
        <LocaleProvider>
          <Navbar />
          {children}
        </LocaleProvider>
      </body>
    </html>
  )
}
