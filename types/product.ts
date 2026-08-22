export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrls: string[];

  category: {
    id: number;
    name: string;
  };

  brand: {
    id: number;
    name: string;
  };
}

export interface ProductsResponse {
  data: Product[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
interface ProductFilters {
  category?: string;
  brand?: string;
  search?: string;
  sort?: string;

  minPrice?: number;
  maxPrice?: number;

  page: number;
  limit: number;
}
