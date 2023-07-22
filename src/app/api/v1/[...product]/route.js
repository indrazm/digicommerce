import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
   return NextResponse.json({ url: params });
}

export async function POST(req) {}
