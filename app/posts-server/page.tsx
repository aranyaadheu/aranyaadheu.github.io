// This is a server component (no 'use client' directive)
import Link from 'next/link';
import { SharedLayout } from '@/components/shared-layout';
import { getSortedPostsData } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

// Add debugging
console.log("Running posts-server/page.tsx on server side");

export default function PostsServerPage() {
  try {
    // Try to use the getSortedPostsData function which uses fs
    const posts = getSortedPostsData();
    console.log("Successfully loaded posts on server:", posts.length);
    
    return (
      <SharedLayout>
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">
            Server Component Posts Test
          </h1>
          <div className="grid gap-4 sm:gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 sm:p-6 transition-colors hover:bg-muted/50">
                  <Link href={`/posts/${post.id}`} className="no-underline">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2 hover:underline">{post.title}</h2>
                  </Link>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags?.map((tag) => (
                      <Link 
                        key={tag}
                        href={`/tags/${tag}`}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors no-underline"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{formatDate(post.date)}</p>
                  {post.excerpt && <p className="text-sm sm:text-base mb-0">{post.excerpt}</p>}
                </div>
              ))
            ) : (
              <p className="text-sm sm:text-base text-muted-foreground">No posts found. Add your first blog post in the _posts directory.</p>
            )}
          </div>
        </div>
      </SharedLayout>
    );
  } catch (error) {
    console.error("Error in server component:", error);
    return (
      <SharedLayout>
        <div className="prose dark:prose-invert max-w-none">
          <h1>Error Loading Posts</h1>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      </SharedLayout>
    );
  }
} 