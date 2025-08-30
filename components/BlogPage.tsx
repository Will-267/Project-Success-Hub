import React from 'react';
import Link from 'next/link';

interface BlogPost {
    _id: string;
    title: string;
    excerpt: string;
    imageUrl: string;
}

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
            <img src={post.imageUrl} alt={post.title} className="w-full h-52 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{post.title}</h3>
                <p className="text-slate-600 mb-4 flex-grow">{post.excerpt}</p>
                <Link href={`/blog/${post._id}`} className="font-semibold text-amber-500 hover:text-amber-600 transition-colors self-start">Read More &rarr;</Link>
            </div>
        </div>
    );
};


const BlogPage: React.FC<{ blogPosts: BlogPost[] }> = ({ blogPosts }) => {
  return (
    <div className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Tips, Tricks, and Resources</h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Your go-to resource for project writing insights and inspiration.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
                 <BlogPostCard 
                    key={post._id}
                    post={post}
                />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;