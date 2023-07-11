import './globals.css'
import type { Metadata } from 'next'
import { Karla, Arimo, Plus_Jakarta_Sans, Figtree } from 'next/font/google'

const mulish = Figtree({ subsets: ['latin'] })

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
