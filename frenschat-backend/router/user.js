import { createUser, findUser } from '../lib/db/collections/users.js'

export const userRoutes = (fastify, _, done) => {
  // fastify.addHook('onRequest', (request) => {
  //   console.log(request)
  // })

  fastify.post('/login', async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*")
    reply.header("Access-Control-Allow-Methods", "POST")

    const { email, password } = JSON.parse(request.body)
    const user = await findUser(email, password)

    return user
  })

  fastify.post('/register', async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*")
    reply.header("Access-Control-Allow-Methods", "POST")

    const { email, password } = JSON.parse(request.body)
    await createUser(email, password)

    return 'user created'
  })

  done()
}
