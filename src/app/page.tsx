import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code2, PlusCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen space-y-12 pb-8">
      {/* Hero Section */}
      <section className="relative py-20 px-4 rounded-b-lg bg-gradient-to-br from-brand-base via-gray-900 to-black text-white overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Partner with AI to Ship Better Code
          </h1>
          <p className="text-lg md:text-xl text-center text-gray-300 max-w-2xl mx-auto">
            Learn how to effectively use LLMs like Cursor Agent while building production-ready web applications.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Link href="/guides/green-field">
              <Button size="lg" variant="secondary" className="gap-2">
                Start Building <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/resources/prompt-library">
              <Button size="lg" variant="outline" className="gap-2 border-white/20 hover:bg-white/10">
                View Prompts
              </Button>
            </Link>
          </div>
        </div>
        {/* Optional: Add subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </section>

      {/* Main Workflows Section */}
      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <h2 className="text-3xl font-bold text-center">Main Workflows</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <Link href="/guides/green-field">
              <CardHeader>
                <Code2 className="w-10 h-10 text-primary mb-4" />
                <CardTitle className="text-xl group-hover:text-primary">Green-field Development</CardTitle>
                <CardDescription>
                  Start a brand-new webapp from scratch with AI assistance. Follow our step-by-step guide to build modern, production-ready applications.
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <Link href="/guides/add-feature">
              <CardHeader>
                <PlusCircle className="w-10 h-10 text-primary mb-4" />
                <CardTitle className="text-xl group-hover:text-primary">Add a Feature</CardTitle>
                <CardDescription>
                  Learn how to integrate cross-cutting capabilities into mature monorepo SaaS applications with LLM assistance.
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="max-w-5xl mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-bold text-center">Quick Links</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Prompt Library', description: 'Copy-paste prompt catalog', href: '/resources/prompt-library' },
            { title: 'Implementation Guide', description: 'Phase-by-phase roadmap', href: '/guides/implementation' },
            { title: 'About HackAI', description: 'Background & contribution guide', href: '/about' },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="h-full hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{link.title}</CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
