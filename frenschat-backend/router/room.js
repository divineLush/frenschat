export default (fastify, _, done) => {

  fastify.addHook('onRequest', request => request.jwtVerify())

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
