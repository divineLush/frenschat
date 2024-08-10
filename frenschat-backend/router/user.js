import checkPassword from '../lib/auth/check-password.js'
import { createUser } from '../lib/db/collections/users.js'

export default (fastify, _, done) => {
  fastify.post('/login', async (request, reply) => {
    const { login, password } = JSON.parse(request.body)
    const isValid = await checkPassword(login, password)
    const code = isValid ? 200 : 400

    const token = fastify.jwt.sign({ login })

    reply
      .cookie(process.env.COOKIE_NAME, token, {
        // domain: 'localhost',
        // path: '/',
        // secure: true,
        httpOnly: true,
        // sameSite: true
      })
      .code(code)
      .send({ login })
  })

  fastify.post('/register', async (request, reply) => {
    const { username, email, password } = JSON.parse(request.body)

    try {
      await createUser(username, email, password)

      reply
        .code(200)
        .send({})
    } catch(err) {
      reply
        .code(400)
        .send({ message: err.message })
    }
  })

  done()
}
