import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), '_posts');

// Define a type for the post metadata
interface PostMetadata {
  id: string;
  title: string;
  date: string;
  isMdx: boolean;
  excerpt?: string;
  tags?: string[];
  coverImage?: string;
  [key: string]: any; // Allow for additional metadata fields
}

export async function GET() {
  try {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
      // Get the file extension
      const fileExtension = path.extname(fileName);
      // Remove extension from file name to get id
      const id = fileName.replace(/\.(md|mdx)$/, '');
      // Check if it's an MDX file
      const isMdx = fileExtension === '.mdx';

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        isMdx,
        ...matterResult.data,
      } as PostMetadata;
    });

    // Sort posts by date
    const sortedPosts = allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });

    return NextResponse.json(sortedPosts);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts', details: String(error) },
      { status: 500 }
    );
  }
} 