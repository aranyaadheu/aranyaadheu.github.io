'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SharedLayout } from '@/components/shared-layout';
import { getSortedPostsDataClient } from '@/lib/blog-client';

// Add debugging
console.log("Running tags/page.tsx on client side");

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

export default function TagsPage() {
  const posts = getSortedPostsDataClient();
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
          Tags (Client Component)
        </motion.h1>
        <motion.div 
          className="grid gap-2 sm:gap-4"
          variants={fadeInUp}
        >
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
        </motion.div>
      </motion.section>
    </SharedLayout>
  );
} 