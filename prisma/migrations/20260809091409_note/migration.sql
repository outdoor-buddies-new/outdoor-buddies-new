/*
  Warnings:

  - The values [Casual1] on the enum `Commitment` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Commitment_new" AS ENUM ('Casual', 'Sometimes Casual, Sometimes Moderate', 'Moderate', 'Sometimes Moderate, Sometimes Serious', 'Serious');
ALTER TYPE "Commitment" RENAME TO "Commitment_old";
ALTER TYPE "Commitment_new" RENAME TO "Commitment";
DROP TYPE "public"."Commitment_old";
COMMIT;

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
