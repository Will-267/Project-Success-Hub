import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../App';

const BlogPostCard: React.FC<{ title: string; excerpt: string; imageUrl: string }> = ({ title, excerpt, imageUrl }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
            <img src={imageUrl} alt={title} className="w-full h-52 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-600 mb-4 flex-grow">{excerpt}</p>
                <Link to="/blog" className="font-semibold text-amber-500 hover:text-amber-600 transition-colors self-start">Read More &rarr;</Link>
            </div>
        </div>
    );
};

const HomePage: React.FC<{ blogPosts: BlogPost[] }> = ({ blogPosts }) => {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
              Master Your Final Year Project & Research Writing
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              Get the complete guidebook and video training trusted by Nigerian students to eliminate stress and achieve academic excellence.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="https://selar.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-lg font-semibold bg-amber-400 text-slate-900 px-8 py-3 rounded-lg shadow-lg hover:bg-amber-500 transform hover:-translate-y-1 transition-all duration-300"
              >
                Get the Ultimate Bundle
              </a>
              <Link
                to="/products"
                className="w-full sm:w-auto text-lg font-semibold bg-white text-slate-900 px-8 py-3 rounded-lg shadow-lg hover:bg-slate-100 transform hover:-translate-y-1 transition-all duration-300"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-900 text-amber-400 mx-auto mb-5">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-2">Write with Confidence</h3>
                    <p className="text-slate-600">Our step-by-step guide removes the guesswork, empowering you to write a high-quality report.</p>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-900 text-amber-400 mx-auto mb-5">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-2">Save Time & Money</h3>
                    <p className="text-slate-600">Avoid costly mistakes and endless revisions. Finish your project faster and on budget.</p>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-900 text-amber-400 mx-auto mb-5">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-2">Learn Skills for Life</h3>
                    <p className="text-slate-600">Master research, writing, and data analysis skills that will benefit your future career.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg overflow-hidden md:flex md:items-center">
                <div className="md:w-1/2">
                    <img src="https://picsum.photos/seed/student_new/800/600" alt="Student working on a laptop" className="rounded-xl object-cover w-full h-full" />
                </div>
                <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0">
                    <h2 className="text-4xl font-serif font-bold text-slate-900">Your Journey to Academic Excellence Starts Here</h2>
                    <p className="mt-4 text-slate-600">We've designed our resources to be practical, easy to follow, and tailored to the unique challenges faced by final year students in Nigeria. Let us guide you from topic selection to final defense.</p>
                    <Link to="/about" className="mt-8 inline-block text-lg font-semibold bg-slate-800 text-white px-8 py-3 rounded-lg shadow-md hover:bg-slate-900 transition-colors">
                        Meet the Author
                    </Link>
                </div>
            </div>
          </div>
      </section>

      {/* Testimonial Placeholder Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif font-bold tracking-tight">What Students Are Saying</h2>
            <p className="mt-4 text-lg text-slate-600">Join hundreds of successful graduates who used our resources.</p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
              <p className="text-slate-700 italic">"This was a game-changer! I was so stressed about my project, but the guidebook broke everything down perfectly. Highly recommended!"</p>
              <div className="mt-4 font-semibold text-slate-900">- Sarah, University of Lagos</div>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
              <p className="text-slate-700 italic">"The video course made complex topics so easy to understand. The AI tips for literature review saved me weeks of work."</p>
              <div className="mt-4 font-semibold text-slate-900">- David, ABU Zaria</div>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
              <p className="text-slate-700 italic">"I bought the bundle and it was the best decision. I finished my project ahead of schedule and got an A. Thank you!"</p>
              <div className="mt-4 font-semibold text-slate-900">- Chioma, University of Nigeria</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif font-bold tracking-tight">From the Blog</h2>
            <p className="mt-4 text-lg text-slate-600">Get the latest tips and insights on mastering your final year project.</p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map(post => (
                <BlogPostCard 
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    imageUrl={post.imageUrl}
                />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              to="/blog"
              className="inline-block text-lg font-semibold bg-slate-800 text-white px-8 py-3 rounded-lg shadow-md hover:bg-slate-900 transition-colors"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
