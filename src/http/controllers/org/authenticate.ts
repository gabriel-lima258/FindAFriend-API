import { InvalidCredencialError } from '@/use-cases/errors/invalid-credencials-error'
import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/makeAuthenticateOrgUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateOrgUseCase = makeAuthenticateOrgUseCase()

    await authenticateOrgUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredencialError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

  return reply.status(200).send()
}
