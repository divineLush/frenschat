const BASE_URL = 'http://localhost:3000/api';

export const signIn = async (login, password) => {
  const url = `${BASE_URL}/user/login`

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ login, password }),
  })

  if (!response.ok) {
    throw new Error('Wrong login or password')
  }

  return await response.json()
}

export const signUp = async (username, email, password) => {
  const url = `${BASE_URL}/user/register`

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  })

  if (!response.ok) {
    throw new Error('User already exists')
  }

  return await response.json()
}

export const verifyToken = async () => {
  const url = `${BASE_URL}/verify`

  const response = await fetch(url, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('invalid token')
  }

  return await response.json()
}

export const signOut = async () => {
  const url = `${BASE_URL}/user/logout`

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('server messed up')
  }
}

export const suicide = async () => {
  const url = `${BASE_URL}/user/delete`

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('server messed up')
  }

  return await response.json()
}
