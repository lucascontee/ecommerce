import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import api from '../services/api';
import { formatCurrency } from '../utils';

export default function Checkout() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        } else {
            navigate('/');
        }
    }, [navigate]);

    const handlePayment = async () => {
        if (cartItems.length === 0) return;

        setIsProcessing(true);
        setError(null);

        // Fake payment loading
        setTimeout(async () => {
            try {
                // Montar DTO do pedido
                const orderPayload = {
                    items: cartItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))
                };

                const response = await api.post('/orders', orderPayload);
                
                if (response.status === 200 || response.status === 201) {
                    // Limpar carrinho e ir para tela de sucesso
                    localStorage.removeItem('cart');
                    window.dispatchEvent(new Event('cartUpdated'));
                    navigate('/success');
                }
            } catch (err: any) {
                setError(err.response?.data?.message || 'Erro ao processar pagamento ou pedido.');
                setIsProcessing(false);
            }
        }, 2000); // 2 segundos de loading simulando gateway de pagamento
    };

    if (isProcessing) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <h2 className="text-2xl font-semibold">Processando Pagamento...</h2>
                <p className="text-gray-500 mt-2">Por favor, não feche esta página.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8 text-center">Finalizar Compra</h1>
            
            {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                    {error}
                </div>
            )}

            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Resumo do Pedido</h2>
                <div className="space-y-4 mb-6">
                    {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-gray-700">
                            <span>Produto ID: {item.productId.substring(0, 8)}... (Qtd: {item.quantity})</span>
                        </div>
                    ))}
                </div>
                
                <div className="bg-blue-50 p-4 rounded mb-6">
                    <p className="text-sm text-blue-800">
                        * Como esta é uma simulação, os valores totais exatos foram ocultados no frontend por simplicidade, e o endereço será gerado automaticamente.
                    </p>
                </div>

                <Button 
                    className="w-full h-14 text-lg" 
                    onClick={handlePayment}
                >
                    Pagar Agora
                </Button>
            </Card>
        </div>
    );
}
