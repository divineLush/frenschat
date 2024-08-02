import { createUserModel } from '../models/user.js'

export const createUser = async (email, password) => {
  const UserModel = await createUserModel()
  const user = new UserModel({ email, password })

  await user.save()
}
//
// export const findUser = async (email, password) => {
//   const UserModel = (await db()).model(USERS_COLLECTION_KEY, UserSchema)
//   const user = new UserModel({ email, password })
//
//   await user.save()
// }
