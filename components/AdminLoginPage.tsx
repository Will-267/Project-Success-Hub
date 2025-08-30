import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate credentials against a backend.
    // Here, we'll use a simple hardcoded check for demonstration.
    if (email === 'admin@example.com' && password === 'password') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[50vh]">
        <div className="max-w-md w-full mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <h1 className="text-3xl font-serif font-bold text-slate-900 text-center mb-8">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" aria-label="Password" className="block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400"
                placeholder="password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
