import { $Enums, Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      city: data.city,
      age: data.age ?? null,
      size: data.size ?? null,
      energy: data.energy ?? null,
      independence: data.independence ?? null,
      type: data.type ?? null,
      created_at: new Date(),
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }

  async findManyByCity(city: string, page: number) {
    return this.items
      .filter((item) => item.city.includes(city))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyByFilter(
    age: $Enums.Age,
    energy: $Enums.Energy,
    size: $Enums.Size,
    independence: $Enums.Independence,
    type: $Enums.Type,
  ) {
    return this.items.filter(
      (item) =>
        item.age?.includes(age) ||
        item.energy?.includes(energy) ||
        item.size?.includes(size) ||
        item.independence?.includes(independence) ||
        item.type?.includes(type),
    )
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
}
