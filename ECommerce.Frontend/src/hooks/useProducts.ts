import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';

export const useProducts = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => productService.getProducts(params),
    });
};

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => productService.getProductById(id),
        enabled: !!id,
    });
};
