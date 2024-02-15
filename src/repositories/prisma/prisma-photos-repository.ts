import { Prisma } from '@prisma/client'
import { PhotosRepository } from '../photos-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPhotosRepository implements PhotosRepository {
  async create(data: Prisma.PhotoUncheckedCreateInput) {
    const photo = await prisma.photo.create({
      data,
    })

    return photo
  }

  async findById(id: string) {
    const photo = await prisma.photo.findUnique({
      where: {
        id,
      },
    })

    return photo
  }
}
