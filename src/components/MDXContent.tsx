'use client'

import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

function CodeBlock({ className = '', children = '' }) {
  const codeRef = useRef<HTMLPreElement>(null)
  const handleCopy = () => {
    if (codeRef.current) {
      const code = codeRef.current.innerText
      navigator.clipboard.writeText(code)
    }
  }
  return (
    <div className="relative group">
      <pre ref={codeRef} className={className + ' rounded-lg'}>
        {children}
      </pre>
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
        tabIndex={-1}
        aria-label="Copy code"
      >
        <Copy className="w-4 h-4" />
      </Button>
    </div>
  )
}

const components = {
  pre: CodeBlock,
  // Ensure code blocks are rendered as static text
  code: ({ children }: { children: React.ReactNode }) => <code>{children}</code>,
}

interface MDXContentProps {
  content: MDXRemoteSerializeResult
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="mdx-content">
      <MDXRemote {...content} components={components} />
    </div>
  )
} 