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
*/

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { defineConfig } from '@prisma/config';

const connectionString = process.env.DATABASE_URL;

const isLocalhost =
  connectionString?.includes('localhost') ||
  connectionString?.includes('127.0.0.1');

const pool = new Pool({
  connectionString,
  ssl: isLocalhost ? false : { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: 'npx tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env["DATABASE_URL"] || "",
  },
  adapter,
});