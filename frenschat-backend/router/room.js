import { createRoom, findRoomById } from '../lib/db/collections/rooms.js'
import { findUser } from '../lib/db/collections/users.js'

export default (fastify, _, done) => {

  fastify.addHook('onRequest', async (request, reply) => {
    const roomId = request.params['*']

    try {
      await findRoomById(roomId)

      return
    } catch(e) {
      try {
        await request.jwtVerify()

        const hostLogin = (await request.jwtDecode()).login
        const hostUser = await findUser(hostLogin)
        await createRoom(roomId, hostUser)
      } catch(e) {
        reply.code(401).send(e)
      }
    }
  })

  fastify.get('/*', { websocket: true }, async (socket, request) => {
    socket.on('close', (data) => {
      console.log('CLOSE', data)
      // TODO: rm user from rooms collection
    })

    socket.on('message', message => {
      fastify.websocketServer.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(message.toString())
        }
      })
    })
  })

  done()
}
