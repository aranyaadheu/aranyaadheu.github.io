import { NextResponse } from 'next/server';
import { getSortedPostsData } from '@/lib/blog';

export async function GET() {
  try {
    console.log("API route: Fetching all posts");
    const posts = getSortedPostsData();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: 'Failed to fetch posts', details: String(error) },
      { status: 500 }
    );
  }
} 