import { AdoptionRequirement } from '@prisma/client'
import { AdoptionRequirementsRepository } from '@/repositories/adoption-requirements-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface AdoptionRequirementUseCaseRequest {
  title: string
  petId: string
}

interface AdoptionRequirementUseCaseResponse {
  adoptionRequirement: AdoptionRequirement
}

export class CreateAdoptionRequirementUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private adoptionRequirementRepository: AdoptionRequirementsRepository,
  ) {}

  async execute({
    title,
    petId,
  }: AdoptionRequirementUseCaseRequest): Promise<AdoptionRequirementUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const adoptionRequirement = await this.adoptionRequirementRepository.create(
      {
        title,
        pet_id: petId,
      },
    )

    return {
      adoptionRequirement,
    }
  }
}
