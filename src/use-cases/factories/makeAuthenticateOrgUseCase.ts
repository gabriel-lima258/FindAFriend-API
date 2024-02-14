import { PrismaOrgsRepository } from '@/repositories/prisma/prima-orgs-repository'
import { AuthenticateOrgUseCase } from '../org/authenticate-org'

export function makeAuthenticateOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()

  const authenticateOrgUseCase = new AuthenticateOrgUseCase(
    prismaOrgsRepository,
  )

  return authenticateOrgUseCase
}
