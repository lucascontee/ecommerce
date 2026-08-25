export interface Category {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
}

export interface ProductImage {
    id: string;
    productId: string;
    url: string;
    isPrimary: boolean;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    sku: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    images?: ProductImage[];
    category?: Category;
}

export interface PaginatedResult<T> {
    data: T[];
    totalCount: number;
    page: number;
    pageSize: number;
}
