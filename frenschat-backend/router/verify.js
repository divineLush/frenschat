export default (fastify, _, done) => {

  fastify.addHook('onRequest', request => request.jwtVerify())

  fastify.get('/', async (request, reply) => {
    reply.code(200).send(request.user)
  })

  done()
}
