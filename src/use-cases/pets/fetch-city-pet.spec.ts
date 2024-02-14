import { InMemoryPetRepository } from '@/repositories/in-memory-repositories/in-memory-pet-repository'
import { FetchCityPetsUseCase } from './fetch-city-pets'
import { beforeEach, expect, it, describe } from 'vitest'
import { InMemoryOrgRepository } from '@/repositories/in-memory-repositories/in-memory-org-repository'

// tipando as variáveis
let petRepository: InMemoryPetRepository
let orgRepository: InMemoryOrgRepository
let fetchCityPetsUseCase: FetchCityPetsUseCase

describe('Fetch City Pet Use Case', () => {
  // instânciando os repositórios em cada teste
  beforeEach(async () => {
    // passando o repositório temporário criado
    petRepository = new InMemoryPetRepository()
    orgRepository = new InMemoryOrgRepository()
    fetchCityPetsUseCase = new FetchCityPetsUseCase(petRepository)

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

  it('should be able to fetch a pet by city', async () => {
    await petRepository.create({
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

    await petRepository.create({
      name: 'Pingo2',
      description: 'cachorro capivara2',
      city: 'Gama',
      age: 'ADULT',
      size: 'MEDIUM',
      energy: 'VERY_HIGH',
      independence: 'HIGH',
      type: 'DOG',
      org_id: 'org-01',
    })

    const { pets } = await fetchCityPetsUseCase.execute({
      query: 'Santa Maria',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ city: 'Santa Maria' })])
  })

  it('should be able to fetch paginated pets search', async () => {
    for (let i = 1; i <= 22; i++) {
      // criando várias academias
      await petRepository.create({
        name: 'Pingo2',
        description: 'cachorro capivara2',
        city: `Santa Maria ${i}`,
        age: 'ADULT',
        size: 'MEDIUM',
        energy: 'VERY_HIGH',
        independence: 'HIGH',
        type: 'DOG',
        org_id: 'org-01',
      })
    }

    const { pets } = await fetchCityPetsUseCase.execute({
      query: 'Santa Maria',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      // espero que liste as duas ultimas academias da page 2
      expect.objectContaining({ city: 'Santa Maria 21' }),
      expect.objectContaining({ city: 'Santa Maria 22' }),
    ])
  })
})
