import { compare } from 'bcrypt'
import { createUser, deleteUser, findUser } from '../lib/db/collections/users.js'

export default (fastify, _, done) => {
  fastify.post('/login', async (request, reply) => {
    const { login, password } = JSON.parse(request.body)

    try {
      const user = await findUser(login)
      if (await compare(password, user.password)) {
        const token = fastify.jwt.sign({ login })

        reply
          .cookie(process.env.COOKIE_NAME, token, {
            domain: 'localhost',
            path: '/',
            secure: true,
            httpOnly: true,
            sameSite: true
          })
          .code(200)
          .send({
            email: user.email,
            username: user.username
          })
      } else {
        throw new Error('password invalid')
      }
    } catch(e) {
      reply.code(400).send(e)
    }
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

  fastify.post('/logout', (request, reply) => {
    reply
      .clearCookie(process.env.COOKIE_NAME, { path: '/' })
      .send('signed out')
  })

  fastify.post('/delete', async (request, reply) => {
    try {
      const { login } = await request.jwtVerify()
      const { email, username } = await deleteUser(login)
      reply.code(200).send({ email, username })
    } catch(e) {
      reply.code(400).send(e)
    }
  })

  done()
}
