/*
  Warnings:

  - You are about to drop the column `descimg` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "descimg",
ADD COLUMN     "descimage" TEXT;
