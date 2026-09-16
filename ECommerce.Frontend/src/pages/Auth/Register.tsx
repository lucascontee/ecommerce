import React, { useState } from 'react';
import { useRegister } from '../../hooks/useRegister';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationError, setValidationError] = useState('');
    const navigate = useNavigate();
    
    const { mutate: doRegister, isPending, isError, error } = useRegister();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError('');
        
        if (password !== confirmPassword) {
            setValidationError('As senhas não coincidem!');
            return;
        }

        doRegister(
            { name, email, passwordHash: password },
            {
                onSuccess: () => {
                    alert('Conta criada com sucesso!');
                    navigate('/login');
                }
            }
        );
    };

    const apiErrorMessage = (error as any)?.response?.data?.message || "Ocorreu um erro ao criar a conta.";

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
                
                {validationError && (
                    <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-sm text-center">
                        {validationError}
                    </div>
                )}

                {isError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
                        {apiErrorMessage}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome completo
                        </label>
                        <Input 
                            type="text" 
                            required 
                            placeholder="João da Silva" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <Button type="submit" className="w-full h-11 text-base" disabled={isPending}>
                        {isPending ? 'Cadastrando...' : 'Cadastrar'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
