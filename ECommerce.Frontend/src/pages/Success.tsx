import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CheckCircle } from 'lucide-react';

export default function Success() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
            <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Compra Aprovada!</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
                Seu pagamento foi processado com sucesso e o pedido foi criado. Você receberá um e-mail com os detalhes em breve.
            </p>
            <Link to="/">
                <Button className="h-12 px-8 text-lg">
                    Continuar Comprando
                </Button>
            </Link>
        </div>
    );
}
