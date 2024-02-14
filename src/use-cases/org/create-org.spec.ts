import { InMemoryOrgRepository } from '@/repositories/in-memory-repositories/in-memory-org-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'

let orgRepository: InMemoryOrgRepository
let createOrgUseCase: CreateOrgUseCase

describe('Org Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    createOrgUseCase = new CreateOrgUseCase(orgRepository)
  })

  it('should be able to create a new org', async () => {
    const { org } = await createOrgUseCase.execute({
      name: 'Cia dogs',
      email: 'cia.dogs@gmail.com',
      password: '123456',
      state: 'DF',
      cep: '72593218',
      address: 'Qri 18 casa 10',
      whatsappNumber: '992732909',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should be equal to verify a password hash org', async () => {
    const { org } = await createOrgUseCase.execute({
      name: 'Cia dogs',
      email: 'cia.dogs@gmail.com',
      password: '123456',
      state: 'DF',
      cep: '72593218',
      address: 'Qri 18 casa 10',
      whatsappNumber: '992732909',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be to register a org with same email', async () => {
    const email = 'cia.dogs@gmail.com'

    await createOrgUseCase.execute({
      name: 'Cia dogs',
      email,
      password: '123456',
      state: 'DF',
      cep: '72593218',
      address: 'Qri 18 casa 10',
      whatsappNumber: '992732909',
    })

    await expect(() =>
      createOrgUseCase.execute({
        name: 'Cia dogs',
        email: 'cia.dogs@gmail.com',
        password: '123456',
        state: 'DF',
        cep: '72593218',
        address: 'Qri 18 casa 10',
        whatsappNumber: '992732909',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
