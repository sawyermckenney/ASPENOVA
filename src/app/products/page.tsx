import ProductCard from '@/components/ProductCard';
import { productsData } from '@/lib/placeholder-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Products - AspenFlow',
  description: 'Explore the innovative products offered by ASPENOVA.',
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Our Innovative <span className="text-primary">Solutions</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the range of products designed by ASPENOVA to elevate your experience and productivity. Each solution is crafted with precision, focusing on minimalist design and powerful functionality.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <section className="mt-16 md:mt-24 text-center bg-secondary/30 p-8 md:p-12 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Can't find what you're looking for?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          We are constantly innovating and developing new solutions. If you have specific needs or ideas, feel free to reach out to our team.
        </p>
        {/* <Button size="lg" className="shadow-md hover:shadow-lg transition-shadow">Contact Us</Button> */}
      </section>
    </div>
  );
}
