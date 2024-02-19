import { makeFetchCityPetsUseCase } from '@/use-cases/factories/makeFetchCityPetsUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getCity(request: FastifyRequest, reply: FastifyReply) {
  const getPetsByCityQuerySchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, page } = getPetsByCityQuerySchema.parse(request.query)

  const getPetByCityProfile = makeFetchCityPetsUseCase()

  const { pets } = await getPetByCityProfile.execute({
    city,
    page,
  })

  return reply.status(200).send({
    pets,
  })
}
