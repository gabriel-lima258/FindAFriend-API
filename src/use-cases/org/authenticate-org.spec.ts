import { InMemoryOrgRepository } from '@/repositories/in-memory-repositories/in-memory-org-repository'
import { AuthenticateOrgUseCase } from './authenticate-org'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InvalidCredencialError } from '../errors/invalid-credencials-error'

let orgRepository: InMemoryOrgRepository
let authenticateUseCase: AuthenticateOrgUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    authenticateUseCase = new AuthenticateOrgUseCase(orgRepository)
  })

  it('should be able to authenticate org', async () => {
    // create a new org to authenticate
    await orgRepository.create({
      name: 'Cia dogs',
      email: 'cia.dogs@gmail.com',
      password_hash: await hash('123456', 6),
      state: 'DF',
      cep: '72593218',
      address: 'Qri 18 casa 10',
      whatsappNumber: '992732909',
    })

    const { org } = await authenticateUseCase.execute({
      email: 'cia.dogs@gmail.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: 'cia.dogs@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgRepository.create({
      name: 'Cia dogs',
      email: 'cia.dogs@gmail.com',
      password_hash: await hash('123456', 6),
      state: 'DF',
      cep: '72593218',
      address: 'Qri 18 casa 10',
      whatsappNumber: '992732909',
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'cia.dogs@gmail.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialError)
  })
})
