// Server Component (no 'use client' directive)
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostsByTag, getSortedPostsData } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { SharedLayout } from '@/components/shared-layout';

// Server-side debugging
console.log("Running [tag]/page.tsx as server component");

// Generate static params for all tags
export function generateStaticParams() {
  try {
    console.log("Generating static params for tags");
    const posts = getSortedPostsData();
    const tags = new Set<string>();
    
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        tags.add(tag);
      });
    });
    
    return Array.from(tags).map(tag => ({
      tag,
    }));
  } catch (error) {
    console.error("Error generating static params for tags:", error);
    return [];
  }
}

export default function TagPage({ params }: { params: { tag: string } }) {
  try {
    const { tag } = params;
    const decodedTag = decodeURIComponent(tag);
    console.log(`Getting posts for tag: ${decodedTag}`);
    
    const posts = getPostsByTag(decodedTag);
    
    if (posts.length === 0) {
      console.log(`No posts found for tag: ${decodedTag}`);
      return notFound();
    }
    
    return (
      <SharedLayout>
        <div className="prose dark:prose-invert max-w-none">
          <Link href="/tags-server" className="text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block">
            ← Back to all tags
          </Link>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">
            Posts tagged with <span className="text-primary">#{decodedTag}</span>
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
                      href={`/tags/${postTag}`}
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
    console.error("Error rendering tag page:", error);
    return (
      <SharedLayout>
        <div className="prose dark:prose-invert max-w-none">
          <h1>Error Loading Tagged Posts</h1>
          <p>Failed to load posts for this tag. Please try again later.</p>
          <pre>{JSON.stringify(error, null, 2)}</pre>
          <Link href="/tags-server" className="text-primary hover:underline">
            Back to all tags
          </Link>
        </div>
      </SharedLayout>
    );
  }
} 