import { prisma } from '@/lib/prisma'
import { Org } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await request(app.server).post('/orgs').send({
    name: 'Cia dogs',
    email: 'cia.dogs@gmail.com',
    password: '12345678',
    state: 'DF',
    cep: '72593218',
    address: 'Qri 18 casa 10',
    whatsappNumber: '992732909',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'cia.dogs@gmail.com',
    password: '12345678',
  })

  const { id: orgId } = (await prisma.org.findFirst()) as Org
  const { token } = authResponse.body

  return {
    orgId,
    token,
  }
}
