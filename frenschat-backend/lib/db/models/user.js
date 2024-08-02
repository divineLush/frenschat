import { UserSchema } from '../schemas/user.js'
import db from '../db.js'

const USERS_COLLECTION_KEY = 'users'

export const createUserModel = async () => (await db()).model(USERS_COLLECTION_KEY, UserSchema)
