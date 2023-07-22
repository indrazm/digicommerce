import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
   const { searchParams } = new URL(req.url);
   const userId = searchParams.get("id");

   try {
      let userData;

      if (userId) {
         userData = await prisma.user.findFirst({
            where: {
               id: userId,
            },
         });
      } else {
         userData = await prisma.user.findMany();
      }

      return NextResponse.json({ data: userData }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ data: error }, { status: error.status });
   }
}

export async function POST(req) {
   const { email, password, name } = await req.json();
   try {
      const createUser = await prisma.user.create({
         data: {
            email,
            password,
            name,
         },
      });
      return NextResponse.json({ data: createUser }, { status: 201 });
   } catch (error) {
      return NextResponse.json({ data: error }, { status: error.status });
   }
}

export async function PATCH(req) {
   const { name, bio, password, email } = await req.json();
   try {
      const updateUser = await prisma.user.update({
         data: {
            email,
            password,
            name,
            bio,
         },
      });
      return NextResponse.json({ data: updateUser }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ data: error }, { status: error.status });
   }
}

export async function DELETE(req) {
   try {
      const deleteUser = await prisma.user.delete({
         where: {
            id,
         },
      });
      return NextResponse.json({ data: deleteUser }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ data: error }, { status: error.status });
   }
}
