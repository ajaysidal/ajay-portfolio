const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const EMAIL = 'ajay@buildwithai.digital';
const PASSWORD = 'SovereignAdmin2026!';

async function main() {
  console.log(
