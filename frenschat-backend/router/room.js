import EventEmitter from 'events'

const hubs = new Map()

export default (fastify, _, done) => {

  fastify.addHook('onRequest',  request => request.jwtVerify())

  fastify.get('/*', { websocket: true }, async (socket, request) => {
    const roomId = request.params['*']

    let messageHub = hubs.get(roomId)

    if (!messageHub) {
      messageHub = new EventEmitter()
      hubs.set(roomId, messageHub)
    }

    if (messageHub.listenerCount('data') > 6) {
      reply.code(401).send('too many people')
    }

    const emitterCb = chunk => {
      socket.send(JSON.stringify(JSON.parse(Buffer.from(chunk))))
    }

    messageHub.on('data', emitterCb)

    socket.on('message', message => {
      messageHub.emit('data', message)
    })

    socket.on('close', () => {
      messageHub.removeListener('data', emitterCb)
      if (!messageHub.listenerCount('data')) {
        hubs.delete(roomId)
      }
    })

    setTimeout(() => {
      socket.close()
    }, 1000 * 60 * 60 * 24)
  })

  done()
}
