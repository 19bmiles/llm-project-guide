import { getGuideBySlug, getAllGuides } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MDXContent } from '@/components/MDXContent'
import Link from 'next/link'

// Enable dynamic rendering for this page
export const dynamic = 'force-dynamic'

interface GuidePageProps {
  params: Promise<{
    slug: string
  }>
}

function getPrevNext(guides: { slug: string }[], slug: string) {
  const idx = guides.findIndex(g => g.slug === slug)
  return {
    prev: idx > 0 ? guides[idx - 1] : null,
    next: idx < guides.length - 1 ? guides[idx + 1] : null,
  }
}

export async function generateStaticParams() {
  const guides = await getAllGuides()
  return guides.map((guide) => ({
    slug: guide.slug,
  }))
}

export default async function GuidePage({ params }: GuidePageProps) {
  const guides = await getAllGuides()
  const { slug } = await params;
  const guide = await getGuideBySlug(slug)
  if (!guide) notFound()
  const { prev, next } = getPrevNext(guides, guide.slug)

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto">
      <Card className="shadow-lg border border-border">
        <CardHeader className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {guide.meta.tags?.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight">
            {guide.meta.title}
          </h1>
          {guide.meta.description && (
            <p className="text-lg text-muted-foreground mt-2">{guide.meta.description}</p>
          )}
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <MDXContent content={guide.content} />
        </CardContent>
        <CardFooter className="flex justify-between pt-8">
          {prev ? (
            <Link href={`/guides/${prev.slug}`} className="text-accent hover:underline">← {prev.slug.replace(/-/g, ' ')}</Link>
          ) : <span />}
          {next ? (
            <Link href={`/guides/${next.slug}`} className="text-accent hover:underline">{next.slug.replace(/-/g, ' ')} →</Link>
          ) : <span />}
        </CardFooter>
      </Card>
    </div>
  )
} 