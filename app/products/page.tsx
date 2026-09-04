import ProductGrid from "@/components/product/ProductGrid";
import { ProductsResponse } from "@/types/product";
import ProductFilters from "@/components/product/ProductFilters";
import { Category } from "@/types/category";
import { Brand } from "@/types/brand";
import ProductPagination from "@/components/product/ProductPagination";
import ProductsToolbar from "@/components/product/ProductsToolbar";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    brand?: string;
    search?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
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
  if (params.minPrice) {
    queryParams.set("minPrice", params.minPrice);
  }

  if (params.maxPrice) {
    queryParams.set("maxPrice", params.maxPrice);
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

  const productsResponse = await fetch(
    `http://localhost:3000/api/products?${queryParams.toString()}`,
  );

  const categoriesResponse = await fetch(
    "http://localhost:3000/api/categories",
  );

  const searchBrandsResponse = await fetch(
    `http://localhost:3000/api/brands?category=${params.category ?? ""}`,
  );

  const products: ProductsResponse = await productsResponse.json();

  const categories: Category[] = await categoriesResponse.json();

  const brands: Brand[] = await searchBrandsResponse.json();

  return (
    <>
      <div className="px-4 pt-6 md:hidden">
        <details className="rounded-md border border-border-default bg-surface">
          <summary className="cursor-pointer px-4 py-3 text-lg font-medium text-foreground">
            Filters
          </summary>

          <ProductFilters categories={categories} brands={brands} />
        </details>
      </div>

      <div className="flex flex-col pt-6 md:flex-row md:pt-10">
        <aside className="hidden w-60 shrink-0 border-t border-r border-border-default md:block">
          <ProductFilters categories={categories} brands={brands} />
        </aside>

        <section className="mb-10 min-w-0 flex-1 border-t border-border-default px-4 pt-6 md:pl-6 md:pt-10 lg:pl-10">
          <ProductsToolbar />
          <ProductGrid products={products.data} />

          <div className="mt-8">
            <ProductPagination
              page={products.pagination.page}
              totalPages={products.pagination.totalPages}
            />
          </div>
        </section>
      </div>
    </>
  );
}
