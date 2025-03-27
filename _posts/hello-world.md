---
title: 'Hello World - My First Blog Post'
date: '2023-04-28'
excerpt: 'This is my first blog post! Learn how I set up this blog using Next.js and Markdown.'
tags: ['nextjs', 'markdown', 'tutorial']
coverImage: '/images/hello-world.jpg'
---

# Welcome to My Blog!

This is my first blog post, and I'm excited to share my thoughts and experiences with you. In this post, I'll walk you through how I set up this blog using Next.js and Markdown.

## Why Next.js?

Next.js provides an excellent framework for building static and server-rendered React applications. Some of the benefits include:

- **Static Site Generation (SSG)** - Pages are generated at build time, resulting in fast loading times
- **Server-Side Rendering (SSR)** - Pages can be rendered on the server for improved SEO
- **File-based Routing** - Simple and intuitive routing system
- **API Routes** - Built-in API routes for serverless functions

## Setting Up the Blog

Setting up a blog with Next.js is straightforward. Here's how I did it:

1. Created a new Next.js project
2. Set up a directory structure for blog posts
3. Created utility functions to parse and render markdown files
4. Implemented pages for the blog index and individual posts

```javascript
// Example code for parsing markdown files
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
```

## What's Next?

I plan to write more about web development, technology, and other topics that interest me. Stay tuned for more content coming soon!

## Conclusion

Creating a blog with Next.js and Markdown is a great way to have a fast, SEO-friendly site with easy content management. I hope this post has been helpful, and I look forward to sharing more content with you in the future. 