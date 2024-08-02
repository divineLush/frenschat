import { UserSchema } from '../schemas/user.js'
import db from '../db.js'

const USERS_COLLECTION_KEY = 'users'

export const createUser = async (email, password) => {
  const UserModel = (await db()).model(USERS_COLLECTION_KEY, UserSchema)
  const user = new UserModel({ email, password })

  await user.save()
}
