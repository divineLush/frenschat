import router from '@/router'
import messageTypes from "./messageTypes"

export default class Socket {
  constructor(roomId, username, onMessage) {
    this._username = username
    this._socket = new WebSocket(`ws://localhost:3000/api/room/${roomId}`)

    this._socket.addEventListener('error', () => {
      router.push({ path: '/' })
    })

    this._socket.addEventListener('open', () => {
      this._send(messageTypes.CONNECTED, `${username} connected`)
      this._socket.addEventListener('message', onMessage)
    })
  }

  _send(type, message) {
    if (this._socket.readyState !== WebSocket.OPEN) {
      throw new Error('Messed up connection')
    }

    this._socket.send(JSON.stringify({
      username: this._username,
      type,
      message
    }))
  }

  sendMessage(message) {
    this._send(messageTypes.MESSAGE, message)
  }

  close() {
    this._send(messageTypes.DISCONNECTED, `${this._username} disconnected`)
    this._socket.close()
  }
}
