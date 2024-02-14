import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory-repositories/in-memory-pet-repository'
import { CreatePetUseCase } from './create-pet'
import { InMemoryOrgRepository } from '@/repositories/in-memory-repositories/in-memory-org-repository'

let petRepository: InMemoryPetRepository
let orgRepository: InMemoryOrgRepository
let createPetUseCase: CreatePetUseCase

describe('Pet Use Case', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    orgRepository = new InMemoryOrgRepository()
    createPetUseCase = new CreatePetUseCase(petRepository, orgRepository)

    // creating a new org before create a new pet
    await orgRepository.create({
      id: 'org-01',
      name: 'Cia dogs',
      email: 'cia.dogs@gmail.com',
      password_hash: '123456',
      state: 'DF',
      cep: '72593218',
      address: 'Qri 18 casa 10',
      whatsappNumber: '992732909',
    })
  })

  it('should be able to register a new pet', async () => {
    const { pet } = await createPetUseCase.execute({
      name: 'Pingo',
      description: 'cachorro capivara',
      city: 'Santa Maria',
      age: 'ADULT',
      size: 'MEDIUM',
      energy: 'VERY_HIGH',
      independence: 'HIGH',
      type: 'DOG',
      orgId: 'org-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
