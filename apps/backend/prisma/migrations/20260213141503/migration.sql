/*
  Warnings:

  - You are about to drop the column `availabilityType` on the `Cv` table. All the data in the column will be lost.
  - You are about to drop the column `workLocationType` on the `Cv` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cv" DROP COLUMN "availabilityType",
DROP COLUMN "workLocationType",
ADD COLUMN     "availabilityTypes" "AvailabilityType"[],
ADD COLUMN     "workLocationTypes" "WorkLocationType"[];
