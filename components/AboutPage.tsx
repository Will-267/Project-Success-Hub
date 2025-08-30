import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">About the Author</h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Meet the creator behind Project Success Hub.</p>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-white p-8 md:p-12 rounded-2xl shadow-lg">
            <div className="md:w-1/3 flex-shrink-0">
                <img 
                    src="https://picsum.photos/seed/author_new/400/400" 
                    alt="Author John Adekunle" 
                    className="rounded-full w-48 h-48 md:w-64 md:h-64 mx-auto object-cover border-8 border-amber-400"
                />
            </div>
            <div className="md:w-2/3 text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">John Adekunle</h2>
                <div className="space-y-4 text-slate-600">
                    <p>
                        "I remember the sleepless nights and overwhelming stress of my own final year project. I saw so many brilliant friends struggle, not because they weren't smart, but because they lacked a clear, practical guide for the research writing process."
                    </p>
                    <p>
                        "With over a decade of experience as an academic mentor and researcher, I've distilled my knowledge into these resources. My mission is simple: to empower every Nigerian student to complete their final year project with confidence and skill, turning a source of stress into an opportunity for growth."
                    </p>
                    <p className="text-slate-700 font-semibold mt-6">
                        I believe in you, and I've created the tools to help you succeed.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
