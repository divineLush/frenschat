export default (fastify, _, done) => {

  fastify.addHook('preValidation', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.code(401).send('not authenticated');
    }
  })

  fastify.get('/', { websocket: true }, async (socket, request) => {

    socket.on('message', message => {
      fastify.websocketServer.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(message.toString().trim())
        }
      })
    })
  })

  done()
}
