// Server component - no 'use client' directive
import Link from 'next/link';
import Image from 'next/image';
import { SharedLayout } from '@/components/shared-layout';
import { formatDate } from '@/lib/utils';
import { getBlogPosts } from '@/lib/blog-api-server';

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  return (
    <SharedLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">
          Blog (Server Component)
        </h1>
        <div className="grid gap-4 sm:gap-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="border dark:border-transparent dark:ring-[0.5px] dark:ring-orange-500 rounded-lg p-4 sm:p-6 transition-colors hover:bg-muted/50">
                <div className="flex flex-col md:flex-row md:gap-6">
                  {post.coverImage && (
                    <div className="md:w-1/3 mb-4 md:mb-0">
                      <div className="relative aspect-video rounded-md overflow-hidden">
                        <Image 
                          src={post.coverImage} 
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <div className={post.coverImage ? "md:w-2/3" : "w-full"}>
                    <Link href={`/blog/${post.slug}`} className="no-underline">
                      <h2 className="text-xl sm:text-2xl font-semibold mb-2 hover:underline">{post.title}</h2>
                    </Link>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags?.map((tag: string) => (
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
                    {post.isMdx && (
                      <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs px-2 py-1 rounded mt-2">
                        MDX
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm sm:text-base text-muted-foreground">No posts found.</p>
          )}
        </div>
      </div>
    </SharedLayout>
  );
} 