import Fastify from 'fastify'
import 'dotenv/config'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import websocket from '@fastify/websocket'

import db from './lib/db/db.js'

import userRoutes from './router/user.js'
import roomRoutes from './router/room.js'
import verifyRoutes from './router/verify.js'

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

fastify.register(websocket, {
  options: {
    maxPayload: 1048576,
  }
})

fastify.register(fastifyCookie)

fastify.addHook('onRequest', (request, reply, done) => {
  reply.header('access-control-allow-origin', '*')
  reply.header('access-control-allow-methods', '*')
  reply.header('access-control-allow-credentials', true)

  done()
})

fastify.register(userRoutes, { prefix: 'api/user' })
fastify.register(roomRoutes, { prefix: 'api/room' })
fastify.register(verifyRoutes, { prefix: 'api/verify' })

try {
  await fastify.listen({ port: process.env.PORT })
  await db()
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
