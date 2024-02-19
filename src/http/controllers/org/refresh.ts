import { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d', // 7 days
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/', // todas rotas tem acesso
      secure: true, // HTTPs
      sameSite: true, // acessivel ao msm dominio
      httpOnly: true, // acessivel somente ao backend
    })
    .status(200)
    .send({
      token,
    })
}
