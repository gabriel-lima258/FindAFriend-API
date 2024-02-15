import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryPetRepository } from '@/repositories/in-memory-repositories/in-memory-pet-repository'
import { GetPetProfileUseCase } from './get-pet-profile'
import { InMemoryOrgRepository } from '@/repositories/in-memory-repositories/in-memory-org-repository'

// tipando as variáveis
let petRepository: InMemoryPetRepository
let orgRepository: InMemoryOrgRepository
let getPetProfileUseCase: GetPetProfileUseCase

describe('Get Pet Profile Use Case', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    orgRepository = new InMemoryOrgRepository()
    getPetProfileUseCase = new GetPetProfileUseCase(petRepository)

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

  it('should be able to get pet profile', async () => {
    // criando um usuário temporário
    const createdPet = await petRepository.create({
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
    // tentando autenticar user
    const { pet } = await getPetProfileUseCase.execute({
      petId: createdPet.id,
    })

    expect(pet).toEqual(createdPet)
  })

  it('should not be able to get org profile', async () => {
    // autenticando com email errado
    await expect(() =>
      getPetProfileUseCase.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
