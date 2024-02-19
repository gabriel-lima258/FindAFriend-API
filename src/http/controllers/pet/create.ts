import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/makeCreatePetUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    city: z.string(),
    age: z.enum(['CUB', 'ADULT', 'ELDERLY']),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    energy: z.enum(['VERY_LOW', 'LOW', 'AVERAGE', 'HIGH', 'VERY_HIGH']),
    independence: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    type: z.enum(['DOG', 'CAT']),
  })

  const { name, description, city, age, size, energy, independence, type } =
    createPetBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      name,
      description,
      city,
      age,
      size,
      energy,
      independence,
      type,
      orgId: request.user.sub,
    })
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }

  return reply.status(201).send()
}
