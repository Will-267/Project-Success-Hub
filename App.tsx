import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ProductsPage from './components/ProductsPage';
import BlogPage from './components/BlogPage';
import ContactPage from './components/ContactPage';
import AdminLoginPage from './components/AdminLoginPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import BlogPostForm from './components/BlogPostForm';
import ProtectedRoute from './components/ProtectedRoute';

export interface BlogPost {
    title: string;
    excerpt: string;
    imageUrl: string;
}

const initialBlogPosts: BlogPost[] = [
    {
        title: "5 Common Mistakes Students Make in Project Writing",
        excerpt: "Avoid these pitfalls to ensure your project stays on track. We break down the common errors and how to fix them before they become big problems.",
        imageUrl: "https://picsum.photos/seed/blog1_new/400/300"
    },
    {
        title: "How to Use AI Ethically in Your Research",
        excerpt: "Artificial Intelligence is a powerful tool, but using it correctly is key. Learn how to leverage AI for literature reviews and data analysis without plagiarism.",
        imageUrl: "https://picsum.photos/seed/blog2_new/400/300"
    },
    {
        title: "Choosing a Winning Project Topic in 2024",
        excerpt: "The foundation of a great project is a great topic. Discover our framework for finding a topic that is interesting, relevant, and achievable.",
        imageUrl: "https://picsum.photos/seed/blog3_new/400/300"
    }
];

const App: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);

  const handleAddPost = (post: BlogPost) => {
      setBlogPosts(prevPosts => [post, ...prevPosts]);
  };

  const handleUpdatePost = (index: number, updatedPost: BlogPost) => {
      setBlogPosts(prevPosts => {
          const newPosts = [...prevPosts];
          newPosts[index] = updatedPost;
          return newPosts;
      });
  };

  const handleDeletePost = (index: number) => {
      if (window.confirm('Are you sure you want to delete this post?')) {
          setBlogPosts(prevPosts => prevPosts.filter((_, i) => i !== index));
      }
  };


  return (
    <HashRouter>
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 font-sans">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage blogPosts={blogPosts} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/blog" element={<BlogPage blogPosts={blogPosts} />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboardPage posts={blogPosts} handleDelete={handleDeletePost} />
              </ProtectedRoute>
            } />
            <Route path="/admin/new" element={
              <ProtectedRoute>
                <BlogPostForm onAdd={handleAddPost} />
              </ProtectedRoute>
            } />
            <Route path="/admin/edit/:postId" element={
              <ProtectedRoute>
                <BlogPostForm posts={blogPosts} onUpdate={handleUpdatePost} />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
