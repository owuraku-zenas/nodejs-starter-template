"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const healthCheck_router_1 = __importDefault(require("./routers/healthCheck.router"));
const prismaClient_1 = require("./db/prismaClient");
const logging_1 = require("./config/logging");
const config_1 = __importDefault(require("./config/config"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware for logging requests
app.use((req, res, next) => {
    (0, logging_1.logging)(logging_1.Section.SERVER, `[REQUEST] [${req.method}],[${req.url}]`);
    res.on("finish", () => {
        (0, logging_1.logging)(logging_1.Section.SERVER, `[RESPONSE] [${req.method}], [${req.url}] [${res.statusCode}]`);
    });
    next();
});
// CORS configuration
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies to be sent with requests
    optionsSuccessStatus: 204, // No content response for preflight requests
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use("/health-check", healthCheck_router_1.default);
// Start the server
async function startServer() {
    await (0, prismaClient_1.checkDatabaseConnection)(); // Ensure the database is connected
    const httpServer = http_1.default.createServer(app);
    // Start listening for requests
    httpServer.listen(config_1.default.server.port, config_1.default.server.hostname, () => {
        (0, logging_1.logging)(logging_1.Section.SERVER, `Server running on ${config_1.default.server.hostname}:${config_1.default.server.port}`);
    });
}
// Run the application
startServer().catch((error) => {
    (0, logging_1.logging)(logging_1.Section.SERVER, `Error during application startup:', ${error}`);
    process.exit(1);
});
