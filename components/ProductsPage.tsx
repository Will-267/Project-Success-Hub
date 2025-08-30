import React from 'react';

const ProductCard: React.FC<{
  title: string;
  description: string;
  price: string;
  links: { href: string; label: string; platform: string }[];
  isBundle?: boolean;
}> = ({ title, description, price, links, isBundle = false }) => {
  const cardClasses = `bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full ${isBundle ? 'border-4 border-amber-400' : 'border-4 border-transparent'}`;

  return (
    <div className={cardClasses}>
      {isBundle && (
        <div className="bg-amber-400 text-slate-900 text-sm font-bold tracking-wider uppercase py-1 px-4 rounded-full self-start mb-6 -mt-12 mx-auto">
          Best Value
        </div>
      )}
      <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-600 mb-6 flex-grow">{description}</p>
      <div className="text-4xl font-bold text-slate-800 mb-8">{price}</div>
      <div className="mt-auto flex flex-col gap-3">
        {links.map((link) => (
          <a
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center font-semibold bg-slate-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-slate-900 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

const ProductsPage: React.FC = () => {
  return (
    <div className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Our Products</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Choose the perfect resource to guide you to success.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 items-stretch">
          {/* Ebook */}
          <ProductCard
            title="📘 The Complete Guidebook (eBook)"
            description="A comprehensive, step-by-step PDF guide covering everything from topic selection to data analysis and referencing. Includes practical templates and checklists."
            price="₦5,000"
            links={[{ href: 'https://selar.co/', label: 'Buy on Selar', platform: 'Selar' }]}
          />
          
          {/* Bundle */}
          <div className="lg:scale-105 z-10">
            <ProductCard
              title="🏆 The Ultimate Success Bundle"
              description="Get the complete package! Includes the eBook and the full video course at a discounted price. The best way to ensure you have all the tools for an 'A' grade."
              price="₦12,000"
              links={[{ href: 'https://selar.co/', label: 'Get the Bundle on Selar', platform: 'Selar' }]}
              isBundle={true}
            />
          </div>

          {/* Video Course */}
          <ProductCard
            title="🎥 The Video Training Course"
            description="Over 5 hours of on-demand video lessons that visually explain each chapter of your project. Perfect for visual learners who want to see concepts in action."
            price="₦10,000"
            links={[
              { href: 'https://selar.co/', label: 'Buy on Selar', platform: 'Selar' },
              { href: 'https://pptlinks.com/', label: 'Buy on PPTLinks', platform: 'PPTLinks' },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
