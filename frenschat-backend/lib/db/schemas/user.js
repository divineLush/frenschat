import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const UserSchema = new Schema({
  email: String,
  password: String,
})
