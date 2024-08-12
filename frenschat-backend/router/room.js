import stream from 'stream'

const messageHub = new stream.Readable({
  read() {}
})

export default (fastify, _, done) => {

  fastify.addHook('onRequest',  request => request.jwtVerify())

  fastify.get('/*', { websocket: true }, async (socket, request) => {
    const roomId = request.params['*']

    socket.on('message', message => {
      messageHub.push(message)
    })

    messageHub.on('data', chunk => {
      const message = JSON.parse(Buffer.from(chunk))
      if (message.roomId === roomId) {
        socket.send(JSON.stringify(message))
      }
    })

    setTimeout(() => {
      socket.close()
    }, 1000 * 60 * 60 * 24)
  })

  done()
}
