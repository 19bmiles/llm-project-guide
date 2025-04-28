import { getAllGuides } from '@/lib/mdx'
import Link from 'next/link'

export default async function GuidesPage() {
  const guides = await getAllGuides()

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Guides</h1>
      <div className="grid gap-6">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="block p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">{guide.meta.title}</h2>
            {guide.meta.description && (
              <p className="text-gray-600 dark:text-gray-400">{guide.meta.description}</p>
            )}
            {guide.meta.tags && (
              <div className="mt-4 flex gap-2">
                {guide.meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
} 