import { compare } from 'bcrypt'
import { findUser } from '../db/collections/users.js'

export default async (login, password) => {
  try {
    const user = await findUser(login)

    return await compare(password, user.password)
  } catch(err) {
    return false
  }
}
