import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: true });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const token = crypto.randomBytes(32).toString("hex");
      const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
      const expires = new Date(Date.now() + 30 * 60 * 1000);

      await prisma.user.update({
        where: { email },
        data: { resetToken: tokenHash, resetTokenExp: expires },
      });

      const resetUrl = `https://buildwithai.digital/reset-password?token=${token}`;
      console.log(`[SOVEREIGN RESET] Password reset issued for ${email}: ${resetUrl}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[FORGOT-PASSWORD ERROR]", error);
    return NextResponse.json({ ok: true });
  }
}