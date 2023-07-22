import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
   const productId = params.productId;
   let productData;
   try {
      productData = await prisma.product.findUnique({
         where: {
            id: productId,
         },
      });
      return NextResponse.json({ data: productData }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ data: error }, { status: error.status });
   }
}
