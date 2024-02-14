import { PrismaOrgsRepository } from '@/repositories/prisma/prima-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../pets/create-pet'

export function makeCreateOrgUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrgUseCase = new PrismaOrgsRepository()

  const createPetsUseCase = new CreatePetUseCase(
    prismaPetsRepository,
    prismaOrgUseCase,
  )

  return createPetsUseCase
}
