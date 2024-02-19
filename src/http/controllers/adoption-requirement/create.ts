import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreateRequirementUseCase } from '@/use-cases/factories/makeCreateRequirementUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createRequirement(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createRequirementBodySchema = z.object({
    title: z.string(),
  })

  const createRequirementParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { title } = createRequirementBodySchema.parse(request.body)
  const { petId } = createRequirementParamsSchema.parse(request.params)

  try {
    const createRequirementUseCase = makeCreateRequirementUseCase()

    await createRequirementUseCase.execute({
      title,
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
