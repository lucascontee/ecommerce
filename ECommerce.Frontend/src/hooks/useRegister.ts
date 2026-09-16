import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';

interface RegisterData {
    name: string;
    email: string;
    passwordHash: string;
}

export const useRegister = () => {
    return useMutation({
        mutationFn: (data: RegisterData) => {
            return authService.register(data.name, data.email, data.passwordHash);
        }
    });
};