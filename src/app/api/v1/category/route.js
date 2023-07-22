import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const allCategory = await prisma.category.findMany();
      return NextResponse.json({ data: allCategory }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ data: error }, { status: error.status });
   }
}

export async function POST(req) {
   const { name } = await req.json();

   try {
      const createCategory = await prisma.category.create({
         data: {
            name,
         },
      });
      return NextResponse.json({ data: createCategory }, { status: 201 });
   } catch (error) {
      console.log(error);
      return NextResponse.json({ data: error }, { status: error.status });
   }
}
