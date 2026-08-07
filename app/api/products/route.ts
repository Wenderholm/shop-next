import { NextResponse } from "next/server";
import { getProducts } from "@/services/product.service";

// Next.js widzi:
// app/api/products/route.ts
// i mówi:
// ("Jest to endpoint /api/products.");

export async function GET(request: Request) {
  //   const url = new URL(request.url);
  // pokazaloby nam to samo co w linijce 6, ale w bardziej rozbudowanej formie czyli
  // {
  //   "href": "http://localhost:3000/api/products?category=Mouse",
  //   "origin": "http://localhost:3000",
  //   "protocol": "http:",
  //   "username": "",
  //   "password": "",
  //   "host": "localhost:3000",
  //   "hostname": "localhost",
  //   "port": "3000",
  //   "pathname": "/api/products",
  //   "search": "?category=Mouse",
  //   "searchParams": URLSearchParams { 'category' => 'Mouse' },
  //   "hash": ""
  // }

  // my wybieramy z tego tylko searchParams, bo to nas interesuje, bo chcemy pobrac kategorie z query stringa
  const { searchParams } = new URL(request.url);
  // get('category') -> pobiera nam wartosc z query stringa dla klucza 'category' czyli np. Mouse
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");
  const page = Number(searchParams.get("page")) || 1; // jezeli ktos wejdzeie na /api/products to page z autoamtu ustai sie na 1, bo nie bedzie w query stringu page, a jezeli ktos wejdzie na /api/products?page=2 to page bedzie rowne 2
  const limit = Number(searchParams.get("limit")) || 10; // jezeli ktos wejdzieie na /api/products to limit z autoamtu ustai sie na 10, bo nie bedzie w query stringu limit, a jezeli ktos wejdzie na /api/products?limit=20 to limit bedzie rowne 20
  const products = await getProducts({
    // tu category bedzie Mouse jesli w query stringu bedzie category=Mouse, a jesli nie bedzie to bedzie undefined
    // w getProducts w product.service.ts wejdzie to w zapytanie where i bedzie szukac produktow z danej kategorii, a jesli category bedzie undefined to nie bedzie filtrowac po kategorii
    category: category ?? undefined,
    brand: brand ?? undefined,
    search: search ?? undefined,
    sort: sort ?? undefined,
    page,
    limit,
  });

  return NextResponse.json(products);
}
