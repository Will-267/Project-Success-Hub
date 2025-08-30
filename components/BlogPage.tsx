import React from 'react';

const BlogPostCard: React.FC<{ title: string; excerpt: string; imageUrl: string }> = ({ title, excerpt, imageUrl }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
            <img src={imageUrl} alt={title} className="w-full h-52 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-600 mb-4 flex-grow">{excerpt}</p>
                <a href="#" className="font-semibold text-amber-500 hover:text-amber-600 transition-colors self-start">Read More &rarr;</a>
            </div>
        </div>
    );
};


const BlogPage: React.FC = () => {
  return (
    <div className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Tips, Tricks, and Resources</h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Your go-to resource for project writing insights and inspiration.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogPostCard 
                title="5 Common Mistakes Students Make in Project Writing"
                excerpt="Avoid these pitfalls to ensure your project stays on track. We break down the common errors and how to fix them before they become big problems."
                imageUrl="https://picsum.photos/seed/blog1_new/400/300"
            />
            <BlogPostCard 
                title="How to Use AI Ethically in Your Research"
                excerpt="Artificial Intelligence is a powerful tool, but using it correctly is key. Learn how to leverage AI for literature reviews and data analysis without plagiarism."
                imageUrl="https://picsum.photos/seed/blog2_new/400/300"
            />
            <BlogPostCard 
                title="Choosing a Winning Project Topic in 2024"
                excerpt="The foundation of a great project is a great topic. Discover our framework for finding a topic that is interesting, relevant, and achievable."
                imageUrl="https://picsum.photos/seed/blog3_new/400/300"
            />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
