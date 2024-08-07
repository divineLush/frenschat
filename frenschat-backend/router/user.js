import checkPassword from '../lib/auth/check-password.js'
import { createUser } from '../lib/db/collections/users.js'

export const userRoutes = (fastify, _, done) => {
  fastify.post('/login', async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*")
    reply.header("Access-Control-Allow-Methods", "POST")

    const { email, password } = JSON.parse(request.body)
    const isValid = await checkPassword(email, password)
    const code = isValid ? 200 : 404

    const token = fastify.jwt.sign({ email })

    reply
      .cookie('token', token, {
        // domain: 'localhost',
        // path: '/',
        // secure: true,
        httpOnly: true,
        // sameSite: true
      })
      .code(code)
      .send({ email })
  })

  fastify.post('/register', async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*")
    reply.header("Access-Control-Allow-Methods", "POST")

    const { email, password } = JSON.parse(request.body)
    await createUser(email, password)

    reply
      .code(200)
      .send({ email })
  })

  done()
}
