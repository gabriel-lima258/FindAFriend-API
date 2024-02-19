import { Photo } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { PhotosRepository } from '@/repositories/photos-repository'

interface CreatePhotoUseCaseRequest {
  url: string
  petId: string
}

interface CreatePhotoUseCaseResponse {
  photo: Photo
}

export class CreatePhotoUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private photosRepository: PhotosRepository,
  ) {}

  async execute({
    url,
    petId,
  }: CreatePhotoUseCaseRequest): Promise<CreatePhotoUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const photo = await this.photosRepository.create({
      url,
      pet_id: petId,
    })

    return {
      photo,
    }
  }
}
