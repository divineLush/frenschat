export const userRoutes = (fastify, _, done) => {
  // fastify.addHook('onRequest', (request) => {
  //   console.log(request)
  // })

  fastify.post('/login', async (request, reply) => {
    return { user: 'hell' }
  })

  fastify.post('/register', async (requst, reply) => {
    return { user: 'hell ooo' }
  })

  done()
}
