import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getAllGuides } from '@/lib/mdx'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export async function MobileNav() {
  const guides = await getAllGuides()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="h-6 w-6 text-brand-accent" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] max-w-sm">
        <nav className="flex flex-col gap-4 mt-8">
          <Link 
            href="/guides" 
            className="text-lg font-medium hover:text-brand-accent transition-colors"
          >
            Guides
          </Link>
          <Link 
            href="/resources/prompt-library" 
            className="text-lg font-medium hover:text-brand-accent transition-colors"
          >
            Prompt Library
          </Link>
          <Link 
            href="/about" 
            className="text-lg font-medium hover:text-brand-accent transition-colors"
          >
            About
          </Link>

          <div className="h-px bg-border my-4" />
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Guides</h3>
            <div className="flex flex-col gap-2">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className={cn(
                    'px-2 py-1 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  )}
                >
                  {guide.meta.title}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
} 