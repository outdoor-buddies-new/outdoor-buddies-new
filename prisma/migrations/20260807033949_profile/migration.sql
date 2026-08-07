/*
  Warnings:

  - You are about to drop the column `looking` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `owner` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "looking",
ADD COLUMN     "groupname" TEXT,
ADD COLUMN     "owner" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL;
