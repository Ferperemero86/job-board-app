// seed.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  await prisma.user.create({
    data: {
      email: 'example@example.com',
      name: 'John Doe',
    },
  })

  await prisma.post.create({
    data: {
      title: 'Sample Post',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      published: true,
      author: {
        connect: { email: 'example@example.com' },
      },
    },
  })

  // Add more seeding logic as needed

  await prisma.$disconnect()
}

seed().catch((error) => {
  console.error('Error seeding database:', error)
  //process.exit(1)
})
