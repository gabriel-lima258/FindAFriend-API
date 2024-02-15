import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory-repositories/in-memory-pet-repository'
import { InMemoryAdoptionRequimentRepository } from '@/repositories/in-memory-repositories/in-memory-adoption-requirement-repository'
import { CreateAdoptionRequirementUseCase } from './create-requirement'

let petRepository: InMemoryPetRepository
let adoptionRequirementRepository: InMemoryAdoptionRequimentRepository
let createAdoptionRequirementUseCase: CreateAdoptionRequirementUseCase

describe('Adoption Requirement Use Case', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    adoptionRequirementRepository = new InMemoryAdoptionRequimentRepository()
    createAdoptionRequirementUseCase = new CreateAdoptionRequirementUseCase(
      petRepository,
      adoptionRequirementRepository,
    )

    await petRepository.create({
      id: 'pet-01',
      name: 'Pingo',
      description: 'cachorro capivara',
      city: 'Santa Maria',
      age: 'ADULT',
      size: 'MEDIUM',
      energy: 'VERY_HIGH',
      independence: 'HIGH',
      type: 'DOG',
      org_id: 'org-01',
    })
  })

  it('should be able to register a new adoption requirement', async () => {
    const { adoptionRequirement } =
      await createAdoptionRequirementUseCase.execute({
        title: 'Proibido apartamento',
        petId: 'pet-01',
      })

    expect(adoptionRequirement.id).toEqual(expect.any(String))
  })
})
