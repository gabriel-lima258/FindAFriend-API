import { FastifyInstance } from 'fastify'
import { createPet } from './create'
import { verifyJWT } from '@/http/middleware/verify-jwt'
import { getCity } from './get-city'
import { searchFilter } from './search-filter'
import { profilePet } from './profile'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pets', createPet)

  app.get('/pets/city', getCity)
  app.get('/pets/filter', searchFilter)
  app.get('/pets/:petId', profilePet)
}
