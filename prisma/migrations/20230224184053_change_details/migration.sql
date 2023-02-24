/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ProformaDetail` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProformaDetail` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `SaleDetail` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `SaleDetail` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ShoppingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ShoppingDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProformaDetail" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "SaleDetail" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "ShoppingDetail" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
