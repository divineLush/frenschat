import messageTypes from "./messageTypes"

export default class Socket {
  constructor(roomId, login, onMessage) {
    this._login = login
    this._socket = new WebSocket(`ws://localhost:3000/api/room/${roomId}`)

    this._socket.addEventListener('open', () => {
      this._send(messageTypes.CONNECTED, 'user connected')
      this._socket.addEventListener('message', onMessage)
    })
  }

  _send(type, message) {
    if (this._socket.readyState !== WebSocket.OPEN) {
      throw new Error('Messed up connection')
    }

    this._socket.send(JSON.stringify({
      login: this._login,
      type,
      message
    }))
  }

  sendMessage(message) {
    this._send(messageTypes.MESSAGE, message)
  }

  close() {
    this._send(messageTypes.DISCONNECTED, 'user disconnected')
    this._socket.close()
  }
}
