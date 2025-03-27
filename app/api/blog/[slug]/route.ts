import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import { MDXContent } from '@/components/mdx-components';

const postsDirectory = path.join(process.cwd(), '_posts');

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Properly await params
    const paramsData = await params;
    const slug = paramsData.slug;
    
    // Check if file exists (first try .mdx, then .md)
    let fullPath = path.join(postsDirectory, `${slug}.mdx`);
    let isMdx = true;
    
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.md`);
      isMdx = false;
      
      if (!fs.existsSync(fullPath)) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        );
      }
    }
    
    // Read file content
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    
    let contentHtml = '';
    let mdxSource = null;
    
    if (isMdx) {
      // For MDX files, prepare the source for client-side rendering
      mdxSource = matterResult.content;
    } else {
      // For MD files, use the original markdown processing
      const { remark } = await import('remark');
      const html = await import('remark-html');
      
      const processedContent = await remark()
        .use(html.default)
        .process(matterResult.content);
      contentHtml = processedContent.toString();
    }
    
    // Return the post data
    return NextResponse.json({
      id: slug,
      content: contentHtml,
      mdxSource: isMdx ? mdxSource : null,
      isMdx,
      ...matterResult.data,
    });
  } catch (error) {
    console.error(`API error for slug ${params.slug}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post', details: String(error) },
      { status: 500 }
    );
  }
} 