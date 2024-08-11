import mongoose from 'mongoose'
import { UserSchema } from './user.js'

const Schema = mongoose.Schema

export const RoomSchema = new Schema({
  pubId: {
    type: String,
    required: true,
    unique: true,
  },
  host: UserSchema,
})
