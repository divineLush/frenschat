import { createUserModel } from '../models/user.js'
import { hash } from 'bcrypt'

export const createUser = async (username, email, password) => {
  const UserModel = await createUserModel()
  const passwordHash = await hash(password, parseInt(process.env.SALT_ROUNDS))

  const user = new UserModel({ username, email, password: passwordHash })
  await user.save()
}

export const findUser = async (login) => {
  const UserModel = await createUserModel()

  const user = await UserModel.findOne({ $or: [
    { username: login },
    { email: login },
  ] })
  if (!user) {
    throw new Error('user not found')
  }

  return user
}
