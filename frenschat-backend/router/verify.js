import { findUser } from '../lib/db/collections/users.js'

export default (fastify, _, done) => {

  fastify.addHook('onRequest', request => request.jwtVerify())

  fastify.get('/', async (request, reply) => {
    try {
      const { email, username } = await findUser(request.user.login)
      reply.code(200).send({ email, username })
    } catch(e) {
      reply.code(400).send(e)
    }
  })

  done()
}
