'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { CodeSample } from './CodeSample'
import { Counter } from './Counter'
import { Info } from './Info'

// Define the components available in MDX files
const components = {
  CodeSample,
  Counter,
  Info,
}

interface MDXRemoteWrapperProps {
  source: MDXRemoteSerializeResult
}

export function MDXRemoteWrapper({ source }: MDXRemoteWrapperProps) {
  return <MDXRemote {...source} components={components} />
} 