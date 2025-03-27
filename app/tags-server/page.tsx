// Server Component (no 'use client' directive)
import Link from 'next/link';
import { SharedLayout } from '@/components/shared-layout';
import { getSortedPostsData } from '@/lib/blog';

// Server-side debugging
console.log("Running tags-server/page.tsx on server side");

export default function TagsServerPage() {
  try {
    // Using server-only functionality safely
    const posts = getSortedPostsData();
    console.log("Successfully loaded posts on server:", posts.length);
    
    const tagCounts = new Map<string, number>();

    // Count occurrences of each tag
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });

    // Sort tags alphabetically
    const sortedTags = Array.from(tagCounts.entries()).sort((a, b) => 
      a[0].localeCompare(b[0])
    );
    
    return (
      <SharedLayout>
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">
            Tags (Server Component)
          </h1>
          
          <div className="grid gap-2 sm:gap-4">
            {sortedTags.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {sortedTags.map(([tag, count]) => (
                  <Link 
                    key={tag} 
                    href={`/tags/${tag}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-primary/20 transition-colors no-underline"
                  >
                    <span className="text-primary font-medium">#{tag}</span>
                    <span className="text-xs rounded-full bg-muted-foreground/20 px-2 py-0.5">
                      {count}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No tags found.</p>
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
          <h1>Error Loading Tags</h1>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      </SharedLayout>
    );
  }
} 