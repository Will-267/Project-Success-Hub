"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlogPostData {
  _id?: string;
  title: string;
  excerpt: string;
  imageUrl: string;
}

interface BlogPostFormProps {
  post?: BlogPostData;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ post }) => {
  const router = useRouter();
  const isEditing = post !== undefined;

  const [formData, setFormData] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    imageUrl: post?.imageUrl || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const url = isEditing ? `/api/posts/${post?._id}` : '/api/posts';
    const method = isEditing ? 'PUT' : 'POST';

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        router.push('/admin/dashboard');
        router.refresh(); // Important to refresh server components
    } else {
        alert(`Failed to ${isEditing ? 'update' : 'create'} post.`);
    }
  };

  return (
    <div className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-8">
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400"
              />
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-700">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                id="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700">Excerpt</label>
              <textarea
                name="excerpt"
                id="excerpt"
                rows={6}
                value={formData.excerpt}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400"
              ></textarea>
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <button
                    type="button"
                    onClick={() => router.push('/admin/dashboard')}
                    className="py-2 px-6 border border-slate-300 rounded-md shadow-sm text-md font-medium text-slate-700 bg-white hover:bg-slate-50"
                >
                    Cancel
                </button>
                 <button
                    type="submit"
                    className="py-2 px-6 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-slate-800 hover:bg-slate-900"
                >
                    {isEditing ? 'Update Post' : 'Create Post'}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogPostForm;
