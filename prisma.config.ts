import "dotenv/config";
import { defineConfig } from "prisma/config";

// Force local connections to disable sslmode if connecting to localhost/127.0.0.1
let dbUrl = process.env["DATABASE_URL"] || "";

if (dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1')) {
  dbUrl = dbUrl.replace(/([?&])sslmode=[^&]*/, '');
  if (!dbUrl.includes('sslmode=')) {
    const sep = dbUrl.includes('?') ? '&' : '?';
    dbUrl += `${sep}sslmode=disable`;
  }
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    url: dbUrl,
  },
});
