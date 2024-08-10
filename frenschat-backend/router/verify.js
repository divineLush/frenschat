export default (fastify, _, done) => {

  fastify.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.code(401).send('token invalid')
    }
  })

  fastify.get('/', async (request, reply) => {
    reply.code(200).send(request.user)
  })

  done()
}
