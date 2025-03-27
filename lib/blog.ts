import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), '_posts');

export interface PostData {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  content: string;
  tags?: string[];
  coverImage?: string;
  isMdx?: boolean;
}

export function getSortedPostsData(): Omit<PostData, 'content'>[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Get file extension
    const extension = path.extname(fileName);
    const isMdx = extension === '.mdx';
    
    // Remove extension from file name to get id
    const id = fileName.replace(/\.(md|mdx)$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      isMdx,
      ...(matterResult.data as Omit<PostData, 'id' | 'content' | 'isMdx'>),
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

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.(md|mdx)$/, ''),
    };
  });
}

export async function getPostData(id: string): Promise<PostData | null> {
  // First try with .mdx extension
  let fullPath = path.join(postsDirectory, `${id}.mdx`);
  let isMdx = true;
  
  // If not found, try with .md extension
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${id}.md`);
    isMdx = false;
    
    // If still not found, return null
    if (!fs.existsSync(fullPath)) {
      return null;
    }
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    content: contentHtml,
    isMdx,
    ...(matterResult.data as Omit<PostData, 'id' | 'content' | 'isMdx'>),
  };
}

export function getPostsByTag(tag: string): Omit<PostData, 'content'>[] {
  const allPosts = getSortedPostsData();
  return allPosts.filter(post => post.tags && post.tags.includes(tag));
} 