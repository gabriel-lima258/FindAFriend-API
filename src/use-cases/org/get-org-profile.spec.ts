import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryOrgRepository } from '@/repositories/in-memory-repositories/in-memory-org-repository'
import { GetOrgProfileUseCase } from './get-org-profile'

// tipando as variáveis
let orgRepository: InMemoryOrgRepository
let getOrgProfileUseCase: GetOrgProfileUseCase

describe('Get Org Profile Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    getOrgProfileUseCase = new GetOrgProfileUseCase(orgRepository)
  })

  it('should be able to get org profile', async () => {
    // criando um usuário temporário
    const createdOrg = await orgRepository.create({
      name: 'Cia dogs',
      email: 'cia.dogs@gmail.com',
      password_hash: '123456',
      state: 'DF',
      cep: '72593218',
      address: 'Qri 18 casa 10',
      whatsappNumber: '992732909',
    })
    // tentando autenticar user
    const { org } = await getOrgProfileUseCase.execute({
      orgId: createdOrg.id,
    })

    expect(org).toEqual(createdOrg)
  })

  it('should not be able to get org profile', async () => {
    // autenticando com email errado
    await expect(() =>
      getOrgProfileUseCase.execute({
        orgId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
