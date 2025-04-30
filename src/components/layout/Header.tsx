import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '@/components/theme-toggle'
import { MobileNav } from '@/components/MobileNav'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/assets/hackai_logo_nobg_trim.png"
              alt="HackAI Logo"
              width={32}
              height={32}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="font-extrabold text-xl tracking-tight text-brand-accent group-hover:text-brand-base transition-colors">HackAI Guide</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 ml-8">
          <Link href="/guides" className="text-sm font-medium hover:text-brand-accent transition-colors">Guides</Link>
          <Link href="/resources/prompt-library" className="text-sm font-medium hover:text-brand-accent transition-colors">Prompt Library</Link>
          <Link href="/about" className="text-sm font-medium hover:text-brand-accent transition-colors">About</Link>
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          <Link 
            href="https://www.hackai.live" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium border-2 border-brand-base hover:bg-brand-accent/10 text-white h-9 px-4 py-2 transition-colors"
          >
            HackAI Home
          </Link>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
} 