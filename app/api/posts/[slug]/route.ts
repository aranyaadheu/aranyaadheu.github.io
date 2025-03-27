import { NextRequest, NextResponse } from 'next/server';
import { getPostData } from '@/lib/blog';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    console.log(`API route: Fetching post with slug: ${params.slug}`);
    const post = await getPostData(params.slug);
    return NextResponse.json(post);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: 'Failed to fetch post', details: String(error) },
      { status: 500 }
    );
  }
} 