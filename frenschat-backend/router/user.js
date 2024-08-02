import { createUser } from '../lib/db/collections/users.js'

export const userRoutes = (fastify, _, done) => {
  // fastify.addHook('onRequest', (request) => {
  //   console.log(request)
  // })

  fastify.post('/login', async (request, reply) => {
    return { user: 'hell' }
  })

  fastify.post('/register', async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*")
    reply.header("Access-Control-Allow-Methods", "POST")
    await createUser('email', 'pass')

    return 'success'
  })

  done()
}
