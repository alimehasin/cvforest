-- AlterEnum
ALTER TYPE "FileType" ADD VALUE 'Pdf';

-- AlterTable
ALTER TABLE "Cv" ADD COLUMN     "fileId" TEXT;

-- AddForeignKey
ALTER TABLE "Cv" ADD CONSTRAINT "Cv_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
