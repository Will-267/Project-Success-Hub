import React, { useState, useEffect } from 'react';
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
    id: string;
    title: string;
    excerpt: string;
    imageUrl: string;
}

const App: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(setBlogPosts)
      .catch(error => console.error("Failed to fetch posts:", error));
  }, []);

  const handleAddPost = (post: Omit<BlogPost, 'id'>) => {
    fetch('/api/posts', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(post),
    })
    .then(res => res.json())
    .then(newPost => {
      setBlogPosts(prevPosts => [newPost, ...prevPosts]);
    });
  };

  const handleUpdatePost = (id: string, updatedPost: BlogPost) => {
    fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(updatedPost),
    })
    .then(res => res.json())
    .then(returnedPost => {
      setBlogPosts(prevPosts => 
        prevPosts.map(p => p.id === id ? returnedPost : p)
      );
    });
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      .then(res => {
        if(res.ok) {
          setBlogPosts(prevPosts => prevPosts.filter(p => p.id !== id));
        } else {
          alert('Failed to delete post.');
        }
      });
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
