import api from './api';
import { Product } from '../types';

export const productService = {
    getProducts: async (params?: Record<string, any>): Promise<Product[]> => {
        const response = await api.get<Product[]>('/products', { params });
        return response.data;
    },
    getProductById: async (id: string): Promise<Product> => {
        const response = await api.get<Product>(/products/ + id);
        return response.data;
    },
};
