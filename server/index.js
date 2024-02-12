import Hapi from '@hapi/hapi'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const init = async () => {
  const server = Hapi.server({
    port: 8000,
    host: '0.0.0.0',
    routes: { cors: { origin: 'ignore' } },
  })

  server.route({
    method: 'GET',
    path: '/api/data',
    handler: async (req, h) => {
      try {
        const users = await prisma.user.findMany()
        return { message: users }
      } catch (error) {
        console.error('Error fetching users:', error)
        return h.response({ error: 'Internal Server Error' }).code(500)
      }
    },
  })
  await server.start()
  console.log('Server running on %s', server.info.uri)
}

init()
