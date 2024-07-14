/*
  Warnings:

  - You are about to drop the column `subTotal` on the `OrderHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderHistory" DROP COLUMN "subTotal",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
