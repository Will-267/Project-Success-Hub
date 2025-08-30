import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { BlogPost } from '../App';

interface BlogPostFormProps {
  posts?: BlogPost[]; // Keep for finding post data on edit
  onAdd?: (post: Omit<BlogPost, 'id'>) => void;
  onUpdate?: (id: string, post: BlogPost) => void;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ onAdd, onUpdate }) => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const isEditing = postId !== undefined;

  const [formData, setFormData] = useState<Omit<BlogPost, 'id'> & { id?: string }>({
    title: '',
    excerpt: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (isEditing && postId) {
      // In a real app with many posts, you would fetch the specific post by ID
      // fetch(`/api/posts/${postId}`).then(res => res.json()).then(setFormData)
      // For this example, we find it in the props, but a direct fetch is better.
      fetch(`/api/posts`)
        .then(res => res.json())
        .then(posts => {
            const postToEdit = posts.find((p: BlogPost) => p.id === postId);
            if (postToEdit) {
                setFormData(postToEdit);
            }
        });
    }
  }, [isEditing, postId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing && postId) {
        if(onUpdate) onUpdate(postId, formData as BlogPost);
    } else {
        if(onAdd) onAdd(formData);
    }
    navigate('/admin/dashboard');
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
                    onClick={() => navigate('/admin/dashboard')}
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
