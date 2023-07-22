import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req) {
   let data;
   try {
      data = await prisma.user.findMany();
      return NextResponse.json({ data }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ data: error }, { status: error.status });
   }
}

export async function POST() {}
