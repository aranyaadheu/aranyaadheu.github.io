'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { SharedLayout } from '@/components/shared-layout';
import { fetchPostsFromApi, PostData, getSortedPostsDataClient } from '@/lib/blog-client';
import { formatDate } from '@/lib/utils';

// Add debugging
console.log("Running posts/page.tsx on client side");

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Omit<PostData, 'content' | 'mdxSource'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  
  useEffect(() => {
    async function loadPosts() {
      try {
        console.log("Starting to load posts...");
        setLoading(true);
        
        // Try to fetch posts from API, with a timeout of 5 seconds
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        try {
          const data = await fetchPostsFromApi();
          clearTimeout(timeoutId);
          
          console.log("Successfully fetched posts:", data);
          setPosts(data);
          setError(null);
          setErrorDetails(null);
        } catch (fetchError) {
          clearTimeout(timeoutId);
          console.error('Error fetching posts from API:', fetchError);
          
          // Log more details
          let errorMessage = 'Failed to fetch posts from API';
          let details = '';
          
          if (fetchError instanceof Error) {
            errorMessage = fetchError.message;
            details = fetchError.stack || '';
          }
          
          setError(errorMessage);
          setErrorDetails(details);
          
          // Fall back to client-side data
          console.log("Falling back to client-side data");
          const fallbackData = getSortedPostsDataClient();
          setPosts(fallbackData);
        }
      } catch (err) {
        console.error('Unexpected error in loadPosts:', err);
        
        let errorMessage = 'An unexpected error occurred';
        let details = '';
        
        if (err instanceof Error) {
          errorMessage = err.message;
          details = err.stack || '';
        }
        
        setError(errorMessage);
        setErrorDetails(details);
        
        // Ensure we have some data to display
        const fallbackData = getSortedPostsDataClient();
        setPosts(fallbackData);
      } finally {
        setLoading(false);
      }
    }
    
    loadPosts();
  }, []);
  
  return (
    <SharedLayout>
      <motion.section
        className="prose dark:prose-invert max-w-none"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.h1 
          className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8"
          variants={fadeInUp}
        >
          Blog Posts
        </motion.h1>
        
        {loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mb-6">
            <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
            {errorDetails && (
              <details className="mt-2">
                <summary className="text-sm cursor-pointer">Error Details</summary>
                <pre className="mt-2 text-xs overflow-auto p-2 bg-red-100 dark:bg-red-900/40 rounded">
                  {errorDetails}
                </pre>
              </details>
            )}
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Showing available posts from fallback data.
            </p>
          </div>
        ) : null}
        
        <motion.div 
          className="grid gap-4 sm:gap-8"
          variants={fadeInUp}
        >
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="border dark:border-transparent dark:ring-[0.5px] dark:ring-orange-500 rounded-lg p-4 sm:p-6 transition-colors hover:bg-muted/50">
                <div className="flex flex-col md:flex-row md:gap-6">
                  <div className="w-full">
                    <Link href={`/posts/${post.slug || post.id}`} className="no-underline">
                      <h2 className="text-xl sm:text-2xl font-semibold mb-2 hover:underline">{post.title}</h2>
                    </Link>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags?.filter(tag => tag !== 'mdx').map((tag) => (
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
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm sm:text-base text-muted-foreground">No posts found.</p>
          )}
        </motion.div>
      </motion.section>
    </SharedLayout>
  );
} 