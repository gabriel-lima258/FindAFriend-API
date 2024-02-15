import { AdoptionRequirement, Prisma } from '@prisma/client'
import { AdoptionRequirementsRepository } from '../adoption-requirements-repository'
import { randomUUID } from 'crypto'

export class InMemoryAdoptionRequimentRepository
  implements AdoptionRequirementsRepository
{
  public items: AdoptionRequirement[] = []

  async create(data: Prisma.AdoptionRequirementUncheckedCreateInput) {
    const adoptionRequirement = {
      id: data.id ?? randomUUID(),
      title: data.title,
      created_at: new Date(),
      pet_id: data.pet_id,
    }

    this.items.push(adoptionRequirement)

    return adoptionRequirement
  }

  async findById(id: string) {
    const adoptionRequirement = this.items.find((item) => item.id === id)

    if (!adoptionRequirement) {
      return null
    }

    return adoptionRequirement
  }
}
