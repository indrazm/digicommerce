import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const allComments = await prisma.comments.findMany();
      return NextResponse.json({ data: allComments }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ data: error }, { status: error.status });
   }
}

export async function POST(req) {
   const { userId, productId, body } = await req.json();
   try {
      const createComment = await prisma.comments.create({
         data: {
            userId,
            productId,
            body,
         },
      });
      return NextResponse.json({ data: createComment }, { status: 201 });
   } catch (error) {
      console.log(error);
      return NextResponse.json({ data: error }, { status: error.status });
   }
}
