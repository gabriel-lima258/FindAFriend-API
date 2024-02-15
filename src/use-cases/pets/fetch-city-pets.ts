import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

// interface de dados de requisição
interface FetchCityPetsUseCaseRequest {
  city: string
  page: number
}

// interface de dados de resposta
interface FetchCityPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchCityPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
  }: FetchCityPetsUseCaseRequest): Promise<FetchCityPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(city, page)

    return {
      pets,
    }
  }
}
