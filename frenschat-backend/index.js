import Fastify from 'fastify'
import 'dotenv/config'
import { userRoutes } from './router/user.js'
import db from './lib/db/db.js'

const fastify = Fastify({
  logger: true
})

fastify.register(userRoutes, { prefix: 'api/user' })

try {
  await fastify.listen({ port: process.env.PORT })
  await db()
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
