// Client-safe version of blog utilities (no server imports)

export interface PostData {
  id: string;
  slug?: string;
  title: string;
  date: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
  coverImage?: string;
  isMdx?: boolean;
  mdxSource?: string;
}

// Mock data for client-side rendering
const MOCK_POSTS: Omit<PostData, 'content' | 'mdxSource'>[] = [
  {
    id: 'hello-world',
    title: 'Hello World - My First Blog Post',
    date: '2023-04-28',
    excerpt: 'This is my first blog post!',
    tags: ['nextjs', 'markdown', 'tutorial'],
    coverImage: '/images/hello-world.jpg',
    isMdx: false
  },
  {
    id: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js',
    date: '2023-05-15',
    excerpt: 'Learn how to build modern web applications with Next.js.',
    tags: ['nextjs', 'react', 'web-development'],
    coverImage: '/images/nextjs-cover.jpg',
    isMdx: false
  },
  {
    id: 'hello-mdx',
    title: 'Hello MDX - Interactive Blog Posts',
    date: '2023-06-15',
    excerpt: 'Explore the power of MDX for creating interactive blog posts.',
    tags: ['mdx', 'react', 'tutorial'],
    coverImage: '/images/mdx-cover.jpg',
    isMdx: true
  },
  {
    id: 'interactive-components',
    title: 'Interactive Components in MDX',
    date: '2023-07-22',
    excerpt: 'Learn how to use custom React components within your MDX blog posts.',
    tags: ['mdx', 'react', 'components', 'tutorial'],
    coverImage: '/images/blog/interactive.jpg',
    isMdx: true
  }
];

// Client-safe methods
export function getSortedPostsDataClient(): Omit<PostData, 'content' | 'mdxSource'>[] {
  return MOCK_POSTS;
}

export function getPostsByTagClient(tag: string): Omit<PostData, 'content' | 'mdxSource'>[] {
  return MOCK_POSTS.filter(post => post.tags && post.tags.includes(tag));
}

// Client-side version for getting post by ID
export async function getPostDataClient(id: string): Promise<PostData> {
  console.log("Using client-side getPostDataClient (mock data)");
  const post = MOCK_POSTS.find(post => post.id === id);
  
  if (!post) {
    throw new Error(`Post not found: ${id}`);
  }
  
  if (post.isMdx) {
    return {
      ...post,
      mdxSource: '# Mock MDX Content\n\nThis is mock MDX content for client-side rendering. In a real app, this would be fetched from an API.',
    };
  }
  
  return {
    ...post,
    content: '<p>This is mock content for client-side rendering. In a real app, this would be fetched from an API.</p>',
  };
}

// API-based functions
export async function fetchPostsFromApi(): Promise<Omit<PostData, 'content' | 'mdxSource'>[]> {
  try {
    console.log("Fetching posts from API");
    
    // Get the base URL from the window object if available
    const baseUrl = typeof window !== 'undefined' 
      ? `${window.location.protocol}//${window.location.host}`
      : '';
    
    // Create the full URL using the base URL
    const apiUrl = `${baseUrl}/api/blog`;
    
    console.log(`Fetching from URL: ${apiUrl}`);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts from API:", error);
    // For debugging, log more information about the error
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    console.log("Falling back to mock data");
    return getSortedPostsDataClient(); // Fallback to mock data
  }
}

export async function fetchPostByIdFromApi(id: string): Promise<PostData> {
  try {
    console.log(`Fetching post ${id} from API`);
    
    // Get the base URL from the window object if available
    const baseUrl = typeof window !== 'undefined' 
      ? `${window.location.protocol}//${window.location.host}`
      : '';
    
    // Create the full URL using the base URL
    const apiUrl = `${baseUrl}/api/blog/${id}`;
    
    console.log(`Fetching from URL: ${apiUrl}`);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Ensure the data has either content or mdxSource depending on post type
    if (!data.content && !data.mdxSource && data.isMdx) {
      throw new Error('MDX post is missing mdxSource');
    } else if (!data.content && !data.isMdx) {
      throw new Error('Markdown post is missing content');
    }
    
    // Add slug if not present
    if (!data.slug) {
      data.slug = id;
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching post ${id} from API:`, error);
    return getPostDataClient(id); // Fallback to mock data
  }
} 