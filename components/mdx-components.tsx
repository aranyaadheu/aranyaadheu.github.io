import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'

// Define custom components for MDX
const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 
      className={`mt-6 mb-4 text-3xl font-bold ${className || ''}`}
      {...props} 
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 
      className={`mt-6 mb-4 text-2xl font-bold ${className || ''}`}
      {...props} 
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 
      className={`mt-5 mb-4 text-xl font-bold ${className || ''}`}
      {...props} 
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 
      className={`mt-5 mb-4 text-lg font-bold ${className || ''}`}
      {...props} 
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={`mb-4 ${className || ''}`}
      {...props} 
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul 
      className={`mb-4 list-disc pl-5 ${className || ''}`}
      {...props} 
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol 
      className={`mb-4 list-decimal pl-5 ${className || ''}`}
      {...props} 
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className={`mb-1 ${className || ''}`}
      {...props} 
    />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={`border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-4 ${className || ''}`}
      {...props} 
    />
  ),
  a: ({ className, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith('/')) {
      return (
        <Link 
          href={href} 
          className={`text-primary hover:underline ${className || ''}`}
          {...props} 
        />
      )
    }
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-primary hover:underline ${className || ''}`}
        {...props} 
      />
    )
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={`bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm font-mono ${className || ''}`}
      {...props} 
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={`overflow-x-auto rounded-lg p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 mb-4 text-sm font-mono ${className || ''}`}
      {...props} 
    />
  ),
  img: ({ alt, src, width, height, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src) return null
    return (
      <div className="my-6 w-full flex justify-center">
        <Image
          src={src}
          alt={alt || ''}
          width={width ? Number(width) : 800}
          height={height ? Number(height) : 450}
          className="rounded-lg"
          {...props}
        />
      </div>
    )
  },
  // Add a custom component example
  CodeHighlight: ({ children, language = 'typescript', filename, highlightLines }: { 
    children: string; 
    language?: string;
    filename?: string;
    highlightLines?: string;
  }) => (
    <pre className={`overflow-x-auto rounded-lg p-4 mb-4 text-sm font-mono line-numbers language-${language}`} data-line={highlightLines}>
      <code className={`language-${language}`}>{children}</code>
    </pre>
  ),
  // Add a simple Info component
  Info: ({ children }: { children: React.ReactNode }) => (
    <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 p-4 mb-4 rounded-r-lg">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <div className="text-sm text-blue-700 dark:text-blue-300">{children}</div>
        </div>
      </div>
    </div>
  ),
}

// This function will be used by MDX posts components to process MDX content
export function MDXContent({ code }: { code: string }) {
  return (
    <div className="mdx-content">
      {/* We no longer use useMDXComponent since it doesn't exist */}
      {/* Instead, we'll use this as a simple wrapper for styling MDX content */}
      <div dangerouslySetInnerHTML={{ __html: code }} />
    </div>
  )
} 