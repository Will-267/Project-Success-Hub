import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000); // Reset message after 5 seconds
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Get In Touch</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Have a question or need support? We're here to help.</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-slate-50 p-8 rounded-2xl shadow-lg border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Send us a Message</h2>
            {submitted ? (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
                    <p className="font-bold">Thank you!</p>
                    <p>Your message has been sent successfully.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                    <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                    <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                    <textarea
                    name="message"
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400"
                    ></textarea>
                </div>
                 {error && <p className="text-red-500 text-sm">{error}</p>}
                <div>
                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700 disabled:bg-slate-500 disabled:cursor-not-allowed"
                    >
                    {loading ? 'Sending...' : 'Submit Message'}
                    </button>
                </div>
                </form>
            )}
          </div>
          
          {/* Direct Contact */}
          <div className="space-y-8">
            <div className="bg-slate-50 p-8 rounded-2xl shadow-lg border border-slate-100 text-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Chat on WhatsApp</h3>
                <p className="text-slate-600 mb-6">For quick questions and support, send us a message directly.</p>
                <a href="https://wa.me/2340000000000" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-colors text-lg">
                    Start Chat
                </a>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl shadow-lg border border-slate-100 text-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Send an Email</h3>
                <p className="text-slate-600 mb-6">For detailed inquiries, you can reach us via our official email address.</p>
                <a href="mailto:support@projectsuccesshub.ng" className="font-semibold text-lg text-slate-700 hover:text-amber-500 transition-colors">
                    support@projectsuccesshub.ng
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
