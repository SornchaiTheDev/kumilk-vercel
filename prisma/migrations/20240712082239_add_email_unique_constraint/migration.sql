/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `admin_users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");
