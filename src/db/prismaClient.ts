import { PrismaClient } from '@prisma/client';
import { logging, Section } from '../config/logging';
const prisma = new PrismaClient();


export async function checkDatabaseConnection() {
    try {
      await prisma.$connect();
      logging(Section.DATABASE, 'Database connection established successfully.');
    } catch (error) {
      logging(Section.SERVER, `Failed to connect to the database: ${error}`);
      process.exit(1); // Exit the application if the connection fails
    }
  }

export default prisma;