import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function ForgotPassword() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <Card className="w-full max-w-md p-8 shadow-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Recuperar Senha</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Informe seu email e enviaremos instruções para redefinir sua senha.
                    </p>
                </div>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <Input 
                            type="email" 
                            required 
                            placeholder="seu@email.com" 
                        />
                    </div>
                    
                    <Button type="submit" className="w-full h-11 text-base">
                        Enviar Link
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        Voltar para o Login
                    </Link>
                </div>
            </Card>
        </div>
    );
}
