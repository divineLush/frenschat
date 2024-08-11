import { createRoomModel } from '../models/room.js'

export const createRoom = async (pubId, host) => {
  const RoomModel = await createRoomModel()

  const room = new RoomModel({ pubId, host })
  await room.save()
}

export const findRoomById = async (pubId) => {
  const RoomModel = await createRoomModel()

  const room = await RoomModel.findOne({ pubId })
  if (!room) {
    throw new Error('room not found')
  }

  return room
}
