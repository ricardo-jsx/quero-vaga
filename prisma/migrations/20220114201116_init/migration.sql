-- CreateEnum
CREATE TYPE "StatusVaga" AS ENUM ('ABERTA', 'ENTREVISTANDO', 'ENCERRADA');

-- CreateEnum
CREATE TYPE "StatusCandidatura" AS ENUM ('NAO_PROCESSADO', 'APROVADO', 'REJEITADO');

-- CreateTable
CREATE TABLE "Vaga" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(8000) NOT NULL,
    "requisitos" VARCHAR(8000) NOT NULL,
    "requisitosOpcionais" VARCHAR(8000),
    "beneficios" VARCHAR(8000),
    "status" "StatusVaga" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "empresaCnpj" VARCHAR(14),

    CONSTRAINT "Vaga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "cnpj" VARCHAR(14) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "especialidades" VARCHAR(255) NOT NULL,
    "sobre" VARCHAR(255) NOT NULL,
    "numeroFuncionarios" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contatoId" INTEGER,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("cnpj")
);

-- CreateTable
CREATE TABLE "Candidato" (
    "cpf" VARCHAR(11) NOT NULL,
    "nomeCompleto" VARCHAR(255) NOT NULL,
    "educacao" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contatoId" INTEGER,

    CONSTRAINT "Candidato_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "Contato" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "localizacao" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(11) NOT NULL,
    "linkedInUrl" VARCHAR(255),
    "websiteUrl" VARCHAR(255),
    "meuEnum" "StatusCandidatura" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidatura" (
    "id" CHAR(6) NOT NULL,
    "cartaApresentacao" VARCHAR(8000) NOT NULL,
    "curriculo" CHAR(36) NOT NULL,
    "status" "StatusCandidatura" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "candidatoCpf" VARCHAR(11) NOT NULL,
    "vagaId" INTEGER NOT NULL,

    CONSTRAINT "Candidatura_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vaga" ADD CONSTRAINT "Vaga_empresaCnpj_fkey" FOREIGN KEY ("empresaCnpj") REFERENCES "Empresa"("cnpj") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_contatoId_fkey" FOREIGN KEY ("contatoId") REFERENCES "Contato"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidato" ADD CONSTRAINT "Candidato_contatoId_fkey" FOREIGN KEY ("contatoId") REFERENCES "Contato"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidatura" ADD CONSTRAINT "Candidatura_candidatoCpf_fkey" FOREIGN KEY ("candidatoCpf") REFERENCES "Candidato"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidatura" ADD CONSTRAINT "Candidatura_vagaId_fkey" FOREIGN KEY ("vagaId") REFERENCES "Vaga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
