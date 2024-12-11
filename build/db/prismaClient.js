"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDatabaseConnection = checkDatabaseConnection;
const client_1 = require("@prisma/client");
const logging_1 = require("../config/logging");
const prisma = new client_1.PrismaClient();
async function checkDatabaseConnection() {
    try {
        await prisma.$connect();
        (0, logging_1.logging)(logging_1.Section.DATABASE, 'Database connection established successfully.');
    }
    catch (error) {
        (0, logging_1.logging)(logging_1.Section.SERVER, `Failed to connect to the database: ${error}`);
        process.exit(1); // Exit the application if the connection fails
    }
}
exports.default = prisma;
