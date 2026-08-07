import ProductGrid from "@/components/product/ProductGrid";
import { ProductsResponse } from "@/types/product";
import ProductsHeader from "@/components/product/ProductsHeader";
import ProductFilters from "@/components/product/ProductFilters";
import { Category } from "@/types/category";
import { Brand } from "@/types/brand";
import ProductPagination from "@/components/product/ProductPagination";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    brand?: string;
    search?: string;
    sort?: string;
    page?: string;
    limit?: string;
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  // const response = await fetch("http://localhost:3000/api/products"); // zapytanie od folderu app/api/porducts/route.ts ktory korzysta
  // z product.service.ts i tam jest funkcja getProducts, ktora pobiera produkty z bazy danych i zwraca je w formacie JSON
  const params = await searchParams;
  const queryParams = new URLSearchParams();
  if (params.category) {
    queryParams.set("category", params.category);
  }
  if (params.brand) {
    queryParams.set("brand", params.brand);
  }
  if (params.search) {
    queryParams.set("search", params.search);
  }
  if (params.sort) {
    queryParams.set("sort", params.sort);
  }
  if (params.page) {
    queryParams.set("page", params.page);
  }
  if (params.limit) {
    queryParams.set("limit", params.limit);
  }
  // powyzsze ify sklejaja zapytanie do api np. /api/products?category=Mouse&brand=Logitech&search=mouse&sort=price&page=1&limit=10
  // powyzsze zapytanie api powstalo bo uzytkownik wybral kategorie Mouse, marke Logitech, wpisal w wyszukiwarce mouse, posortowal po cenie, wybral strone 1 i limit 10 produktow na stronie
  // wtedy dostaniemy konkretna odpowiedz z backendu, a nie wszystkie produkty, bo backend bedzie filtrowal produkty po kategoriach, markach, wyszukiwarce, sortowaniu, paginacji i limitach
  console.log("searchParams", params);
  const productsResponse = await fetch(
    `http://localhost:3000/api/products?${queryParams.toString()}`,
  );

  const categoriesResponse = await fetch(
    "http://localhost:3000/api/categories",
  );

  const brandsResponse = await fetch("http://localhost:3000/api/brands");

  const products: ProductsResponse = await productsResponse.json();
  const categories: Category[] = await categoriesResponse.json();
  const brands: Brand[] = await brandsResponse.json();
  return (
    <>
      <ProductsHeader total={products.pagination.total} />

      <ProductFilters categories={categories} brands={brands} />

      <ProductGrid products={products.data} />

      <ProductPagination
        page={products.pagination.page}
        totalPages={products.pagination.totalPages}
      />
    </>
  );
}
