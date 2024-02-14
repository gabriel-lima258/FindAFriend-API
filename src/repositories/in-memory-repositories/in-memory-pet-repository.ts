import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
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

  async findManyByCity(query: string, page: number) {
    return this.items
      .filter((item) => item.city.includes(query))
      .slice((page - 1) * 20, page * 20)
  }
}
