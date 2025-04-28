'use client'

import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

interface MDXContentProps {
  content: MDXRemoteSerializeResult
}

export function MDXContent({ content }: MDXContentProps) {
  return <MDXRemote {...content} />
} 