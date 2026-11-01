import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { mustChangePassword: true },
    });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json({
      mustChangePassword: user.mustChangePassword,
    });
  } catch (error) {
    console.error("[ME ENDPOINT] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}