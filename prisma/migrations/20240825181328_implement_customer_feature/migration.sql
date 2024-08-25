/*
  Warnings:

  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `order_histories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order_histories" DROP CONSTRAINT "order_histories_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phoneNumber";

-- AlterTable
ALTER TABLE "order_histories" DROP COLUMN "userId",
ADD COLUMN     "customerId" TEXT;

-- CreateTable
CREATE TABLE "customers" (
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "phoneNumber" TEXT NOT NULL DEFAULT '',
    "customerId" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("customerId")
);

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_histories" ADD CONSTRAINT "order_histories_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("customerId") ON DELETE SET NULL ON UPDATE CASCADE;
