import { getAllGuides } from '@/lib/mdx'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function GuidesPage() {
  const guides = await getAllGuides()

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 rounded-lg bg-gradient-to-br from-brand-base via-gray-900 to-black text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          HackAI LLM Project Guides
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          Learn to partner with AI assistants like Cursor to build and enhance web applications step-by-step.
        </p>
        {/* Optional CTA Button */}
        {/* <Button size="lg" variant="secondary">Start Learning</Button> */}
      </section>

      {/* Guides List */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold border-b pb-2">Available Guides</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {guides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="block group">
              <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg dark:group-hover:shadow-primary/30">
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary">
                    {guide.meta.title}
                  </CardTitle>
                  {guide.meta.description && (
                    <CardDescription>{guide.meta.description}</CardDescription>
                  )}
                </CardHeader>
                {guide.meta.tags && (
                  <CardFooter className="flex flex-wrap gap-2 pt-4">
                    {guide.meta.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </CardFooter>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
} 