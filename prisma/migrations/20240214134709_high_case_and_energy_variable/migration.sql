/*
  Warnings:

  - The values [cub,adult,elderly] on the enum `Age` will be removed. If these variants are still used in the database, this will fail.
  - The values [low,medium,high] on the enum `Independence` will be removed. If these variants are still used in the database, this will fail.
  - The values [small,medium,big] on the enum `Size` will be removed. If these variants are still used in the database, this will fail.
  - The values [dog,cat] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `org_Id` on the `pets` table. All the data in the column will be lost.
  - The `energy` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `org_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('VERY_LOW', 'LOW', 'AVERAGE', 'HIGH', 'VERY_HIGH');

-- AlterEnum
BEGIN;
CREATE TYPE "Age_new" AS ENUM ('CUB', 'ADULT', 'ELDERLY');
ALTER TABLE "pets" ALTER COLUMN "age" TYPE "Age_new" USING ("age"::text::"Age_new");
ALTER TYPE "Age" RENAME TO "Age_old";
ALTER TYPE "Age_new" RENAME TO "Age";
DROP TYPE "Age_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Independence_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
ALTER TABLE "pets" ALTER COLUMN "independence" TYPE "Independence_new" USING ("independence"::text::"Independence_new");
ALTER TYPE "Independence" RENAME TO "Independence_old";
ALTER TYPE "Independence_new" RENAME TO "Independence";
DROP TYPE "Independence_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Size_new" AS ENUM ('SMALL', 'MEDIUM', 'BIG');
ALTER TABLE "pets" ALTER COLUMN "size" TYPE "Size_new" USING ("size"::text::"Size_new");
ALTER TYPE "Size" RENAME TO "Size_old";
ALTER TYPE "Size_new" RENAME TO "Size";
DROP TYPE "Size_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('DOG', 'CAT');
ALTER TABLE "pets" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_org_Id_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "org_Id",
ADD COLUMN     "org_id" TEXT NOT NULL,
DROP COLUMN "energy",
ADD COLUMN     "energy" "Energy";

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
