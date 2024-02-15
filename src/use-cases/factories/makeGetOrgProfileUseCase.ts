import { PrismaOrgsRepository } from '@/repositories/prisma/prima-orgs-repository'
import { GetOrgProfileUseCase } from '../org/get-org-profile'

export function makeGetOrgProfileUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()

  const getOrgProfileOrgUseCase = new GetOrgProfileUseCase(prismaOrgsRepository)

  return getOrgProfileOrgUseCase
}
