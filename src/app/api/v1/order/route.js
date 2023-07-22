import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req) {
   let orderData;

   try {
      orderData = await prisma.order.findMany();
      return NextResponse.json({ data: orderData }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ data: error }, { status: error.status });
   }
}

export async function POST(req) {
   const { userId, productId } = await req.json();

   try {
      const createOrder = await prisma.order.create({
         data: {
            userId,
            productId,
         },
      });
      return NextResponse.json({ data: createOrder }, { status: 201 });
   } catch (error) {
      return NextResponse.json({ data: error }, { status: error.status });
   }
}
