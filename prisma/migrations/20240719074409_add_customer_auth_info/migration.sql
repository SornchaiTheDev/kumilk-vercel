-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "password" TEXT DEFAULT '',
ADD COLUMN     "phoneNumber" TEXT NOT NULL DEFAULT '';
