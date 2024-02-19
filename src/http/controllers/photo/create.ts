import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreatePhotoUseCase } from '@/use-cases/factories/makeRequestPetPhotoUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function requestPhoto(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestPhotoBodySchema = z.object({
    url: z.string(),
  })

  const requestPhotoParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { url } = requestPhotoBodySchema.parse(request.body)
  const { petId } = requestPhotoParamsSchema.parse(request.params)

  try {
    const createPhotoUseCase = makeCreatePhotoUseCase()

    await createPhotoUseCase.execute({
      url,
      petId,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }

  return reply.status(201).send()
}
