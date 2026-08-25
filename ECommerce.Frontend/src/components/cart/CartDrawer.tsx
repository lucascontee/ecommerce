import { X, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils';
import { useProduct } from '../../hooks/useProducts';
import { useEffect, useState } from 'react';
import { generatePath } from 'react-router-dom';
import { CartItemDisplay } from './CartItemDisplay';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

interface StorageCartItem {
    productId: string;
    quantity: number;
}

class CartItem {
    productId: string;
    quantity: number;
    name: string;
    price: number;
    imageUrl: string;

    constructor(productId: string, quantity: number, name: string, price: number, imageUrl: string) {
        this.productId = productId;
        this.quantity = quantity;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    
const [cartItems, setCartItems] = useState<StorageCartItem[]>([]);
const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        loadCart();
        window.addEventListener('cartUpdated', loadCart);
        
        return () => window.removeEventListener('cartUpdated', loadCart);
    }, []);

    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        } else {
            setCartItems([]);
        }
    }

    function handlePriceLoaded(price: number, quantity: number) {
        setSubtotal(prev => prev + (price * quantity));
    }

    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
                    onClick={onClose}
                />
            )}

            <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">Seu Carrinho</h2>
                    <Button variant="ghost" size="sm" onClick={onClose} className="px-2">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
                    {cartItems.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                            <p>Seu carrinho está vazio.</p>
                        </div>
                    ) : (
                        // Aqui chamamos o novo componente passando apenas o ID e a quantidade
                        cartItems.map((item) => (
                            <CartItemDisplay 
                                key={item.productId} 
                                productId={item.productId} 
                                quantity={item.quantity}
                                onPriceLoaded={handlePriceLoaded}
                            />
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="border-t p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-4 text-sm font-medium text-gray-700">
                            <span>Subtotal</span>
                            <span className="text-lg font-bold text-gray-900">{formatCurrency(subtotal)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-4 text-center">
                            Frete e impostos calculados no checkout.
                        </p>
                        <Button className="w-full text-lg h-12">
                            Finalizar Compra
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
