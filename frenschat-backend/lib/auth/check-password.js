import { compare } from 'bcrypt'
import { findUser } from '../db/collections/users.js'

export default async (email, password) => {
  try {
    const user = await findUser(email)

    return await compare(password, user.password)
  } catch(err) {
    return false
  }
}
