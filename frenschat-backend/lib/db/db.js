import mongoose from 'mongoose'

const mongoURI = 'mongodb://127.0.0.1:27017/frenschat'
let connection = null

export default async () => {
  if (!connection) {
    connection = await mongoose.createConnection(mongoURI)
  }

  return connection
}
