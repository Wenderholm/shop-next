import { prisma } from "@/lib/prisma";
import { getProductById } from "@/services/product.service";
import { NextResponse } from "next/server";

// inforamacja dla TS dzieki temu mozemy zrobic destrukturyzacje w GET i pobrac id z params
// const { id } = await params;

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, { params }: RouteProps) {
  const { id } = await params;

  const product = await getProductById(Number(id));

  return NextResponse.json(product);
}
