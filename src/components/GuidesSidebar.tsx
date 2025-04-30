import { getAllGuides } from '@/lib/mdx'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export async function GuidesSidebar() {
  const guides = await getAllGuides()

  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] py-6 lg:py-8 pr-4 border-r border-border w-full lg:w-64">
      <h3 className="text-lg font-semibold mb-4">Guides</h3>
      <nav className="flex flex-col gap-1">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className={cn(
              'px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              // Add active state styling later if needed
            )}
          >
            {guide.meta.title}
          </Link>
        ))}
      </nav>
    </aside>
  )
} 