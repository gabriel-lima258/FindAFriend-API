import { OrgsRepository } from '@/repositories/orgs-repository'
import { Age, Energy, Independence, Pet, Size, Type } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgNotFoundError } from '../errors/org-not-found-error'

interface PetUseCaseRequest {
  name: string
  description: string
  city: string
  age: Age
  size: Size
  energy: Energy
  independence: Independence
  type: Type
  orgId: string
}

interface PetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    description,
    city,
    age,
    size,
    energy,
    independence,
    type,
    orgId,
  }: PetUseCaseRequest): Promise<PetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      city,
      age,
      size,
      energy,
      independence,
      type,
      org_id: orgId,
    })

    return {
      pet,
    }
  }
}
