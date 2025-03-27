import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPost } from '@/lib/blog-api-server';
import { formatDate } from '@/lib/utils';
import { compileMDX } from 'next-mdx-remote/rsc';
import { CodeSample } from '@/components/CodeSample';
import { Counter } from '@/components/Counter';

// Define components for MDX
const components = {
  CodeSample,
  Counter,
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
};

async function getPostData(slug: string) {
  try {
    const post = await getBlogPost(slug);
    
    if (!post) {
      return null;
    }
    
    // If this is MDX content, we need to compile it
    if (post.isMdx && post.mdxSource) {
      try {
        const { content } = await compileMDX({
          source: post.mdxSource,
          components
        });
        
        return {
          ...post,
          content
        };
      } catch (error: any) {
        console.error('Error compiling MDX:', error?.message || 'Unknown error');
        return {
          ...post,
          content: <div className="text-red-500">Error rendering MDX content: {error?.message || 'Unknown error'}</div>
        };
      }
    }
    
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Properly await params 
  const paramsData = await params;
  const post = await getPostData(paramsData.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title}`,
    openGraph: post.coverImage
      ? {
          images: [{ url: post.coverImage, width: 1200, height: 630 }]
        }
      : undefined
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    // Properly await params
    const paramsData = await params;
    const slug = paramsData.slug;
    
    const post = await getPostData(slug);

    if (!post) {
      return notFound();
    }

    return (
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8">
          <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block">
            ← Back to all posts
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-sm text-muted-foreground mb-6">{formatDate(post.date)}</p>
          
          {post.coverImage && (
            <div className="relative w-full aspect-video mb-8 overflow-hidden rounded-lg">
              <Image 
                src={post.coverImage} 
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
        
        {/* Content is either compiled MDX or HTML */}
        {post.content}
      </article>
    );
  } catch (error) {
    console.error('Error rendering blog post:', error);
    return notFound();
  }
} 