require('dotenv').config();

process.env.NODE_ENV = 'test';

afterAll(async () => {
  const { prisma } = require('./src/lib/prisma');

  await prisma.$disconnect();
});
