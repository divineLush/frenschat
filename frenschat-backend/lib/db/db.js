import mongoose from 'mongoose'

let connection = null

export default async () => {
  if (!connection) {
    // mongodb://127.0.0.1:27017/frenschat
    connection = await mongoose.createConnection(process.env.MONGO_URI)
  }

  return connection
}
