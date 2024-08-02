import Fastify from 'fastify'
import { userRoutes } from './router/user.js'

const fastify = Fastify({
  logger: true
})

fastify.register(userRoutes, { prefix: 'api/user' })

fastify.get('/', async (request, reply) => {
  // reply.send({ hello: 'world' })
  return { hello: 'world' }
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
