export default (fastify, _, done) => {
  fastify.get('/', { websocket: true }, async (socket, request) => {
    // reply.header("Access-Control-Allow-Origin", "*")
    // reply.header("Access-Control-Allow-Methods", "POST")

    socket.on('message', message => {
      socket.send(`${message.toString()} from server`)
    })
  })

  done()
}
