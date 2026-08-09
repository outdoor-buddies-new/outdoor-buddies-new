/*
  Warnings:

  - You are about to drop the column `owner` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "owner";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "owner";
