import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetProfileUseCase } from '@/use-cases/factories/makeGetPetProfileUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profilePet(request: FastifyRequest, reply: FastifyReply) {
  const getPetProfileParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = getPetProfileParamsSchema.parse(request.params)

  const getPetProfile = makeGetPetProfileUseCase()

  try {
    const { pet } = await getPetProfile.execute({
      petId,
    })

    return reply.status(200).send({
      pet,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
