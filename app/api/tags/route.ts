import { NextResponse } from 'next/server';
import { getSortedPostsData } from '@/lib/blog';

export async function GET() {
  try {
    console.log("API route: Fetching all tags");
    const posts = getSortedPostsData();
    
    // Extract and count tags
    const tagCounts = new Map<string, number>();
    
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });
    
    // Convert to array of objects for JSON
    const tagsData = Array.from(tagCounts.entries()).map(([tag, count]) => ({
      tag,
      count
    })).sort((a, b) => a.tag.localeCompare(b.tag));
    
    return NextResponse.json(tagsData);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: 'Failed to fetch tags', details: String(error) },
      { status: 500 }
    );
  }
} 