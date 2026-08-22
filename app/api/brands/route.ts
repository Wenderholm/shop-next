import { NextRequest, NextResponse } from "next/server";

import { getSearchBrands } from "@/services/brand.service";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");

  const brands = await getSearchBrands(category ?? undefined);

  return NextResponse.json(brands);
}
