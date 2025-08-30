"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
}

interface AdminDashboardPageProps {
  initialPosts: BlogPost[];
}

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/admin/login' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if(response.ok) {
        setPosts(prevPosts => prevPosts.filter(p => p._id !== id));
        // You could also use router.refresh() to re-fetch data from the server
        // router.refresh();
      } else {
        alert('Failed to delete post.');
      }
    }
  };

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Admin Dashboard</h1>
          <div>
            <Link
              href="/admin/new"
              className="inline-block text-md font-semibold bg-slate-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-slate-900 transition-colors mr-4"
            >
              + New Post
            </Link>
            <button
              onClick={handleLogout}
              className="inline-block text-md font-semibold bg-amber-400 text-slate-900 px-6 py-2 rounded-lg shadow-md hover:bg-amber-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 text-sm font-semibold text-slate-600">Title</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Excerpt</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post._id} className="border-b border-slate-100">
                    <td className="p-4 align-top text-slate-800 font-semibold">{post.title}</td>
                    <td className="p-4 align-top text-slate-600 text-sm max-w-lg">{post.excerpt}</td>
                    <td className="p-4 align-top text-right space-x-2 whitespace-nowrap">
                      <Link
                        href={`/admin/edit/${post._id}`}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-md transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-sm font-medium text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-slate-500">
                    No blog posts found. Create one to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;