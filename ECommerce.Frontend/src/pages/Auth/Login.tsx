import React, { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const { mutate: fazerLogin, isPending, isError, error } = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        fazerLogin(
            { email, passwordHash: password }, 
            {
                onSuccess: () => {
                    navigate('/'); // Redireciona para a página principal
                }
            }
        );
    };

    // Extrai a mensagem de erro da resposta da API (ou uma genérica)
    const errorMessage = (error as any)?.response?.data?.message || "Email ou senha inválidos. Tente novamente.";

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
                
                {isError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
                        {errorMessage}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <Input 
                            type="email" 
                            required 
                            placeholder="seu@email.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                    <Button type="submit" className="w-full h-11 text-base" disabled={isPending}>            
                        {isPending ? 'Entrando...' : 'Entrar'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
