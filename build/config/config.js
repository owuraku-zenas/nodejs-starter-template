"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SERVER_HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const SERVER_PORT = process.env.PORT || 3000;
const APP_DEBUG = process.env.APP_DEBUG || true;
const config = {
    server: {
        appDebug: APP_DEBUG,
        port: SERVER_PORT,
        hostname: SERVER_HOSTNAME,
    }
};
exports.default = config;
