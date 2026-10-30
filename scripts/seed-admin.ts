   import { PrismaClient } from "@prisma/client";
   import { hash } from "bcryptjs";
   import * as fs from "fs";
   import * as path from "path";

   // Simple .env.local parser
   const envPath = path.resolve(process.cwd(), ".env.local");
   if (fs.existsSync(envPath)) {
     const envConfig = fs.readFileSync(envPath, "utf8");
     envConfig.split("\n").forEach((line) => {
       const [key, value] = line.split("=");
       if (key && value) process.env[key.trim()] = value.trim();
     });
   }

   const prisma = new PrismaClient();

   async function main() {
     const email = process.env.ADMIN_EMAIL || "admin@buildwithai.digital";
     const password = process.env.ADMIN_PASSWORD || "ChangeMe123!"; 

     console.log(`Seeding admin user: ${email}`);

     const passwordHash = await hash(password, 10);

     const user = await prisma.user.upsert({
       where: { email },
       update: { passwordHash },
       create: {
         email,
         passwordHash,
         role: "ADMIN",
       },
     });

     console.log(`✅ Admin user successfully seeded: ${user.email}`);
   }

   main()
     .catch((e) => {
       console.error("Seed failed:", e);
       process.exit(1);
     })
     .finally(async () => {
       await prisma.$disconnect();
     });
