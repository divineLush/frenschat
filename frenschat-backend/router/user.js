import checkPassword from '../lib/auth/check-password.js'
import { createUser } from '../lib/db/collections/users.js'

export const userRoutes = (fastify, _, done) => {
  // fastify.addHook('onRequest', (request) => {
  //   console.log(request)
  // })

  fastify.post('/login', async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*")
    reply.header("Access-Control-Allow-Methods", "POST")

    const { email, password } = JSON.parse(request.body)
    const isValid = await checkPassword(email, password)
    const code = isValid ? 200 : 404

    reply
      .code(code)
      .send()
  })

  fastify.post('/register', async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*")
    reply.header("Access-Control-Allow-Methods", "POST")

    const { email, password } = JSON.parse(request.body)
    await createUser(email, password)

    reply
      .code(200)
      .send()
  })

  done()
}
