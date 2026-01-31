-- AlterTable
ALTER TABLE "User" ADD COLUMN     "governorateId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_governorateId_fkey" FOREIGN KEY ("governorateId") REFERENCES "Governorate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
