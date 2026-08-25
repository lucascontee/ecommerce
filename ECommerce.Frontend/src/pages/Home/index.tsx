import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function Home() {
    const { data: products, isLoading, isError } = useProducts({ limit: 8 });

    return (
        <div>
            <section className="bg-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to MyShop</h1>
                    <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                        Discover the latest trends and best deals on our high-quality products.
                    </p>
                    <Button variant="secondary" size="lg" asChild>
                        <Link to="/products">Shop Now</Link>
                    </Button>
                </div>
            </section>

            <section className="py-16 container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">Featured Products</h2>
                    <Link to="/products" className="text-blue-600 hover:underline font-medium">
                        View All
                    </Link>
                </div>
                
                {isLoading ? (
                    <div className="flex justify-center py-12"><LoadingSpinner /></div>
                ) : isError ? (
                    <div className="text-center py-12 text-red-500">Failed to load products.</div>
                ) : products?.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">No products found.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products?.slice(0, 8).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
