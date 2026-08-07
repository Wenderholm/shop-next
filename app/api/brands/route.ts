import { NextResponse } from "next/server";
import { getBrands } from "@/services/brand.service";

export async function GET() {
  const brands = await getBrands();

  return NextResponse.json(brands);
}
