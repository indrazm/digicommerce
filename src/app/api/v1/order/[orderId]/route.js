import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
   const orderId = params.orderId;
   let orderData;
   try {
      orderData = await prisma.order.findUnique({
         where: {
            id: orderId,
         },
         include: {
            user: {
               select: {
                  id: true,
                  name: true,
                  email: true,
               },
            },
            product: true,
         },
      });
      return NextResponse.json({ data: orderData }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ data: error }, { status: error.status });
   }
}
