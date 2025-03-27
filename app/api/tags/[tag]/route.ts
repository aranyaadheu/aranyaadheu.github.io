import { NextRequest, NextResponse } from 'next/server';
import { getPostsByTag } from '@/lib/blog';

export async function GET(
  request: NextRequest,
  { params }: { params: { tag: string } }
) {
  try {
    const tag = decodeURIComponent(params.tag);
    console.log(`API route: Fetching posts with tag: ${tag}`);
    const posts = getPostsByTag(tag);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: 'Failed to fetch posts by tag', details: String(error) },
      { status: 500 }
    );
  }
} 