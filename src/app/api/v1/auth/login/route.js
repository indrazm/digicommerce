import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
   return NextResponse.json({ message: "This route only works for POST METHOD" }, { status: 200 });
}

export async function POST(req) {
   const { email, password } = await req.json();
   try {
      const userData = await prisma.user.findFirst({
         where: {
            email,
         },
      });

      if (userData) {
         /**
          * TODO
          * - Create a Logic to generate JWT from userData
          */
      }

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
