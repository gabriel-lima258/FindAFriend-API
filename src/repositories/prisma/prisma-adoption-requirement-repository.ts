import { Prisma } from '@prisma/client'
import { AdoptionRequirementsRepository } from '../adoption-requirements-repository'
import { prisma } from '@/lib/prisma'

export class PrismaAdoptionRequirenmentRepository
  implements AdoptionRequirementsRepository
{
  async create(data: Prisma.AdoptionRequirementUncheckedCreateInput) {
    const adoptionRequirement = await prisma.adoptionRequirement.create({
      data,
    })

    return adoptionRequirement
  }

  async findById(id: string) {
    const adoptionRequirement = await prisma.adoptionRequirement.findFirst({
      where: {
        id,
      },
    })

    return adoptionRequirement
  }
}
