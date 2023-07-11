import './globals.css'
import type { Metadata } from 'next'
import { Dosis } from 'next/font/google'

const mulish = Dosis({ subsets: ['latin'] })

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
      <body className={mulish.className}>{children}</body>
    </html>
  )
}
