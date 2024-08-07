import Fastify from 'fastify'
import 'dotenv/config'
import { userRoutes } from './router/user.js'
import db from './lib/db/db.js'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
  cookie: {
    cookieName: process.env.COOKIE_NAME,
    signed: false,
  },
})

fastify.register(fastifyCookie, {
  secret: process.env.JWT_SECRET,
  hook: 'onRequest',
})

fastify.register(userRoutes, { prefix: 'api/user' })

// fastify.addHook('onRequest', async (request, reply) => {
//   try {
//     await request.jwtVerify()
//   } catch (err) {
//     reply.send(err)
//   }
// })

try {
  await fastify.listen({ port: process.env.PORT })
  await db()
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
