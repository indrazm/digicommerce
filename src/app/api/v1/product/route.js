import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(req) {
   try {
      const allProducts = await prisma.product.findMany({
         include: {
            category: true,
         },
      });
      return NextResponse.json({ data: allProducts }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ data: error }, { status: error.status });
   }
}

export async function POST(req) {
   const { name, shortDescription, overview, price, file, categoryId, featuredImage, images, userId } = await req.json();

   try {
      const createProduct = await prisma.product.create({
         data: {
            name,
            shortDescription,
            slug: slugify(name),
            overview,
            file,
            price: Number(price),
            featuredImage,
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
