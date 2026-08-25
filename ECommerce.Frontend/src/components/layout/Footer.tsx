import React from 'react';

export function Footer() {
    return (
        <footer className="border-t bg-gray-50 mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">MyShop</h3>
                        <p className="text-sm text-gray-600">
                            Your one-stop shop for everything you need. Quality products, great prices.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="/products">All Products</a></li>
                            <li><a href="#">Featured</a></li>
                            <li><a href="#">New Arrivals</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Shipping Policy</a></li>
                            <li><a href="#">Returns & Exchanges</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} MyShop. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
