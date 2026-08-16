import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

interface ProductFilters {
  category?: string;
  brand?: string;
  search?: string;
  sort?: string;
  page: number;
  limit: number;
}

export async function getProducts(filters: ProductFilters) {
  const where: Prisma.ProductWhereInput = {
    ...(filters.category && {
      category: {
        name: filters.category,
      },
    }),
    ...(filters.brand && {
      brand: {
        name: filters.brand,
      },
    }),
    ...(filters.search && {
      name: {
        contains: filters.search,
        mode: "insensitive", // - ignorowanie wielkosci liter w wyszukiwaniu
      },
    }),
  };

  const products = await prisma.product.findMany({
    // include: {
    //   category: true,
    //   brand: true,
    // },

    // where oznacza znajdz wszystkie produkty, które mają kategorię o nazwie takiej jak w filtrach -> czli podany jako argument np
    // getProducts({ category: "Mouse" }) -> znajdz wszystkie produkty, które mają kategorię o nazwie "Mouse"
    // dziala to tak ze spred rozpakowuje elementy ale dopiero wtedy
    // jak nie ma wstawi undefined z rownania jak nie ma parametru -> category: category ?? undefined, a jak jest to wstawi do where i bedzie filtrowac po tym

    //    opis
    // jezeli mam where: {
    //    name: "Logitech MX Master 3S"
    // } to oznacza w SQL -> WHERE name = 'Logitech MX Master 3S'
    //
    // jezeli mam where: {
    //     name: {
    //         contains: "Master"
    //     }
    // } to oznacza w SQL -> WHERE name LIKE '%Master%' wyszukiwanie wszystkiego z co zawiera w nazwie Master

    where,
    // orderBy: filters.sort
    //   ? {
    //       price: filters.sort === "asc" ? "asc" : "desc",
    //     }
    //   : undefined,
    // poniezej zamieniamy jak w azapytaniu bedzie sort=priceAsc zmieniamy na orderBy: { price: "asc" } a jak bedzie sort=priceDesc to orderBy: { price: "desc" } a jak nie bedzie sort to undefined
    // mozna jak wyzej jest porsciej ale w miare rozbudowy filtoowania np roznaco po cenie bedzie to trudne do czytania i zrozumienia wiec lepiej tak jak ponizej
    // ORDER BY price ASC - sort=priceAsc
    orderBy:
      filters.sort === "priceAsc"
        ? { price: "asc" }
        : filters.sort === "priceDesc"
          ? { price: "desc" }
          : undefined,

    // jak dziala skip i take w prisma to skip pomija ileś tam rekordów a take bierze ileś tam rekordów
    // np  strona 1 skip: 0, take: 10 -> pomija pierwsze 0 rekordów i bierze kolejne 10 rekordów czyli rekordy od 1 do 10
    // np  strona 2 skip: 10, take: 10 -> pomija pierwsze 10 rekordów i bierze kolejne 10 rekordów czyli rekordy od 11 do 20
    // np  strona 3 skip: 20, take: 10 -> pomija pierwsze 20 rekordów i bierze kolejne 10 rekordów czyli rekordy od 21 do 30
    // np  strona 4 skip: 30, take: 10 -> pomija pierwsze 30 rekordów i bierze kolejne 10 rekordów czyli rekordy od 31 do 40
    // np skip: (filters.page - 1) * filters.limit, take: filters.limit -> jezeli page=1 i limit=10 to skip=0 i take=10 czyli
    skip: (filters.page - 1) * filters.limit,
    take: filters.limit,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      stock: true,
      imageUrl: true,

      category: {
        select: {
          id: true,
          name: true,
        },
      },

      brand: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const total = await prisma.product.count({
    where,
  });
  const totalPages = Math.ceil(total / filters.limit);

  //   console.log("liczba danego produktu", products.length);
  //   console.log("liczba calkowita", total);
  //   console.log(
  //     `liczba stron ktora bedzie wyswietlana w pagintaion przy limiecie na strone ${filters.limit}:`,
  //     totalPages,
  //   );

  //   products
  // page
  // limit
  // total
  // totalPages
  return {
    data: products,

    pagination: {
      page: filters.page,
      limit: filters.limit,
      total,
      totalPages,
    },
  };
}

export async function getProductById(id: number) {
  return prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      brand: true,
    },
  });
}

// include: true, bo chcemy pobrać również dane z relacji (category i brand) dla każdego produktu
// Nie musisz robić:
// JOIN Category
// JOIN Brand

// bez include
// "id": 1,
// "name": "Logitech MX Master 3S",
// "description": "Premium wireless productivity mouse.",
// "price": 449.99,
// "stock": 25,
// "imageUrl": "https://...",
// "categoryId": 1,
// "brandId": 1

// z include
// {
//         "id": 1,
//         "name": "Logitech MX Master 3S",
//         "description": "Premium wireless productivity mouse.",
//         "price": 449.99,
//         "stock": 25,
//         "imageUrl": "https://...",
//         "categoryId": 1,
//         "brandId": 1,
//         "category": {
//             "id": 1,
//             "name": "Mouse",
//             "description": "Computer mice for work and gaming.",
//             "image": "https://...",
//             "exploreInfo": "Find the perfect mouse."
//         },
//         "brand": {
//             "id": 1,
//             "name": "Logitech",
//             "image": "https://..."
//         }
//     }

// SELECT - w odrozenieniu od includ nie pobiera wszytskiego tylko pokazuje co ma byc wypisane
// {
//         "id": 1,
//         "name": "Logitech MX Master 3S",
//         "description": "Premium wireless productivity mouse.",
//         "price": 449.99,
//         "stock": 25,
//         "imageUrl": "https://...",
//         "category": {
//             "id": 1,
//             "name": "Mouse"
//         },
//         "brand": {
//             "id": 1,
//             "name": "Logitech"
//         }
//     },

export async function getRecommendedProducts() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      stock: true,
      imageUrl: true,

      category: {
        select: {
          id: true,
          name: true,
        },
      },

      brand: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const shuffled = products.sort(() => Math.random() - 0.5);

  return shuffled.slice(0, 6);
}
