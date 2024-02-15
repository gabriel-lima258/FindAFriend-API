import { Photo, Prisma } from '@prisma/client'
import { PhotosRepository } from '../photos-repository'
import { randomUUID } from 'crypto'

export class InMemoryPhotoRepository implements PhotosRepository {
  public items: Photo[] = []

  async create(data: Prisma.PhotoUncheckedCreateInput) {
    const photo = {
      id: data.id ?? randomUUID(),
      url: data.url,
      created_at: new Date(),
      pet_id: data.pet_id,
    }

    this.items.push(photo)

    return photo
  }

  async findById(id: string) {
    const photo = this.items.find((item) => item.id === id)

    if (!photo) {
      return null
    }

    return photo
  }
}
