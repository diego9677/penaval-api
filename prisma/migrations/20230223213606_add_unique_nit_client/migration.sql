/*
  Warnings:

  - A unique constraint covering the columns `[nit]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Client_nit_key" ON "Client"("nit");
