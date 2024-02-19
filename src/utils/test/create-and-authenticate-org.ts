import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  // criando um user com os parametros de role
  await prisma.org.create({
    data: {
      name: 'Cia dogs',
      email: 'cia.dogs@gmail.com',
      password_hash: '12345678',
      state: 'DF',
      cep: '72593218',
      address: 'Qri 18 casa 10',
      whatsappNumber: '992732909',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'cia.dogs@gmail.com',
    password: '12345678',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
