import { getGuideBySlug, getAllGuides } from '@/lib/mdx'
import { MDXContent } from '@/components/MDXContent'
import { notFound } from 'next/navigation'

interface GuidePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const guides = await getAllGuides()
  return guides.map((guide) => ({
    slug: guide.slug,
  }))
}

export default async function GuidePage({ params }: GuidePageProps) {
  try {
    const { slug } = await params
    const guide = await getGuideBySlug(slug)

    return (
      <article className="prose dark:prose-invert max-w-none">
        <h1>{guide.meta.title}</h1>
        {guide.meta.description && (
          <p className="text-xl text-gray-600 dark:text-gray-400">{guide.meta.description}</p>
        )}
        <div className="mt-8">
          <MDXContent content={guide.content} />
        </div>
      </article>
    )
  } catch (error) {
    console.error('Error rendering guide:', error)
    notFound()
  }
} 