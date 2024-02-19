import { FastifyInstance } from 'fastify'
import { createOrg } from './create'
import { authenticate } from './authenticate'
import { verifyJWT } from '@/http/middleware/verify-jwt'
import { profileOrg } from './profile'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJWT] }, profileOrg)
}
