import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), '_posts');

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  content: string | React.ReactElement;
  excerpt?: string;
  tags?: string[];
  coverImage?: string;
  isMdx?: boolean;
  mdxSource?: string | null;
  [key: string]: any;
}

export async function getBlogPosts(): Promise<Omit<BlogPost, 'content' | 'mdxSource'>[]> {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  
  const posts = fileNames.map((fileName) => {
    // Get the file extension
    const fileExtension = path.extname(fileName);
    // Remove extension from file name to get id and slug
    const id = fileName.replace(/\.(md|mdx)$/, '');
    const slug = id;
    // Check if it's an MDX file
    const isMdx = fileExtension === '.mdx';

    // Read file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Return the data
    return {
      id,
      slug,
      isMdx,
      ...matterResult.data,
    } as Omit<BlogPost, 'content' | 'mdxSource'>;
  });

  // Sort posts by date
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // Check if file exists (first try .mdx, then .md)
    let fullPath = path.join(postsDirectory, `${slug}.mdx`);
    let isMdx = true;
    
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.md`);
      isMdx = false;
      
      if (!fs.existsSync(fullPath)) {
        return null;
      }
    }
    
    // Read file content
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    
    let content = '';
    let mdxSource = null;
    
    if (isMdx) {
      // For MDX files, prepare the source
      mdxSource = matterResult.content;
      content = ''; // Will be compiled by the component
    } else {
      // For MD files, use remark to convert markdown to HTML
      const { remark } = await import('remark');
      const html = await import('remark-html');
      
      const processedContent = await remark()
        .use(html.default)
        .process(matterResult.content);
      content = processedContent.toString();
    }
    
    // Return the post data
    return {
      id: slug,
      slug,
      content,
      mdxSource: isMdx ? mdxSource : null,
      isMdx,
      ...matterResult.data,
    } as BlogPost;
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

export async function getPostsByTag(tag: string): Promise<Omit<BlogPost, 'content' | 'mdxSource'>[]> {
  const posts = await getBlogPosts();
  return posts.filter(post => post.tags && post.tags.includes(tag));
} 