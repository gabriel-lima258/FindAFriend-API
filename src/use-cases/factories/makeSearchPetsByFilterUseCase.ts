import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsByFilter } from '../pets/search-pets-by-filter'

export function makeSearchPetsByFilterUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()

  const searchPetsByFilterUseCase = new SearchPetsByFilter(prismaPetsRepository)

  return searchPetsByFilterUseCase
}
