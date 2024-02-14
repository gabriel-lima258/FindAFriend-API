import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findManyByCity(query: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        city: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }
}
