import { InMemoryPetRepository } from '@/repositories/in-memory-repositories/in-memory-pet-repository'
import { beforeEach, expect, it, describe } from 'vitest'
import { InMemoryOrgRepository } from '@/repositories/in-memory-repositories/in-memory-org-repository'
import { SearchPetsByFilter } from './search-pets-by-filter'

// tipando as variáveis
let petRepository: InMemoryPetRepository
let orgRepository: InMemoryOrgRepository
let searchPetsByFilterUseCase: SearchPetsByFilter

describe('Search Pet Filter Use Case', () => {
  // instânciando os repositórios em cada teste
  beforeEach(async () => {
    // passando o repositório temporário criado
    petRepository = new InMemoryPetRepository()
    orgRepository = new InMemoryOrgRepository()
    searchPetsByFilterUseCase = new SearchPetsByFilter(petRepository)

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

  it('should be able to search a pet by filter', async () => {
    await petRepository.create({
      name: 'PetA',
      description: 'cachorro capivara',
      city: 'Santa Maria',
      age: 'ADULT',
      size: 'BIG',
      energy: 'VERY_HIGH',
      independence: 'LOW',
      type: 'CAT',
      org_id: 'org-01',
    })

    await petRepository.create({
      name: 'PetB',
      description: 'cachorro capivara2',
      city: 'Santa Maria',
      age: 'ADULT',
      size: 'SMALL',
      energy: 'VERY_HIGH',
      independence: 'HIGH',
      type: 'DOG',
      org_id: 'org-01',
    })

    await petRepository.create({
      name: 'PetC',
      description: 'cachorro morde fronha',
      city: 'Gama',
      age: 'ADULT',
      size: 'MEDIUM',
      energy: 'VERY_HIGH',
      independence: 'HIGH',
      type: 'DOG',
      org_id: 'org-01',
    })

    const { pets } = await searchPetsByFilterUseCase.execute({
      age: 'ADULT',
      size: 'SMALL',
      energy: 'VERY_HIGH',
      independence: 'HIGH',
      type: 'DOG',
    })

    expect(pets).toHaveLength(3)
  })
})
