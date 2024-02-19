import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'

describe('Get Pet By City (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a pet by city', async () => {
    // pegando token da autenticacao de user
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'caramelo doido',
        description: 'cachorro capivara',
        city: 'Gama',
        age: 'ADULT',
        size: 'MEDIUM',
        energy: 'VERY_HIGH',
        independence: 'HIGH',
        type: 'DOG',
        orgId,
      })

    const response = await request(app.server)
      .get('/pets/city')
      .query({
        city: 'Gama',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        city: 'Gama',
      }),
    ])
  })
})
