import { Trash2, Plus, Minus } from 'lucide-react';
import { useProduct } from '../../hooks/useProducts'; // Seu Hook
import { formatCurrency } from '../../utils';
import { useEffect } from 'react';

interface CartItemDisplayProps {
    productId: string;
    quantity: number;
    onPriceLoaded: (price: number, quantity: number) => void;
}

export function CartItemDisplay({ productId, quantity, onPriceLoaded }: CartItemDisplayProps) {
    const { data: product } = useProduct(productId);

    const price = product?.price || 0;
    const name = product?.name || 'Carregando...';
    const imageUrl = product?.images?.find((i: any) => i.isPrimary)?.url || 'https://via.placeholder.com/300?text=No+Image';

    useEffect(() => {
        if (price > 0) {
            onPriceLoaded(price, quantity);
        }
        
        return () => {
            if (price > 0) {
                onPriceLoaded(-price, quantity);
            }
        };
    }, [price, quantity]);

    return (
        <div className="flex gap-4">
            <img src={imageUrl} alt={name} className="h-20 w-20 object-cover rounded border" />
            <div className="flex-1 flex flex-col">
                <div className="flex justify-between gap-2">
                    <h3 className="font-medium text-sm line-clamp-2">{name}</h3>
                    <button className="text-gray-400 hover:text-red-500 mt-0.5">
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
                <div className="text-sm font-bold mt-1 text-blue-600">
                    {formatCurrency(price)}
                </div>
                <div className="mt-auto flex items-center gap-3">
                    <div className="flex items-center border rounded">
                        <button className="px-2 py-1 hover:bg-gray-100 text-gray-600">
                            <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm px-2 text-center min-w-[30px] font-medium">
                            {quantity}
                        </span>
                        <button className="px-2 py-1 hover:bg-gray-100 text-gray-600">
                            <Plus className="h-3 w-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}