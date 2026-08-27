import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProducts';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatCurrency } from '../../utils';
import { ShoppingCart } from 'lucide-react';

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const { data: product, isLoading, isError } = useProduct(id!);

    if (isLoading) return <div className="flex justify-center py-20"><LoadingSpinner /></div>;
    if (isError || !product) return <div className="text-center py-20 text-red-500">Product not found.</div>;

    const primaryImage = product.images?.find(i => i.isPrimary)?.url || 'https://via.placeholder.com/600?text=No+Image';

    function handleAddToCart() {
        const savedCart = localStorage.getItem('cart');
        let cart = savedCart ? JSON.parse(savedCart) : [];
        const existingProductIndex = cart.findIndex((item: { productId: string }) => item.productId === product?.id);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ productId: product?.id, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center min-h-[400px]">
                    <img src={primaryImage} alt={product.name} className="max-w-full max-h-full object-contain" />
                </div>

                <div className="flex flex-col">
                    <div className="mb-2">
                        {product.category?.name && (
                            <span className="text-sm text-blue-600 font-medium">{product.category.name}</span>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                    <div className="text-3xl font-bold text-gray-900 mb-6">{formatCurrency(product.price)}</div>
                    
                    <div className="mb-6">
                        <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    </div>

                    <div className="mb-8 space-y-2 text-sm text-gray-500">
                        <p>SKU: <span className="font-medium text-gray-900">{product.sku}</span></p>
                        <p>Availability: 
                            {product.stockQuantity > 0 ? (
                                <span className="text-green-600 font-medium ml-2">In Stock ({product.stockQuantity})</span>
                            ) : (
                                <span className="text-red-600 font-medium ml-2">Out of Stock</span>
                            )}
                        </p>
                    </div>

                    <div className="mt-auto pt-8 border-t">
                        <Button size="lg" className="w-full md:w-auto text-lg" disabled={product.stockQuantity === 0} onClick={handleAddToCart}>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
