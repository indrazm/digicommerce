import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
   const slug = params.productSlug;

   let productData;
   try {
      productData = await prisma.product.findUnique({
         where: {
            slug: slug,
         },
         include: {
            category: true,
            user: true,
         },
      });
      return NextResponse.json({ data: productData }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error }, { status: error.status });
   }
}
