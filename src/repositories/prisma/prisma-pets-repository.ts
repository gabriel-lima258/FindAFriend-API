import { $Enums, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findManyByCity(city: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        city: {
          contains: city,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async findManyByFilter(
    age?: $Enums.Age,
    energy?: $Enums.Energy,
    size?: $Enums.Size,
    independence?: $Enums.Independence,
    type?: $Enums.Type,
  ) {
    const pets = await prisma.pet.findMany({
      where: {
        age,
        energy,
        size,
        independence,
        type,
      },
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }
}
