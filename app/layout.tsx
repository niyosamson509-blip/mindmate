import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MindMate',
  description: 'MindMate - Your intelligent AI companion.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
