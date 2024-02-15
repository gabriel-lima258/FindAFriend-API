import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaAdoptionRequirenmentRepository } from '@/repositories/prisma/prisma-adoption-requirement-repository'
import { CreateAdoptionRequirementUseCase } from '../adoption_requirement/create-requirement'

export function makeCreatePetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaAdoptionRequirementUseCase =
    new PrismaAdoptionRequirenmentRepository()

  const createRequirementUseCase = new CreateAdoptionRequirementUseCase(
    prismaPetsRepository,
    prismaAdoptionRequirementUseCase,
  )

  return createRequirementUseCase
}
