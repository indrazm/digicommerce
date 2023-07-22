import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
   try {
      const allProducts = await prisma.product.findMany();
      return NextResponse.json({ data: allProducts }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ data: error }, { status: error.status });
   }
}

export async function POST(req) {
   const { name, description, price, highlights, images, categoryId, userId } = await req.json();

   try {
      const createProduct = await prisma.product.create({
         data: {
            name,
            description,
            price,
            highlights,
            images,
            categoryId,
            userId,
         },
      });
      return NextResponse.json({ data: createProduct }, { status: 201 });
   } catch (error) {
      console.log(error);
      return NextResponse.json({ data: error }, { status: error.status });
   }
}
