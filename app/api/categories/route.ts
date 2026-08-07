import { NextResponse } from "next/server";
import { getCategories } from "@/services/category.service";

export async function GET() {
  const categories = await getCategories();

  return NextResponse.json(categories);
}
