import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryAdoptionRequimentRepository } from '@/repositories/in-memory-repositories/in-memory-adoption-requirement-repository'
import { GetAdoptionRequirementProfileUseCase } from './get-requirement-profile'

// tipando as variáveis
let requirementRepository: InMemoryAdoptionRequimentRepository
let getRequirementProfileUseCase: GetAdoptionRequirementProfileUseCase

describe('Get Adoption Requirement Profile Use Case', () => {
  beforeEach(async () => {
    requirementRepository = new InMemoryAdoptionRequimentRepository()
    getRequirementProfileUseCase = new GetAdoptionRequirementProfileUseCase(
      requirementRepository,
    )
  })

  it('should be able to get a adoption requirement profile', async () => {
    // criando um usuário temporário
    const requirement = await requirementRepository.create({
      title: 'Proibido apartamento',
      pet_id: 'pet-01',
    })
    // tentando autenticar user
    const { adoptionRequirement } = await getRequirementProfileUseCase.execute({
      requirementId: requirement.id,
    })

    expect(adoptionRequirement).toEqual(requirement)
  })

  it('should not be able to get org profile', async () => {
    // autenticando com email errado
    await expect(() =>
      getRequirementProfileUseCase.execute({
        requirementId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
