import { AdoptionRequirement } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { AdoptionRequirementsRepository } from '@/repositories/adoption-requirements-repository'

interface GetRequirementProfileUseCaseRequest {
  requirementId: string
}

interface GetRequirementProfileUseCaseResponse {
  adoptionRequirement: AdoptionRequirement
}

export class GetAdoptionRequirementProfileUseCase {
  constructor(
    private adoptionRequirementRepository: AdoptionRequirementsRepository,
  ) {}

  async execute({
    requirementId,
  }: GetRequirementProfileUseCaseRequest): Promise<GetRequirementProfileUseCaseResponse> {
    const adoptionRequirement =
      await this.adoptionRequirementRepository.findById(requirementId)

    if (!adoptionRequirement) {
      throw new ResourceNotFoundError()
    }

    return {
      adoptionRequirement,
    }
  }
}
