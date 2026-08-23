import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

// jezeli ktos wejdzie na endpoint /api/auth/register to wywoła się funkcja POST
export async function POST(request: Request) {
  const { firstName, email, password, address } = await request.json();

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      {
        message: "User with this email already exists",
      },
      {
        status: 409,
      },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      firstName,
      email,
      passwordHash,
      address,
    },
  });

  return NextResponse.json(
    {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
    },
    {
      status: 201,
    },
  );
}
