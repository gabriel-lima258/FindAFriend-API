import { PetsRepository } from '@/repositories/pets-repository'
import { Age, Energy, Independence, Pet, Size, Type } from '@prisma/client'

// interface de dados de requisição
interface SearchPetsByFilterUseCaseRequest {
  age?: Age
  energy?: Energy
  size?: Size
  independence?: Independence
  type?: Type
}

// interface de dados de resposta
interface SearchPetsByFilterUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsByFilter {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    energy,
    size,
    independence,
    type,
  }: SearchPetsByFilterUseCaseRequest): Promise<SearchPetsByFilterUseCaseResponse> {
    const pets = await this.petsRepository.findManyByFilter(
      age,
      energy,
      size,
      independence,
      type,
    )

    return {
      pets,
    }
  }
}
