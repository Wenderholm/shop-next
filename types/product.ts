export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;

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
