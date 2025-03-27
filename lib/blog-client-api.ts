// Client-safe blog functions that fetch from API routes
import { PostData } from './blog';

// Fetch all posts from the API
export async function fetchPostsFromApi(): Promise<Omit<PostData, 'content'>[]> {
  try {
    console.log("Fetching posts from API");
    const response = await fetch('/api/posts');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts from API:", error);
    return [];
  }
}

// Fetch a single post by ID from the API
export async function fetchPostByIdFromApi(id: string): Promise<PostData | null> {
  try {
    console.log(`Fetching post ${id} from API`);
    const response = await fetch(`/api/posts/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching post ${id} from API:`, error);
    return null;
  }
}

// Fetch posts by tag from the API
export async function fetchPostsByTagFromApi(tag: string): Promise<Omit<PostData, 'content'>[]> {
  try {
    console.log(`Fetching posts with tag ${tag} from API`);
    const response = await fetch(`/api/tags/${encodeURIComponent(tag)}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching posts with tag ${tag} from API:`, error);
    return [];
  }
}

// Fetch all available tags from the API
export async function fetchTagsFromApi(): Promise<{tag: string, count: number}[]> {
  try {
    console.log("Fetching tags from API");
    const response = await fetch('/api/tags');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching tags from API:", error);
    return [];
  }
} 