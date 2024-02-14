import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { InvalidCredencialError } from '../errors/invalid-credencials-error'
import { compare } from 'bcryptjs'

interface AuthenticateOgrUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOgrUseCaseResponse {
  org: Org
}

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOgrUseCaseRequest): Promise<AuthenticateOgrUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    // verify if the email is equal on login
    if (!org) {
      throw new InvalidCredencialError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    // verify if the password matches
    if (!doesPasswordMatches) {
      throw new InvalidCredencialError()
    }

    return {
      org,
    }
  }
}
