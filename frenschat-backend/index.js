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

await fastify.register(websocket)

fastify.register(fastifyCookie, {
  secret: process.env.JWT_SECRET,
  hook: 'onRequest',
})

fastify.addHook('onRequest', (request, reply, done) => {
  reply.header('Access-Control-Allow-Origin', '*')
  reply.header('Access-Control-Allow-Methods', 'GET, POST')

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
