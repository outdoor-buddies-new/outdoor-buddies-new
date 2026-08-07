-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "members" INTEGER NOT NULL,
    "maxmembers" INTEGER,
    "intensity" TEXT NOT NULL,
    "description" TEXT,
    "owner" TEXT NOT NULL,
    "lastdate" TIMESTAMP(3),
    "lastlocation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);
