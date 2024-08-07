import checkPassword from '../lib/auth/check-password.js'
import { createUser } from '../lib/db/collections/users.js'

export const userRoutes = (fastify, _, done) => {
  fastify.post('/login', async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*")
    reply.header("Access-Control-Allow-Methods", "POST")

    const { login, password } = JSON.parse(request.body)
    const isValid = await checkPassword(login, password)
    const code = isValid ? 200 : 400

    const token = fastify.jwt.sign({ login })

    reply
      .cookie(process.env.COOKIE_NAME, token, {
        // domain: 'localhost',
        // path: '/',
        // secure: true,
        httpOnly: true,
        // sameSite: true
      })
      .code(code)
      .send({})
  })

  fastify.post('/register', async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*")
    reply.header("Access-Control-Allow-Methods", "POST")

    const { username, email, password } = JSON.parse(request.body)
    await createUser(username, email, password)

    reply
      .code(200)
      .send({})
  })

  done()
}
