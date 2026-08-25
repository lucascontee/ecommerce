import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatCurrency } from '@/utils';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    // Static dummy data just for the UI visualization
    const dummyItems = [
        {
            id: '1',
            name: 'Mouse Gamer Logitech G203',
            price: 150.00,
            quantity: 1,
            imageUrl: 'https://via.placeholder.com/150?text=Mouse'
        },
        {
            id: '2',
            name: 'Monitor LG 24" IPS',
            price: 800.00,
            quantity: 2,
            imageUrl: 'https://via.placeholder.com/150?text=Monitor'
        }
    ];

    const subtotal = dummyItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Side Panel */}
            <div 
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">Seu Carrinho</h2>
                    <Button variant="ghost" size="sm" onClick={onClose} className="px-2">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Body / Items */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
                    {dummyItems.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                            <p>Seu carrinho está vazio.</p>
                        </div>
                    ) : (
                        dummyItems.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <img src={item.imageUrl} alt={item.name} className="h-20 w-20 object-cover rounded border" />
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between gap-2">
                                        <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                                        <button className="text-gray-400 hover:text-red-500 mt-0.5">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="text-sm font-bold mt-1 text-blue-600">
                                        {formatCurrency(item.price)}
                                    </div>
                                    <div className="mt-auto flex items-center gap-3">
                                        <div className="flex items-center border rounded">
                                            <button className="px-2 py-1 hover:bg-gray-100 text-gray-600">
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="text-sm px-2 text-center min-w-[30px] font-medium">
                                                {item.quantity}
                                            </span>
                                            <button className="px-2 py-1 hover:bg-gray-100 text-gray-600">
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Summary */}
                {dummyItems.length > 0 && (
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
