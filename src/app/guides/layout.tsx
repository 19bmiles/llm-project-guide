import { ReactNode } from 'react'
import { GuidesSidebar } from '@/components/GuidesSidebar'

interface GuidesLayoutProps {
  children: ReactNode
}

export default function GuidesLayout({ children }: GuidesLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      <GuidesSidebar />
      <main className="flex-1 lg:pl-8">
        {children}
      </main>
    </div>
  )
} 