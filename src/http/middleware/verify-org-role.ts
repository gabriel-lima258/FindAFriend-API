import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyOrgRole(rolerToVerify: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== rolerToVerify) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
