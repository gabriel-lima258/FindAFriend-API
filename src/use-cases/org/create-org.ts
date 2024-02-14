import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org, State } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'

interface OgrUseCaseRequest {
  name: string
  email: string
  password: string
  state: State
  cep: string
  address: string
  whatsappNumber: string
}

interface OgrUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    state,
    cep,
    address,
    whatsappNumber,
  }: OgrUseCaseRequest): Promise<OgrUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      state,
      cep,
      address,
      whatsappNumber,
    })

    return {
      org,
    }
  }
}
