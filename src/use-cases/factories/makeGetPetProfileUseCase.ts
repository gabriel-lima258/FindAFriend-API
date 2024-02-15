import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetProfileUseCase } from '../pets/get-pet-profile'

export function makeGetPetProfileUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()

  const getPetProfileUseCase = new GetPetProfileUseCase(prismaPetsRepository)

  return getPetProfileUseCase
}
