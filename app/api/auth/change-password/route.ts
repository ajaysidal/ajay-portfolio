import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcryptjs";
import { auth, update } from "@/auth";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Current and new password required" }, { status: 400 });
    }

    if (newPassword.length < 12) {
      return NextResponse.json({ error: "Password must be at least 12 characters" }, { status: 400 });
    }

    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isValid = await compare(currentPassword, user.passwordHash);

    if (!isValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    const newHash = await hash(newPassword, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: newHash,
        mustChangePassword: false,
      },
    });

    // Update the session token to reflect mustChangePassword: false
    await update({
      user: {
        ...session.user,
        mustChangePassword: false,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[CHANGE-PASSWORD ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}