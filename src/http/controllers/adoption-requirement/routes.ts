import { FastifyInstance } from 'fastify'
import { createRequirement } from './create'
import { verifyJWT } from '@/http/middleware/verify-jwt'

export async function requirementsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pets/:petId/adoption-requirements', createRequirement)
}
