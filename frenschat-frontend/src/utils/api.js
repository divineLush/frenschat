const BASE_URL = 'http://localhost:3000/api';

export const signUp = async (email, password) => {
  const url = `${BASE_URL}/user/register`

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error(response.status)
    }

    return await response.json()
  } catch (error) {
    console.error(error.message)
  }
}
