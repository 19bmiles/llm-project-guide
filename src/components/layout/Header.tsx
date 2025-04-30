import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { MobileNav } from '@/components/MobileNav'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="inline-block w-3 h-3 rounded-full bg-brand-accent group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-xl tracking-tight text-brand-accent group-hover:text-brand-base transition-colors">HackAI Guide</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/guides" className="text-sm font-medium hover:text-brand-accent transition-colors">Guides</Link>
          <Link href="/resources/prompt-library" className="text-sm font-medium hover:text-brand-accent transition-colors">Prompt Library</Link>
          <Link href="/about" className="text-sm font-medium hover:text-brand-accent transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
} 