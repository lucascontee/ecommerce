import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';

interface LoginData {
    email: string;
    passwordHash: string;
}

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: LoginData) => {
            return authService.login(data.email, data.passwordHash);
        }
    });
};