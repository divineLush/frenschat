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

      setTimeout(() => {
        rooms
          .filter(({ pubId }) => pubId === roomId)
          .forEach(room => {
            room.sockets.forEach(s => {
              s.close()
            })
          })

        rooms = rooms.filter(({ pubId }) => pubId === roomId)
      }, 1000 * 60 * 60 * 24)
      // }, 1000 * 10)
    }

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
