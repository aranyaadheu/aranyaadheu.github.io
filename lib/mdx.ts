import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

const postsDirectory = path.join(process.cwd(), '_posts');

export interface MDXPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  coverImage?: string;
  content: MDXRemoteSerializeResult;
}

export function getPostFileNames() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Promise<MDXPost | null> {
  try {
    // Find either .mdx or .md file
    let fileName = `${slug}.mdx`;
    let fullPath = path.join(postsDirectory, fileName);
    
    // If .mdx doesn't exist, try .md
    if (!fs.existsSync(fullPath)) {
      fileName = `${slug}.md`;
      fullPath = path.join(postsDirectory, fileName);
      
      // If neither exists, return null
      if (!fs.existsSync(fullPath)) {
        return Promise.resolve(null);
      }
    }
    
    // Read file content
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Parse with gray-matter
    const { data, content } = matter(fileContents);
    
    // Ensure required fields exist
    if (!data.title || !data.date) {
      console.warn(`Post ${slug} is missing required frontmatter: title or date`);
    }
    
    // Process MDX content
    return serialize(content, {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
      scope: data,
    }).then(mdxContent => {
      return {
        slug,
        content: mdxContent,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt,
        tags: data.tags || [],
        coverImage: data.coverImage,
      };
    });
  } catch (error) {
    console.error(`Error processing MDX for ${slug}:`, error);
    return Promise.resolve(null);
  }
}

export async function getAllPosts(): Promise<Omit<MDXPost, 'content'>[]> {
  const fileNames = getPostFileNames();
  
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove file extension to get slug
      const slug = fileName.replace(/\.(mdx?|md)$/, '');
      
      // Get full post data
      const post = await getPostBySlug(slug);
      
      if (!post) return null;
      
      // Return post without content for list view
      const { content, ...postWithoutContent } = post;
      return postWithoutContent;
    })
  );
  
  // Filter out any null values and sort by date
  return allPostsData
    .filter((post): post is Omit<MDXPost, 'content'> => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostsByTag(tag: string): Promise<Omit<MDXPost, 'content'>[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.tags && post.tags.includes(tag));
} 