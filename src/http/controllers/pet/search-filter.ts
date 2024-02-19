import { makeSearchPetsByFilterUseCase } from '@/use-cases/factories/makeSearchPetsByFilterUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchFilter(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPetsByFilterQuerySchema = z.object({
    age: z.enum(['CUB', 'ADULT', 'ELDERLY']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
    energy: z
      .enum(['VERY_LOW', 'LOW', 'AVERAGE', 'HIGH', 'VERY_HIGH'])
      .optional(),
    independence: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    type: z.enum(['DOG', 'CAT']).optional(),
  })

  const { age, size, energy, independence, type } =
    getPetsByFilterQuerySchema.parse(request.query)

  const getPetByFilter = makeSearchPetsByFilterUseCase()

  const { pets } = await getPetByFilter.execute({
    age,
    size,
    energy,
    independence,
    type,
  })

  return reply.status(200).send({
    pets,
  })
}
