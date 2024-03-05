const { PrismaClient } = require("@prisma/client");

global.prisma = global.prisma || new PrismaClient();

const db = global.prisma;

if (process.env.NODE_ENV !== "production") {
  global.prisma = db;
}

module.exports = db;
