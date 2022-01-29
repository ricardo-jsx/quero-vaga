/*
  Warnings:

  - The primary key for the `Candidato` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `candidatoCpf` on the `Candidatura` table. All the data in the column will be lost.
  - Added the required column `candidatoId` to the `Candidatura` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Candidatura" DROP CONSTRAINT "Candidatura_candidatoCpf_fkey";

-- AlterTable
ALTER TABLE "Candidato" DROP CONSTRAINT "Candidato_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Candidato_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Candidatura" DROP COLUMN "candidatoCpf",
ADD COLUMN     "candidatoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Candidatura" ADD CONSTRAINT "Candidatura_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
