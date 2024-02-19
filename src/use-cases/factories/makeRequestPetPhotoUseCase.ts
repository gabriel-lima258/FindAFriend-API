import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaPhotosRepository } from '@/repositories/prisma/prisma-photos-repository'
import { CreatePhotoUseCase } from '../photos/create-photo'

export function makeCreatePhotoUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaPhotoUseCase = new PrismaPhotosRepository()

  const createPhotoUseCase = new CreatePhotoUseCase(
    prismaPetsRepository,
    prismaPhotoUseCase,
  )

  return createPhotoUseCase
}
