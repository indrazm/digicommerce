import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(req) {
   const { searchParams } = new URL(req.url);
   const productId = searchParams.get("id");
   let productData;

   try {
      if (productId) {
         productData = await prisma.product.findUnique({
            where: {
               id: productId,
            },
         });
      } else {
         productData = await prisma.product.findMany({
            include: {
               category: true,
            },
         });
      }

      return NextResponse.json({ data: productData }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error }, { status: error.status });
   }
}

export async function POST(req) {
   const { name, shortDescription, overview, price, file, categoryId, featuredImage, images, userId } = await req.json();

   try {
      const createProduct = await prisma.product.create({
         data: {
            name,
            shortDescription,
            slug: slugify(name, { lower: true, strict: true }),
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
      return NextResponse.json({ error }, { status: error.status });
   }
}
