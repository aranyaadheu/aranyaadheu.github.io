import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllPostIds, getPostData } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { SharedLayout } from '@/components/shared-layout';

// Add debugging
console.log("Running [slug]/page.tsx as server component");

export async function generateStaticParams() {
  try {
    console.log("Generating static params for posts");
    const paths = getAllPostIds();
    return paths;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Define the structure of the parameters
interface PostParams {
  params: {
    slug: string;
  };
}

export default async function Post({ params }: PostParams) {
  // Properly await params before destructuring
  const paramsData = await params;
  const slug = paramsData.slug;
  
  try {
    console.log(`Fetching post data for slug: ${slug}`);
    const postData = await getPostData(slug);

    if (!postData) {
      console.log(`Post not found for slug: ${slug}`);
      return notFound();
    }

    return (
      <SharedLayout>
        <article className="prose dark:prose-invert max-w-none">
          <div className="mb-8">
            <Link href="/posts" className="text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block">
              ← Back to all posts
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{postData.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {postData.tags?.map((tag) => (
                <Link 
                  key={tag}
                  href={`/tags/${tag}`}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-6">{formatDate(postData.date)}</p>
            
            {postData.coverImage && (
              <div className="relative w-full aspect-video mb-8 overflow-hidden rounded-lg">
                <Image 
                  src={postData.coverImage} 
                  alt={postData.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
          
          <div dangerouslySetInnerHTML={{ __html: postData.content }} />
        </article>
      </SharedLayout>
    );
  } catch (error) {
    console.error("Error rendering post:", error);
    return (
      <SharedLayout>
        <div className="prose dark:prose-invert max-w-none">
          <h1>Error Loading Post</h1>
          <p>Failed to load the post. Please try again later.</p>
          <pre>{JSON.stringify(error, null, 2)}</pre>
          <Link href="/posts" className="text-primary hover:underline">
            Back to all posts
          </Link>
        </div>
      </SharedLayout>
    );
  }
} 