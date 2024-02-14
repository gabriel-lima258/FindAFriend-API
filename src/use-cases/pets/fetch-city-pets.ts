import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

// interface de dados de requisição
interface FetchCityPetsUseCaseRequest {
  query: string
  page: number
}

// interface de dados de resposta
interface FetchCityPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchCityPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
    page,
  }: FetchCityPetsUseCaseRequest): Promise<FetchCityPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(query, page)

    return {
      pets,
    }
  }
}
