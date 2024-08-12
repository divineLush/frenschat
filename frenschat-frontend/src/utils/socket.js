import router from '@/router'
import messageTypes from "./messageTypes"

export default class Socket {
  constructor(roomId, username, onMessage) {
    if (!roomId || !username) {
      router.push({ path: '/' })
      return
    }

    this._username = username
    this._roomId = roomId
    this._socket = new WebSocket(`ws://localhost:3000/api/room/${roomId}`)

    this._socket.addEventListener('open', () => {
      this._send(messageTypes.CONNECTED, `${username || 'anon'} connected`)
      this._socket.addEventListener('message', onMessage)
    })

    this._socket.addEventListener('close', () => {
      router.push({ path: '/' })
    })

    this._socket.addEventListener('error', () => {
      router.push({ path: '/' })
    })
  }

  _send(type, message) {
    if (!this._socket) {
      return
    }

    if (this._socket.readyState !== WebSocket.OPEN) {
      router.push({ path: '/' })

      return
    }

    this._socket.send(JSON.stringify({
      roomId: this._roomId,
      username: this._username,
      type,
      message
    }))
  }

  sendMessage(message) {
    this._send(messageTypes.MESSAGE, message)
  }

  close() {
    if (!this._socket) {
      return
    }

    this._send(messageTypes.DISCONNECTED, `${this._username || 'anon'} disconnected`)
    this._socket.close()
  }
}
