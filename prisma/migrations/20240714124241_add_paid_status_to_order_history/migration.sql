/*
  Warnings:

  - Added the required column `isPaid` to the `OrderHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderHistory" ADD COLUMN     "isPaid" BOOLEAN NOT NULL;
