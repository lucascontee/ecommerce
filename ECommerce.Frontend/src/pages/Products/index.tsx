import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/products/ProductCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function Products() {
    // In a real app, you'd manage state for filters, search, and pagination here
    const { data: products, isLoading, isError } = useProducts();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">All Products</h1>
            
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters (Static for now) */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-4 text-lg">Filters</h3>
                        <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
                            <div className="space-y-2 text-sm">
                                <label className="flex items-center gap-2"><input type="checkbox" /> Electronics</label>
                                <label className="flex items-center gap-2"><input type="checkbox" /> Clothing</label>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Price</h4>
                            <div className="space-y-2 text-sm">
                                <label className="flex items-center gap-2"><input type="radio" name="price" /> Under </label>
                                <label className="flex items-center gap-2"><input type="radio" name="price" />  - </label>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    {isLoading ? (
                        <div className="flex justify-center py-20"><LoadingSpinner /></div>
                    ) : isError ? (
                        <div className="text-center py-20 text-red-500">Failed to load products.</div>
                    ) : products?.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">No products match your criteria.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products?.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
