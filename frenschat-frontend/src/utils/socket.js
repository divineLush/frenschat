export default class Socket {
  constructor(roomId, onMessage) {
    this._socket = new WebSocket(`ws://localhost:3000/api/room/${roomId}`)

    this._socket.addEventListener('open', () => {
      this._socket.addEventListener('message', onMessage)
    })
  }

  send(msg) {
    if (this._socket.readyState !== WebSocket.OPEN) {
      throw new Error('Messed up connection')
    }

    this._socket.send(JSON.stringify(msg))
  }
}
