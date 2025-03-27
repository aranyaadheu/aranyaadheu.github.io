# Blog System for Next.js

This is a simple blog system for Next.js that uses Markdown files for content. It's designed to work with both client and server components.

## Structure

- `_posts/` - Directory containing markdown files for blog posts
- `app/api/blog/` - API routes for fetching blog data
- `lib/blog-client.ts` - Client-side utilities for working with blog data
- `app/blog/` - Server component implementation of the blog
- `app/posts/` - Client component implementation of the blog

## How It Works

### Blog Post Format

Blog posts are stored as markdown files in the `_posts` directory with the following frontmatter:

```markdown
---
title: 'Post Title'
date: '2023-05-15'
excerpt: 'A brief description of the post'
tags: ['tag1', 'tag2', 'tag3']
coverImage: '/images/image-name.jpg'
---

Content goes here...
```

### Server vs. Client Components

The blog system has two implementations:

1. **Server Components** (`app/blog/`) - These use API routes to fetch data on the server
2. **Client Components** (`app/posts/`) - These use client-safe utility functions

### API Routes

- `GET /api/blog` - Get all blog posts
- `GET /api/blog/[slug]` - Get a specific blog post by slug

## Why This Approach?

Next.js allows both server and client components, but Node.js modules like `fs` can only be used on the server. This implementation separates the concerns:

- Server components use API routes to access file system data
- Client components use client-safe utility functions 

This avoids the "Can't resolve 'fs'" error that occurs when client components try to import server-only code.

## Adding a New Blog Post

1. Create a new markdown file in the `_posts` directory
2. Add the required frontmatter (title, date, etc.)
3. Write your content in markdown
4. Add any images to the `public/images` directory

## Using the Blog Components

### Server Component Approach

```jsx
// Import the blog components from the server-side implementation
import BlogPage from '@/app/blog/page';

// Use them in your page
export default function Page() {
  return <BlogPage />;
}
```

### Client Component Approach

```jsx
'use client'

// Import the client-safe utilities
import { getSortedPostsDataClient } from '@/lib/blog-client';

export default function Page() {
  const posts = getSortedPostsDataClient();
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
``` 