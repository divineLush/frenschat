export default class Socket {
  constructor(onMessage) {
    this._socket = new WebSocket('ws://localhost:3000/api/room')

    this._socket.addEventListener('open', () => {
      this._socket.addEventListener('message', onMessage)
    })
  }

  send(msg) {
    this._socket.send(JSON.stringify(msg))
  }
}
