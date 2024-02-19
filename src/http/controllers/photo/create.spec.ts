import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'
import { Pet } from '@prisma/client'

describe('Create Photo (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to request photo of pet', async () => {
    const { orgId, token } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pingo',
        description: 'cachorro capivara',
        city: 'Santa Maria',
        age: 'ADULT',
        size: 'MEDIUM',
        energy: 'VERY_HIGH',
        independence: 'HIGH',
        type: 'DOG',
        orgId,
      })

    const { id: petId } = (await prisma.pet.findFirst()) as Pet

    const response = await request(app.server)
      .post(`/pets/${petId}/photos`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        url: 'https://encr.pw/oouuX',
      })

    expect(response.statusCode).toEqual(201)
  })
})
