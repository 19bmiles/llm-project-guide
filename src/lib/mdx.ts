import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

const guidesDirectory = path.join(process.cwd(), 'src/content/guides')

export interface GuideMeta {
  title: string
  description?: string
  date?: string
  author?: string
  tags?: string[]
}

export interface Guide {
  slug: string
  meta: GuideMeta
  content: MDXRemoteSerializeResult
}

export async function getGuideBySlug(slug: string): Promise<Guide> {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(guidesDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
      format: 'mdx',
    },
    scope: data,
  })

  return {
    slug: realSlug,
    meta: data as GuideMeta,
    content: mdxSource,
  }
}

export async function getAllGuides(): Promise<Guide[]> {
  const files = fs.readdirSync(guidesDirectory)
  const guides = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, '')
        const guide = await getGuideBySlug(slug)
        return guide
      })
  )

  return guides.sort((a, b) => {
    if (a.meta.date && b.meta.date) {
      return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    }
    return 0
  })
} 