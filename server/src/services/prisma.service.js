const { PrismaClient } = require('@prisma/client');

const prisma = {};

prisma.client = new PrismaClient();

module.exports = prisma;
