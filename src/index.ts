import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import healthCheckRouter from "./routers/healthCheck.router";
import { checkDatabaseConnection } from "./db/prismaClient";
import { logging, Section } from "./config/logging";
import config from "./config/config";

dotenv.config()
const app = express();


// Middleware for logging requests
app.use((req, res, next) => {
    logging(Section.SERVER, `[REQUEST] [${req.method}],[${req.url}]`);
  
    res.on("finish", () => {
      logging(
        Section.SERVER,
        `[RESPONSE] [${req.method}], [${req.url}] [${res.statusCode}]`,
      );
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

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());


app.use("/health-check", healthCheckRouter);


  
  // Start the server
  async function startServer() {
    await checkDatabaseConnection(); // Ensure the database is connected
  
    const httpServer = http.createServer(app);
    
    // Start listening for requests
    httpServer.listen(config.server.port, config.server.hostname, () => {
      logging(
        Section.SERVER,
        `Server running on ${config.server.hostname}:${config.server.port}`,
      );
    });
  }
  
  // Run the application
  startServer().catch((error) => {
    logging(Section.SERVER, `Error during application startup:', ${error}`);
    process.exit(1);
  });