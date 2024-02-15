import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchCityPetsUseCase } from '../pets/fetch-city-pets'

export function makeFetchCityPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()

  const fetchCityPetsUseCase = new FetchCityPetsUseCase(prismaPetsRepository)

  return fetchCityPetsUseCase
}
