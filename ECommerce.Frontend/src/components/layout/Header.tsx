import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CartDrawer } from '../cart/CartDrawer';

import { decodeJwt } from '../../utils/jwt';

export function Header() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState<any>(null);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    function loadAuth() {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = decodeJwt(token);
            setUser(decoded);
        } else {
            setUser(null);
        }
    }

    function loadCartTotal() {
        const savedCart = localStorage.getItem('cart');
        const cart = savedCart ? JSON.parse(savedCart) : [];
        const total = cart.reduce((acc: any, item: any) => acc + item.quantity, 0);
        setCartCount(total);
    }

    useEffect(() => {
        loadCartTotal();
        loadAuth();

        window.addEventListener('cartUpdated', loadCartTotal);
        window.addEventListener('authUpdated', loadAuth);

        return () => {
            window.removeEventListener('cartUpdated', loadCartTotal);
            window.removeEventListener('authUpdated', loadAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsUserMenuOpen(false);
        window.dispatchEvent(new Event('authUpdated'));
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-xl font-bold text-blue-600">
                        MyShop
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                            Products
                        </Link>
                        <Link to="/categories" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                            Categories
                        </Link>
                    </nav>
                </div>
                
                <div className="flex-1 max-w-md hidden lg:block">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input type="search" placeholder="Search products..." className="pl-9 bg-gray-50" />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {user ? (
                        <div className="relative">
                            <Button 
                                variant="ghost" 
                                className="px-2" 
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            >
                                <User className="h-5 w-5 mr-2" />
                                {/* Pega o nome a partir das claims comuns do JWT */}
                                <span className="hidden sm:inline">
                                    {user.name || user.unique_name || "Perfil"}
                                </span>
                            </Button>
                            
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50 py-1">
                                    <div className="px-4 py-2 border-b">
                                        <p className="text-sm font-semibold text-gray-800 truncate">
                                            {user.name || user.unique_name || "Usuário"}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user.email || ""}
                                        </p>
                                    </div>
                                    <button 
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        Editar Perfil
                                    </button>
                                    <button 
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        onClick={handleLogout}
                                    >
                                        Sair
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login">
                            <Button variant="ghost" className="px-2" title="Login">
                                <User className="h-5 w-5 mr-2" />
                                <span className="hidden sm:inline">Login</span>
                            </Button>
                        </Link>
                    )}
                    <Button 
                        variant="ghost" 
                        className="px-2 relative" 
                        title="Carrinho"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center">
                            {cartCount}
                        </span>
                    </Button>
                </div>
            </div>

            <CartDrawer 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
            />
        </header>
    );
}
