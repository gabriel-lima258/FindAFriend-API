import { FastifyInstance } from 'fastify'
import { createOrg } from './create'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)
}
