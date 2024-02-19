import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'

describe('Profile Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet profile', async () => {
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

    const response = await request(app.server)
      .get('/pets/filter')
      .query({
        age: 'ADULT',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    const petId = response.body.pets[0].id

    const profileResponse = await request(app.server)
      .get(`/pets/${petId}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.pet).toEqual(
      expect.objectContaining({
        name: 'Pingo',
      }),
    )
  })
})
