import { Photo, Prisma } from '@prisma/client'

export interface PhotosRepository {
  create(data: Prisma.PhotoUncheckedCreateInput): Promise<Photo>
  findById(id: string): Promise<Photo | null>
}
