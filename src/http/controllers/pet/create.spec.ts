import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'

describe('Create a pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { orgId, token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
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

    expect(response.statusCode).toEqual(201)
  })
})
