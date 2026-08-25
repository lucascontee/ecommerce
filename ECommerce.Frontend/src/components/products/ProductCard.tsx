import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '../../utils';

export function ProductCard({ product }: { product: Product }) {
    const primaryImage = product.images?.find(i => i.isPrimary)?.url || 'https://via.placeholder.com/300?text=No+Image';

    function handleAddToCart() {
        const savedCart = localStorage.getItem('cart');
        let cart = savedCart ? JSON.parse(savedCart) : [];
        const existingProductIndex = cart.findIndex((item: { productId: string }) => item.productId === product.id);

        if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ productId: product.id, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    
    return (
        <Card className="flex flex-col h-full overflow-hidden group">
            <Link to={/products/ + product.id} className="relative block h-48 overflow-hidden bg-gray-100">
                <img 
                    src={primaryImage} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {!product.stockQuantity && (
                    <div className="absolute top-2 right-2">
                        <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>
                    </div>
                )}
            </Link>
            <div className="p-4 flex flex-col flex-1">
                <div className="text-xs text-gray-500 mb-1">{product.category?.name || 'Uncategorized'}</div>
                <Link to={/products/ + product.id} className="font-semibold text-lg line-clamp-2 hover:text-blue-600 mb-2">
                    {product.name}
                </Link>
                <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold text-xl">{formatCurrency(product.price)}</span>
                    <Button size="sm" disabled={product.stockQuantity === 0} title="Add to Cart (Future Integration)" onClick={() => handleAddToCart()}>
                        Add to Carts
                    </Button>
                </div>
            </div>
        </Card>
    );
}
