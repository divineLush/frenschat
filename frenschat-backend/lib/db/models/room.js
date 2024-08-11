import db from '../db.js'
import { RoomSchema } from '../schemas/room.js'

const ROOMS_COLLECTION_KEY = 'rooms'

export const createRoomModel = async () => (await db()).model(ROOMS_COLLECTION_KEY, RoomSchema)
