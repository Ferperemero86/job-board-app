import Hapi from '@hapi/hapi'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const { Pool } = require('pg')

const init = async () => {
  const server = Hapi.server({
    port: 8000,
    host: '0.0.0.0',
    routes: { cors: { origin: 'ignore' } },
  })

  const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'mydatabase',
    password: 'mysecretpassword',
    port: 5432,
  })

  server.route({
    method: 'GET',
    path: '/api/data',
    handler: async (req, h) => {
      try {
        const client = await pool.connect()
        const result = await client.query('SELECT version()')

        client.release() // Release the client back to the poo
        return { message: result.rows[0] } // Return the fetched data
      } catch (err) {
        console.error('Error executing query test', err)
        return h.response({ error: 'Internal Server Error' }).code(500)
      }
    },
  })

  // Handle pool errors
  pool.on('error', (err) => {
    console.error('PostgreSQL pool error:', err)
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

init()
