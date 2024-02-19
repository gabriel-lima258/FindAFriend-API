import { FastifyInstance } from 'fastify'
import { requestPhoto } from './create'
import { verifyJWT } from '@/http/middleware/verify-jwt'

export async function photosRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pets/:petId/photos', requestPhoto)
}
