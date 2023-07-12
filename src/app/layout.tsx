import './globals.css'
import type { Metadata } from 'next'
import { Schibsted_Grotesk, M_PLUS_2, Rasa, Vazirmatn } from 'next/font/google'

const mainFont = Vazirmatn({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Theo Stavrides',
  description: 'Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={mainFont.className}>{children}</body>
    </html>
  )
}
