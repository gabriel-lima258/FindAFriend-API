import { PrismaOrgsRepository } from '@/repositories/prisma/prima-orgs-repository'
import { CreateOrgUseCase } from '../org/create-org'

export function makeCreateOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()

  const createOrgUseCase = new CreateOrgUseCase(prismaOrgsRepository)

  return createOrgUseCase
}
