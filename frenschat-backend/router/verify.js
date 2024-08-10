export default (fastify, _, done) => {

  fastify.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.code(401).send('token invalid')
    }
  })

  fastify.get('/', async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*")
    reply.header("Access-Control-Allow-Methods", "POST")

    reply.code(200).send(request.user)
  })

  done()
}
