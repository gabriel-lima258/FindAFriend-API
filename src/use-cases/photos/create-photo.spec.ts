import { InMemoryPetRepository } from '@/repositories/in-memory-repositories/in-memory-pet-repository'
import { InMemoryPhotoRepository } from '@/repositories/in-memory-repositories/in-memory-photo-repository'
import { CreatePhotoUseCase } from './create-photo'
import { beforeEach, it, describe, expect } from 'vitest'

let petRepository: InMemoryPetRepository
let photoRepository: InMemoryPhotoRepository
let createPhotoUseCase: CreatePhotoUseCase

describe('Photo Use Case', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    photoRepository = new InMemoryPhotoRepository()
    createPhotoUseCase = new CreatePhotoUseCase(petRepository, photoRepository)

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

  it('should be able to add a new pet photo', async () => {
    const { photo } = await createPhotoUseCase.execute({
      url: 'https://encr.pw/oouuX',
      petId: 'pet-01',
    })

    expect(photo.id).toEqual(expect.any(String))
  })
})
