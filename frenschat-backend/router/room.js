let rooms = []

export default (fastify, _, done) => {

  fastify.addHook('onRequest', async (request, reply) => {
    const roomId = request.params['*']

    const room = rooms.find(({ pubId }) => pubId === roomId)
    if (!room) {
      return request.jwtVerify()
    }

    return
  })

  fastify.get('/*', { websocket: true }, async (socket, request) => {
    const roomId = request.params['*']
    const room = rooms.find(({ pubId }) => pubId === roomId)
    if (room) {
      room.sockets.push(socket)
    } else {
      rooms.push({
        pubId: roomId,
        sockets: [ socket ],
      })
    }

    socket.on('close', (data) => {
      console.log('CLOSE', data)
      // TODO: rm user from rooms collection
    })

    socket.on('message', message => {
      rooms
        .filter(({ pubId }) => pubId === roomId)
        .forEach(room => {
          room.sockets.forEach(s => {
            s.send(message.toString())
          })
        })
    })
  })

  done()
}
