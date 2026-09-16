import api from './api';

export const authService = {
    login: async (email: string, passwordHash: string) => {
        const response = await api.post('/users/login', {
            email,
            passwordHash
        });
        return response.data;
    },
    
    register: async (name: string, email: string, passwordHash: string) => {
        const response = await api.post('/users/register', {
            name,
            email,
            passwordHash,
            isActive: true
        });
        return response.data;
    }
};
