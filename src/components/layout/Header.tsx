import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">HackAI Guide</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-between space-x-2">
          <div className="flex-1 items-stretch mx-8 px-4">
            <Link href="/guides/green-field" className="text-sm font-medium mx-4">Green-field</Link>
            <Link href="/guides/add-feature" className="text-sm font-medium mx-4">Add Feature</Link>
            <Link href="/resources/prompt-library" className="text-sm font-medium mx-4">Prompts</Link>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
} 