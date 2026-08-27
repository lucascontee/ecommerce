import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export default function Register() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <Card className="w-full max-w-md p-8 shadow-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Criar uma conta</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Já possui conta?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Fazer login
                        </Link>
                    </p>
                </div>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome completo
                        </label>
                        <Input 
                            type="text" 
                            required 
                            placeholder="João da Silva" 
                        />
                    </div>

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
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Senha
                        </label>
                        <Input 
                            type="password" 
                            required 
                            placeholder="••••••••" 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmar Senha
                        </label>
                        <Input 
                            type="password" 
                            required 
                            placeholder="••••••••" 
                        />
                    </div>

                    <Button type="submit" className="w-full h-11 text-base">
                        Cadastrar
                    </Button>
                </form>
            </Card>
        </div>
    );
}
