import React from 'react';
import Link from 'next/link';

interface BlogPost {
    _id: string;
    title: string;
    excerpt: string; // Using excerpt as full content for now
    imageUrl: string;
    createdAt: string;
}

const BlogPostPage: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">{post.title}</h1>
            <p className="mt-4 text-slate-500">Published on {post.createdAt}</p>
          </div>

          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg mb-12"
          />

          <div className="prose prose-lg max-w-none text-slate-700 mx-auto">
            {/* Using excerpt as the main content for this example. 
                You would replace this with post.content in a real app. */}
            <p>{post.excerpt}</p>
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/blog"
              className="inline-block text-lg font-semibold bg-slate-800 text-white px-8 py-3 rounded-lg shadow-md hover:bg-slate-900 transition-colors"
            >
              &larr; Back to All Articles
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostPage;
