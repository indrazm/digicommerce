import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";
import { compareHash } from "@/lib/auth/bcrypt";
import { generateJWT } from "@/lib/auth/jwt";

export async function GET(req) {
   return NextResponse.json({ message: "This route only works for POST METHOD" }, { status: 200 });
}

export async function POST(req) {
   const { email, password } = await req.json();

   try {
      const userData = await prisma.user.findUnique({
         where: {
            email,
         },
      });

      const isMatches = await compareHash(password, userData.password);
      let record;
      let token;

      if (userData && isMatches) {
         record = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            bio: userData.bio,
            active: userData.active,
         };

         token = generateJWT(record);
      }

      return NextResponse.json({ record, token }, { status: 200 });
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
