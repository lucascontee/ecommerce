import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CartDrawer } from '../cart/CartDrawer';

export function Header() {
    const [isCartOpen, setIsCartOpen] = useState(false);

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
                    <Button variant="ghost" className="px-2" title="Login">
                        <User className="h-5 w-5 mr-2" />
                        <span className="hidden sm:inline">Login</span>
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="px-2 relative" 
                        title="Carrinho"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center">
                            2
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
