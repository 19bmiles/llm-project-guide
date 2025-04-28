import { ReactNode } from 'react'

interface GuidesLayoutProps {
  children: ReactNode
}

export default function GuidesLayout({ children }: GuidesLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  )
} 