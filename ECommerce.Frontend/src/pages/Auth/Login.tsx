import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export default function Login() {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <Card className="w-full max-w-md p-8 shadow-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Entrar na sua conta</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Não tem uma conta?{' '}
                        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                            Cadastre-se grátis
                        </Link>
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
                    
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Senha
                            </label>
                            <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                Esqueceu a senha?
                            </Link>
                        </div>
                        <Input 
                            type="password" 
                            required 
                            placeholder="••••••••" 
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Lembrar de mim
                        </label>
                    </div>

                    <Button type="submit" className="w-full h-11 text-base" onClick={handleSubmit}>
                        Entrar
                    </Button>
                </form>
            </Card>
        </div>
    );
}
