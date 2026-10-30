   import { defineConfig } from "prisma/config";
   import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

   export default defineConfig({
     schema: "prisma/schema.prisma",
     adapter: new PrismaBetterSqlite3({ url: "file:./data/portfolio.db" }),
   });
