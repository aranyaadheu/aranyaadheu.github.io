'use client'

import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { getPostsByTagClient } from '@/lib/blog-client';
import { formatDate } from '@/lib/utils';
import { SharedLayout } from '@/components/shared-layout';

// Client-side debugging
console.log("Running tags-client/[tag]/page.tsx on client side");

export default function TagClientPage() {
  try {
    const params = useParams();
    const tag = params.tag as string;
    const decodedTag = decodeURIComponent(tag);
    console.log(`Getting posts for tag on client: ${decodedTag}`);
    
    // Use client-safe function
    const posts = getPostsByTagClient(decodedTag);
    
    if (posts.length === 0) {
      // Note: We can't use notFound() in a client component with error boundaries
      return (
        <SharedLayout>
          <div className="prose dark:prose-invert max-w-none">
            <Link href="/tags" className="text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block">
              ← Back to all tags
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold mb-8">No posts found</h1>
            <p>There are no posts with the tag #{decodedTag}</p>
          </div>
        </SharedLayout>
      );
    }
    
    return (
      <SharedLayout>
        <div className="prose dark:prose-invert max-w-none">
          <Link href="/tags" className="text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block">
            ← Back to all tags
          </Link>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">
            Posts tagged with <span className="text-primary">#{decodedTag}</span>
            <span className="text-muted-foreground text-xs ml-2">(Client)</span>
          </h1>
          
          <div className="grid gap-4 sm:gap-8">
            {posts.map((post) => (
              <div key={post.id} className="border dark:border-transparent dark:ring-[0.5px] dark:ring-orange-500 rounded-lg p-4 sm:p-6 transition-colors hover:bg-muted/50">
                <Link href={`/posts/${post.id}`} className="no-underline">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-2 hover:underline">{post.title}</h2>
                </Link>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags?.map((postTag) => (
                    <Link 
                      key={postTag}
                      href={`/tags-client/${postTag}`}
                      className={`text-xs px-2 py-1 rounded-full hover:bg-primary/20 transition-colors no-underline ${
                        postTag === decodedTag 
                          ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground' 
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      #{postTag}
                    </Link>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{formatDate(post.date)}</p>
                {post.excerpt && <p className="text-sm sm:text-base mb-0">{post.excerpt}</p>}
              </div>
            ))}
          </div>
        </div>
      </SharedLayout>
    );
  } catch (error) {
    console.error("Error in client tag page:", error);
    return (
      <SharedLayout>
        <div className="prose dark:prose-invert max-w-none">
          <h1>Error Loading Tagged Posts</h1>
          <p>Failed to load posts for this tag. Please try again later.</p>
          <Link href="/tags" className="text-primary hover:underline">
            Back to all tags
          </Link>
        </div>
      </SharedLayout>
    );
  }
} 